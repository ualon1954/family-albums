function ensurePhotoColumns_(){
  const s=sheet_(TABLES.PHOTOS); if(!s)return;
  const required=["photoTitle","photoDate"];
  const last=s.getLastColumn();
  const headers=s.getRange(1,1,1,last).getValues()[0];
  required.forEach(name=>{if(headers.indexOf(name)<0)s.getRange(1,s.getLastColumn()+1).setValue(name)});
}
function setupDatabase(){
  const defs={
    Users:["id","email","name","passwordHash","role","active","createdAt"],
    Albums:["id","title","description","coverUrl","folderId","createdAt","createdBy","active"],
    Photos:["id","albumId","fileName","imageUrl","photoTitle","photoDate","caption","createdAt","createdBy","favoriteCount","driveFileId","active","deletedAt","deletedBy"],
    Favorites:["id","userId","photoId","createdAt"],
    Permissions:["id","userId","albumId","canView","canUpload","canDelete"],
    ActivityLog:["id","userId","action","entityType","entityId","details","createdAt"],
    Settings:["key","value"]
  };
  Object.keys(defs).forEach(name=>{
    let s=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
    if(!s)s=SpreadsheetApp.getActiveSpreadsheet().insertSheet(name);
    if(s.getLastRow()===0)s.appendRow(defs[name]);
    s.setFrozenRows(1);
  });
  ensurePhotoColumns_();
  const u=find_(TABLES.USERS,"email",CONFIG.DEFAULT_ADMIN_EMAIL);
  if(!u)append_(TABLES.USERS,{id:uuid_(),email:CONFIG.DEFAULT_ADMIN_EMAIL,name:"Family Admin",passwordHash:sha256_(CONFIG.DEFAULT_ADMIN_PASSWORD),role:"ADMIN",active:true,createdAt:now_()});
  const root=getRootFolder_();
  PropertiesService.getScriptProperties().setProperty("ROOT_FOLDER_ID",root.getId());
  return {ready:true,rootFolderId:root.getId()};
}
function getRootFolder_(){
  const p=PropertiesService.getScriptProperties(),id=p.getProperty("ROOT_FOLDER_ID");
  if(id)try{return DriveApp.getFolderById(id)}catch(e){}
  const it=DriveApp.getFoldersByName(CONFIG.ROOT_FOLDER);
  const f=it.hasNext()?it.next():DriveApp.createFolder(CONFIG.ROOT_FOLDER);
  p.setProperty("ROOT_FOLDER_ID",f.getId());
  return f;
}
