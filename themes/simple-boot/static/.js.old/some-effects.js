$(document).ready(function() {


	// get instagram picture from pelicanconf
	var href = $('.instagram-thumb').attr('href');
	$.ajax({
		url: "https://api.instagram.com/oembed/?url="+href,
		type: "GET",
		crossDomain: true,
		dataType: "jsonp",
		success: function(data){
			console.log(data['thumbnail_url'])
			$('.bg-box-instagram').attr("data-background", 
				data['thumbnail_url']);
			$('.bg-box-instagram').lazyload({effect:"fadeIn"});
		}
	});


	// use lazyload
	$(".lazy").lazyload({
		effect          : "fadeIn"
	});


	// hover effects main
	$('.hide-content-hover').hover(function() {
		$(this).find('.content').hide();
	}, function() {
		$(this).find('.content').show();		
	});

	$('#box-texto').hover(function() { 
		$(this).find('.bg-box-3').fadeTo(100, 0.7);
	}, function() {
		$(this).find('.bg-box-3').fadeTo(100, 1);
	});



});

