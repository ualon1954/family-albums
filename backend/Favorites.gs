function favorites_(s){
  const fav=rows_(TABLES.FAVORITES).filter(x=>x.userId===s.userId);
  const ps=rows_(TABLES.PHOTOS);
  const albums=rows_(TABLES.ALBUMS);
  const albumMap=new Map(albums.map(a=>[String(a.id),a]));
  return fav.map(f=>ps.find(p=>p.id===f.photoId)).filter(Boolean).filter(p=>String(p.active).toLowerCase()!=='false').map(p=>{
    if(p.driveFileId)p.imageUrl=driveImageUrl_(p.driveFileId);
    p.albumTitle=String(albumMap.get(String(p.albumId))?.title||'').trim();
    p.isFavorite=true;
    return p;
  });
}
function toggleFavorite_(b,s){
  const old=rows_(TABLES.FAVORITES).find(x=>String(x.userId)===String(s.userId)&&String(x.photoId)===String(b.photoId));
  if(old){deleteById_(TABLES.FAVORITES,old.id);return {favorite:false};}
  const p=find_(TABLES.PHOTOS,'id',b.photoId);if(!p||String(p.active).toLowerCase()==='false')throw Error('התמונה אינה זמינה');
  append_(TABLES.FAVORITES,{id:uuid_(),userId:s.userId,photoId:b.photoId,createdAt:now_()});return {favorite:true};
}
