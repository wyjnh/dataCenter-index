var displayLevel1=false;
var displayLevel2=false;
var displayLevel3=false;
$("#nav_show_btn").mouseenter(function(){
  // console.log(displayLevel1);
  //   if(!displayLevel1){
      displayLevel1=true;
      $('.nav_container_level1').animate({width:'200px'},{queue:false,duration:300});
      showLevel2Fn();
    // }else{
    //   displayLevel1=false;
    // }
  })
function showLevel2Fn(){
    $(".nav_container_level1 >ul> li").mouseenter(function(){
      if($(".nav_container_level1").width!="0"){
        var targetClass=$(this).removeClass("active_tab").attr("class");
        $(".nav_container_level1 >ul> li").removeClass("active_tab");
        if($(this).hasClass("active_tab")){
        }else{
          $(this).addClass("active_tab");
        }
        $(".nav_container_level2 ul").each(function(){
          if($(this).hasClass(targetClass)){
            $(this).show();
          }else{
            $(this).hide();
          }
        })
        $(".nav_container_level2").animate({width:"200px"},{queue:false,duration:300});
        displayLevel2=true;
        $(".nav_container_level2 >ul> li").removeClass("active_tab");
        showLevel3Fn();
        closeLevel3Fn();
      }
      
    });
}
  
function showLevel3Fn(){
  $(".nav_container_level2 >ul> li").mouseenter(function(){
    // console.log(this)
    if($(".nav_container_level1").width!="0"&&$(".nav_container_level2").width!="0"){
      var targetClass=$(this).removeClass("active_tab").attr("class");
      console.log(targetClass)
      $(".nav_container_level2 >ul> li").removeClass("active_tab");
      if($(this).hasClass("active_tab")){

      }else{
        $(this).addClass("active_tab");
      }
      $(".nav_container_level3 ul").each(function(){
          if($(this).hasClass(targetClass)){
            $(this).show();
          }else{
            $(this).hide();
          }
        })
      $(".nav_container_level3").animate({width:"200px"},{queue:false,duration:300});
      displayLevel3=true;
    }
    
  })
}
function closeLevel3Fn(){
  displayLevel3=false;
  $(".nav_container_level3").animate({width:"0px"},{queue:false,duration:300});
}
function closeAll(){
  $(".nav_container_level3").animate({width:"0px"},200,function(){
    $(".nav_container_level2").animate({width:"0px"},200,function(){
      $(".nav_container_level1").animate({width:"0px"},{queue:false,duration:200});
    });
  });
  $(".nav_container>div>ul>li").removeClass("active_tab");
  // $(".nav_container_level3").attr("class","nav_container_level3");
  // $(".nav_container_level2").attr("class","nav_container_level2")
  // $(".nav_container_level1").attr("class","nav_container_level1")
  
}
$('body').on('mouseover', function(e){
  // console.log(e.target)
  var x=e.target;
  if((x.className+" ").indexOf("blue-skin")>-1||
    (x.className+" ").indexOf("header-content")>-1||
    (x.parentNode.parentNode.parentNode.className+" ").indexOf("menu-container")>-1){
    closeAll();
  }
});