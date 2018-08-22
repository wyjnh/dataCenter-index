// var saveInfo="";
// 拖拽，拉伸事件
function drag(){
	$( ".drag_item" ).draggable({
		containment: "#drag_content",
		opacity:0.35,
		start: function() {
      	},
        drag: function(e) {
        },
        stop: function() {
        	// console.log(this);
        	updateChartInfo(this)
        },
    });
	$( ".drag_item" ).resizable({
      minHeight: 50,
      minWidth: 50,
      handles:"se,sw,nw,ne,n,e,s,w",
      start: function() {
      
      },
      resize:function(){

      },	
      stop: function() {
       	updateChartInfo(this)
       },
    });
}
drag();

// 点击添加柱形图表
var barChartNum=0;
var lineChartNum=0;
var scatterChartNum=0;
var textNum=0;

var addBarChart=document.getElementById("add_bar_chart");
var addLineChart=document.getElementById("add_line_chart");
var addScatterChart=document.getElementById("add_scatter_chart");
var addText=document.getElementById("add_text");

$(addBarChart).click(function(){createChart("bar")})
$(addLineChart).click(function(){createChart("line")})
$(addScatterChart).click(function(){createChart("scatter")})
$(addText).click(function(){createShape("text")})


dragShowChartsFn(addBarChart,"bar");
dragShowChartsFn(addLineChart,"line")
dragShowChartsFn(addScatterChart,"scatter")
dragShowChartsFn(addText,"text")

function dragShowChartsFn(obj,type){
	obj.ondragstart=function(){ // 拖拽开始
    // console.log('start');
	}
	      
	obj.ondragend=function(e){ // 当拖拽结束 ，清空temp
	    var x0=parseInt($("#drag_content").offset().left);
	    var y0=parseInt($("#drag_content").offset().top)
	    if(type=="text"){
	    	createShape(type,(e.clientX-x0),(e.clientY-y0))
	    }else{
			createChart(type,(e.clientX-x0),(e.clientY-y0));	
	    }
	}
}



// 创建echarts
function createChart(type,left,top){
	var chartNum;
	// var chartName;
	switch(type)
	{
	case 'bar':
	  barChartNum++;
	  chartNum="bar_chart_"+barChartNum;
	  // chartName="新柱形图"
	  break;
	case 'line':
	  lineChartNum++;
	  chartNum="line_chart_"+lineChartNum;
	  // chartName="新折线图"
	  break;
	case 'scatter':
	  scatterChartNum++;
	  chartNum="scatter_chart_"+scatterChartNum;
	  // chartName="新散点图"
	  break;
	default:
	  break;
	}
	var chartType1 = document.createElement("div");
	chartType1.id=chartNum;
	chartType1.className="drag_item chart_type1";
	chartType1.style.left=left+"px";
	chartType1.style.top=top+"px";
	chartType1.innerHTML='<div class="drag_item_header">'+
	'<input type="hidden" class="echart_data"/>'+
	'<div class="drag_item_move"></div>'+
	'<input class="title" value="'+chartNum+'" disabled="disabled">'+
	'<div class="drag_item_header_action_list">'+
	'<i class="fa fa-window-minimize minsize_btn" data-type="min" data-pid="' + chartNum + '" aria-hidden="true"></i>'+
	'<i class="fa fa-window-restore maxsize_btn" data-type="max" data-pid="' + chartNum + '" aria-hidden="true"></i>'+
	'<i class="fa fa-times close_btn" data-type="close" data-pid="' + chartNum + '" aria-hidden="true"></i>'+
	'</div></div><div class="drag_item_box" id="'+chartNum+'_div'+'"></div>';
	$("#drag_content").append(chartType1);
	updateChartInfo(chartType1);
	drag();
	bindEvent();
	drawCharts(chartNum+'_div',type);
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
            type: type,
        }]
    }; 
    return option;
}

// 获取一个chart的信息
function getItemInfo(obj){
	// console.log(typeof $(obj).find(".echart_data").val())
	return $(obj).find(".echart_data").val();
	// var dragContent=document.getElementById('drag_content');
	// var dragContentX=dragContent.offsetLeft;
	// var dragContentY=dragContent.offsetTop;
	// var objHtml=$(obj).find(".drag_item_header>input").val();
	// var className=obj.className.split(" ")[1];
	// var obj=obj.getBoundingClientRect();
	// var info={
	// 	"val":objHtml,
	// 	"type":className,
	// 	"width":obj.width,
	// 	"height":obj.height,
	// 	"left":obj.left-dragContentX,
	// 	"top":obj.top-dragContentY
	// };
	// return info;
}

// 图表时间列表
function bindEvent(){
	var $charPannel = $("#drag_content");
	$charPannel.off('click').on('click', 'i', function(){
		var type = $(this).attr('data-type'),
			pid = $(this).attr('data-pid');
		var $chart = $charPannel.find('#' + pid);
		switch(type){
			case 'min':

				var data = $chart.find(".echart_data").val();
				if(!data){
					alert("此图表已经是最小化！");
				}else{
					data=JSON.parse(data);
					$chart.css({"height":data.height,"width":data.width,"top":data.top,"left":data.left});
					echarts.getInstanceByDom($chart.find('.drag_item_box')[0]).resize();
					$(".drag_content > .drag_item").show();
				}

				break;
			case 'max':
				$chart.siblings('div').hide();
				$chart.css({"height": '100%',"width": '100%',"top": 0,"left": 0}).show();
				echarts.getInstanceByDom($chart.find('.drag_item_box')[0]).resize();
				// $chart.draggable("disable");
				break;
			case 'close': 
				$chart.empty().remove();
				break;
		}	
	});
}

// 创造形状
function createShape(type,left,top){
	var chartNum;
	var chartType1 = document.createElement("div");
	chartType1.style.background="inherit";
	chartType1.style.left=left+"px";
	chartType1.style.top=top+"px";
	// var chartName;
	switch(type)
	{
	case 'text':
	  textNum++;
	  chartNum="text_shape_"+barChartNum;
	  chartType1.id=chartNum;
	  chartType1.className="drag_item text_type";
	  chartType1.innerHTML='<div class="drag_item_header">'+
	'<input type="hidden" class="echart_data"/>'+
	'<div class="drag_item_move"></div>'+
	'<div class="drag_item_header_action_list">'+
	'<i class="fa fa-times close_btn" data-type="close" data-pid="' + chartNum + '" aria-hidden="true"></i>'+
	'</div></div><div class="drag_item_box" id="'+chartNum+'_div'+'"><textarea class="text_val"></textarea></div>';
	  break;
	default:
	  break;
	}
	$("#drag_content").append(chartType1);
	$(chartType1).find(".text_val").change(function(){
		updateChartInfo(chartType1);
	})
	updateChartInfo(chartType1);
	drag();
	bindEvent();
}



// 更新图表信息
function updateChartInfo(obj){
	console.log('update')
	console.log(obj)
	var data={};
	data.type = $(obj).attr("id").split("_")[0];
	data.id = $(obj).attr("id");
	if(data.type=="text"){
		console.log($(obj).find(".text_val").val())
		data.title=$(obj).find(".text_val").val();
	}else{
		data.title = $(obj).find(".title").val();
	}
	data.height = $(obj).height();
	data.width = $(obj).width();
	data.top = $(obj).css("top");
	data.left = $(obj).css("left");
	data.bottom = $(obj).css("bottom");
	// console.log(data)
	$(obj).find(".echart_data").val(JSON.stringify(data));
}

