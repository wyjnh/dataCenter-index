<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>配置页面</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="${request.contextPath}/resources/css/font-awesome-4.7.0/css/font-awesome.css">
    <link rel="stylesheet" type="text/css" media="screen" href="${request.contextPath}/resources/css/common.css">
    <link rel="stylesheet" type="text/css" media="screen" href="${request.contextPath}/resources/css/report_editor.css">
    <link rel="stylesheet" type="text/css" media="screen" href="${request.contextPath}/resources/css/editor_container.css">
    <link rel="stylesheet" type="text/css" media="screen" href="${request.contextPath}/resources/css/right_container.css">



    <link rel="stylesheet" type="text/css" media="screen" href="${request.contextPath}/resources/css/bootstrap/bootstrap.min.css">
    <script src="${request.contextPath}/resources/js/jquery/3.3.1/jquery.js"></script>
    <script src="${request.contextPath}/resources/js/bootstrap/bootstrap.min.js"></script>

    <script src="${request.contextPath}/resources/assets/jquery-ui/jquery-ui.min.js"></script>
    <link rel="stylesheet" type="text/css" media="screen" href="${request.contextPath}/resources/assets/jquery-ui/jquery-ui.min.css">

<#--ckeditor-->
    <script src="${request.contextPath}/resources/assets/ckeditor/ckeditor.js"></script>

    <#--echarts-->
    <script src="${request.contextPath}/resources/assets/echarts/echarts.min.js"></script>

    <#--拖拽插件-->
    <link rel="stylesheet" type="text/css" media="screen" href="${request.contextPath}/resources/assets/gridstack/gridstack.css">
    <script src="${request.contextPath}/resources/assets/gridstack/lodash.min.js"></script>
    <script src="${request.contextPath}/resources/assets/gridstack/gridstack.min.js"></script>
    <script src="${request.contextPath}/resources/assets/gridstack/gridstack.jQueryUI.min.js"></script>


<#--颜色取色器-->
    <link rel="stylesheet" type="text/css" media="screen" href="${request.contextPath}/resources/assets/colorPicker/evol-colorpicker.min.css">
    <script src="${request.contextPath}/resources/assets/colorPicker/evol-colorpicker.min.js"></script>

    <#--layer-->
    <script src="${request.contextPath}/resources/assets/layer/layer.js"></script>

</head>
<body>
<div class="header-container" style="">
    <span id="pre-btn" class="pre-btn">预览</span>
    <ul class="header-left-container">
        <li><i class="fa fa-mail-reply unabledBtn" id="backInfo-btn" aria-hidden="true"></i></li>
        <li><i class="fa fa-mail-forward unabledBtn" id="cancelInfo-btn" aria-hidden="true"></i></li>
    </ul>
    <div class="header-middle-container">
        <input class="header-middle-input" value="报表名称" id="report-name-input" placeholder="请填写报表名称" style="display: none"/>
        <span class="header-middle-span" id="report-name-span">报表名称</span>
        <i class="fa fa-pencil header-middle-btn" id="change-name-btn" aria-hidden="true"></i>
    </div>
    <ul class="header-right-container">
        <li>发布</li>
        <li id="save-editor-btn">保存</li>
        <li id="load-editor-btn">加载</li>
        <li id="clear-editor-btn">清空</li>
    </ul>
</div>

