function drag(){
	var dragItem=document.getElementsByClassName('drag_item');
	for (var i = 0; i < dragItem.length; i++) {
		dragFunction(dragItem[i]);
	}
}
drag();

function dragFunction(item) {
	var dragContent=document.getElementById('drag_content');
	item.onmousedown=function() {
		console.log("down")
		dragContent.onmousemove=function(e){
			var mouseX=e.clientX,mouseY=e.clientY;
			var dragContentX=dragContent.offsetLeft;
			var dragContentY=dragContent.offsetTop;
			item.style.left=parseInt(mouseX-dragContentX-10)+"px";
			item.style.top=parseInt(mouseY-dragContentY-10)+"px";
		}
		item.onmouseup=function(){
			console.log("mouseup")
			dragContent.onmousemove=null;
		}
	}
	
}

// 点击添加图表
$("#chart_type1").click(function(){
	var chartType1=document.createElement("div");
	chartType1.className="drag_item chart_type1";
	chartType1.innerHTML="<div class='close_btn'><i class='fa fa-minus-circle' aria-hidden='true'></i></div><p class='drag_title'>新页面</p>";
	$("#drag_content").append(chartType1);
	drag();
	deleteFn();
})
$("#chart_save").click(function(){
	var itemsInfo=[];
	var items=$("#drag_content>.drag_item");
	for(var i=0;i<items.length;i++){
		var info=getItemInfo(items[i]);
		itemsInfo.push(info);
	}
	console.log(itemsInfo)
})
// 获取一个chart的信息
function getItemInfo(obj){
	var objHtml=$(obj).html();
	var className=obj.className.split(" ")[1];
	var obj=obj.getBoundingClientRect();
	var info={
		"html":objHtml,
		"type":className,
		"width":obj.width,
		"height":obj.height,
		"left":obj.left,
		"top":obj.top
	};
	return info;
}

$.ajax({
	url:"./data.txt",
	success:function(str){
		console.log(str)
	}
})
// 删除表格
function deleteFn(){
	$(".close_btn").click(function(e){
		$(this).parent().remove();
	})
}
deleteFn();