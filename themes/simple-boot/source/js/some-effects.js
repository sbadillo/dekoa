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
		var imgurl = 'url(' + $(this).attr('data-background') +')';
		console.log(imgurl);
		$(this).find('.bg-box-3').css('background', imgurl);
		$(this).find('.bg-box-3').css('background-size', 'cover');
				
	}, function() {
		$(this).find('.bg-box-3').css('background', '#e31d1a');
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


	// magnific popup
	$('.mfp-iframe').magnificPopup({
		type:'iframe',
		iframe: {
			markup: '<div class="mfp-iframe-scaler">'+
			'<div class="mfp-close"></div>'+
			'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
          '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

      patterns: {
       	gmaps: {
       		index: '//maps.google.',
       		src: '%id%&output=embed'
       	}
      },
  		
  		srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
		}
	});

});