<div class="left-container">
    <div class="left-container-nav">
        <ul class="left-container-list">
            <li dataType="echarts-nav">
                <i class="fa fa-area-chart" aria-hidden="true"></i>
            </li>
            <#--<li dataType="map-nav">-->
                <#--地图-->
            <#--</li>-->
            <li dataType="text-nav">
                <i class="fa fa-text-width" aria-hidden="true"></i>
            </li>
            <#--<li dataType="shape-nav">图形</li>-->
            <li dataType="pic-nav">
                <i class="fa fa-image" aria-hidden="true"></i>
            </li>
            <#--<li dataType="link-nav">引用</li>-->
            <li dataType="settings-nav">
                <i class="fa fa-cogs" aria-hidden="true"></i>
            </li>
        </ul>
        <ul class="left-container-size-list">
            <li>
                <i id="bigSize-btn" class="fa fa-search-plus" aria-hidden="true"></i>
            </li>
            <li>
                <span id="size-ratio">100</span>%
            </li>
            <li>
                <i id="smallSize-btn" class="fa fa-search-minus" aria-hidden="true"></i>
            </li>
        </ul>
    </div>

    <div class="left-container-content">
        <div class="map-nav" style="display: none">
            <p class="nav-header">
                <span>插入地图</span>
                <i class="fa fa-remove close-nav-btn" aria-hidden="true"></i>
            </p>
            <div class="nav-item">
                <select class="form-control" style="width: 90%;margin: 10px auto">
                    <option>选择地区</option>
                </select>
                <input class="form-control" style="width: 90%;margin: 10px auto" placeholder="搜索地图"/>
            </div>
            <div class="nav-item">
                <p class="nav-row nav-title">
                    <span>常用地图</span>
                    <i class="fa fa-angle-left echarts-nav-items-toggltshow" aria-hidden="true"></i>
                </p>
                <ul class="echarts-nav-list">
                    <li class="echarts-nav-item">
                        <img class="echarts-nav-item-pic" src="${request.contextPath}/resources/imgs/logo.png" alt="pic1" />
                        <p class="echarts-nav-item-name">地图1</p>
                    </li>
                </ul>
            </div>
            <div class="nav-item">
                <p class="nav-row nav-title">
                    <span>所有地图</span>
                    <i class="fa fa-angle-left echarts-nav-items-toggltshow" aria-hidden="true"></i>
                </p>
                <ul class="echarts-nav-list">
                    <li class="echarts-nav-item">
                        <img class="echarts-nav-item-pic" src="${request.contextPath}/resources/imgs/logo.png" alt="pic1" />
                        <p class="echarts-nav-item-name">地图二</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="echarts-nav" style="display: none">
            <p class="nav-header">
                <span>插入图表</span>
                <i class="fa fa-remove close-nav-btn" aria-hidden="true"></i>
            </p>
            <div class="nav-item">
                <p class="nav-row nav-title">
                    <span>柱形图</span>
                    <i class="fa fa-angle-left echarts-nav-items-toggltshow" aria-hidden="true"></i>
                </p>
                <ul class="echarts-nav-list">
                    <li class="echarts-nav-item" id="creat_bar_chart_type1">
                        <img class="echarts-nav-item-pic" src="${request.contextPath}/resources/imgs/logo.png" alt="pic1" />
                        <p class="echarts-nav-item-name">柱形图1</p>
                    </li>
                </ul>
            </div>
            <div class="nav-item">
                <p class="nav-row nav-title">
                    <span>折线图</span>
                    <i class="fa fa-angle-left echarts-nav-items-toggltshow" aria-hidden="true"></i>
                </p>
                <ul class="echarts-nav-list">
                    <li class="echarts-nav-item" id="creat_line_chart_type1">
                        <img class="echarts-nav-item-pic" src="${request.contextPath}/resources/imgs/logo.png" alt="pic2" />
                        <p class="echarts-nav-item-name">折线图1</p>
                    </li>
                </ul>
            </div>
            <div class="nav-item">
                <p class="nav-row nav-title">
                    <span>散点图</span>
                    <i class="fa fa-angle-left echarts-nav-items-toggltshow" aria-hidden="true"></i>
                </p>
                <ul class="echarts-nav-list">
                    <li class="echarts-nav-item" id="creat_scatter_chart_type1">
                        <img class="echarts-nav-item-pic" src="${request.contextPath}/resources/imgs/logo.png" alt="pic1" />
                        <p class="echarts-nav-item-name">散点图1</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="settings-nav" style="display: none">
            <p class="nav-header">
                <span>报表页面设置</span>
                <i class="fa fa-remove close-nav-btn" aria-hidden="true"></i>
            </p>
            <div class="nav-item">
                <p class="nav-row nav-title">画布宽度设置</p>
                <select class="form-control auto-board-size" style="width: 90%;margin: 0 auto">
                    <option>800</option>
                    <option>1000</option>
                    <option>1200</option>
                </select>
                <#--<div class="nav-row">-->
                    <#--<span class="nav-half-row">宽度</span>-->
                    <#--&lt;#&ndash;<span class="nav-half-row">高度</span>&ndash;&gt;-->
                <#--</div>-->
                <#--<div class="nav-row">-->
                    <#--<input type="number" min="800" id="set-board-width" class="form-control nav-half-row" value="800" placeholder="px"/>-->
                    <#--<input type="number" min="600" id="set-board-height" class="form-control nav-half-row" value="600" placeholder="px"/>-->
                <#--</div>-->
            </div>
            <div class="nav-item">
                <p class="nav-row nav-title">背景设置</p>
                <p class="nav-row">报表整体配色方案</p>
                <ul class="nav-row setting-nav-color-ul">
                    <li>方案1</li>
                    <li>方案2</li>
                    <li>方案3</li>
                    <li>方案4</li>
                </ul>
                <div class="nav-row" style="line-height: 18px;height: 18px;">
                    <span style="margin-right: 10px;">背景色设置</span>
                    <input type="text" id="color-picker-btn" style="width: 80px;height: 18px"/>
                </div>
            </div>
            <div class="nav-item">
                <p class="nav-row nav-title">画布设置</p>
                <div class="nav-row">
                    全局网格
                    <select class="form-control" id="set-grid-btn" style="width: 50%;margin: 0 auto">
                        <option value="0">关闭</option>
                        <option value="1">开启</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="text-nav" style="display: none">
            <p class="nav-header">
                <span>插入文本</span>
                <i class="fa fa-remove close-nav-btn" aria-hidden="true"></i>
            </p>
            <div class="nav-item">
                <p class="nav-row nav-title">
                    <span>标题</span>
                    <i class="fa fa-angle-left echarts-nav-items-toggltshow" aria-hidden="true"></i>
                </p>
                <ul class="echarts-nav-list">
                    <li class="title-nav-item" id="creat_main_title">
                        主标题
                    </li>
                </ul>
            </div>
            <div class="nav-item">
                <p class="nav-row nav-title">
                    <span>段落</span>
                    <i class="fa fa-angle-left echarts-nav-items-toggltshow" aria-hidden="true"></i>
                </p>
                <ul class="echarts-nav-list">
                    <li class="title-nav-item" id="creat_p_title">
                        段落1
                    </li>
                </ul>
            </div>
        </div>
        <div class="pic-nav" style="display: none">
            <p class="nav-header">
                <span>插入图片</span>
                <i class="fa fa-remove close-nav-btn" aria-hidden="true"></i>
            </p>
            <div class="nav-row" style="margin-top:20px; ">
                <input type="file" style="display: none" accept="image/*" id="add_pic_file"/>
                <button class="btn btn-success submit_pic_btn" id="submit_pic_btn">上 传</button>
            </div>
            <div class="nav-item">
                <p class="nav-row nav-title">
                    <span>图片</span>
                    <i class="fa fa-angle-left echarts-nav-items-toggltshow" aria-hidden="true"></i>
                </p>
                <ul class="echarts-nav-list">
                    <li class="title-nav-item">
                        图片素材1
                    </li>
                </ul>
            </div>
            <div class="nav-item">
                <p class="nav-row nav-title">
                    <span>图标</span>
                    <i class="fa fa-angle-left echarts-nav-items-toggltshow" aria-hidden="true"></i>
                </p>
                <ul class="echarts-nav-list">
                    <li class="title-nav-item" id="creat_p_title">
                        图标素材1
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="editor-container">
    <div class="grid-stack">
        <#--主标题-->
        <div class="grid-stack-item" data-gs-x="0" data-gs-y="2" data-gs-width="12" data-gs-height="2" onmouseenter="showShadow(this)" onmouseleave="hideShadow(this)">
            <div class="grid-stack-item-content dashed-border">
                <div class="grid-stack-item-val item-txt main-title" id="main_title_1">
                    主标题
                </div>
                <div class="grid-stack-item-shadow">
                    <div class="shadow-bg-title">
                        <span class="shadow-nav-btn">
                            <i class="fa fa-navicon" aria-hidden="true" onclick="shadowNavClickFn(this)"></i>
                        </span>
                        <span class="shadow-close-btn">
                            <i class="fa fa-trash-o" aria-hidden="true" onclick="shadowDeleteFn(this)"></i>
                        </span>
                    </div>
                    <div class="shadow-bg-content">
                        双击编辑内容
                    </div>
                </div>
                <input type="hidden" class="grid-stack-item-indexnum">
                <input type="hidden" class="grid-stack-item-indexbool">
            </div>
        </div>
        <#--柱形图-->
        <div class="grid-stack-item" data-gs-x="0" data-gs-y="5" data-gs-width="7" data-gs-height="4" onmouseenter="showShadow(this)" onmouseleave="hideShadow(this)">
                <div class="grid-stack-item-content dashed-border">
                    <div class="grid-stack-item-val barChart" id="bar_chart_1"></div>
                    <div class="grid-stack-item-shadow">
                        <div class="shadow-bg-title">
                            <span class="shadow-nav-btn">
                                <i class="fa fa-navicon" aria-hidden="true" onclick="shadowNavClickFn(this)"></i>
                            </span>
                            <span class="shadow-close-btn">
                                <i class="fa fa-trash-o" aria-hidden="true" onclick="shadowDeleteFn(this)"></i>
                            </span>
                        </div>
                        <div class="shadow-bg-content">
                            双击编辑内容
                        </div>
                    </div>
                    <div class="grid-stack-item-name">未命名</div>
                    <input type="hidden" class="grid-stack-item-indexnum">
                    <input type="hidden" class="grid-stack-item-indexbool">
                </div>
            </div>
    </div>
    <div id="ckEditor-box" style="position:absolute;width:100%;top:0;z-index: 4;display: none">
        <textarea id="description" style="width:100%"></textarea>
    </div>
