var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('sample1.db');
const fs = require('fs');


router.get('/db/create_table', function(req, res, next) {
  db.all ('SELECT * FROM sample001', (err,rows)=>{
    let opt = {
      title: 'Hello',
      data: rows
    }
    res.render('db/db/create_table', opt);
  });  
});


router.post('/db/create_table', async function(req, res, next) {
  let keynames = req.body.keynames;
  let keytypes = req.body.keytypes;
  console.log(keynames + ':' + keytypes);

  let kname_array = keynames.split(',');
  let ktype_array = keytypes.split(',');
  for(let i=0; i<kname_array.length; i++){console.log(kname_array[i] + ',' + ktype_array[i]); }
  
   // jsondataのdbテーブル作成
  let sql0 = '"id" INTEGER'
  for (let i=0; i<kname_array.length; i++){
    sql0 += ',"' + kname_array[i] + '" ' + ktype_array[i];
  }
  sql0 += ',PRIMARY KEY("id" AUTOINCREMENT)'
  let sql = 'create table "t-name" (' + sql0 + ');'
  console.log(sql);

  db.exec(sql);
  res.redirect('db/db/create_table');
});

// router.post('/insert_record', async function(req, res, next) {
//   const stream = fs.createReadStream(req.body.datahere, {encoding: "utf8", highWaterMark: 1024});
//   let filetext ='';
//   let key1 = req.body.key1;
//   let key2 = req.body.key2;

//   stream.on("data", (chunk) => {filetext += chunk.toString("utf8");});
//   stream.on("end", () => {
//     let jsontext; let jsondata;
//     try{
//         jsontext = '[' + filetext.split("}\n{").join("},{") + ']';
//         jsondata = JSON.parse(jsontext);
//         console.log('n to jsondata complete');
//     }catch(e){
//         try{
//             jsontext = '[' + filetext.split("}\r\n{").join("},{") + ']';
//             jsondata = JSON.parse(jsontext);
//             console.log('rn to jsondata complete');
//         }catch(e2){
//             throw e2;
//     }}
        
//     // jsondataのdb追加
//     console.table(jsondata[0]);
//     let fd_sql = '("' + jsondata[0][key1] + '","' + jsondata[0][key2] + '")';
//     for(let i=1; i<jsondata.length; i++){
//       fd_sql += ',("' + jsondata[i][key1] + '","' + jsondata[i][key2] + '")';
//     }
      
//     // let sql = 'insert into sample001 (name, count) values' +fd_sql+ ';';
//     // db.exec(sql, (stat,err)=>{
//     //   res.redirect('/');
//     // });

//     let sql = 'create table "t-name" ("id"	INTEGER,"name"	TEXT NOT NULL,"count"	INTEGER NOT NULL,PRIMARY KEY("id" AUTOINCREMENT));'
//     let sql2 = 'insert into t-name (name, count) values' +fd_sql+ ';';
//     console.log('a');
//     db.exec(sql);
//       // db.exec(sql2,(stat2,err2)=>{
//     console.log('c');
//     db.exec(sql2);
//     res.redirect('/');
//     console.log('d');
//       //   console.log('c');
//       // });
//   });
//   stream.on("error", (err)=>{console.log(err.message);});
// });




module.exports = router;

// router.post('/db/create_table', async function(req, res, next) {
//   const stream = fs.createReadStream(req.body.datahere, {encoding: "utf8", highWaterMark: 1024});
//   let filetext ='';
//   let keynames = req.body.keynames;
//   console.log(keynames);
//   let key_array = keynames.split(',');
//   console.table(key_array);

//   stream.on("data", (chunk) => {filetext += chunk.toString("utf8");});
//   stream.on("end", () => {
//     let jsontext; let jsondata;
//     try{
//         jsontext = '[' + filetext.split("}\n{").join("},{") + ']';
//         jsondata = JSON.parse(jsontext);
//         console.log('n to jsondata complete');
//     }catch(e){
//         try{
//             jsontext = '[' + filetext.split("}\r\n{").join("},{") + ']';
//             jsondata = JSON.parse(jsontext);
//             console.log('rn to jsondata complete');
//         }catch(e2){
//             throw e2;
//     }}
        
//     // jsondataのdbテーブル作成
//     let sql = 'create table "t-name" ("id"	INTEGER,"name"	TEXT NOT NULL,"count"	INTEGER NOT NULL,PRIMARY KEY("id" AUTOINCREMENT));'
//     console.log('a');
//     db.exec(sql);
//     console.log('b');
//     res.redirect('db/create_table');
//     console.log('c');
//   });
//   stream.on("error", (err)=>{console.log(err.message);});
// });