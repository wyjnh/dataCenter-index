var saveInfo="";
// 拖拽事件
function drag(){
	// var dragItem=document.getElementsByClassName('drag_item_move');
	 $( ".drag_item" ).draggable();
	  $( ".drag_item" ).resizable();
	// for (var i = 0; i < dragItem.length; i++) {
		// dragFunction(dragItem[i]);
	// }
}
drag();
// item拖拽跟随事件
function dragFunction(item) {
	var dragContent=document.getElementById('drag_content');
	item.onmousedown=function() {
		dragContent.onmousemove=function(e){
			var mouseX=e.clientX,mouseY=e.clientY;
			var dragContentX=dragContent.offsetLeft;
			var dragContentY=dragContent.offsetTop;
			$("#wInfox").html(parseInt(mouseX-dragContentX)+"px"+","+parseInt(mouseY-dragContentY)+"px");
			var dragdiv=item.parentNode;
			dragdiv.style.left=parseInt(mouseX-dragContentX-10)+"px";
			dragdiv.style.top=parseInt(mouseY-dragContentY-10)+"px";
			$("#wInfoy").html(dragdiv.style.left+","+dragdiv.style.top);
		}
		item.onmouseup=function(){
			dragContent.onmousemove=null;
		}
	}
}
// 点击添加图表
$("#chart_type1").click(function(){
	var chartType1=document.createElement("div");
	chartType1.className="drag_item chart_type1";
	chartType1.innerHTML="<div class='drag_item_move'></div>"+
          "<div class='close_btn' style='display:none'><i class='fa fa-minus-circle' aria-hidden='true'></i></div>"+
          "<div class='drag_item_box'><input value='新页面' style='border:none'/></div>";
	$("#drag_content").append(chartType1);
	$(".close_btn").hide();
	drag();
	deleteFn();
})
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
	// console.log("saveInfo")
	// console.log(saveInfo)
	$("#drag_item_info_arr").val(JSON.stringify(itemsInfo));
})
// 获取一个chart的信息
function getItemInfo(obj){
	var dragContent=document.getElementById('drag_content');
	var dragContentX=dragContent.offsetLeft;
	var dragContentY=dragContent.offsetTop;
	var objHtml=$(obj).find(".drag_item_box>input").val();
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
	// '[{"val":"旧页面","type":"chart_type1","width":400,"height":100,"left":100.1375122070312,"top":180.8000030517578},{"val":"新页面","type":"chart_type1","width":400,"height":100,"left":31.0375366210938,"top":362.8000183105469},{"val":"新页面2","type":"chart_type1","width":400,"height":100,"left":455.0375061035156,"top":308.8000183105469}]'
	saveData=JSON.parse(saveData);
	$("#drag_content").html("");
	for (var i = 0; i < saveData.length; i++) {
		var dragItem=document.createElement("div");
		dragItem.className="drag_item";
		$(dragItem).addClass(saveData[i].type);
		$(dragItem).css({"height":saveData[i].height,"left":saveData[i].left,
						"top":saveData[i].top,"width":saveData[i].width})
		dragItem.innerHTML='<div class="drag_item_move"></div><div class="close_btn" style="display:none"><i class="fa fa-minus-circle" aria-hidden="true"></i></div><div class="drag_item_box"><input value="'+saveData[i].val+'">';
		$("#drag_content").append(dragItem);
	}
	drag();
	deleteFn();
};
$("#chart_return").click(function(){
	initFn();
});
