function doGet(e){
  try{const a=e.parameter.action||'health';if(a==='health')return json_(true,{status:'online',time:now_().toISOString()});
    if(a==='albums'){const s=e.parameter.token?auth_(e.parameter.token,['ADMIN','FAMILY','GUEST']):null;return json_(true,albums_(s));}
    if(a==='album'){const s=e.parameter.token?auth_(e.parameter.token,['ADMIN','FAMILY','GUEST']):null;return json_(true,album_(e.parameter.id,s));}
    if(a==='photos'){const s=e.parameter.token?auth_(e.parameter.token,['ADMIN','FAMILY','GUEST']):null;return json_(true,photos_(e.parameter.albumId,s));}
    if(a==='favorites'){const s=auth_(e.parameter.token,['ADMIN','FAMILY','GUEST']);return json_(true,favorites_(s));}
    if(a==='trash'){const s=auth_(e.parameter.token,['ADMIN']);return json_(true,trash_(s));}
    return json_(true,{service:'Family Photo Album API',version:'3.3'});
  }catch(err){return json_(false,null,err.message);}
}
function doPost(e){
  try{const b=JSON.parse(e.postData.contents||'{}');if(b.action==='setup')return json_(true,setupDatabase());if(b.action==='login')return json_(true,login_(b.email,b.password));
    if(b.action==='albums'){const s=auth_(b.token,['ADMIN','FAMILY','GUEST']);return json_(true,albums_(s));}
    if(b.action==='album'){const s=auth_(b.token,['ADMIN','FAMILY','GUEST']);return json_(true,album_(b.id,s));}
    if(b.action==='photos'){const s=auth_(b.token,['ADMIN','FAMILY','GUEST']);return json_(true,photos_(b.albumId,s));}
    if(b.action==='dashboard'){const s=auth_(b.token,['ADMIN','FAMILY','GUEST']);return json_(true,{albums:albums_(s).length,photos:photos_(null,s).length,favorites:favorites_(s).length});}
    if(b.action==='favorites'){const s=auth_(b.token,['ADMIN','FAMILY','GUEST']);return json_(true,favorites_(s));}
    if(b.action==='trash'){const s=auth_(b.token,['ADMIN']);return json_(true,trash_(s));}
    if(b.action==='toggleFavorite'){const s=auth_(b.token,['ADMIN','FAMILY','GUEST']);return json_(true,toggleFavorite_(b,s));}
    const s=auth_(b.token,['ADMIN']);
    if(b.action==='createAlbum')return json_(true,createAlbum_(b,s));if(b.action==='updateAlbum')return json_(true,updateAlbum_(b,s));if(b.action==='deleteAlbum')return json_(true,deleteAlbum_(b,s));
    if(b.action==='createUser')return json_(true,createUser_(b,s));if(b.action==='uploadPhoto')return json_(true,uploadPhoto_(b,s));if(b.action==='deletePhoto')return json_(true,deletePhoto_(b,s));if(b.action==='restorePhoto')return json_(true,restorePhoto_(b,s));if(b.action==='permanentlyDeletePhoto')return json_(true,permanentlyDeletePhoto_(b,s));if(b.action==='updatePhoto')return json_(true,updatePhoto_(b,s));
    if(b.action==='listUsers')return json_(true,listUsersForAdmin_(s));if(b.action==='getPermissions')return json_(true,getPermissions_(b,s));if(b.action==='savePermissions')return json_(true,savePermissions_(b,s));
    throw Error('Unknown action');
  }catch(err){return json_(false,null,err.message);}
}
