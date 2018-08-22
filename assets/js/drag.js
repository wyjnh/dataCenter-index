// var saveInfo="";
// 拖拽，拉伸事件
function drag(){
	$( ".drag_item" ).draggable({
		containment: "#drag_content",
		start: function() {
      
      	},
        drag: function(e) {
        
        },
        stop: function() {
        	console.log(this);
        	updateChartInfo(this)
        },
    });
	$( ".drag_item" ).resizable({
      minHeight: 50,
      minWidth: 50,
      handles:"n, e, s, w",
      start: function() {
      
      	},
      resize:function(){

      },	
      stop: function() {
      	// console.log(this);
       	updateChartInfo(this)
       },
    });
}
drag();
// 点击添加柱形图表
var barChartNum=0;
var lineChartNum=0;
var scatterChartNum=0;
$("#add_bar_chart").mousedown(function(){
	$("#drag_content").mousemove(function(){
		console.log("move")

	})
	$("#drag_content").mouseup(function(){
			console.log("up");
			$("#drag_content").unbind("mousemove");
		})
})
// $("#add_bar_chart").mouseup(function(){
// 	createChart('bar');	
// })
$("#add_line_chart").click(function(){
	createChart('line');	
})
$("#add_scatter_chart").click(function(){
	createChart('scatter');	
})
// 保存位置信息事件
$("#chart_save").click(function(){
	var itemsInfo=[];
	var items=$("#drag_content>.drag_item");
	for(var i=0;i<items.length;i++){
		var info=getItemInfo(items[i]);
		itemsInfo.push(info);
	}
	// saveInfo=JSON.stringify(itemsInfo);
	// console.log(itemsInfo)
	$("#drag_item_info_arr").val("["+itemsInfo+"]");
	alert("保存成功");
})
// 初始化历史记录
$("#chart_return").click(function(){
	initFn();
});
// 添加区域位置
$("#chart_bigger").click(function(){
	var height=$(".drag_container").height();
	$(".drag_container").css("height",height+50)
})
$("#chart_smaller").click(function(){
	var height=$(".drag_container").height();
	if(height>=600){
		$(".drag_container").css("height",height-50)
	}else{
		alert("已经是最小值！")
	}
})

// 创建echarts
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
	var chartType1 = document.createElement("div");
	chartType1.id=chartNum;
	chartType1.className="drag_item chart_type1";
	chartType1.innerHTML='<div class="drag_item_header">'+
	'<input type="hidden" class="echart_data"/>'+
	'<div class="drag_item_move"></div>'+
	'<input class="title" value="'+chartName+'">'+
	'<div class="drag_item_header_action_list">'+
	'<i class="fa fa-minus-square-o minsize_btn" data-type="min" data-pid="' + chartNum + '" aria-hidden="true"></i>'+
	'<i class="fa fa-plus-square-o maxsize_btn" data-type="max" data-pid="' + chartNum + '" aria-hidden="true"></i>'+
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

// 初始化页面
function initFn(){
	var saveData=$("#drag_item_info_arr").val();
	console.log(saveData)
	console.log(typeof saveData)
	if(saveData==""){
		alert("无保存信息");
		return;
	}
	saveData=JSON.parse(saveData);
	// console.log(saveData)
	$("#drag_content").html("");
	for (var i = 0; i < saveData.length; i++) {
		// saveData[i]=JSON.parse(saveData[i]);
		console.log(typeof saveData[i])
		var dragItem=document.createElement("div");
		dragItem.className="drag_item chart_type1";
		dragItem.id=saveData[i].id;
		dragItem.innerHTML='<div class="drag_item_header">'+
		'<input type="hidden" class="echart_data"/>'+
		'<div class="drag_item_move"></div>'+
		'<input class="title" value="'+saveData[i].title+'">'+
		'<div class="drag_item_header_action_list">'+
		'<i class="fa fa-minus-square-o minsize_btn" data-type="min" data-pid="' + saveData[i].id + '" aria-hidden="true"></i>'+
		'<i class="fa fa-plus-square-o maxsize_btn" data-type="max" data-pid="' + saveData[i].id + '" aria-hidden="true"></i>'+
		'<i class="fa fa-times close_btn" data-type="close" data-pid="' + saveData[i].id + '" aria-hidden="true"></i>'+
		'</div></div><div class="drag_item_box" id="'+saveData[i].id+'_div'+'"></div>';
		$(dragItem).css({"height":saveData[i].height,"left":saveData[i].left,
						"top":saveData[i].top,"width":saveData[i].width,"position":"absolute"})
		$("#drag_content").append(dragItem);

		// 填充echarts信息
		drawCharts(saveData[i].id+'_div',saveData[i].type);
	}
	drag();
	bindEvent();
};


// 更新图表信息
function updateChartInfo(obj){
	var data={}
	data.type=$(obj).attr("id").split("_")[0];
	data.id=$(obj).attr("id");
	data.title=$(obj).find(".title").val();
	data.height=$(obj).height();
	data.width=$(obj).width();
	data.top=$(obj).css("top");
	data.left=$(obj).css("left");
	console.log(data)
	$(obj).find(".echart_data").val(JSON.stringify(data));
}