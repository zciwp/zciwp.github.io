// 图片加载loading
var pics = [
"../img/cover-final.png",
"../img/suggest.png",
"../img/arr.png",
"../img/1/logo.png",
"../img/1/txt.png",
"../img/2/txt.png",
"../img/2/dw.png",
"../img/2/hand.png",
"../img/2/hot.png",
"../img/2/p4.png",
"../img/2/person.png",
"../img/3/dd.png",
"../img/3/hot.png",
"../img/3/tiger.png",
"../img/3/txt.png",
"../img/4/gohome.png",
"../img/4/hot.png",
"../img/4/person.png",
"../img/4/plane.png",
"../img/4/txt.png",
"../img/5/p.png",
"../img/5/prison.png",
"../img/5/txt.png",
"../img/6/hot.png",
"../img/6/info.png",
"../img/6/love.png",
"../img/6/pic.png",
"../img/6/txt.png",
"../img/7/hot.png",
"../img/7/hs.png",
"../img/7/p1.png",
"../img/7/p2.png",
"../img/7/p3.png",
"../img/7/p4.png",
"../img/7/p5.png",
"../img/7/p6.png",
"../img/7/p7.png",
"../img/7/txt.png",
"../img/8/hbx.png",
"../img/8/hot.png",
"../img/8/txt.png",
"../img/8/xpg.png",
"../img/9/hot.png",
"../img/9/lou.png",
"../img/9/p.png",
"../img/9/txt.png",
"../img/10/bird.png",
"../img/10/cat.png",
"../img/10/gc.png",
"../img/10/hot.png",
"../img/10/rc.png",
"../img/10/txt.png",
"../img/11/ad.png",
"../img/11/du.png",
"../img/11/hot.png",
"../img/11/txt.png",
"../img/12/du.png",
"../img/12/sogou.png",
"../img/12/txt.png",
"../img/13/hot.png",
"../img/13/txt.png",
"../img/13/wsc.png",
"../img/13/wsct.png",
"../img/14/chuan.png",
"../img/14/hot.png",
"../img/14/sogou-logo.png",
"../img/14/txt.png"
];
_loadImages(pics, function(){
	// 加载完成后需要执行的coding
    $("#sg-2014").css("display","block");
	$(".loadPage").animate(
		{
			height:"0",
			opacity: "0"
		},1000,function(){
			$(this).css("display","none");
		});
    adjustBrowser();
	fullpage();
});

function _loadImages(pics, callback, len){
    len = len || pics.length;
    if(pics.length){
        var IMG = new Image(),
            picelem = pics.shift();
            
        if(window._pandaImageLoadArray){
            window._pandaImageLoadArray = window._pandaImageLoadArray
        }else{
            window._pandaImageLoadArray = [];
        }
        window._pandaImageLoadArray.push(picelem);
        IMG.src = picelem;
        // 从数组中取出对象的一刻，就开始变化滚动条
        _drawLoadProgress(window._pandaImageLoadArray.length/(len*len));
        // 缓存处理
        if (IMG.complete) {
            window._pandaImageLoadArray.shift();
            return _loadImages(pics,callback, len); 
        }else{
            // 加载处理
            IMG.onload = function() {
                window._pandaImageLoadArray.shift();
                IMG.onload = null;  // 解决内存泄漏和GIF图多次触发onload的问题
            }
            // 容错处理 todo 应该如何处理呢?
            // 目前是忽略这个错误，不影响正常使用
            IMG.onerror = function(){
                window._pandaImageLoadArray.shift();
                IMG.onerror = null;
            }
            return _loadImages(pics, callback, len);
        }
        return;
    }
    if(callback) _loadProgress(callback, window._pandaImageLoadArray.length, len);
}
// 监听实际的加载情况
function _loadProgress(callback, begin, all){
    var loadinterval = setInterval(function(){
        if(window._pandaImageLoadArray.length != 0 && window._pandaImageLoadArray.length != begin){
            _drawLoadProgress((begin - window._pandaImageLoadArray.length )/all);
        }else if(window._pandaImageLoadArray.length == 0){
            _drawLoadProgress(1)
            setTimeout(function(){
                callback.call(window);
            },500);
            clearInterval(loadinterval);
        }
    },300);
}
function _drawLoadProgress(w){
    var num = Math.floor(w*100) >= 100 ? 100 : Math.floor(w*100);
    // $('.loading-progress').animate({width:$('.loading').width()*num/100}, 100, 'linear');
    var load_num = 100 - num; 
    $("#loading-progress").css({
        "height": load_num + "%"
    });
    $(".loading-num span").html(num+"%");
}


// var fullpage = function(){
//     $("#sg-2014").fullpage({
//         verticalCentered: false,
//         afterRender:function(){
//             $('.section1').find('.ani-ele').addClass('dis-b');
//             $(".arr-box .txt").css("opacity","1")
//         },
//         onLeave:function(index,nextindex,direction){
//             if(direction == "up" && nextindex == 1){
//                 $(".arr-box .txt").css("opacity","1")
//             };
//             if(direction == "down"){
//                 $('.section' + nextindex).find('.ani-ele').addClass('dis-b');
//                 $(".arr-box .txt").css("opacity","0")
//             };
//         }
//     });
// }


function fullpage(){
    var mySwiper = new Swiper('.swiper-container',{
            mode: 'vertical',
            onSlideChangeEnd: function(swiper){
                oIndex = swiper.activeIndex+1;
                $('.section'+(oIndex)+ ' .ani-ele').addClass('dis-b');
            }
        });
    coverFinal();
}

function adjustBrowser(){
    var ah = $("#wrap-cover").height();
    var aw = $("#wrap-cover").width();
    if(ah>aw){
        $("#cover").css("width","100%");
        $("#cover-final").css("width","100%");
        $("#cover").css("height","auto");
        $("#cover-final").css("height","auto");
    }
    else{
        $("#cover").css("height","100%");
        $("#cover-final").css("height","100%");
        $("#cover").css("width","auto");
        $("#cover-final").css("width","auto");
    }
}


$(window).bind("resize",adjustBrowser);


function orient(){
    if(window.orientation == 90 || window.orientation == -90){
        $("#suggest-box").css("visibility","visible");
         $("#suggest-box").css("z-index","100");
    }
    else{
        $("#suggest-box").css("visibility","hidden");
        $("#suggest-box").css("z-index","-1");
    }
}

$(window).bind("orientationchange",function(){
    orient();
});

// 防止屏幕拖动
document.documentElement.addEventListener('touchmove', function (e) { e.preventDefault(); });


// 获取浏览器的可视范围的高
function getBrowserHeight(){
  return bh = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;
}

function setWrapHeight(){
    getBrowserHeight();
    var wraph = bh-bh*0.13-60 + "px";
    $(".section .wrap").css("width",wraph);
}


function coverFinal(){
    var coverbFw = $("#cover-final-box").width()*0.8 + "px";
    var coverbFh = $("#cover-final-box").height()*0.2 + "px";
    var coverrFw = $("#cover-final-box").width()*0.15 + "px";
    var coverrFh = $("#cover-final-box").height()*0.8 + "px";
    $(".section-final .cover-b-border").css("height",coverbFh);
    $(".section-final .cover-b-border").css("width",coverbFw);
    $(".section-final .cover-r-border").css("height",coverrFh);
    $(".section-final .cover-r-border").css("width",coverrFw);
}



// 手机倾斜

// $(function(){
// 	if(window.DeviceMotionEvent){
// 		window.addEventListener("devicemotion",function(){
// 			var acceleration = event.accelerationIncludingGravity;
// 		},false);
// 	}
// });