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
    isIE = navigator.userAgent.indexOf('MSIE') >= 0 ? true : false,
    start = navigator.userAgent.indexOf('MSIE')+4,
    ver = UA.substr(start,2);
    if(isIE && ver < 8){
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
    // 图书详情目录展开收起
    if ($('#directory .bookmenu').height()>333) {
        $('#directoryMore').css('display','block');
    }
    else{
        $('#directoryMore').css('display','none');
    }
    $("#directoryMore").on('click',function(e){
        e.preventDefault();
        if($(this).hasClass('extend')){
            $('#directory .inner').css({
                'max-height':'none',
                'overflow':'auto'
            });
            $(this).addClass('abridge').removeClass('extend');
            $(this).html('收起');
        }else{
            $('#directory .inner').css({
                'max-height':'333px',
                'overflow':'hidden'
            });
            $(this).addClass('extend').removeClass('abridge');
            $(this).html('点击展开全部章节');
        }

    });
})

$(document).ready(function(){
    $('.navbar .dropdown-toggle').dropdownHover().dropdown();
    $('#techCircleAll').on('click',function(){
        window.location = '技术圈.html';
    })
})


