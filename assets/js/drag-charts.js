// 拖拽，拉伸图表事件
function drag(){
	// 排序拖拽
	$( "#drag_content" ).sortable();
	$( "#drag_content" ).disableSelection();
	// 拉伸
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

// 创建echarts容器
function createChart(type,left,top){
	var chartId;
	switch(type)
	{
		case 'bar':
		barChartNum++;
		chartId="bar_chart_"+barChartNum;
		break;
		case 'line':
		lineChartNum++;
		chartId="line_chart_"+lineChartNum;
		break;
		case 'scatter':
		scatterChartNum++;
		chartId="scatter_chart_"+scatterChartNum;
		break;
		default:
		break;
	}
	var chartType1 = document.createElement("div");
	chartType1.id=chartId;
	chartType1.className="drag_item chart_type1";
	chartType1.innerHTML='<div class="drag_item_header">'+
	'<input type="hidden" class="echart_data"/>'+
	'<div class="drag_item_move"></div>'+
	'<input class="title" value="'+chartId+'" disabled="disabled">'+
	'<div class="drag_item_header_action_list">'+
	'<i class="fa fa-window-minimize minsize_btn" data-type="min" data-pid="' + chartId + '" aria-hidden="true"></i>'+
	'<i class="fa fa-window-restore maxsize_btn" data-type="max" data-pid="' + chartId + '" aria-hidden="true"></i>'+
	'<i class="fa fa-times close_btn" data-type="close" data-pid="' + chartId + '" aria-hidden="true"></i>'+
	'</div></div><div class="drag_item_box" id="'+chartId+'_div'+'"></div>';
	$("#drag_content").append(chartType1);
	updateChartInfo(chartType1);
	drag();
	bindEvent();
	drawCharts(chartId+'_div',type);
}
// 导入echarts图表
function drawCharts(id,type){
	console.log("创建echarts图表类型："+type);
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
		title:{
			show : true,
			text : "标题",
			link : "#",
			target: "blank",
		},
		toolbox:{
			feature:{
				saveAsImage:{
					type:"jpeg",
					name:"wang",
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
				// dataZoom:{
				// 	show : true,
				// }
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
        }]
    }; 
    return option;
}
// 图表事件
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
				break;
			case 'close': 
				$chart.empty().remove();
				break;
			default:
				break;
		}	
	});
}

// 创造其他图形容器
function createShape(type,left,top){
	var chartId;
	var chartType1 = document.createElement("div");
	chartType1.style.background="inherit";
	// chartType1.style.left=left+"px";
	// chartType1.style.top=top+"px";
	switch(type)
	{
		case 'text':
			textNum++;
			chartId="text_shape_"+textNum;
			chartType1.id=textNum;
			chartType1.className="drag_item text_type";
			chartType1.innerHTML='<div class="drag_item_header">'+
			'<input type="hidden" class="echart_data"/>'+
			'<div class="drag_item_move"></div>'+
			'<div class="drag_item_header_action_list">'+
			'<i class="fa fa-times close_btn" data-type="close" data-pid="' + textNum + '" aria-hidden="true"></i>'+
			'<i class="fa fa-repeat rotate_btn" data-type="rotate" data-pid="' + textNum + '" aria-hidden="true"></i>'+
			'</div></div><div class="drag_item_box" id="'+textNum+'_div'+'"><textarea placeholder="请填写" class="text_val"></textarea></div>';
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
	// console.log(obj)
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

// 拖拽图形生成事件--已删除
// dragShowChartsFn(addBarChart,"bar");
// dragShowChartsFn(addLineChart,"line")
// dragShowChartsFn(addScatterChart,"scatter")
// dragShowChartsFn(addText,"text")

// function dragShowChartsFn(obj,type){
// 	obj.ondragstart=function(){ // 拖拽开始

// 	}
	      
// 	obj.ondragend=function(e){ // 当拖拽结束 ，清空temp
// 	    var x0=parseInt($("#drag_content").offset().left);
// 	    var y0=parseInt($("#drag_content").offset().top)
// 	    if(type=="text"){
// 	    	createShape(type,(e.clientX-x0),(e.clientY-y0))
// 	    }else{
// 			createChart(type,(e.clientX-x0),(e.clientY-y0));	
// 	    }
// 	}
// }