var express = require('express');
var router = express.Router();

const fs = require('fs');

let latestday = 'bed_210915';


router.get('/data/scatterplot', function(req, res, next) {
  const f1 = fs.readFileSync('./datas/vaccine.json');
  let vaccine_text = (f1.toString());
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
  const f1 = fs.readFileSync('./datas/vaccine.json');
  let vaccine_text = (f1.toString());
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













module.exports = router;
