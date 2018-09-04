// 全局事件
function settingEvent(grid){
    // 网格化切换
    $("#setting-grid-btn").click(function () {
        $(".board_container").toggleClass("bg-grid");
    })
    // 清空
    $("#clear-btn").click(function(){
        grid.removeAll();
    })
    // 保存
    $("#saveInfo-btn").click(function(){
        var infoList=saveChartInfo();
        console.log('保存图表信息：');
        console.log(infoList);        
        $("#save-info-textarea").val(JSON.stringify(infoList));
    });
    
    //加载
    $("#loadInfo-btn").click(function(){
        var info=$("#save-info-textarea").val();
        if(info==""){
            alert("无保存数据！");
        }else{
            updateChartInfo(info);  
        }
    });
    // 左侧边栏显示
    $(".nav-item").click(function(e){
        $(this).siblings().removeClass("nav-item-active");
        $(this).addClass("nav-item-active");
        $(".nav-box").hide();
        $("."+this.id).show();
    })
    $(".nav-box-closeBtn").click(function(){
        $(".nav-box").hide();
        $(".nav-item").removeClass("nav-item-active");
    })
}
// 保存全局位置信息
function saveChartInfo(){
    var infoList=[];
    var serializedData = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
        var node1=$(el).find(".grid-stack-item-content").children()[0]
        var node=$(el).find(".grid-stack-item-content").children()[1];
        console.log(el);
        var info={
            'id'    :  $(node1).attr("id")||$(node).attr("id"),
            'name'  :  $(el).find(".grid-stack-item-name").val()||"",
            'x'     :  $(el).attr("data-gs-x"),
            'y'     :  $(el).attr("data-gs-y"),
            'width' :  $(el).attr("data-gs-width"),
            'height':  $(el).attr("data-gs-height"),
        };
        infoList.push(info);
    });
    _temp_report_total_info_edit.infoList=infoList;
    return infoList;
}
// 加载全局位置信息
function updateChartInfo(info){
    console.log(typeof info)
    console.log(info)
    grid.removeAll();
        info=JSON.parse(info);
        info = GridStackUI.Utils.sort(info);
        _.each(info, function (node) {
            var el=loadItem(node);
            grid.addWidget(el,
            node.x, node.y, node.width, node.height);
        }.bind(this));
        _.each(info, function (node) {
            switch(node.id.split("-")[0]){
                case "barChart":
                    drawCharts(node.id,"bar");
                    break;
                case "lineChart":
                    drawCharts(node.id,"line");
                    break;
                case "scatterChart":
                    drawCharts(node.id,"scatter");                
                    break;
                default:
                    break;
            }
           
        }.bind(this));
        settingEvent(grid);
        itemsEvent(grid); //每个模块的事件
};
function loadItem(obj){
    var Id=obj.id;
    var type=Id.split("-")[0];
    console.log(type);
    var el="",text="";
    if(type=="mainTitle"||type=="secondTitle"){
        if(type=="mainTitle")
            text="主标题";
        else
            text="二级标题";
        el='<div class="grid-stack-item">'+
                '<div class="grid-stack-item-content '+type+'" >'+
                    '<textarea class="'+type+'-input" id="'+Id+'" placeholder="请填写'+text+'">'+text+'</textarea>'+
                    '<div class="shadow-bg">'+
                    '<div class="shadow-bg-title">'+
                        '<span class="shadow-close-btn">'+
                            '<i class="fa fa-trash-o" aria-hidden="true"></i>'+
                        '</span>'+
                    '</div>'+
                    '<div class="shadow-bg-content">双击编辑内容</div>'+
                    '</div>'+
                '</div>'+
            '</div>';  
    };
    if(type=="contentTitle"){
            text="正文";
            el='<div class="grid-stack-item">'+
                '<div class="grid-stack-item-content '+type+'" >'+
                '<input class="'+type+'-input" id="'+Id+'" value="'+text+'" placeholder="请填写'+text+'"/>'+
                '<div class="shadow-bg">'+
                    '<div class="shadow-bg-title">'+
                        '<span class="shadow-close-btn">'+
                            '<i class="fa fa-trash-o" aria-hidden="true"></i>'+
                        '</span>'+
                    '</div>'+
                    '<div class="shadow-bg-content">双击编辑内容</div>'+
                '</div>'+
                '</div>'+
                '</div>';  
    }
    if(type=="squareShape"||type=="cirShape"){
        el=' <div class="grid-stack-item">'+
            '<div class="grid-stack-item-content shape-box">'+
                '<div class="shape-box-content '+type+'" id="'+Id+'"">'+
                    '<textarea>输入文本</textarea>'+
                '</div>'+
                '<div class="shadow-bg">'+
                    '<div class="shadow-bg-title">'+
                        '<span class="shadow-close-btn">'+
                            '<i class="fa fa-trash-o" aria-hidden="true"></i>'+
                        '</span>'+
                    '</div>'+
                    '<div class="shadow-bg-content">双击编辑内容</div>'+
                '</div>'+
            '</div>'+
        '</div>';
    }
    if(type=="lineChart"||type=="barChart"||type=="scatterChart"){
        el=' <div class="grid-stack-item">'+
            '<div class="grid-stack-item-content" >'+
                '<div class="'+type+'" id="'+Id+'" style="padding: 20px;width:100%;height: 90%;overflow: hidden;"></div>'+
                '<div class="shadow-bg">'+
                    '<div class="shadow-bg-title">'+
                        '<span class="shadow-close-btn">'+
                            '<i class="fa fa-trash-o" aria-hidden="true"></i>'+
                        '</span>'+
                    '</div>'+
                    '<div class="shadow-bg-content">双击编辑内容</div>'+
                '</div>'+
            '</div>'+
        '</div>';
    }
    return el;
};