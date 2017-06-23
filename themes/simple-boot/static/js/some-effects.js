$(document).ready(function() {

	// Use lazyload

	$(".lazy").lazyload({
		effect          : "fadeIn"
	});

	// get instagram picture from pelicanconf
	
	var href = $('.instagram-thumb').attr('href');
	$.ajax({
		url: "https://api.instagram.com/oembed/?url="+href,
		type: "GET",
		crossDomain: true,
		dataType: "jsonp",
		success: function(data){
			// console.log(data['thumbnail_url'])
			$('.bg-box-instagram').attr("data-background", 
				data['thumbnail_url']);
			$('.bg-box-instagram').lazyload({effect:"fadeIn"});
		}
	});


	// Hover effects main page

	$('.hide-content-hover').hover(function() {
		$(this).find('.content').hide();
	}, function() {
		$(this).find('.content').show();		
	});

	$('#box-texto').hover(function() { 
		$(this).find('.bg-box-3').css('background-color', '#f31d1a');
	}, function() {
		$(this).find('.bg-box-3').css('background-color', '#e31d1a');
	});


	// Call jcarousel using modernizr
	// call plugin jcarouselLazyLoading

	$('.jcarousel')
	.jcarousel({
		transitions: Modernizr.csstransitions ? {
			transforms:   Modernizr.csstransforms,
			transforms3d: Modernizr.csstransforms3d,
			easing:       'ease'
		} : false
	})
	.jcarouselAutoscroll({
		interval: 10000,
		target: '+=1',
		autostart: true
	})
	.jcarouselLazyLoading()
	.jcarouselSwipe();
});

