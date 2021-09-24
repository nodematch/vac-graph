const fs = require('fs');

function ndjson_to_text(where){
  const f1 = fs.readFileSync(where);
  let f1txt = (f1.toString());
  let data1; let d1txt; let data1_text;
  try{
      d1txt = '[' + f1txt.split("}\n{").join("},{") + ']';
      data1_text = d1txt.replace("\n","");
      data1 = JSON.parse(data1_text);
      console.log('n to jsondata complete');
  }catch(e){
      try{
          d1txt = '[' + f1txt.split("}\r\n{").join("},{") + ']';
          data1_text = d1txt.replace("\r\n","");
          data1 = JSON.parse(data1_text);
          console.log('rn to jsondata complete');
      }catch(e2){
          throw e2;
  }}
  return data1_text;
}

let text = ndjson_to_text('./datas/prefecture.ndjson');

async function main(msg){
  fs.writeFile('./datas/vaccine.json', msg, (err)=>{
      console.log('save data: ' + msg);
  });
}
main(text);