</div>
<div class="wrap-container">
    <div class="wpn-point-top"></div>
</div>


<div class="right-container" style="display: none">
    <input type="hidden" id="right-container-id"/>
    <div class="dataItem-choose" style="display: none">
        <div class="nav-row database-choose-title">
            <i class="fa fa-television" aria-hidden="true"></i>
            <span style="width: 70%">数据源字段配置</span>
            <i class="fa fa-database database-choose-btn" aria-hidden="true"></i>
            <i class="fa fa-cog setting-choose-btn" aria-hidden="true"></i>
        </div>
        <p class="nav-row">数据库表字段选择</p>
        <div style="overflow: hidden">
            <ul class="dataItem-choose-leftcontent dataItem-choose-field-list">
                <li>字段1</li>
                <li>字段2</li>
                <li>字段3</li>
                <li>字段4</li>
            </ul>
            <ul class="dataItem-choose-rightcontent">
                <li class="dataItem-choose-right-item">
                    <div class="dataItem-choose-right-action-list">
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                    <div class="dataItem-choose-right-itemcard">
                        <p>x轴 : </p>
                        <ul class="dataItem-choose-right-val-list">
                        </ul>
                    </div>
                </li>
                <li class="dataItem-choose-right-item">
                    <div class="dataItem-choose-right-action-list">
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                    <div class="dataItem-choose-right-itemcard">
                        <p>图例 : </p>
                        <ul class="dataItem-choose-right-val-list">
                        </ul>
                    </div>
                </li>
                <li class="dataItem-choose-right-item">
                    <div class="dataItem-choose-right-action-list">
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                    <div class="dataItem-choose-right-itemcard">
                        <p>y轴 : </p>
                        <ul class="dataItem-choose-right-val-list">
                        </ul>
                    </div>
                </li>
                <li class="dataItem-choose-right-item">
                    <div class="dataItem-choose-right-action-list">
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                    <div class="dataItem-choose-right-itemcard">
                        <p>过滤条件 : </p>
                        <ul class="dataItem-choose-right-val-list">
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="setting-choose" style="display: none">
        <div class="nav-row database-choose-title">
            <i class="fa fa-television" aria-hidden="true"></i>
            <span style="width: 70%">设置</span>
            <i class="fa fa-database database-choose-btn" aria-hidden="true"></i>
            <i class="fa fa-cog setting-choose-btn" aria-hidden="true"></i>
        </div>
        <p class="nav-row nav-title">图表设置</p>
        <div class="nav-row form-item-row">
            <span>标题</span>
            <input type="text" class="form-control" id="item-name" placeholder="请输入名称" />
        </div>
    </div>
    <div class="database-choose">
        <div class="nav-row database-choose-title">
            <i class="fa fa-television" aria-hidden="true"></i>
            数据源选择
        </div>
        <div class="nav-row">
            <input class="form-control database-choose-search-input" placeholder="搜索数据库" style="width: 95%"/>
        </div>
        <ul class="database-choose-list">
            <li class="database-choose-item">
                    <label>数据源 1</label>
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
            </li>
            <li class="database-choose-second-item">
                <ul>
                    <li>表一</li>
                    <li>表二</li>
                    <li>表三</li>
                </ul>
            </li>
            <li class="database-choose-item">
                <label>数据源 1</label>
                <i class="fa fa-angle-down" aria-hidden="true"></i>
            </li>
            <li class="database-choose-second-item">
                <ul>
                    <li>表一</li>
                    <li>表二</li>
                    <li>表三</li>
                </ul>
            </li>
            <li class="database-choose-item">
                <label>数据源 1</label>
                <i class="fa fa-angle-down" aria-hidden="true"></i>
            </li>
            <li class="database-choose-second-item">
                <ul>
                    <li>表一</li>
                    <li>表二</li>
                    <li>表三</li>
                </ul>
            </li>
        </ul>
    </div>
