// 阴影层显示
function showShadow(obj){
    $(obj).find(".grid-stack-item-shadow").show();
}
// 阴影层隐藏
function hideShadow(obj) {
    $(obj).find(".grid-stack-item-shadow").hide();
}
// 导航点击事件
function shadowNavClickFn(obj) {
    var parentObj=$(obj).parent().parent().parent().parent();
    var oid=parentObj.find(".grid-stack-item-val").attr("id");
    var indexNumInput=parentObj.find(".grid-stack-item-indexnum")
    var indexNum=indexNumInput.val()||"0";
    var indexBoolInput=parentObj.find(".grid-stack-item-indexbool")
    var indexBool=indexBoolInput.val()||"0";
    var lay=layer.open({
        type: 1,
        skin: 'layui-layer-demo', //样式类名
        area: ['450px', '240px'],
        closeBtn: 1, //不显示关闭按钮
        shadeClose: false, //开启遮罩关闭
        title:'设置导航标题',
        content: '<div style="padding: 20px 20px 0 20px;">' +
        '<div class="form-group">'+
        '<input class="form-control curent-index-num" type="text" maxlength="10" placeholder="设置导航标题（十个字符以内）" value="'+indexNum+'">'+
        '</div>'+
        '<div>'+
        '<label>'+
        '<input type="checkbox" class="index-bool">开启导航'+
        '</label>'+
        '</div>'+
        '</div>',
        btn: ['确 定'],
        yes: function(index, layero){
            indexNumInput.val($(".curent-index-num").val());
            indexBoolInput.val($(".index-bool").is(":checked")==true ? "1" : "0");
            if(indexBoolInput.val()==1){
                insertNavFn(oid);
            }else{
                $(".wpn_"+oid).remove();
            }
            layer.close(lay);
        },
        success: function(layero, index){
            if(indexBool!="0"){
                $(".index-bool").attr('checked',true);
            }else{
                $(".index-bool").attr('checked',false);
            }
        }
    });
}
// 导航插入事件
function insertNavFn(oid){
    console.log(oid)
    console.log($("#"+"wpn-"+oid))
    if($("#"+"wpn-"+oid).length>0){
        layer.alert("此导航已存在！");
    }else{
        var Y=$("#"+oid).parent().parent().attr("data-gs-y");
        var indexnum=$("#"+oid).parent().find(".grid-stack-item-indexnum").val();
        var indexbool=$("#"+oid).parent().find(".grid-stack-item-indexbool").val()
        var divItem="<div dataSrcY='"+Y+"' class=\"wpn-list wpn_"+oid+"\"><div class=\"wpn-point\"></div><div class=\"wpn-content\" id='wpn-"+oid+"'>"+indexnum+"</div></div>"
        if($(".wrap-container").find(".wpn-list").length==0){
            $(".wrap-container").html($(".wrap-container").html()+divItem);
        }else{
            var wpnList=$(".wrap-container").find(".wpn-list");
            for(var i=0;i< wpnList.length;i++){
                if(Y<=$(wpnList[i]).attr("dataSrcY")){
                    $(wpnList[i]).before(divItem);
                    break;
                }
            }
            if(i==wpnList.length)
                $(".wrap-container").html($(".wrap-container").html()+divItem);
        }
    }
}
// 组件删除事件
function  shadowDeleteFn(obj) {
    console.log($(obj).parent().parent().parent().parent().parent());
    var p=$(obj).parent().parent().parent().parent().parent();
    grid.removeWidget(p);
    var oid=$(p).find(".grid-stack-item-val").attr("id")
    $(".wpn_"+oid).remove();
    console.log("删除成功！");
}
// 组件其他事件
function itemsFn() {
    // 阴影层切换
    // $(".grid-stack-item").mouseenter(function () {
    //     $(this).find(".grid-stack-item-shadow").show();
    // })
    // $(".grid-stack-item").mouseleave(function () {
    //     $(this).find(".grid-stack-item-shadow").hide();
    // })

    // 双击阴影层事件
    $(".shadow-bg-content").dblclick(function (e) {
        e.stopPropagation();
        $(".grid-stack-item-content").removeClass("active-item");
        $(this).parent().parent().addClass("active-item");
        $(this).parent().hide();
        var oId=$(this).parent().siblings().attr("id");
        console.log(oId);
        if(oId.split("_")[0]=='bar' || oId.split("_")[0]=='line' ||oId.split("_")[0]=='scatter') {
            // 双击echarts图
            showRightContainerEvent(oId);
        }else if(oId.split("_")[1]=='title'){
            // 双击文本框
            $(".right-container").hide();
            $("#right-container-id").val("");
            // showRightContainerEvent(oId);
            ckEditorShow(this)
        }
    })
    // 删除item
    // $(".shadow-close-btn").click(function(e){
    //     var target=e.target;
    //     var p=$(target).parent().parent().parent().parent();
    //     grid.removeWidget($(target).parent().parent().parent().parent());
    //     var oid=$(target).parent().parent().parent().parent().find(".grid-stack-item-val").attr("id")
    //     $(".wpn_"+oid).remove();
    //     console.log("删除成功！");
    // });
    // 设置导航
    // $(".shadow-nav-btn").click(function(){
    //     console.log(this);
    //     var oid=$(this).parent().parent().parent().find(".grid-stack-item-val").attr("id");
    //     var indexNumInput=$(this).parent().parent().parent().find(".grid-stack-item-indexnum")
    //     var indexNum=indexNumInput.val()||"0";
    //     var indexBoolInput=$(this).parent().parent().parent().find(".grid-stack-item-indexbool")
    //     var indexBool=indexBoolInput.val()||"0";
    //     var lay=layer.open({
    //         type: 1,
    //         skin: 'layui-layer-demo', //样式类名
    //         area: ['450px', '240px'],
    //         closeBtn: 1, //不显示关闭按钮
    //         shadeClose: false, //开启遮罩关闭
    //         title:'设置导航标题',
    //         content: '<div style="padding: 20px 20px 0 20px;">' +
    //             '<div class="form-group">'+
    //                 '<input class="form-control curent-index-num" type="text" maxlength="10" placeholder="设置导航标题（十个字符以内）" value="'+indexNum+'">'+
    //             '</div>'+
    //             '<div>'+
    //                 '<label>'+
    //                     '<input type="checkbox" class="index-bool">开启导航'+
    //                 '</label>'+
    //             '</div>'+
    //         '</div>',
    //         btn: ['确 定'],
    //         yes: function(index, layero){
    //             indexNumInput.val($(".curent-index-num").val());
    //             indexBoolInput.val($(".index-bool").is(":checked")==true ? "1" : "0");
    //             var Y=$("#"+oid).parent().parent().attr("data-gs-y");
    //             if(indexBoolInput.val()==1){
    //                     var divItem="<div dataSrcY='"+Y+"' class=\"wpn-list wpn_"+oid+"\"><div class=\"wpn-point\"></div><div class=\"wpn-content\" id='wpn-"+oid+"'>"+$(".curent-index-num").val()+"</div></div>"
    //                     if($(".wrap-container").find(".wpn-list").length==0){
    //                         $(".wrap-container").html($(".wrap-container").html()+divItem);
    //                     }else{
    //                         var wpnList=$(".wrap-container").find(".wpn-list");
    //                         for(var i=0;i< wpnList.length;i++){
    //                             if(Y<=$(wpnList[i]).attr("dataSrcY")){
    //                                 $(wpnList[i]).before(divItem);
    //                                 break;
    //                             }
    //                         }
    //                         if(i==wpnList.length)
    //                             $(".wrap-container").html($(".wrap-container").html()+divItem);
    //                     }
    //             }else{
    //                 $(".wpn_"+oid).remove();
    //             }
    //             layer.close(lay);
    //         },
    //         success: function(layero, index){
    //             if(indexBool!="0"){
    //                 $(".index-bool").attr('checked',true);
    //             }else{
    //                 $(".index-bool").attr('checked',false);
    //             }
    //         }
    //     });
    // });
};
itemsFn();

