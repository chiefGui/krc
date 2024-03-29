jQuery(document).ready(function($) {
	'use strict';

	$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(350).fadeOut('slow');
	});

	$('#sidebar-button, #overlay').click(function() {
		$('.portfolio-full').removeClass('portfolio-open');
		$('#top').removeClass('portfolio-open');
		$('#sidebar-button').toggleClass('open');
		$('body').toggleClass('sidebar-open');
		return false;
	});

	$('#mainmenu ul > li:has(ul)').each(function() {
		$(this).addClass('expandable');
	});

	$('#mainmenu ul > li:has(ul) > a').click(function() {
		$(this).parent('li').toggleClass('expanded');
		$(this).parent('li').children('ul').slideToggle();
		return false;
	});

	var swiper = [];
	$('.swiper').each(function(i,obj){
		swiper[i] = new Swiper(obj, {
			loop: true,
			calculateHeight: true
		});
		$(this).children('.nav-left').on('click', function(e){
			e.preventDefault();
			swiper[i].swipePrev();
		});
		$(this).children('.nav-right').on('click', function(e){
			e.preventDefault();
			swiper[i].swipeNext();
		});
	});

	var fSwiper = new Swiper('#fullscreen-slider',{
		onSwiperCreated: function() {
			if ($('#fullscreen-slider .swiper-slide-active').has('video').length) {
				$('#fullscreen-slider .swiper-slide-active video').get(0).play();
			}
		},
		onSlideChangeStart: function() {
			$('#fullscreen-slider .swiper-slide').each(function() {
				if ($(this).has('video').length) {
					$(this).children('video').get(0).pause();
				}
			});
			if ($('#fullscreen-slider .swiper-slide-active').has('video').length) {
				$('#fullscreen-slider .swiper-slide-active video').get(0).play();
			}
			if (fSwiper.activeIndex == 0) {
				$('#nav-arrows .nav-left').addClass('hidden');
			} else {
				$('#nav-arrows .nav-left').removeClass('hidden');
			}
			if (fSwiper.activeIndex == (fSwiper.slides.length - 1)) {
				$('#nav-arrows .nav-right').addClass('hidden');
			} else {
				$('#nav-arrows .nav-right').removeClass('hidden');
			}
		}
	});
	$('#nav-arrows .nav-left').on('click', function(e){
		e.preventDefault();
		fSwiper.swipePrev();
	});
	$('#nav-arrows .nav-right').on('click', function(e){
		e.preventDefault();
		fSwiper.swipeNext();
	});
	function resizeToCover() {
		$('#fullscreen-slider .swiper-slide').each(function() {
			if ($(this).has('video').length) {
				var vid_w_orig = parseInt($(this).find('video').attr('width'));
				var vid_h_orig = parseInt($(this).find('video').attr('height'));
				var container_w = $(this).width();
				var container_h = $(this).height();
				var scale_h =  container_w / vid_w_orig;
				var scale_v =  container_h / vid_h_orig;
				var scale = scale_h > scale_v ? scale_h : scale_v;
				$(this).find('video').width(scale * vid_w_orig);
				$(this).find('video').height(scale * vid_h_orig);
				$(this).find('video').css('left', ((container_w - scale * vid_w_orig) / 2));
				$(this).find('video').css('top', ((container_h - scale * vid_h_orig) / 2));
			}
		});
	}
	resizeToCover();

	$(window).resize(function() {
		resizeToCover();
	});

	$('#content').scroll(function(){
		if ($('#content').scrollTop() > 0) {
			$('#top').addClass('shadow');
		} else {
			$('#top').removeClass('shadow');
		}
	});
	$('.masonry-3').masonry({
		itemSelector: 'article',
		columnWidth: '.col-4'
	});
	$('.masonry-4').masonry({
		itemSelector: 'article',
		columnWidth: '.col-3'
	});
	$('.isotope').isotope({
		resizable: 'false',
		itemSelector: '.isotope-item',
		masonry: {
			columnWidth: colW()
		}
	});

	function colW() {
		var colN;
		if ($('.isotope').hasClass('isotope-2')) {
			colN = 2;
		} else if ($('.isotope').hasClass('isotope-3')) {
			colN = 3;
		} else {
			colN = 4;
		}
		var colW = Math.floor($('.isotope').width() / colN);
		$('.isotope').find('.isotope-item').each(function() {
			$(this).css({
				width: colW
			});
		});
		return colW;
	}

	$(window).smartresize(function(){
		$('.isotope').isotope({
			masonry: {
				columnWidth: colW()
			}
		});
	});

	$('.filter-dropdown ul li').click(function(){
		var selector = $(this).attr('data-filter');
		$('.isotope').isotope({
			filter: selector
		});
	});

	$('.filter-dropdown').click(function(){
		$(this).toggleClass('open');
	});

	$('.filter-dropdown ul li').click(function(){
		$(this).parent('ul').prev('.selected').children('span.val').text($(this).text());
	});

	$('article.portfolio a').click(function() {
		var itemID = $(this).attr('href');
		$('#top').addClass('portfolio-open');
		$(itemID).addClass('portfolio-open');
		return false;
	});
	$('#portfolio-close').click(function() {
		$('.portfolio-full').removeClass('portfolio-open');
		$('#top').removeClass('portfolio-open');
		return false;
	});

	// $('#contact-form').submit(function() {
	// 	$.post('send.php', $(this).serialize(), function(data){
	// 		$('#contact-form').html('<p>' + data + '</p>');
	// 	});
	// 	return false;
	// });

});(jQuery);