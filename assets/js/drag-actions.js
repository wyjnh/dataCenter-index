// 保存位置信息事件
$("#chart_save").click(function(){
	var itemsInfo={};
	var chartsM=[];
	console.log($("#drag_content").attr("class"));
	itemsInfo.chartGrid=($("#drag_content").hasClass("drag_content_grid")) ? true : false;
	var items=$("#drag_content>.drag_item");
	for(var i=0;i<items.length;i++){
		var info=$(items[i]).find(".echart_data").val();
		chartsM.push(info);
	}
	itemsInfo.chartsInfo=chartsM;
	console.log(itemsInfo);
	$("#drag_item_info_arr").val(JSON.stringify(itemsInfo));
	alert("保存成功");
})
// 初始化历史记录
$("#chart_return").click(function(){
	initFn();
});
// 切换网格背景
$("#chart_grid").click(function(){
	$(".drag_content").toggleClass("drag_content_grid");
})

// 添加区域位置
$("#chart_bigger").click(function(){
	var height=$(".drag_container").height();
	$(".drag_container").css("height",height+600)
})
$("#chart_smaller").click(function(){
	var height=$(".drag_container").height();
	if(height-600>600){
		$(".drag_container").css("height",height-600);
	}else if(height-600<600&&height>600){
		$(".drag_container").css("height",600);
	}else{
		alert("已经是最小值！")
	}
})
// 初始化页面
function initFn(){
	var saveData=$("#drag_item_info_arr").val();
	saveData=JSON.parse(saveData);
	if(saveData.chartsInfo==""){
		alert("无保存信息");
		return;
	}
	// 网格状态载入
	if(saveData.chartGrid){
		$("#drag_content").addClass("drag_content_grid");
	}else{
		$("#drag_content").removeClass("drag_content_grid");
	}
	// 图形信息载入
	var chartsInfo=saveData.chartsInfo;
	$("#drag_content").html("");
	for (var i = 0; i < chartsInfo.length; i++) {
		chartsInfo[i]=JSON.parse(chartsInfo[i])
		var dragItem=document.createElement("div");
		dragItem.id=chartsInfo[i].id;

		if(chartsInfo[i].type=="text"){
			//初始化文本框
			dragItem.className="drag_item text_type";
			dragItem.innerHTML='<div class="drag_item_header">'+
			'<input type="hidden" class="echart_data"/>'+
			'<div class="drag_item_move"></div>'+
			'<div class="drag_item_header_action_list">'+
			
			'<i class="fa fa-times close_btn" data-type="close" data-pid="' + chartsInfo[i].id + '" aria-hidden="true"></i>'+
			'<i class="fa fa-repeat rotate_btn" data-type="rotate" data-pid="' + chartsInfo[i].id + '" aria-hidden="true"></i>'+
			'</div></div><div class="drag_item_box" id="'+chartsInfo[i].id+'_div'+'"><textarea placeholder="请填写" class="text_val"></textarea></div>';
			$("#drag_content").append(dragItem);
				console.log(chartsInfo[i])
				$(dragItem).find(".text_val").val(chartsInfo[i].title)
		}else{
			// 初始换echarts图形
			dragItem.className="drag_item chart_type1";
			dragItem.innerHTML='<div class="drag_item_header">'+
			'<input type="hidden" class="echart_data"/>'+
			'<div class="drag_item_move"></div>'+
			'<input class="title" value="'+chartsInfo[i].id+'" disabled="disabled">'+
			'<div class="drag_item_header_action_list">'+
			'<i class="fa fa-window-minimize minsize_btn" data-type="min" data-pid="' + chartsInfo[i].id + '" aria-hidden="true"></i>'+
			'<i class="fa fa-window-restore maxsize_btn" data-type="max" data-pid="' + chartsInfo[i].id + '" aria-hidden="true"></i>'+
			'<i class="fa fa-times close_btn" data-type="close" data-pid="' + chartsInfo[i].id + '" aria-hidden="true"></i>'+
			'</div></div><div class="drag_item_box" id="'+chartsInfo[i].id+'_div'+'"></div>';
			$("#drag_content").append(dragItem);
			drawCharts(chartsInfo[i].id+'_div',chartsInfo[i].type);
		}
		
		$(dragItem).css({"height":chartsInfo[i].height,"left":chartsInfo[i].left,
						"top":chartsInfo[i].top,"width":chartsInfo[i].width,"position":"relative"})
		updateChartInfo(dragItem);
	}
	drag();
	bindEvent();
};

// 鼠标右键功能
window.oncontextmenu=function(e){
	//取消默认的浏览器自带右键 很重要！！
	e.preventDefault();
	console.log(e.target)
	if($(e.target).hasClass("drag_item_move")){
		console.log("d")
	}

}