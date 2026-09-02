function createUser_(b,s){
  if(!b.name||!b.email||!b.password)throw Error("חסרים פרטי משתמש");
  const email=String(b.email).toLowerCase().trim();
  if(find_(TABLES.USERS,"email",email))throw Error("המשתמש כבר קיים");
  const id=uuid_();
  append_(TABLES.USERS,{id,email,name:b.name,passwordHash:sha256_(b.password),role:b.role||"FAMILY",active:true,createdAt:now_()});
  log_(s.userId,"CREATE","USER",id,email);return {id,email,name:b.name,role:b.role||"FAMILY"};
}
