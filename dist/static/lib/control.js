$(function() {

    /* 上菜单 */
    $(".hasSub").click(function(e) {
        if ($(this).hasClass("hover")) {
            $(this).removeClass("hover").find(".topSub").hide();
            e.stopPropagation();
        } else {
            $(this).addClass("hover").find(".topSub").show();
            $(this).siblings().removeClass("hover").find(".topSub").hide();
            e.stopPropagation();
        }
    });

    $(".topSub").click(function(e) {
        e.stopPropagation();
    });


    /* 左导航 */
    $(".slideDiv").click(function() {
        if ($(".sideMenu > ul li").hasClass("current") === false) {
            return;
        }
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            $(".subMenu").animate({ left: "-100px" }, "fast");
            $(".rightCon").animate({ "margin-left": "51px" }, "fast");
        } else {
            $(".subMenu").animate({ left: "51px" }, "fast");
            $(".rightCon").animate({ "margin-left": "200px" }, "fast");
            $(this).addClass("on");
        }
    });

    if ($(".sideMenu > ul li").hasClass("current")) {
        var selId = $(".current").attr("rel");
        $(".subMenu ul#" + selId).css("display", "block");
        $(".subMenu").css({ left: "51px" });
        $(".rightCon").css({ "margin-left": "200px" });
        $(".slideDiv").addClass("on");
    }

    var navi_idx = 0;
    $(".sideMenu > ul li").each(function(index, element) {
        $(element).mouseover(function() {
            $(".sideMenu").find("mark").css({ "top": ((index + 1) * $(this).height()) + "px", "left": "0" });
            if ($(this).hasClass("current")) {
                $(".menubg").hide();
            } else {
                $(".slideDiv").css("border-right", "1px solid #313541")
                $(".menubg").show();
                var selId = $(this).attr("rel");
                var appendHtml = $(".subMenu ul#" + selId).html();
                $(".menubg ul").html(appendHtml).show().find("a").removeClass("cur");
            };
        });
        $(".sideMenu").mouseleave(function() {
            $(".sideMenu").find("mark").css({ "left": "-50px" });
            $(".slideDiv").css("border-right", "1px solid #313541")
            $(".menubg").hide();
        });
        $(element).click(function() {
            $(".sideMenu").find("ul").find("li").removeClass("current");
            $(".subMenu ul").css("display", "none");
            $(this).addClass("current");
            var selId = $(element).attr("rel");
            $(".subMenu ul#" + selId).css("display", "block");
            $(".subMenu").css("left", "51px");
            $(".rightCon").css("margin-left", "200px");
            $(".slideDiv").addClass("on");
            $(".sideMenu").find("mark").css({ "top": (index * $(this).height()) + "px", "left": "0" });
            navi_idx = index;
        });
    });

    //add20170227 左导航slide
    /*$(".slideIcon-new").click(function(){
       if($(this).hasClass("fold")){
    	   $(this).removeClass("fold");
    	   $(".subMenu").animate({left:"0"},"fast");
    	   $(".rightCon").animate({"margin-left":"149px"},"fast");
    	   }
    	else{			
    		   $(".subMenu").animate({left:"-149px"},"fast");
    		   $(".rightCon").animate({"margin-left":"0"},"fast");
    		   $(this).addClass("fold");
    		}
    	});
    */
    $(".subMenu li.hassub").click(function() {
        $(this).toggleClass("current");
    })

    $(".subMenu li dt a").click(function(e) {
        e.stopPropagation();
    });

    $(".slide-icon").click(function() {
        if ($(this).hasClass("open")) {
            $(this).removeClass("open").next("ul").slideUp();
        } else {
            $(this).addClass("open").next("ul").slideDown();
        }
    })

    $('.circle').each(function() {
        var total = $(this).next(".num").find("i").text();
        var curNum = $(this).find('span').text();
        var num = 360 / total * curNum;
        if (num <= 180) {
            $(this).find('.rightArea').css('transform', "rotate(" + num + "deg)");
        } else {
            $(this).find('.rightArea').css('transform', "rotate(180deg)");
            $(this).find('.leftArea').css('transform', "rotate(" + (num - 180) + "deg)");
        };
    });

    //公用下拉框
    $(".dropdown-btn").live("click", function(e) {
        var _parent = $(this).parent();
        if (_parent.hasClass("open")) {
            _parent.removeClass("open");
        } else {
            $(".select-box").removeClass("open");
            _parent.addClass("open");
        }
        e.stopPropagation();
    });

    /*    $(".dropdown-list li a").live("click",function(){
    		$(this).parents(".select-box").find(".start-tips").hide();
            $(this).parents(".select-box").find(".select-value").text($(this).text());
        });*/

    $(".menu-pd").click(function(e) {
        $(this).toggleClass("hover");
        e.stopPropagation();
    });
    //关闭产品menu
    $(document).click(function(e) {
        $(".top-dropdown").parent().removeClass("open");
        $(".select-box").removeClass("open");
        $(".hasSub,.menu-pd").removeClass("hover");
        $(".topSub").hide();
        $(".tag-sub-layer").hide();

    });


    //状态筛选
    $(".filter").hover(function() {
        $(this).toggleClass("filterOpen");
    });

    //计费方式
    /*
    $(window).scroll(function(){
    	var scrollHeight=$(this).scrollTop();
    	if(scrollHeight>110){
    	   $(".priceDiv").css({"position":"fixed","top":"70px","right":"0","width":"17%"});	
    	}else{
    	   $(".priceDiv").css({"position":"static","width":"21%"});
    	}
    	})
    */

    $("#chargeStyle .chargeText").click(function() {
        var curValue;
        $(this).addClass("chargeSel").find(".radio").addClass("radio-check");
        $(this).siblings().removeClass("chargeSel").find(".radio").removeClass("radio-check");
        curValue = $(this).find(".radio").attr("value");
        if (curValue == 1) {
            $("#price1").show();
            $("#price2").hide();
            $("#IP_type span").show();
        } else {
            $("#price1").hide();
            $("#price2").show();
            $("#IP_type span").eq(1).hide();
        }
    });

    $(".time-choose li:eq(0)").addClass("cur");

    $(".time-choose li:not('.last-one')").click(function() {
        $(".time-choose li").removeClass();
        $(this).addClass("cur");
        var cur_index = $(this).index();
        if (cur_index >= 9) {
            $(this).addClass("sel");
            $("#month_price").hide();
            $("#year_price").show();
        } else {
            $("#month_price").show();
            $("#year_price").hide();
        }

    });

    $(".time-choose li:eq(9)").hover(function() {
        $(".time-tipA").show();
    }, function() {
        $(".time-tipA").hide();
    })
    $(".time-choose li:eq(10)").hover(function() {
        $(".time-tipB").show();
    }, function() {
        $(".time-tipB").hide();
    })

    //问号提示
    $(".tips-icon").hover(function() {
        $(this).css("z-index", "20");
    }, function() {
        $(this).css("z-index", "10");
    });

    $(".chargeText").hover(function() {
        $(this).next().addClass("hover").css("z-index", "20");
    }, function() {
        $(this).next().removeClass("hover").css("z-index", "0");
    });

    //支付页支付固定
    var conHeight = $(".mainCon").height() + $(".navbar").height();
    var winHeight = $(window).height();
    if (conHeight > winHeight) {
        // $(".pay-div,.btn-div,.page-div").addClass("fix");
        $(".paybox").css("margin-bottom", "60px");
        $(".split").css("margin-bottom", "70px");
        $(".conBox").css("margin-bottom", "60px");
        $(".newBox").css("margin-bottom", "70px")
    }

    //选择地区
    $("#local span").click(function() {
        $(this).addClass("hover").siblings().removeClass("hover");
    })

    // 标签

    $(".tag-filter").click(function(e) {
        $(this).find(".tag-sub-layer").show();
        e.stopPropagation();
    });

    $(".parents-tag li").hover(function() {
        var selId = $(this).attr("rel");
        $(".sub-items ul").css("display", "none");
        $(".sub-items ul#" + selId).css("display", "block");
    });

    $(".tag-sub-layer ul li").click(function() {
        var cur_i = $(this).find("i");
        if (cur_i.is(":visible")) {
            return;
        } else {
            $(this).find("i").show();
            $(".tag-box").append("<div class='tag'>" + $(this).text() + "<i></i></div>");
        }
    });

    $(".tag i").live('click', function() {
        $(this).parent().remove();
    });

    $(".log").mouseover(function() {
        $(this).addClass("hover");
        $(".log-show").animate({ right: "0" }, 300);
    });
    $(".log-show").mouseleave(function() {
        $(this).animate({ right: "-280px", }, 200);
        $(".log").removeClass("hover");
    });


    $(document).ready(function() {
        $('#message_mode > li').click(function() {
            var _this = $(this);
            $('.mess').hide();
            $('.mess' + _this.data('type')).show();
        });
    });

});


//tab标签
function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con-" + name + "-" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
    myChart.resize();
    myChart2.resize();
    myChart3.resize();
    myChart4.resize();
    myChart5.resize();
    myChart6.resize();
    myChart7.resize();
    myChart8.resize();
}