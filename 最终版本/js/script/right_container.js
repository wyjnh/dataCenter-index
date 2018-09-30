// 数据源选择页跳转
$(".database-choose-btn").click(function () {
    $(".right-container").children().hide();
    $(".database-choose").show();
});
// 设置页选择跳转
$(".setting-choose-btn").click(function () {
    $(".right-container").children().hide();
    $(".setting-choose").show();
});


// 数据源下拉滑动交互
$(".database-choose-item").click(function () {
    $(this).next().slideToggle();
    if($(this).find("i").hasClass("fa-angle-down")){
        $(this).find("i").removeClass("fa-angle-down")
        $(this).find("i").addClass("fa-angle-left")
    }else{
        $(this).find("i").removeClass("fa-angle-left")
        $(this).find("i").addClass("fa-angle-down")
    }
});
// 数据源表选择跳转
$(".database-choose-second-item > ul > li").click(function () {
    $(".database-choose").hide();
    $(".dataItem-choose").show();
});

// 字段列表选择样式突出
$(".dataItem-choose-field-list > li").click(function (e) {
    $(".dataItem-choose-field-list > li").removeClass("active-field");
    $(this).addClass("active-field");
});
// 添加字段
$(".dataItem-choose-right-action-list").click(function () {
    var activeField=$(".active-field");
    if(activeField.length==0){
        alert("请选择有效的字段！");
    }else {
        var val=$(activeField).text();
        var ulList=$(this).parent().find(".dataItem-choose-right-val-list");
        var liItem=$(ulList).find("li");
        var bool=false;
        for(var i=0;i<liItem.length;i++){
            if(liItem[i].innerText==val){
                bool=true;
                alert("此字段已存在！")
            }
        }
        if(!bool){
            var oli=document.createElement("li");
            oli.innerHTML="<span>"+val+"</span><i class=\"fa fa-times delete-val-list\" aria-hidden=\"true\"></i>";
            ulList.append(oli);
        }
    }
});
// 删除字段
$(".dataItem-choose-right-val-list").click(function (e) {
    var e=e||window.event;
    var target= e.target || e.srcElement;
    if($(target).hasClass("delete-val-list")){
        $(target).parent().remove();
    }
})

// 阻止右导航的双击冒泡事件
$(".right-container").dblclick(function (e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
});