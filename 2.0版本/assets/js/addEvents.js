// 添加标题事件
function addTitlesEvent(grid){
    $("#add-maintitle-btn").click(function(){
        var el=drawTitlesBox("mainTitle",mainTitleNum)[0];
        var titleId=drawTitlesBox("mainTitle",mainTitleNum)[1]
        grid.addWidget(el, 0, 0, 12, 2, true);
        settingEvent(grid);
        itemsEvent(grid); //每个模块的事件
    });
    $("#add-secondtitle-btn").click(function(){
        var el=drawTitlesBox("secondTitle",secondTitleNum)[0];
        var titleId=drawTitlesBox("secondTitle",secondTitleNum)[1]
        grid.addWidget(el, 0, 0, 12, 2, true);
        settingEvent(grid);
        itemsEvent(grid); //每个模块的事件
    });
    $("#add-contenttitle-btn").click(function(){
        var el=drawTitlesBox("contentTitle",contentTitleNum)[0];
        var titleId=drawTitlesBox("contentTitle",contentTitleNum)[1]
        grid.addWidget(el, 0, 0, 12, 2, true);
        settingEvent(grid)
        itemsEvent(grid); //每个模块的事件
    });
}
// 组成标题盒子
function drawTitlesBox(type,num){
    var className="",text="";
    var Id=type+'-'+Date.parse(new Date());
    switch (type) {
        case "mainTitle":
            className="mainTitle";
            text="主标题";
            break;
        case "secondTitle":
            className="secondTitle";
            text="二级标题";
            break;
        case "contentTitle":
            className="contentTitle";
            text="正文";
            break;
        default :
            break;
    }
    // if(className=="contentTitle"){
        var el='<div class="grid-stack-item">'+
                '<div class="grid-stack-item-content '+className+'">'+
                '<div class="grid-stack-item-title" style="display:none"><input class="grid-stack-item-name" placeholder="请输入标题" value=""/></div>'+                    
                '<div class="'+className+'" id="'+Id+'">'+text+'</div>'+
                '<div class="shadow-bg ckeditor-shadow">'+
                '<div class="shadow-bg-title">'+
                    '<span class="shadow-close-btn">'+
                        '<i class="fa fa-trash-o" aria-hidden="true"></i>'+
                    '</span>'+
                '</div>'+
                '<div class="shadow-bg-content">双击编辑内容</div>'+
            '</div>'+
        '</div>'+
    '</div>';
    var data=[el,Id];
    return data;
};

// 添加图形事件
function addShapesEvent(grid){
    $("#add-squarediv-btn").click(function(){
        squareNum++;
        var el=drawShapesBox("squareShape",squareNum)[0];
        var squareId=drawShapesBox("squareShape",squareNum)[1]
        grid.addWidget(el, 0, 0, 3, 3, true);
        settingEvent(grid);
        itemsEvent(grid); //每个模块的事件
    })
    $("#add-cirdiv-btn").click(function(){
        cirNum++;
        var el=drawShapesBox("cirShape",squareNum)[0];
        var squareId=drawShapesBox("cirShape",squareNum)[1]
        grid.addWidget(el, 0, 0, 3, 3, true);
        settingEvent(grid);
        itemsEvent(grid); //每个模块的事件
    })
}
// 组成 图形 盒子
function drawShapesBox(type,num){
    // var shapeId=type+"-"+num,
    var shapeId=type+'-'+Date.parse(new Date());
    var className="";
    switch (type) {
        case "squareShape":
            className="squareShape";
            break;
        case "cirShape":
            className="cirShape"
            break;
        default :
            break;
    }
    
    var el= '<div class="grid-stack-item">'+
            '<div class="grid-stack-item-content shape-box">'+
            '<div style="display:none" class="grid-stack-item-title"><input class="grid-stack-item-name" placeholder="请输入标题" value=""/></div>'+                    
            '<div class="shape-box-content '+className+'" id="'+shapeId+'">输入文本</div>'+
            '<div class="shadow-bg">'+
            '<div class="shadow-bg-title">'+
                '<span class="shadow-close-btn">'+
                    '<i class="fa fa-trash-o" aria-hidden="true"></i>'+
                '</span>'+
            '</div>'+
            '<div class="shadow-bg-content">双击编辑内容</div>'+
            '</div>'+
            '</div>'+
            '</div>';
    var data=[el,shapeId];
    console.log(data)
    return data;
};
        
