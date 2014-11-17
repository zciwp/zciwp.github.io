$(window).load(function(){
	if($('.isotope-wrapper').length){

		var $container = $('.isotope-wrapper');

		$container.isotope({
			itemSelector: '.item'
		});
	}
});

var navigation = responsiveNav(".nav-collapse", {customToggle: ".nav-toggle"});