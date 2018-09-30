// 清空  保存  加载
$(".header-right-container").click(function (e) {
    var event = e || window.event;
    var target= event .target || event .srcElement; //获取document 对象的引用
    if(target.id=="clear-editor-btn"){
        // 清空
        grid.removeAll();
        $(".editor-container").css("background","#ffffff");
        $(".wrap-container").html("<div class='wpn-point-top'></div>");
    }else if(target.id=="save-editor-btn"){
        // 保存
        _temp_report_total_info_edit.setting={
            // 页面设置
            'report_id' :    "report_"+new Date().getTime(),
            'report_name':   $(".header-middle-input").val(),
            'report_width': $(".editor-container").css("width"),
            'report_height':$(".editor-container").css("height"),
            'report_bgColor':$(".editor-container").css("background"),
            'report_opacity':'1',
            'report_grid':   $("#set-grid-btn").val(),
        }
        _temp_report_total_info_edit.layoutInfo=saveLayoutInfoFn()[0];
        _temp_report_total_info_edit.itemsInfo=saveLayoutInfoFn()[1];
        console.log("------保存的信息----")
        console.log(_temp_report_total_info_edit);
        alert("保存成功！");
    }else if(target.id == "load-editor-btn"){
        // 加载
        console.log("--加载保存的信息如下--")
        console.log(_temp_report_total_info_edit);
        updateLayoutInfo(_temp_report_total_info_edit);
    }
});

// 加载保存的信息如下
function updateLayoutInfo(totalInfo){
    var setting=totalInfo.setting;
    if(setting){
        $(".editor-container").css({"background":setting.report_bgColor||"#ffffff","width":setting.report_width||"600px"});
        $("#report-name-span").text(setting.report_name);
    }


    grid.removeAll();
    var layoutInfo=totalInfo.layoutInfo;
    layoutInfo = GridStackUI.Utils.sort(layoutInfo);
    _.each(layoutInfo , function (node) {
        // 加载位置 大小
        var el=loadItem(node["type"],node["id"]);
        grid.addWidget(el,
            node.x, node.y, node.width, node.height);
    }.bind(this));

    var itemsInfo=totalInfo.itemsInfo;
    itemsInfo = GridStackUI.Utils.sort(itemsInfo);

    $(".wrap-container").html("");
    var wraphtml="<div class='wpn-point-top'></div>";
    _.each(itemsInfo , function (node) {
        console.log(node);

        // 加载导航索引
        var indexbool=node.indexbool;
        if(indexbool==1){
            console.log(node.indexnum)
            var divItem="<div class='wpn-list wpn_"+node.id+"'><div class='wpn-point'></div><div class='wpn-content' id='wpn-"+node.id+"'>"+node.indexnum+"</div></div>"
            wraphtml=divItem+wraphtml;
        };
        var el=$("#"+node.id).parent()
        $(el).find(".grid-stack-item-indexnum").val(node.indexnum);
        $(el).find(".grid-stack-item-indexbool").val(node.indexbool);

        // 加载 内部数据
        switch (node.type){
            case "pic_title":
                $("#"+node.id).attr("src",node["option"].url);
                break;
            case "main_title":
            case "p_title":
                $("#"+node.id).html(node["option"].txt);
                break;
            case "bar_chart":
                $("#"+node.id).parent().find(".grid-stack-item-name").text(node["title"]);
                drawCharts(node.id ,"bar");
                break;
            case "line_chart":
                $("#"+node.id).parent().find(".grid-stack-item-name").text(node["title"]);
                drawCharts(node.id ,"line");
                break;
            case "scatter_chart":
                $("#"+node.id).parent().find(".grid-stack-item-name").text(node["title"]);
                drawCharts(node.id ,"scatter");
                break;
            default:
                break;
        }
    }.bind(this));
    $(".wrap-container").html(wraphtml);
    // 加载绑定事件。
    itemsFn();
}

