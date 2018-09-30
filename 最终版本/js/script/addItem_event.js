// 创建echarts
$("#creat_bar_chart_type1").click(function () {
    var el=drawChartsBox("bar")[0];
    var echartsId=drawChartsBox("bar")[1];
    grid.addWidget(el, 0, 0, 12, 4, true);
    drawCharts(echartsId,"bar");
    itemsFn();
});
$("#creat_line_chart_type1").click(function () {
    var el=drawChartsBox("line")[0];
    var echartsId=drawChartsBox("line")[1];
    grid.addWidget(el, 0, 0, 12, 4, true);
    drawCharts(echartsId,"line");
    itemsFn();
});
$("#creat_scatter_chart_type1").click(function () {
    var el=drawChartsBox("scatter")[0];
    var echartsId=drawChartsBox("scatter")[1]
    grid.addWidget(el, 0, 0, 12, 4, true);
    drawCharts(echartsId,"scatter");
    itemsFn();
});

// 创建标题
$("#creat_main_title").click(function () {
    var el=drawTitlesBox("main_title")[0];
    var titleId=drawTitlesBox("main_title")[1]
    grid.addWidget(el, 0, 0, 12, 2, true);
    itemsFn();
});
$("#creat_p_title").click(function () {
    var el=drawTitlesBox("p_title")[0];
    var titleId=drawTitlesBox("p_title")[1]
    grid.addWidget(el, 0, 0, 12, 2, true);
    itemsFn();
});

// 创建图片
$("#submit_pic_btn").click(function () {
    $("#add_pic_file").click();
});
$("#add_pic_file").change(function () {
    var src=document.getElementById('add_pic_file').files[0];
    console.log(src);
    var el=drawPicsBox("pic",src)[0];
    var titleId=drawPicsBox("pic",src)[1]
    grid.addWidget(el, 0, 0, 4, 4, true);
    itemsFn();
})

// 组成图片盒子
function drawPicsBox(type,src){
    var className="",text="";
    var Id=type+'_title_'+Date.parse(new Date());
    var el='<div class="grid-stack-item" onmouseenter="showShadow(this)" onmouseleave="hideShadow(this)">' +
        '            <div class="grid-stack-item-content dashed-border">' +
        '                <img class="grid-stack-item-img grid-stack-item-val'+className+'" src="'+window.URL.createObjectURL(src)+'" id="'+Id+'">'+
        '                <div class="grid-stack-item-shadow">'+
        '                    <div class="shadow-bg-title">'+
        '                            <span class="shadow-nav-btn">' +
        '                                <i class="fa fa-navicon" aria-hidden="true" onclick="shadowNavClickFn(this)"></i>' +
        '                            </span>'+
        '                            <span class="shadow-close-btn">'+
        '                                <i class="fa fa-trash-o" aria-hidden="true" onclick="shadowDeleteFn(this)" ></i>'+
        '                            </span>'+
        '                    </div>'+
        '                    <div class="shadow-bg-content">'+
        '                        双击编辑内容'+
        '                    </div>'+
        '                </div>'+
        '                   <input type="hidden" class="grid-stack-item-indexnum">' +
        '                   <input type="hidden" class="grid-stack-item-indexbool">'+
        '            </div>'+
        '        </div>';
    var data=[el,Id];
    return data;
};
// 组成标题盒子
function drawTitlesBox(type){
    var className="",text="";
    var Id=type+'_'+Date.parse(new Date());
    switch (type) {
        case "main_title":
            className="main-title";
            text="主标题";
            break;
        case "p_title":
            className="p-title";
            text="段落";
            break;
        default :
            break;
    }
    var el='<div class="grid-stack-item" onmouseenter="showShadow(this)" onmouseleave="hideShadow(this)">' +
        '            <div class="grid-stack-item-content dashed-border">' +
        '                <div class="grid-stack-item-val item-txt '+className+'" id="'+Id+'">'+text+
        '                </div>' +
        '                <div class="grid-stack-item-shadow">'+
        '                    <div class="shadow-bg-title">'+
        '                            <span class="shadow-nav-btn">' +
        '                                <i class="fa fa-navicon" aria-hidden="true" onclick="shadowNavClickFn(this)"></i>' +
        '                            </span>'+
        '                            <span class="shadow-close-btn">'+
        '                                <i class="fa fa-trash-o" aria-hidden="true" onclick="shadowDeleteFn(this)"></i>'+
        '                            </span>'+
        '                    </div>'+
        '                    <div class="shadow-bg-content">'+
        '                        双击编辑内容'+
        '                    </div>'+
        '                </div>'+
        '                   <input type="hidden" class="grid-stack-item-indexnum">' +
        '                   <input type="hidden" class="grid-stack-item-indexbool">'+
        '            </div>'+
        '        </div>';
    var data=[el,Id];
    return data;
};
// 组成图图表盒子
function drawChartsBox(type){
    var chartId=type+'_chart_'+Date.parse(new Date());
    var barEl='  <div class="grid-stack-item" onmouseenter="showShadow(this)" onmouseleave="hideShadow(this)">' +
        '            <div class="grid-stack-item-content dashed-border">\n' +
        '                <div class="grid-stack-item-val '+type+'Chart" id="'+chartId+'"></div>'+
        '                <div class="grid-stack-item-shadow">' +
        '                    <div class="shadow-bg-title">'+
        '                            <span class="shadow-nav-btn">' +
        '                                <i class="fa fa-navicon" aria-hidden="true" onclick="shadowNavClickFn(this)"></i>' +
        '                            </span>'+
        '                            <span class="shadow-close-btn">'+
        '                                <i class="fa fa-trash-o" aria-hidden="true" onclick="shadowDeleteFn(this)"></i>'+
        '                            </span>'+
        '                    </div>'+
        '                    <div class="shadow-bg-content">'+
        '                        双击编辑内容'+
        '                    </div>'+
        '                </div>'+
        '                   <div class="grid-stack-item-name">未命名</div>'+
        '                   <input type="hidden" class="grid-stack-item-indexnum">' +
        '                   <input type="hidden" class="grid-stack-item-indexbool">'+
        '            </div>'+
        '        </div>';
    var data=[barEl,chartId];
    return data;
};

// 导入echarts图表
function drawCharts(id,type){
    var chart = echarts.init(document.getElementById(id));
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