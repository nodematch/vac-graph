var express = require('express');
var router = express.Router();

const fs = require('fs');

let latestday = 'bed_210915';


router.get('/data/scatterplot', function(req, res, next) {
  let vaccine_text = ndjson_to_text('./datas/prefecture.ndjson');
  const f2 = fs.readFileSync('./datas/population.json');
  let population_text = (f2.toString());
  const f3 = fs.readFileSync('./datas/bed_series.json');
  let bedseries_text = (f3.toString());

  let opt = {
    title: '散布図',
    latestday: latestday,
    datatext1: vaccine_text,
    datatext2: population_text,
    datatext3: bedseries_text,
  };
  res.render('data/scatterplot', opt);
});


router.get('/data/prefecture', function(req, res, next) {
  let vaccine_text = ndjson_to_text('./datas/prefecture.ndjson');
  const f2 = fs.readFileSync('./datas/population.json');
  let population_text = (f2.toString());
  //let p_number = req.query.p_number;

  let opt = {
    title: '県別　ワクチン状況',
    latestday: latestday,
    datatext1: vaccine_text,
    datatext2: population_text,
  };
  res.render('data/prefecture', opt);
});


router.get('/data/beddata', function(req, res, next) {
  const f3 = fs.readFileSync('./datas/bed_series.json');
  let bedseries_text = (f3.toString());
  //let p_number = req.query.p_number;

  let opt = {
    title: '県別　療養者状況',
    latestday: latestday,
    datatext1: bedseries_text,
  };
  res.render('data/beddata', opt);
});




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








module.exports = router;