function cmp(a,b){
    return a.top-b.top;
}

// echarts大小调整
window.onresize = resetAllChartSize = function(){
    $('div[_echarts_instance_]').each(function(){
        echarts.getInstanceByDom($(this)[0]).resize();
    });
}



// 双击当前echart展示配置栏
function showRightContainerEvent(oId){
        $(".right-container").show();
        $("#right-container-id").val(oId);
        var name=$("#"+oId).parent().find(".grid-stack-item-name");
        $("#item-name").val($(name).html());
        $("#item-name").change(function () {
            $(name).html($(this).val());
        })
}
// 显示ckeditor
function ckEditorShow(item){
    var node=item.parentNode.parentNode.parentNode;
    $('#ckEditor-box').css({
        "top": node.offsetTop+20+"px",
        "left": node.offsetLeft+20+"px",
        "width": node.offsetWidth+"px"
    }).show();
    var divs=$(".active-item").children();
    var str=$(divs[0]).html()||" ";
    CKEDITOR.instances.description.setData(str);

}
// 隐藏ckeditor
function ckEditorHide(){
    $("#ckEditor-box").hide();
    console.log(CKEDITOR.instances.description.getData());
    var divs=$(".active-item").children();
    if( $(divs[0]).hasClass("barChart") || $(divs[0]).hasClass("lineChart") ||$(divs[0]).hasClass("scatterChart")){
        $('.right-container').hide();
        // $('.right-container').animate({width:'0'},250);
    }else{
        var str=CKEDITOR.instances.description.getData();
        $(divs[0]).html(str);
    }
}