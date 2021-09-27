var https = require('https');
var fs = require('fs');
var zlib = require('zlib');
var ndjson = require('ndjson');
var url = 'https://vrs-data.cio.go.jp/vaccination/opendata/latest/prefecture.ndjson';
var outndjdsonfile = './datas/vaccinedownload.ndjson';
var outjsonfile = './datas/vaccine.json';
const options ={headers: {'Content-Type': 'application/x-ndjson; charset=UTF-8', 'Content-Encoding':'gzip'}}
let jsond = []; 

exports.updatevac = function(){
    new Promise(function(resolve, reject){
        var req = https.get(url, options, function (res) {
            res.pipe(zlib.createGunzip()).pipe(fs.createWriteStream(outndjdsonfile));
            //res.pipe(zlib.createGzip())..pipe(fs.createWriteStream(outndjdsonfile + '.gz'));
            res.on('end', function () {
                resolve ('File succesfully downloaded');
            })
        });
        req.on('error', function (err) {
            console.log('Error: ', err); return;
        });
    })
    .then(function(val){
        console.log(val);
        fs.createReadStream(outndjdsonfile)
        .pipe(ndjson.parse())
        .on('data', function(obj) {
            jsond.push(obj);
        })
        .on('end', function(){
            console.log('complete');
            let msg = JSON.stringify(jsond);
            fs.writeFile(outjsonfile, msg, (err)=>{
                console.log("save");
            });
        })
    });
}

