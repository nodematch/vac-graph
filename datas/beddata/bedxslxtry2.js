const fs = require('fs');
let XLSX     = require('xlsx');

filenames = ['bed_201223.xlsx', 'bed_201230.xlsx', 
  'bed_210106.xlsx', 'bed_210113.xlsx', 'bed_210120.xlsx', 'bed_210127.xlsx',
  'bed_210203.xlsx', 'bed_210210.xlsx', 'bed_210217.xlsx', 'bed_210224.xlsx',
  'bed_210303.xlsx', 'bed_210310.xlsx', 'bed_210317.xlsx', 'bed_210324.xlsx','bed_210331.xlsx', 
  'bed_210407.xlsx', 'bed_210414.xlsx', 'bed_210421.xlsx', 'bed_210428.xlsx',
  'bed_210505.xlsx', 'bed_210512.xlsx', 'bed_210519.xlsx', 'bed_210526.xlsx']

p_number = []; for (let i=1; i<48; i++){let num = ('0' + i).slice(-2);  p_number.push(num);} // p_number=['01','02',...,'47']

let oldkey00 = ['__EMPTY','__EMPTY_1','__EMPTY_2','__EMPTY_3','__EMPTY_4',
  '__EMPTY_5','最終フェーズにおける即応病床（計画）数（注５）','__EMPTY_6','__EMPTY_7','__EMPTY_8',
  '__EMPTY_9','最終フェーズにおける即応病床（計画）数（注５）_1','__EMPTY_10','__EMPTY_11','__EMPTY_12',
  '__EMPTY_13','最終フェーズにおける宿泊療施設居室（計画）数（注７）','__EMPTY_14','__EMPTY_15','__EMPTY_16'];


function xslxtojson(fname){
  let workbook = XLSX.readFile('./datas/beddata/' + fname);
  let sheet_name_list = workbook.SheetNames;
  let Sheet1          = workbook.Sheets[sheet_name_list[0]];  // シート1をデータを取得します
  Sheet1['!ref'] = 'C7:V54';                                 // シートのデータ範囲を指定
  let Sheet1_json     = XLSX.utils.sheet_to_json( Sheet1 );   // シート1のデータをJSONパースします
  
  let oldkeythis = [];
  for (let key in Sheet1_json[0]){
    oldkeythis.push(key);
  }
  
  console.log(oldkeythis[6]); console.log(oldkeythis[11]); console.log(oldkeythis[16]);
  
  let newkey = [
    'name', 'patient', 'inpatient', 0, 'bed_kakuho',
    0, 'bed_sokuou', 'inpatient_sev', 0, 'bed_sev_kakuho',
    0, 'bed_sev_sokuou', 'inroom', 0, 'room_kakuho',
    0, 'room_sokuou', 'inhome', 'inhome_another','wait'
  ];
    
  
  let newarray ={};
  for (let i=0; i<Sheet1_json.length; i++){
    let one = {};
    for(let j=0; j<oldkeythis.length; j++){
      if(newkey[j]!=0){
      one[newkey[j]] = Sheet1_json[i][oldkeythis[j]];
      }
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

  return newarray;
}



let bed_data1 = {}
for (let i=0; i<filenames.length; i++ ){
  bed_data1[filenames[i]] = xslxtojson(filenames[i]);
}

console.table(bed_data1['bed_210526.xlsx']['47']);

// let text = JSON.stringify(newarray);
// async function main(msg){
//   fs.writeFile('./datas/bed.json', msg, (err)=>{
//       console.log('save data: ' + msg);
//   });
// }
// main(text);


