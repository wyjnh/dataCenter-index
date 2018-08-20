var saveInfo="";
// 拖拽，拉伸事件
function drag(){
	$( ".drag_item" ).draggable({
		containment: "#drag_content",
		start: function() {
      
      	},
        drag: function(e) {
          var dragContent=document.getElementById('drag_content');
          // console.log(dragContent.clientHeight)//380
          // console.log(e.target.clientHeight)//100
		  // var dragContentHeight=dragContent.offsetLeft;
	      // var dragContentY=dragContent.offsetTop;
          // console.log(e.target.style.top);
          // console.log(parseInt(e.target.style.top)+parseInt(e.target.clientHeight)+10)
          if(parseInt(e.target.style.top)+parseInt(e.target.clientHeight)+10>=parseInt(dragContent.clientHeight)){
          	var h=parseInt($(".drag_container").height())+50+"px";
          	
          	// console.log(h);
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
	console.log("saveInfo")
	console.log(saveInfo)
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
