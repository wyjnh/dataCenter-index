 // 搜索框
 $(".header_search_div").mouseenter(function(){
    $(this).stop().animate({'width':"200px",'border':"1px solid #56b1ea"},{duration:"1000"})
 }).mouseleave(function(){
    $(this).stop().animate({'width':"150px"},{duration:"1000"})
 })

 // 我的收藏
  $("#my_collect_btn").mouseover(function(){
    $(".header-card").slideDown(100);
  })
  $(".header-card").mouseleave(function(){
    $(".header-card").slideUp(100);
    $(".menu-container>ul>li").attr("class","");
  })
  // 个人信息弹框
  $("#header_userinfo_btn").mouseenter(function () {
      $("#header_add_userinfo_box1").slideDown(100);
      $("#header_add_userinfo_box2").slideUp();
  })
  $("#header_add_userinfo_box1").mouseleave(function () {
      $("#header_add_userinfo_box1").slideUp(100);
  })

  // 公告弹框
  $("#header_notice_info_btn").mouseenter(function(){
    $("#header_add_userinfo_box2").slideDown(200);
    $("#header_add_userinfo_box1").slideUp();
  })
  $("#header_add_userinfo_box2").mouseleave(function(){
    $("#header_add_userinfo_box2").slideUp(200);
  })
  
  $(".header_add_notice_list>li").mouseenter(function(e){
    var target=e.target;
    $(".header_add_notice_list > li").attr("class","");
    target.className="active";
  })
 
  // 表头导航效果
  $(".menu-container>ul>li").mouseenter(function(e){
    var target=e.target.parentNode;
    $(".menu-container>ul>li").attr("class","");
    target.className="active";
  })