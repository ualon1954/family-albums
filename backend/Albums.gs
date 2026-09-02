function albums_(user){
  const visible = rows_(TABLES.ALBUMS)
    .filter(a=>String(a.active).toLowerCase()!=='false')
    .filter(a=>!user||user.role==='ADMIN'||canViewAlbum_(user,a.id))
    .map(a=>{
      if(a.coverUrl&&a.coverUrl.indexOf('drive.google.com')>=0){
        const m=a.coverUrl.match(/[?&]id=([^&]+)/); if(m)a.coverUrl=driveImageUrl_(m[1]);
      }
      return a;
    });
  visible.unshift({id:'__ALL__',title:'כל האלבומים',description:'כל התמונות מכל האלבומים שיש לך הרשאת צפייה בהם',coverUrl:visible.find(a=>a.coverUrl)?.coverUrl||'',isVirtual:true,active:true});
  return visible;
}
function album_(id,user){
  id=String(id||'').trim();
  if(id==='__ALL__') return {id:'__ALL__',title:'כל האלבומים',description:'כל התמונות מכל האלבומים שיש לך הרשאת צפייה בהם',isVirtual:true};
  const a=find_(TABLES.ALBUMS,'id',id);if(!a)throw Error('Album not found');if(user&&!canViewAlbum_(user,id))throw Error('אין הרשאה לצפייה באלבום');return a
}
function createAlbum_(b,s){
  if(!b.title)throw Error('שם האלבום חובה');
  const f=getRootFolder_().createFolder(String(b.title)),id=uuid_();
  append_(TABLES.ALBUMS,{id,title:b.title,description:b.description||'',coverUrl:'',folderId:f.getId(),createdAt:now_(),createdBy:s.userId,active:true});
  log_(s.userId,'CREATE','ALBUM',id,b.title);return {id,title:b.title,description:b.description||'',folderId:f.getId()};
}
function updateAlbum_(b,s){album_(b.id,s);updateById_(TABLES.ALBUMS,b.id,{title:b.title,description:b.description||''});log_(s.userId,'UPDATE','ALBUM',b.id,b.title);return true}
function deleteAlbum_(b,s){album_(b.id,s);updateById_(TABLES.ALBUMS,b.id,{active:false});log_(s.userId,'DELETE','ALBUM',b.id,'');return true}