// 添加图标事件
function addEchartsEvent(grid){
    $("#add-barchart-btn").click(function(){
        var el=drawChartsBox("barChart")[0];
        var echartsId=drawChartsBox("barChart")[1]
        grid.addWidget(el, 0, 0, 12, 4, true);
        drawCharts(echartsId,"bar");
        settingEvent(grid);
        itemsEvent(grid); //每个模块的事件
    })
    $("#add-linechart-btn").click(function(){
        var el=drawChartsBox("lineChart")[0];
        var echartsId=drawChartsBox("lineChart")[1]
        console.log(el)
        console.log(echartsId)
        grid.addWidget(el, 0, 0, 12, 4, true);
        drawCharts(echartsId,"line");
        settingEvent(grid);
        itemsEvent(grid); //每个模块的事件
    })
    $("#add-scatterchart-btn").click(function(){
        var el=drawChartsBox("scatterChart")[0];
        var echartsId=drawChartsBox("scatterChart")[1]
        grid.addWidget(el, 0, 0, 12, 4, true);
        drawCharts(echartsId,"scatter");
        settingEvent(grid);
        itemsEvent(grid); //每个模块的事件
    })
}
// 组成图图表盒子
function drawChartsBox(type){
    // var chartId=type+"-"+num;
    var chartId=type+'-'+Date.parse(new Date());
    var barEl=' <div class="grid-stack-item">'+
                '<div class="grid-stack-item-content" >'+
                    '<div class="grid-stack-item-title"><input class="grid-stack-item-name" maxlength="15" placeholder="请输入标题" value="未命名"/></div>'+
                    '<div class="'+type+'" id="'+chartId+'" style="padding: 20px;width:100%;height: 90%;overflow: hidden;"></div>'+
                    '<div class="shadow-bg">'+
                        '<div class="shadow-bg-title">'+
                            '<span class="shadow-close-btn">'+
                                '<i class="fa fa-trash-o" aria-hidden="true"></i>'+
                            '</span>'+
                        '</div>'+
                        '<div class="shadow-bg-content">双击编辑内容</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
    var data=[barEl,chartId];
    console.log(data)
    return data;
};
// 导入echarts图表
function drawCharts(id,type){
    console.log("创建echarts图表类型："+type);
    console.log(id);
    var chart = echarts.init(document.getElementById(id));
    window.onresize = chart.resize;
    var option=setCharts(type);
    chart.setOption(option, true);
}
// 设置图标的参数
function setCharts(type){
    var data1=new Array();
    var data2=new Array();
    for(var i=0;i<20;i++){//525600
        data2[i]=Math.random()*10000;
        data1[i]=i+'日';
    }
    var option = {
        title:{
            show : true,
            text : "",
            link : "#",
            target: "blank",
        },
        legend:{
          show:true
        },
        toolbox:{
            feature:{
                saveAsImage:{
                    type:"jpeg",
                    name:"",
                    backgroundColor:"#fff",
                    show:true,
                    title:"保存为jpeg",
                },
                dataView:{
                    show: true ,
                    title: "数据视图" ,
                    readOnly: false ,
                    lang: ["数视图","close","update"],
                },
                restore:{
                    show:true,
                },
            }
        },
        xAxis: {
            type: 'category',
            data:data1
        },
        yAxis: {
            type: 'value'
        },
        animation:false,
        tooltip:{show:true,trigger: 'axis'},
        series: [{
            data:data2,
            type: type,
            name:'name',
        }]
    }; 
    return option;
}
