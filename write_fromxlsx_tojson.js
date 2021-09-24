const fs = require('fs');
let XLSX     = require('xlsx');
let workbook = XLSX.readFile('./datas/bed_0915.xlsx');

let sheet_name_list = workbook.SheetNames;
let Sheet1          = workbook.Sheets[sheet_name_list[0]];  // シート1をデータを取得します
Sheet1['!ref'] = 'C7:Z54';                                 // シートのデータ範囲を指定
let Sheet1_json     = XLSX.utils.sheet_to_json( Sheet1 );   // シート1のデータをJSONパースします

oldkey = [
  '__EMPTY','__EMPTY_1','__EMPTY_2',
  '__EMPTY_3','即応病床数\r\n(注３)',
  '確保病床数\r\n（注４）',
  '__EMPTY_4','__EMPTY_5',
  '即応病床数\r\n(注３)_1','確保病床数\r\n（注４）_1',
  '__EMPTY_6','即応居室数\r\n(注７)',
  '確保居室数\r\n（注８）','__EMPTY_7',
  '__EMPTY_8','__EMPTY_9','__EMPTY_10'
];
newkey = [
    'name','patient','inpatient',
    'inpatient_kakuho','bed_sokuou',
    'bed_kakuho',
    'inpatient_sev','inpatient_sev_kakuho',
    'bed_sev_sokuou','bed_sev_kakuho',
    'inroom','room_sokuou',
    'room_kakuho','inhome',
    'inhome_another','wait','wait_hospital'
];
  
p_number = [];
for (let i=1; i<48; i++){
  let num = ('0' + i).slice(-2); 
  p_number.push(num);
}
  
let newarray ={};
for (let i=0; i<Sheet1_json.length; i++){
 let one = {};
 for(let j=0; j<oldkey.length; j++){
  one[newkey[j]] = Sheet1_json[i][oldkey[j]];
  }
  newarray[p_number[i]] = one;
}

let zenkoku = {};
for(let content in newarray['01']){
  let sum = 0;
  for(let prefecture in newarray){
    sum += newarray[prefecture][content];
  }
  zenkoku[content] = sum;
}
zenkoku['name'] = '00 全国';
newarray['00'] = zenkoku;
  
let text = JSON.stringify(newarray);
async function main(msg){
  fs.writeFile('./datas/bed.json', msg, (err)=>{
      console.log('save data: ' + msg);
  });
}
main(text);


  


//console.log(Sheet1['B3'].v);
//for( let cl of Sheet1_json){console.log( `${cl['B3']} - ${cl['C3']} - ${cl['D3']}` );}

// oldkey = [
// '__EMPTY','__EMPTY_1','__EMPTY_2',
// '__EMPTY_3','現フェーズ／\r\n最終フェーズ\r\n（注２）','即応病床数\r\n(注３)',
// '確保病床数\r\n（注４）','確保病床\r\n使用率\r\n（注５）','入院率\r\n（注６）',
// '__EMPTY_4','__EMPTY_5','現フェーズ／\r\n最終フェーズ\r\n（注２）_1',
// '即応病床数\r\n(注３)_1','確保病床数\r\n（注４）_1','確保病床\r\n使用率\r\n（注５）_1',
// '__EMPTY_6','現フェーズ／\r\n最終フェーズ\r\n（注２）_2','即応居室数\r\n(注７)',
// '確保居室数\r\n（注８）','確保居室\r\n使用率\r\n（注９）','__EMPTY_7',
// '__EMPTY_8','__EMPTY_9','__EMPTY_10'
// ];
// newkey = [
//   'name','patient','inpatient',
//   'inpatient_kakuho','faze','bed_sokuou',
//   'bed_kakuho','rate','rate2',
//   'inpatient_sev','inpatient_sev_kakuho','faze2',
//   'bed_sev_sokuou','bed_sev_kakuho','rate3',
//   'inroom','faze3','room_sokuou',
//   'room_kakuho','rate4','inhome',
//   'inhome_another','wait','wait_hospital'];

