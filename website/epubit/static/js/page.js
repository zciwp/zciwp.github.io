 // ie实现placeholder
jQuery.fn.placeholder = function(){
    var i = document.createElement('input'),
        placeholdersupport = 'placeholder' in i;
    if(!placeholdersupport){
        var inputs = jQuery(this);
        inputs.each(function(){
            var input = jQuery(this),
                text = input.attr('placeholder'),
                pdl = 0,
                height = input.outerHeight(),
                width = input.outerWidth(),
                placeholder = jQuery('<span class="phTips">'+text+'</span>');
            try{
                pdl = input.css('padding-left').match(/\d*/i)[0] * 1;
            }catch(e){
                pdl = 5;
            }
            placeholder.css({'margin-left': -(width-pdl),'height':height,'line-height':height+"px",'position':'absolute', 'color': "#999", 'font-size' : "12px"});
            placeholder.click(function(){
                input.focus();
            });
            if(input.val() != ""){
                placeholder.css({display:'none'});
            }else{
                placeholder.css({display:'inline'});
            }
            placeholder.insertAfter(input);
            input.keyup(function(e){
                if(jQuery(this).val() != ""){
                    placeholder.css({display:'none'});
                }else{
                    placeholder.css({display:'inline'});
                }
            });
        });
    }
    return this;
};
jQuery('input[placeholder]').placeholder();

$(function(e){
    if (navigator.userAgent.match(/mobile/i)) {
        $('.dropdown-menu .hasSub>a').bind('touchstart',function(e){
            e.preventDefault();
            $(this).closest('.dropdown').addClass('open');
            $(this).parent().siblings().find('.sub-menu2').hide();
            $(this).next('.sub-menu2').toggle();
        });
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


