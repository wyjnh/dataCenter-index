// 保存位置信息事件
$("#chart_save").click(function(){
	var itemsInfo=[];
	var items=$("#drag_content>.drag_item");
	for(var i=0;i<items.length;i++){
		var info=getItemInfo(items[i]);
		itemsInfo.push(info);
	}
	$("#drag_item_info_arr").val("["+itemsInfo+"]");
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
	$(".drag_container").css("height",height+650)
})
$("#chart_smaller").click(function(){
	var height=$(".drag_container").height();
	if(height>650){
		$(".drag_container").css("height",height-650)
	}else{
		alert("已经是最小值！")
	}
})
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
		var dragItem=document.createElement("div");
		dragItem.id=saveData[i].id;
		if(saveData[i].type=="text"){
			//初始化文本框
			dragItem.className="drag_item text_type";
			dragItem.innerHTML='<div class="drag_item_header">'+
			'<input type="hidden" class="echart_data"/>'+
			'<div class="drag_item_move"></div>'+
			'<div class="drag_item_header_action_list">'+
			'<i class="fa fa-times close_btn" data-type="close" data-pid="' + saveData[i].id + '" aria-hidden="true"></i>'+
			'</div></div><div class="drag_item_box" id="'+saveData[i].id+'_div'+'"><textarea class="text_val"></textarea></div>';
			$("#drag_content").append(dragItem);
				console.log(saveData[i])
				$(dragItem).find(".text_val").val(saveData[i].title)
		}else{
			// 初始换echarts图形
			dragItem.className="drag_item chart_type1";
			dragItem.innerHTML='<div class="drag_item_header">'+
			'<input type="hidden" class="echart_data"/>'+
			'<div class="drag_item_move"></div>'+
			'<input class="title" value="'+saveData[i].id+'" disabled="disabled">'+
			'<div class="drag_item_header_action_list">'+
			'<i class="fa fa-window-minimize minsize_btn" data-type="min" data-pid="' + saveData[i].id + '" aria-hidden="true"></i>'+
			'<i class="fa fa-window-restore maxsize_btn" data-type="max" data-pid="' + saveData[i].id + '" aria-hidden="true"></i>'+
			'<i class="fa fa-times close_btn" data-type="close" data-pid="' + saveData[i].id + '" aria-hidden="true"></i>'+
			'</div></div><div class="drag_item_box" id="'+saveData[i].id+'_div'+'"></div>';
			$("#drag_content").append(dragItem);
			drawCharts(saveData[i].id+'_div',saveData[i].type);
		}
		
		$(dragItem).css({"height":saveData[i].height,"left":saveData[i].left,
						"top":saveData[i].top,"width":saveData[i].width,"position":"absolute"})
		updateChartInfo(dragItem);
		// 填充echarts信息
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