function permissionFor_(userId,albumId){
  if(!userId||!albumId)return {canView:false,canUpload:false,canDelete:false};
  const p=rows_(TABLES.PERMISSIONS).find(x=>String(x.userId)===String(userId)&&String(x.albumId)===String(albumId));
  if(!p)return {canView:true,canUpload:false,canDelete:false};
  return {canView:bool_(p.canView),canUpload:bool_(p.canUpload),canDelete:bool_(p.canDelete)};
}
function bool_(v){return String(v).toLowerCase()==='true'||v===true||v===1||String(v)==='1';}
function canViewAlbum_(user,albumId){return user&&user.role==='ADMIN'?true:permissionFor_(user.userId,albumId).canView;}
function canUploadAlbum_(user,albumId){return user&&user.role==='ADMIN'?true:permissionFor_(user.userId,albumId).canUpload;}
function canDeleteAlbum_(user,albumId){return user&&user.role==='ADMIN'?true:permissionFor_(user.userId,albumId).canDelete;}
function listUsersForAdmin_(s){
  return rows_(TABLES.USERS).map(u=>({id:u.id,name:u.name,email:u.email,role:u.role,active:bool_(u.active)}));
}
function getPermissions_(b,s){
  const u=find_(TABLES.USERS,'id',b.userId); if(!u)throw Error('משתמש לא נמצא');
  const a=find_(TABLES.ALBUMS,'id',b.albumId); if(!a)throw Error('אלבום לא נמצא');
  return Object.assign({userId:u.id,albumId:a.id},permissionFor_(u.id,a.id));
}
function savePermissions_(b,s){
  const u=find_(TABLES.USERS,'id',b.userId); if(!u)throw Error('משתמש לא נמצא');
  const a=find_(TABLES.ALBUMS,'id',b.albumId); if(!a)throw Error('אלבום לא נמצא');
  let p=rows_(TABLES.PERMISSIONS).find(x=>String(x.userId)===String(b.userId)&&String(x.albumId)===String(b.albumId));
  const data={userId:b.userId,albumId:b.albumId,canView:!!b.canView,canUpload:!!b.canUpload,canDelete:!!b.canDelete};
  if(p) updateById_(TABLES.PERMISSIONS,p.id,data);
  else {data.id=uuid_();append_(TABLES.PERMISSIONS,data);}
  log_(s.userId,'UPDATE','PERMISSION',p?p.id:data.id,`${u.email} / ${a.title}`);
  return data;
}
