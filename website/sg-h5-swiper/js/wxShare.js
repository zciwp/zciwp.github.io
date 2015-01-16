var imgUrl = 'http://zciwp.github.io/website/sg-h5-swiper/img/logo-w.png';
var lineLink = location.href;
var descContent = "123";
var shareTitle = document.title;
var appid = '';

function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
        "appid": appid,
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function(res) {})
}

function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function(res) {});
}

function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo', {
        "content": descContent,
        "url": lineLink,
    }, function(res) {});
}
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        shareFriend();
    });
    WeixinJSBridge.on('menu:share:timeline', function(argv) {
        shareTimeline();
    });
    WeixinJSBridge.on('menu:share:weibo', function(argv) {
        shareWeibo();
    });
}, false);