function loadItem(type,oId){
    var el="",text="";
    var className="";
    switch (type){
        case "main_title":
            className="main-title";
            el='<div class="grid-stack-item" onmouseenter="showShadow(this)" onmouseleave="hideShadow(this)">' +
                '            <div class="grid-stack-item-content dashed-border">' +
                '                <div class="grid-stack-item-val item-txt '+className+'" id="'+oId+'">主标题</div>' +
                '                <div class="grid-stack-item-shadow">'+
                '                    <div class="shadow-bg-title">'+
                '                            <span class="shadow-nav-btn">' +
                '                                <i class="fa fa-navicon" aria-hidden="true" onclick="shadowNavClickFn(this)"></i>' +
                '                            </span>'+
                '                            <span class="shadow-close-btn">'+
                '                                <i class="fa fa-trash-o" aria-hidden="true" onclick="shadowDeleteFn(this)"></i>'+
                '                            </span>'+
                '                    </div>'+
                '                    <div class="shadow-bg-content">'+
                '                        双击编辑内容'+
                '                    </div>'+
                '                </div>'+
                '                   <input type="hidden" class="grid-stack-item-indexnum">' +
                '                   <input type="hidden" class="grid-stack-item-indexbool">'+
                '            </div>'+
                '        </div>';
            break;
        case "p_title":
            className="p-title";
            el='<div class="grid-stack-item" onmouseenter="showShadow(this)" onmouseleave="hideShadow(this)">' +
                '            <div class="grid-stack-item-content dashed-border">' +
                '                <div class="grid-stack-item-val item-txt '+className+'" id="'+oId+'">段落</div>' +
                '                <div class="grid-stack-item-shadow">'+
                '                    <div class="shadow-bg-title">'+
                '                            <span class="shadow-nav-btn">' +
                '                                <i class="fa fa-navicon" aria-hidden="true" onclick="shadowNavClickFn(this)"></i>' +
                '                            </span>'+
                '                            <span class="shadow-close-btn">'+
                '                                <i class="fa fa-trash-o" aria-hidden="true" onclick="shadowDeleteFn(this)"></i>'+
                '                            </span>'+
                '                    </div>'+
                '                    <div class="shadow-bg-content">'+
                '                        双击编辑内容'+
                '                    </div>'+
                '                </div>'+
                '                   <input type="hidden" class="grid-stack-item-indexnum">' +
                '                   <input type="hidden" class="grid-stack-item-indexbool">'+
                '            </div>'+
                '        </div>';
            break;
        case "bar_chart":
        case "line_chart":
        case "scatter_chart":
            el='  <div class="grid-stack-item" onmouseenter="showShadow(this)" onmouseleave="hideShadow(this)">' +
                '            <div class="grid-stack-item-content dashed-border">\n' +
                '                <div class="grid-stack-item-val" id="'+oId+'"></div>'+
                '                <div class="grid-stack-item-shadow">' +
                '                    <div class="shadow-bg-title">'+
                '                            <span class="shadow-nav-btn">' +
                '                                <i class="fa fa-navicon" aria-hidden="true" onclick="shadowNavClickFn(this)"></i>' +
                '                            </span>'+
                '                            <span class="shadow-close-btn">'+
                '                                <i class="fa fa-trash-o" aria-hidden="true" onclick="shadowDeleteFn(this)"></i>'+
                '                            </span>'+
                '                    </div>'+
                '                    <div class="shadow-bg-content">'+
                '                        双击编辑内容'+
                '                    </div>'+
                '                </div>'+
                '                   <div class="grid-stack-item-name">未命名</div>'+
                '                   <input type="hidden" class="grid-stack-item-indexnum">' +
                '                   <input type="hidden" class="grid-stack-item-indexbool">'+
                '            </div>'+
                '        </div>';
            break
        case "pic_title":
            el='<div class="grid-stack-item" onmouseenter="showShadow(this)" onmouseleave="hideShadow(this)">' +
                '            <div class="grid-stack-item-content dashed-border">' +
                '                <img class="grid-stack-item-img grid-stack-item-val" src="#" id="'+oId+'">'+
                '                <div class="grid-stack-item-shadow">'+
                '                    <div class="shadow-bg-title">'+
                '                            <span class="shadow-nav-btn">' +
                '                                <i class="fa fa-navicon" aria-hidden="true" onclick="shadowNavClickFn(this)"></i>' +
                '                            </span>'+
                '                            <span class="shadow-close-btn">'+
                '                                <i class="fa fa-trash-o" aria-hidden="true" onclick="shadowDeleteFn(this)"></i>'+
                '                            </span>'+
                '                    </div>'+
                '                    <div class="shadow-bg-content">'+
                '                        双击编辑内容'+
                '                    </div>'+
                '                </div>'+
                '                   <input type="hidden" class="grid-stack-item-indexnum">' +
                '                   <input type="hidden" class="grid-stack-item-indexbool">'+
                '            </div>'+
                '        </div>';
            break;
        default:
            break;
    }
    return el;
};
function saveLayoutInfoFn(){
    var layoutInfo=[];
    var itemsInfo=[];
    var serializedData = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
        var node1=$(el).find(".grid-stack-item-content").children()[0]
        var node=$(el).find(".grid-stack-item-content").children()[1];
        var info={
            'id'    :  $(el).find(".grid-stack-item-val").attr("id"),
            'type'  :  $(el).find(".grid-stack-item-val").attr("id").split("_")[0]+"_"+$(el).find(".grid-stack-item-val").attr("id").split("_")[1],
            'name'  :  $(el).find(".grid-stack-item-name").html()||"未命名",
            'x'     :  $(el).attr("data-gs-x"),
            'y'     :  $(el).attr("data-gs-y"),
            'width' :  $(el).attr("data-gs-width"),
            'height':  $(el).attr("data-gs-height"),
        };
        layoutInfo.push(info);
        var iInfo={
            'id'    :  $(el).find(".grid-stack-item-val").attr("id"),
            'type'  :  $(el).find(".grid-stack-item-val").attr("id").split("_")[0]+"_"+$(el).find(".grid-stack-item-val").attr("id").split("_")[1],
            'title' :  $(el).find(".grid-stack-item-name").text()||"未命名",
            'indexnum':$(el).find(".grid-stack-item-indexnum").val()||0,
            'indexbool':$(el).find(".grid-stack-item-indexbool").val()||0,
            'option': {
                'txt': $(el).find(".item-txt").html() ||"",
                'url': $(el).find(".grid-stack-item-img").attr("src") ||""
            }
        }
        itemsInfo.push(iInfo);
    });
    return [layoutInfo,itemsInfo];
}