</div>
<script src="${request.contextPath}/resources/js/script/addItem_event.js"></script>
<script>
    var _temp_report_total_info_edit={};
    // 颜色插件调用
    $('#color-picker-btn').colorpicker();

    CKEDITOR.replace( 'description');

    // 拖拽插件导入
    var options = {
        cellHeight:50,
        resizable :{autoHide: true, handles: 'n, e, s, w, ne, se, sw, nw'},
    };
    $('.grid-stack').gridstack(options);
    grid = $('.grid-stack').data('gridstack');

    // 前进后退
    var globalInfoList=[];
    var globalInfoListAfter=[];
    var newbool=false;
    $('.grid-stack').on('change', function(event, items) {
        if(!newbool){
            // 导航更新
            var itemId=$(items[0].el).find(".grid-stack-item-val").attr("id");
            if($("#"+itemId).parent().find(".grid-stack-item-indexbool").val()=='1'){
                $("#"+"wpn-"+itemId).parent().remove();
                insertNavFn(itemId);
            }

            var infoList={};
            infoList.layoutInfo=saveLayoutInfoFn()[0];
            infoList.itemsInfo=saveLayoutInfoFn()[1];
            globalInfoList.push(infoList);
            globalInfoListAfter=[];
            if(globalInfoList.length>1){
                $("#backInfo-btn").removeClass("unabledBtn");
            }
            if(globalInfoListAfter.length>1){
                $("#cancelInfo-btn").removeClass("unabledBtn");
            }
            // console.log('--页面产生变化--')
            // console.log(globalInfoList);
            // console.log(globalInfoListAfter);
        }
    });
    $("#backInfo-btn").click(function(e){
        console.log(this);
        if($("#backInfo-btn").hasClass("unabledBtn")){
            alert("无回退记录")
        }else{
            if(globalInfoList.length>0){
                var info=globalInfoList[globalInfoList.length-2];
                newbool=true;
                updateLayoutInfo(info);
                newbool=false;
                globalInfoListAfter.push(globalInfoList[globalInfoList.length-1]);
                globalInfoList.length--;
                console.log('后退按钮触发：')
                console.log(globalInfoList);
                console.log(globalInfoListAfter);
                if(globalInfoList.length==1){
                    $("#backInfo-btn").addClass("unabledBtn");
                }else{
                    $("#backInfo-btn").removeClass("unabledBtn");
                }
                if(globalInfoListAfter.length==0){
                    $("#cancelInfo-btn").addClass("unabledBtn");
                }else{
                    $("#cancelInfo-btn").removeClass("unabledBtn");
                }
            }else{
                alert("无回退记录")
            }
        }
    });
    $("#cancelInfo-btn").click(function(){
        if($("#cancelInfo-btn").hasClass("unabledBtn")){
            alert("无回退记录")
        }else{
            if(globalInfoListAfter.length>0){
                var info=globalInfoListAfter[globalInfoListAfter.length-1];
                globalInfoList.push(info);
                newbool=true;
                updateLayoutInfo(info);
                newbool=false;
                globalInfoListAfter.length--;
                console.log('撤销按钮触发：')
                console.log(globalInfoList);
                console.log(globalInfoListAfter);
                if(globalInfoList.length==1){
                    $("#backInfo-btn").addClass("unabledBtn");
                }else{
                    $("#backInfo-btn").removeClass("unabledBtn");
                }
                if(globalInfoListAfter.length==0){
                    $("#cancelInfo-btn").addClass("unabledBtn");
                }else{
                    $("#cancelInfo-btn").removeClass("unabledBtn");
                }
            }else{
                alert("无撤回记录")
            }
        }
    });

    // 预先添加echarts图数据
    drawCharts('bar_chart_1','bar')

    // 导航
    $(".wrap-container").click(function (e) {
        var event = e || window.event;
        var target= event .target || event .srcElement; //获取document 对象的引用
        var oid=target.id.split("-")[1];
        $('html, body').animate({
            scrollTop: $("#"+oid).offset().top-100
        }, 300);
    });

    // body双击事件
    $('body').dblclick(function () {
        if($(".active-item").find(".grid-stack-item-val").hasClass("main-title") || $(".active-item").find(".grid-stack-item-val").hasClass("p-title")){
            ckEditorHide()
        }
        $(".left-container-content").hide();
        $(".right-container").hide();
    });
</script>
<script src="${request.contextPath}/resources/js/script/header_container.js"></script>
<script src="${request.contextPath}/resources/js/script/left_container.js"></script>
<script src="${request.contextPath}/resources/js/script/right_container.js"></script>
<script src="${request.contextPath}/resources/js/script/editor_container.js"></script>
</body>
</html>