$(function(e){
    if (navigator.userAgent.match(/mobile/i)) {
        $('.dropdown-menu .hasSub>a').bind('touchstart',function(e){
            e.preventDefault();
            $(this).closest('.dropdown').addClass('open');
            $(this).parent().siblings().find('.sub-menu2').hide();
            $(this).next('.sub-menu2').toggle();
        });
    }
    var UA = navigator.userAgent,
    start = navigator.userAgent.indexOf('MSIE')+4,
    ver = UA.substr(start,2);
    if(ver < 8){
        window.location.href = "warnpage.html";
    }
    //图书分类
    $('.maintab a').bind('click',function(){
        $('.tab-content li').removeClass('active');
        $('.endpane').removeClass('active');
    });
    $('.subtab a').bind('click',function(){
        $('.endpane li').removeClass('active');
    });
    // 移动端图书分类
    $('.book-page #mobi-tablst .dropdown-menu a').bind('click',function(e){
        e.preventDefault();
        $('.book-page #mobi-tablst #drop4 .txt').html($(this).html());
    })
})


