function login_(email,password){
  const u=find_(TABLES.USERS,"email",String(email).toLowerCase().trim());
  if(!u||String(u.active).toLowerCase()!=="true"||u.passwordHash!==sha256_(password))throw Error("אימייל או סיסמה שגויים");
  const token=uuid_()+"-"+uuid_(),data={userId:u.id,email:u.email,name:u.name,role:u.role};
  CacheService.getScriptCache().put("SESSION_"+token,JSON.stringify(data),CONFIG.SESSION_TTL);
  return {token,user:{id:u.id,email:u.email,name:u.name,role:u.role}};
}
function auth_(token,roles){
  const raw=token&&CacheService.getScriptCache().get("SESSION_"+token);
  if(!raw)throw Error("פג תוקף החיבור");
  const s=JSON.parse(raw);
  if(roles&&roles.indexOf(s.role)<0)throw Error("אין הרשאה");
  return s;
}
