//原本json を [{x:num(date), y:num}, ..] へ変換
function d_summarize_xy(da){
    let d2D =[ {x:da[0]["date"], y:0} ];
    $.each(da, function(idx,obj){
        if (obj["date"] == d2D[d2D.length-1].x){
            d2D[d2D.length-1].y += obj["count"];
        }else{
            d2D.push({x:obj["date"], y:obj["count"]});
        }
    })
    let d2Dstu = [{x:d2D[0].x, y:d2D[0].y}];
    for(let i=1; i<d2D.length; i++){
        d2Dstu.push({x : d2D[i].x, y: d2Dstu[i-1].y + d2D[i].y});
    }
    return {count : d2D, stuck : d2Dstu};
}


//グラフ作成1
function drawgraph1(d,where){
    let select1 = $.grep(d, function(obj){return obj.status==1});
    let select2 = $.grep(d, function(obj){return obj.status==2});
    let d1 = d_summarize_xy(select1);
    let d2 = d_summarize_xy(select2);

    let datas = {
        label: ['-14', '15-64 & male', '15-64 & female', '65- & male', '65- & female'],
        datasets: [{
            label: '人口',
            data: [],
            backgroundColor: "rgba(250, 50, 50, 0.3)",
            borderColor: "rgba(200, 50, 50, 0.3)",
        },{
            label:'2回目',
            data:d2.stuck,
            backgroundColor: "rgba(50, 50, 250, 0.3)",
            borderColor: "rgba(50, 50, 200, 0.3)",
        }]
    };
    
    let opt = {
        title:{text:'ワクチン接種推移', display:true},
        scaleOverride : true,  animation : false,  showTooltips: false,  pointDot : false,  bezierCurve : false,
        legend: {display: true, align: 'start',position: 'right',},
        scales: {
            xAxes: [{
                scaleLabel: {display: true, labelString: '年月日'},
                type: 'time',
                time: {parser: 'YYYY-MM-DD', unit: 'day', stepSize: 1, displayFormats: {'hour': 'MM-DD'}},
                ticks: {min: '2021-04-01'}
            }],
            yAxes: [{
                scaleLabel: {display: true, labelString: '接種人数'},
                ticks: { min:0, callback: function(value, index, values){return  value +  '人'}}
            }]
        }
    };
    let d_graph = new Chart(where, {
        data:datas, 
        type:'line', 
        options:opt
    });
}




//グラフ作成2
function drawgraph2(d,where,key,val){
    let select = $.grep(d, function(obj){return obj.status==2});
    let titletext = 'ワクチン接種ペース(全人口)';
    if (key != 'all'){
        select = $.grep(select, function(obj){return obj[key]==val});
        titletext = 'ワクチン接種ペース(' + key + ': ' + val +')';
    }

    let data = d_summarize_xy(select);
    
    let d2_stuck_per = [];
    $.each(data.count, function(idx,obj){
        d2_stuck_per.push({x:obj.x, y:obj.y/population["00"]["sum"]*100});
    })
    
    let datas2 = {
        datasets: [{
            label:'2回目人数',
            data:data.stuck,
            backgroundColor: "rgba(250, 50, 50, 0.3)",
            borderColor: "rgba(200, 50, 50, 0.3)",
            yAxisID: "y-1",
        },{
            label:'2回目ペース',
            data:d2_stuck_per,                
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "rgba(50, 50, 200, 0.3)",
            pointBorderColor:"rgba(0, 0, 0, 0)",                
            pointBackgroundColor:"rgba(0, 0, 0, 0)",
            yAxisID: "y-2",
        }]
    };
            
    let opt2 = {      
        title:{text:titletext, display:true},
        scaleOverride : true,  animation : false,  showTooltips: false,  pointDot : false,  bezierCurve : false,
        legend: {display: true, align: 'start',position: 'top',},
        scales: {
            xAxes: [{       
                scaleLabel: {display: true, labelString: '年月日'},   
                type: 'time',
                time: {parser: 'YYYY-MM-DD', unit: 'day', stepSize: 1, displayFormats: {'hour': 'MM-DD'}},
                ticks: {min: '2021-04-01'}
            }],
            yAxes: [{
                id: "y-1",
                position: "left", 
                scaleLabel: {display: true, labelString: '接種人数'},
                ticks: { min:0, callback: function(value, index, values){return  value +  '人'}}
            },{
                id: "y-2",
                position: "right", 
                scaleLabel: {display: true, labelString: '接種ペース'},
                ticks: { min:0, max:1, callback: function(value, index, values){return  value +  '%'}}
            }]
        }
    };
            
    let d_graph2 = new Chart(where, {
        data:datas2, 
        type:'line', 
        options:opt2
        });
}

