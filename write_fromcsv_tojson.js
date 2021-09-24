//csvを読み込んで配列にする
const fs = require('fs');

const f1 = fs.readFileSync('./datas/population_R3.csv');

let f1txt = (f1.toString());
//console.log(f1txt);
let data = []; 
let row = f1txt.split("\r\n");
    // (\r\n) or (\n)
  
let key = row[0].split(',');
  
for(let i=0; i<row.length-1; i++){
    data[i] = row[i+1].split(',');
}
  
let j_array = {};
for (let j=0; j<data.length; j++){
    let jsondata =　{};
    for(let i=1; i<key.length; i++){
        jsondata[key[i]] = data[j][i];
    }
    j_array[data[j][0]] = jsondata;
}

//数値変換
key_int = ['sum','-14','15-64','65-','sum_M','-14_M','15-64_M','65-_M','sum_F','-14_F','15-64_F','65-_F']

for (let key in j_array){
    for(let i=0; i<key_int.length; i++){
    j_array[key][key_int[i]] = Number(j_array[key][key_int[i]]);
    }
}

let text = JSON.stringify(j_array);


async function main(msg){
    fs.writeFile('./datas/population.json', msg, (err)=>{
        console.log('save data: ' + msg);
    });
}
main(text);