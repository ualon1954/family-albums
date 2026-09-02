function trash_(s){
  if(!s||s.role!=='ADMIN') throw Error('אין הרשאה לסל המחזור');
  return rows_(TABLES.PHOTOS).filter(p=>String(p.active).toLowerCase()==='false').map(p=>{
    if(p.driveFileId)p.imageUrl=driveImageUrl_(p.driveFileId);
    return p;
  }).sort((a,b)=>String(b.deletedAt||b.createdAt).localeCompare(String(a.deletedAt||a.createdAt)));
}
function restorePhoto_(b,s){
  if(!s||s.role!=='ADMIN') throw Error('אין הרשאה לשחזור תמונה');
  const p=find_(TABLES.PHOTOS,'id',b.id); if(!p)throw Error('Photo not found');
  if(String(p.active).toLowerCase()!=='false')throw Error('התמונה כבר פעילה');
  try{if(p.driveFileId)DriveApp.getFileById(p.driveFileId).setTrashed(false);}catch(e){throw Error('לא ניתן לשחזר את קובץ התמונה מ-Google Drive');}
  updateById_(TABLES.PHOTOS,b.id,{active:true,deletedAt:'',deletedBy:''});
  log_(s.userId,'RESTORE','PHOTO',b.id,p.fileName);return true;
}
function permanentlyDeletePhoto_(b,s){
  if(!s||s.role!=='ADMIN') throw Error('אין הרשאה למחיקה לצמיתות');
  const p=find_(TABLES.PHOTOS,'id',b.id); if(!p)throw Error('Photo not found');
  if(String(p.active).toLowerCase()!=='false')throw Error('יש להעביר את התמונה לסל המחזור לפני מחיקה לצמיתות');
  try{if(p.driveFileId)DriveApp.getFileById(p.driveFileId).setTrashed(true);}catch(e){}
  deleteById_(TABLES.PHOTOS,b.id);
  rows_(TABLES.FAVORITES).filter(f=>String(f.photoId)===String(b.id)).forEach(f=>deleteById_(TABLES.FAVORITES,f.id));
  log_(s.userId,'PERMANENT_DELETE','PHOTO',b.id,p.fileName);return true;
}
