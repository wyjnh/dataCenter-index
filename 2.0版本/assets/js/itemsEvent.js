function itemsEvent(grid){
    // 阴影事件
    // // 显示
    $(".grid-stack-item-content").mouseenter(function(){
        $(this).parent().find(".shadow-bg").show();
    })
    // 隐藏
    $(".grid-stack-item-content").mouseleave(function(){
        $(this).parent().find(".shadow-bg").hide();
    })
    // 双击
    $(".shadow-bg-content").dblclick(function(){
        $(this).parent().hide();
        var className=$(this).parent().parent().children()[1].className;
        var oid=$(this).parent().parent().children()[1].id;
        $('.grid-stack-item-content').removeClass("active-item-div");
        $(this).parent().parent().addClass("active-item-div");
        console.log("选中图的类型和id:");
        console.log(className);
        console.log(oid);
        if(className.split("-")[0]=="lineChart"||className.split("-")[0]=="scatterChart"||className.split("-")[0]=="barChart"){
            $('.translate-container').animate({width:'400'},250);
            $(".translate-container-shapes").hide();
            $(".translate-container-echarts").show();
        }else if(className.split(" ")[0]=="shape-box-content"){
            $('.translate-container').animate({width:'400'},250);
            $(".translate-container-shapes").show();
            $(".translate-container-echarts").hide();
            var obj=$(this).parent().siblings().find("textarea");
            $("#translate-shapes-itembox").val(obj.val());
            $("#translate-shapes-itembox").change(function(){
                obj.val($(this).val());
            })
        }else{
            $('.translate-container').animate({width:'0'},250);
        }
    })
    // 删除item
    $(".shadow-close-btn").click(function(){
        grid.removeWidget($(this).parent().parent().parent().parent());
        console.log("删除成功！");
    });

    // 右侧导航栏关闭
    $(".translate-container-closeBtn").click(function(){
        $('.translate-container').animate({width:'0'},250);
    })
    // 右侧图表标签页切换
    $(".translate-echarts-datanav").click(function(){
        $(".translate-echarts-data").show();
        $(".translate-echarts-style").hide();
        $(".translate-echarts-datanav").addClass("active-nav");
        $(".translate-echarts-stylenav").removeClass("active-nav");
    })
    $(".translate-echarts-stylenav").click(function(){
        $(".translate-echarts-style").show();
        $(".translate-echarts-data").hide();
        $(".translate-echarts-stylenav").addClass("active-nav");
        $(".translate-echarts-datanav").removeClass("active-nav");


    })
}

