// 左导航关闭按钮事件
$(".close-nav-btn").click(function () {
    $(".left-container-content").hide();
});
// 左导航切换不同item事件
$(".left-container-list > li").click(function (e) {
    e.stopPropagation()
    var cln=$(this).attr('dataType');
    if(cln != undefined){
        console.log(cln);
        $(this).siblings().removeClass("left-container-nav-active");
        $(this).addClass("left-container-nav-active");
        $(".left-container-content").show();
        $(".left-container-content").children().hide();
        $(".left-container-content").find("."+cln).show();
    }else{
        $(".left-container-content").hide();
    }

})
// 左导航图表收缩隐藏
$(".echarts-nav-items-toggltshow").click(function () {
    $(this).parent().parent().find(".echarts-nav-list").toggle();
})
// 选择默认报表页面大小比例事件
$(".auto-board-size").change(function () {
    var width=$(this).val();
    // var width=val[0],height=val[1];
    // $("#set-board-height").val(height);
    $("#set-board-width").val(width);
    $(".editor-container").css({"min-width":width+"px"});
    $('div[_echarts_instance_]').each(function(){
        echarts.getInstanceByDom($(this)[0]).resize();
    });
})
// $("#set-board-height").change(function () {
//     $(".auto-board-size").val("");
//     var val=$(this).val();
//     $(".editor-container").css({"min-height":val+"px"});
//     $('div[_echarts_instance_]').each(function(){
//         echarts.getInstanceByDom($(this)[0]).resize();
//     });
// })
$("#set-board-width").change(function () {
    $(".auto-board-size").val("");
    var val=$(this).val();
    $(".editor-container").css({"min-width":val+"px"});
    $('div[_echarts_instance_]').each(function(){
        echarts.getInstanceByDom($(this)[0]).resize();
    });
})

// 点击调整页面百分比
$(".left-container-size-list").click(function (event) {
    if(event.target.id=="bigSize-btn"){
        if(parseInt($("#size-ratio").text())+10<=200){
            var num=parseInt($("#size-ratio").text())+10;
            $("#size-ratio").text(num);
            resizeReportContainer(num);
        }
    }else if(event.target.id=="smallSize-btn"){
        if(parseInt($("#size-ratio").text())-10>=60){
            var num=parseInt($("#size-ratio").text())-10;
            $("#size-ratio").text(num);
            resizeReportContainer(num);
        }
    }
});
function resizeReportContainer(num){
    var w=parseInt( $('.auto-board-size').val())/100*num;
    // var h=parseInt( $('.editor-container').height())/100*num;
    $(".editor-container").css({"min-width":w+"px"});
    $('div[_echarts_instance_]').each(function(){
        echarts.getInstanceByDom($(this)[0]).resize();
    });
}
// 背景颜色选择事件
$("#color-picker-btn").change(function (e) {
    $(".editor-container").css("background",e.target.value)
});
// 报表网格事件
$("#set-grid-btn").change(function () {
    console.log(this)
    if($(this).val()=="1"){
        $(".editor-container").addClass("bg-grid");
    }else{
        $(".editor-container").removeClass("bg-grid");
    }
});

// 阻止双击冒泡事件
$(".left-container").dblclick(function (e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
});