function json_(ok,data,msg){return ContentService.createTextOutput(JSON.stringify({ok:ok,data:data||null,message:msg||""})).setMimeType(ContentService.MimeType.JSON)}
function now_(){return new Date()}
function uuid_(){return Utilities.getUuid()}
function sha256_(value){return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,String(value),Utilities.Charset.UTF_8).map(b=>(b<0?b+256:b).toString(16).padStart(2,"0")).join("")}
function sheet_(name){return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name)}
function rows_(name){const s=sheet_(name);if(!s||s.getLastRow()<2)return [];const v=s.getDataRange().getValues(),h=v.shift();return v.map(r=>{const o={};h.forEach((k,i)=>o[k]=r[i] instanceof Date?r[i].toISOString():r[i]);return o})}
function find_(name,key,value){return rows_(name).find(x=>String(x[key]).toLowerCase()===String(value).toLowerCase())||null}
function append_(name,obj){const s=sheet_(name),h=s.getRange(1,1,1,s.getLastColumn()).getValues()[0];s.appendRow(h.map(k=>obj[k]===undefined?"":obj[k]))}
function updateById_(name,id,changes){const s=sheet_(name),v=s.getDataRange().getValues(),h=v[0],idx=h.indexOf("id");for(let r=1;r<v.length;r++)if(String(v[r][idx])===String(id)){Object.keys(changes).forEach(k=>{const c=h.indexOf(k);if(c>=0)s.getRange(r+1,c+1).setValue(changes[k])});return true}return false}
function deleteById_(name,id){const s=sheet_(name),v=s.getDataRange().getValues(),h=v[0],idx=h.indexOf("id");for(let r=1;r<v.length;r++)if(String(v[r][idx])===String(id)){s.deleteRow(r+1);return true}return false}
function log_(userId,action,type,id,details){append_(TABLES.LOG,{id:uuid_(),userId,action,entityType:type,entityId:id||"",details:details||"",createdAt:now_()})}
