function driveImageUrl_(fileId){return fileId?'https://drive.google.com/thumbnail?id='+encodeURIComponent(fileId)+'&sz=w2000':'';}
function photos_(albumId,s){
  albumId=String(albumId||'').trim();
  const allMode=albumId==='__ALL__'||!albumId;
  if(!allMode&&s&&s.role!=='ADMIN'&&!canViewAlbum_(s,albumId))throw Error('אין הרשאה לצפייה באלבום');
  const favIds=s?new Set(rows_(TABLES.FAVORITES).filter(f=>String(f.userId)===String(s.userId)).map(f=>String(f.photoId))):new Set();
  const albumRows=rows_(TABLES.ALBUMS);
  const albumMap=new Map(albumRows.map(a=>[String(a.id),a]));
  const visibleAlbums=allMode?new Set(albumRows.filter(a=>String(a.active).toLowerCase()!=='false'&&(!s||s.role==='ADMIN'||canViewAlbum_(s,a.id))).map(a=>String(a.id))):null;
  return rows_(TABLES.PHOTOS).filter(p=>String(p.active).toLowerCase()!=='false'&&(allMode?visibleAlbums.has(String(p.albumId)):String(p.albumId)===String(albumId)))
    .map(p=>{
      if(p.driveFileId)p.imageUrl=driveImageUrl_(p.driveFileId);
      p.albumTitle=String(albumMap.get(String(p.albumId))?.title||'').trim();
      p.isFavorite=favIds.has(String(p.id));
      p.canDelete=!!(s&&(s.role==='ADMIN'||canDeleteAlbum_(s,p.albumId)));
      return p;
    });
}
function uploadPhoto_(b,s){
  if(!b.albumId||String(b.albumId)==='__ALL__'||!b.fileName||!b.base64)throw Error('חסרים נתוני העלאה');
  if(s.role!=='ADMIN'&&!canUploadAlbum_(s,b.albumId))throw Error('אין הרשאה להעלות תמונות לאלבום זה');
  const a=album_(b.albumId,s),folder=DriveApp.getFolderById(a.folderId),blob=Utilities.newBlob(Utilities.base64Decode(b.base64),b.mimeType||'image/jpeg',b.fileName),file=folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);
  const url=driveImageUrl_(file.getId()),id=uuid_();
  append_(TABLES.PHOTOS,{id,albumId:b.albumId,fileName:b.fileName,imageUrl:url,photoTitle:String(b.photoTitle||'').trim(),photoDate:normalizePhotoYear_(b.photoDate),caption:b.caption||'',createdAt:now_(),createdBy:s.userId,favoriteCount:0,driveFileId:file.getId(),active:true});
  if(!a.coverUrl)updateById_(TABLES.ALBUMS,a.id,{coverUrl:url});log_(s.userId,'UPLOAD','PHOTO',id,b.fileName);return {id,imageUrl:url,fileId:file.getId()};
}
function deletePhoto_(b,s){
  const p=find_(TABLES.PHOTOS,'id',b.id);if(!p)throw Error('Photo not found');
  if(s.role!=='ADMIN'&&!canDeleteAlbum_(s,p.albumId))throw Error('אין הרשאה למחוק תמונה זו');
  updateById_(TABLES.PHOTOS,b.id,{active:false});try{DriveApp.getFileById(p.driveFileId).setTrashed(true)}catch(e){};
  rows_(TABLES.FAVORITES).filter(f=>String(f.photoId)===String(b.id)).forEach(f=>deleteById_(TABLES.FAVORITES,f.id));
  log_(s.userId,'DELETE','PHOTO',b.id,p.fileName);return true;
}
function updatePhoto_(b,s){
  const p=find_(TABLES.PHOTOS,'id',b.id);if(!p)throw Error('Photo not found');
  if(s.role!=='ADMIN'&&!canDeleteAlbum_(s,p.albumId))throw Error('אין הרשאה לערוך תמונה זו');
  const changes={};if(b.photoTitle!==undefined)changes.photoTitle=String(b.photoTitle).trim();if(b.photoDate!==undefined)changes.photoDate=normalizePhotoYear_(b.photoDate);if(b.caption!==undefined)changes.caption=String(b.caption);
  updateById_(TABLES.PHOTOS,b.id,changes);log_(s.userId,'UPDATE','PHOTO',b.id,changes.photoTitle||p.fileName);return Object.assign({},p,changes);
}
function normalizePhotoYear_(v){const m=String(v||'').match(/(?:^|[^0-9])(19[0-9]{2}|20[0-9]{2}|21[0-9]{2})(?:[^0-9]|$)/);return m?m[1]:'';}
