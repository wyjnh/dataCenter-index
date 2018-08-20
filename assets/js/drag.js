var saveInfo="";
// 拖拽，拉伸事件
function drag(){
	$( ".drag_item" ).draggable({
		containment: "#drag_content",
		start: function() {
      
      	},
        drag: function(e) {
          var dragContent=document.getElementById('drag_content');
          if(parseInt(e.target.style.top)+parseInt(e.target.clientHeight)+10>=parseInt(dragContent.clientHeight)){
          	var h=parseInt($(".drag_container").height())+50+"px";
          	$(".drag_container").css("height",h)
          }
        },
        stop: function() {
        
        },
    });
	$( ".drag_item" ).resizable({
      minHeight: 50,
      minWidth: 50,
      handles:"n, e, s, w" });
}
drag();
// 点击添加柱形图表
var barChartNum=0;
var lineChartNum=0;
var scatterChartNum=0;
$("#add_bar_chart").click(function(){
	createChart('bar');	
})

$("#add_line_chart").click(function(){
	createChart('line');	
})
$("#add_scatter_chart").click(function(){
	createChart('scatter');	
})
function createChart(type){
	var chartNum,chartName;
	switch(type)
	{
	case 'bar':
	  barChartNum++;
	  chartNum="bar_chart_"+barChartNum;
	  chartName="新柱形图"
	  break;
	case 'line':
	  lineChartNum++;
	  chartNum="line_chart_"+lineChartNum;
	  chartName="新折线图"
	  break;
	case 'scatter':
	  scatterChartNum++;
	  chartNum="scatter_chart_"+scatterChartNum;
	  chartName="新散点图"
	  break;
	default:
	  break;
	}

	var chartType1=document.createElement("div");
	chartType1.className="drag_item chart_type1";
	chartType1.innerHTML='<div class="drag_item_header"><div class="drag_item_move"></div>'+
	'<input value="'+chartName+'"></div>'+
	'<div class="close_btn" style="display: none;"><i class="fa fa-minus-circle" aria-hidden="true"></i></div>'+
	'<div class="drag_item_box" id="'+chartNum+'"></div>';
	$("#drag_content").append(chartType1);
	$(".close_btn").hide();
	drag();
	deleteFn();
	drawCharts(chartNum,type)
}
// 导入echarts图表
function drawCharts(id,type){
	var chart = echarts.init(document.getElementById(id));
    window.onresize = chart.resize;
    var option=setCharts(type);
    chart.setOption(option,true);
}
// 设置图标的参数
function setCharts(type){
    var myChart_1;
    var data1=new Array();
    var data2=new Array();
    for(var i=0;i<20;i++){//525600
    data2[i]=Math.random()*10000;
    data1[i]='xt'+i;
    }
    var option = {
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
            // type: 'bar',
            // type: 'line',
            type: type,
            // type: 'scatter',
        }]
    }; 
    return option;
}

// 保存位置信息事件
$("#chart_save").click(function(){
	var itemsInfo=[];
	var items=$("#drag_content>.drag_item");
	for(var i=0;i<items.length;i++){
		var info=getItemInfo(items[i]);
		itemsInfo.push(info);
	}
	// console.log(itemsInfo);
	saveInfo=JSON.stringify(itemsInfo);
	console.log("saveInfo")
	console.log(saveInfo)
	$("#drag_item_info_arr").val(JSON.stringify(itemsInfo));
})
// 获取一个chart的信息
function getItemInfo(obj){
	var dragContent=document.getElementById('drag_content');
	var dragContentX=dragContent.offsetLeft;
	var dragContentY=dragContent.offsetTop;
	var objHtml=$(obj).find(".drag_item_header>input").val();
	var className=obj.className.split(" ")[1];
	var obj=obj.getBoundingClientRect();
	var info={
		"val":objHtml,
		"type":className,
		"width":obj.width,
		"height":obj.height,
		"left":obj.left-dragContentX,
		"top":obj.top-dragContentY
	};
	return info;
}

// 删除表格
var showDelete=false;
$("#chart_delete").click(function(){
	// console.log(showDelete)
	showDelete=!showDelete;
	if(showDelete){
		$(".close_btn").show();
		deleteFn();
	}else{
		$(".close_btn").hide();
	}
})
function deleteFn(){
	$(".close_btn").click(function(e){
		$(this).parent().remove();
	})
}

// 初始化页面
function initFn(){
	var saveData=saveInfo;
	if(saveData==""){
		alert("无保存信息");
		return;
	}
	saveData=JSON.parse(saveData);
	console.log(saveData);
	$("#drag_content").html("");
	for (var i = 0; i < saveData.length; i++) {
		var dragItem=document.createElement("div");
		dragItem.className="drag_item";
		$(dragItem).addClass(saveData[i].type);
		$(dragItem).css({"height":saveData[i].height,"left":saveData[i].left,
						"top":saveData[i].top,"width":saveData[i].width,"position":"absolute"})
		dragItem.innerHTML='<div class="drag_item_move"></div><div class="close_btn" style="display:none"><i class="fa fa-minus-circle" aria-hidden="true"></i></div><div class="drag_item_box"><input value="'+saveData[i].val+'">';
		$("#drag_content").append(dragItem);
	}
	drag();
	deleteFn();
};
$("#chart_return").click(function(){
	initFn();
});