// 预览
$("#pre-btn").click(function () {
    $(".left-container").toggle();
    $(".header-right-container").toggle();
    $(".grid-stack-item-content").toggleClass("dashed-border");
    if($(this).text()=="预览"){
        $(".grid-stack-item").unbind("mouseenter");
        $(this).text("编辑")
        $(".right-container").hide();
        $(".active-item").removeClass("active-item");
        $(".header-left-container").css("opacity",0);
        grid.movable('.grid-stack-item', false);
        grid.resizable('.grid-stack-item', false);
    }else{
        $(".grid-stack-item").mouseenter(function () {
            $(this).find(".grid-stack-item-shadow").show();
        });
        $(".header-left-container").css("opacity",1);
        $(this).text("预览");
        grid.movable('.grid-stack-item', true);
        grid.resizable('.grid-stack-item', true);
    }

})


// 编辑报表名称
$("#change-name-btn").click(function (e) {
    if ( e && e.stopPropagation ){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true;
    }
    $("#report-name-span").hide();
    $("#report-name-input").show().val($("#report-name-span").text());
});
$(".header-middle-container").click(function (e) {
    if ( e && e.stopPropagation ){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true;
    }
    $("#report-name-span").show().text($("#report-name-input").val());
    $("#report-name-input").hide();
});
$("#report-name-input").click(function (e) {
    if ( e && e.stopPropagation ){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true;
    }
})
