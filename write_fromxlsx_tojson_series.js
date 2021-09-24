const fs = require('fs');
let XLSX     = require('xlsx');

p_number = []; for (let i=1; i<48; i++){let num = ('0' + i).slice(-2);  p_number.push(num);} // p_number=['01','02',...,'47']

let filenames = ['bed_201223', 'bed_201230', 
  'bed_210106', 'bed_210113', 'bed_210120', 'bed_210127',
  'bed_210203', 'bed_210210', 'bed_210217', 'bed_210224',
  'bed_210303', 'bed_210310', 'bed_210317', 'bed_210324','bed_210331', 
  'bed_210407', 'bed_210414', 'bed_210421', 'bed_210428',
  'bed_210505', 'bed_210512', 'bed_210519', 'bed_210526']

let oldkey00 = ['__EMPTY','__EMPTY_1','__EMPTY_2','__EMPTY_3','__EMPTY_4',
  '__EMPTY_5','最終フェーズにおける即応病床（計画）数（注５）','__EMPTY_6','__EMPTY_7','__EMPTY_8',
  '__EMPTY_9','最終フェーズにおける即応病床（計画）数（注５）_1','__EMPTY_10','__EMPTY_11','__EMPTY_12',
  '__EMPTY_13','最終フェーズにおける宿泊療施設居室（計画）数（注７）','__EMPTY_14','__EMPTY_15','__EMPTY_16'];

let filenames2 = ['bed_210602','bed_210609','bed_210616','bed_210623','bed_210630',
  'bed_210707','bed_210714','bed_210721','bed_210728',
  'bed_210804','bed_210811','bed_210818','bed_210825',
  'bed_210901','bed_210908','bed_210915',]

let oldkey002 = [
  '__EMPTY','__EMPTY_1','__EMPTY_2',
  '__EMPTY_3','現フェーズ／\r\n最終フェーズ\r\n（注２）','即応病床数\r\n(注３)',
  '確保病床数\r\n（注４）','確保病床\r\n使用率\r\n（注５）','入院率\r\n（注６）',
  '__EMPTY_4','__EMPTY_5','現フェーズ／\r\n最終フェーズ\r\n（注２）_1',
  '即応病床数\r\n(注３)_1','確保病床数\r\n（注４）_1','確保病床\r\n使用率\r\n（注５）_1',
  '__EMPTY_6','現フェーズ／\r\n最終フェーズ\r\n（注２）_2','即応居室数\r\n(注７)',
  '確保居室数\r\n（注８）','確保居室\r\n使用率\r\n（注９）','__EMPTY_7',
  '__EMPTY_8','__EMPTY_9','__EMPTY_10'
];




function xslxtojson(fname){
  let workbook = XLSX.readFile('./datas/beddata/' + fname + '.xlsx');
  let sheet_name_list = workbook.SheetNames;
  let Sheet1          = workbook.Sheets[sheet_name_list[0]];  // シート1をデータを取得します
  Sheet1['!ref'] = 'C7:V54';                                 // シートのデータ範囲を指定
  let Sheet1_json     = XLSX.utils.sheet_to_json( Sheet1 );   // シート1のデータをJSONパースします
  
  let oldkeythis = [];
  for (let key in Sheet1_json[0]){
    oldkeythis.push(key);
  }
  
//console.log(oldkeythis[6]); console.log(oldkeythis[11]); console.log(oldkeythis[16]);
  
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
        if(typeof(Sheet1_json[i][oldkeythis[j]]) != 'number'){
          if(Sheet1_json[i][oldkeythis[j]].substr(0,2) == '注８' || Sheet1_json[i][oldkeythis[j]].substr(0,2) == '注8'){
            let asn = Sheet1_json[i][oldkeythis[j]].substr(2);
            asn = asn.replace(' ','');
            asn = asn.replace('　','');
            one[newkey[j]] = Number(asn);
          }
        }else{
          one[newkey[j]] = Sheet1_json[i][oldkeythis[j]];
        }
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




function xslxtojson2(fname){
  let workbook = XLSX.readFile('./datas/beddata2/' + fname + '.xlsx');
  let sheet_name_list = workbook.SheetNames;
  let Sheet1          = workbook.Sheets[sheet_name_list[0]];  // シート1をデータを取得します
  Sheet1['!ref'] = 'C7:Z54';                                 // シートのデータ範囲を指定
  let Sheet1_json     = XLSX.utils.sheet_to_json( Sheet1 );   // シート1のデータをJSONパースします
  
  let oldkeythis = [];
  for (let key in Sheet1_json[0]){
    oldkeythis.push(key);
  }
  
  // console.log(oldkeythis[4]); console.log(oldkeythis[7]); console.log(oldkeythis[8]); console.log(oldkeythis[11]); console.log(oldkeythis[14]); console.log(oldkeythis[16]);console.log(oldkeythis[19]);
  
  let newkey = [
    'name','patient','inpatient',
    'inpatient_kakuho',0,'bed_sokuou',
    'bed_kakuho',0,0,
    'inpatient_sev','inpatient_sev_kakuho',0,
    'bed_sev_sokuou','bed_sev_kakuho',0,
    'inroom',0,'room_sokuou',
    'room_kakuho',0,'inhome',
    'inhome_another','wait','wait_hospital'
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



let bed_data = {}
for (let i=0; i<filenames.length; i++ ){
  bed_data[filenames[i]] = xslxtojson(filenames[i]);
}


for (let i=0; i<filenames2.length; i++ ){
  bed_data[filenames2[i]] = xslxtojson2(filenames2[i]);
}

console.table(bed_data['bed_210609']['47']);
console.table(bed_data['bed_210407']['47']);


let text = JSON.stringify(bed_data);
async function main(msg){
  fs.writeFile('./datas/bed_series.json', msg, (err)=>{
      console.log('save data: ' + msg);
  });
}
main(text);


