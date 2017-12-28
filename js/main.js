$(document).ready(function() {
	// data-wow-duration - время проигрывания анимации
	// data-wow-delay - задержка перед проигрыванием анимации
	// data-wow-offset - включение анимации, когда элемент проходит определнное количество пикселей от низа экрана
	// data-wow-iteration - количество повторов анимации // infinite - бесконечно
	
	new WOW().init({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0, // включение анимации, когда элемент проходит определнное количество пикселей от низа экрана
		mobile: true,
		live: true // проверка появления новых елементов
	});

	//для таблиц в wordpress
	$('.text_page table').wrap('<div class="wrap_table"></div>');

	/*
	//Выбор даты. Используется для input type text
    $('#datepicker').datepicker({
    	dateFormat: 'dd.mm.yy',
    	changeMonth: true,
    	changeYear: true,
    	defaultDate: '17.11.2016',
    	showAnim: 'slideDown', //fadeIn
    	yearRange: '2016:2025',
    	onClose: function () {
    	},
    	onSelect: function() {
    	}	
    });
   	$('#datepicker').datepicker( 'getDate' ); // получить выбраную дату
	*/


	/*
	//Обратный отсчет
	var clock = $('.clock').FlipClock(3600, {
		language: 'ru',
		countdown: true,
		clockFace: 'DailyCounter', //other value: MinuteCounter, HourlyCounter, DailyCounter, Counter, TwelveHourClock, TwentyFourHourClock
		showSeconds: true,
		autoStart: true,
        minimumDigits: 6,
		callbacks: {
        	stop: function() {
        	},
        	start: function() {
        	},
        	interval: function() { // Периодическая функция
        	}
        },
	});
	*/


	//Чтобы использовать fancyBox3 для изображения <a href="img.jpg" data-fancybox data-caption="Caption #1"><img src="img.jpg" alt=""></a>
	//Чтобы использовать fancyBox3 для групы картинок <a href="img.jpg" data-fancybox="group" data-caption="Caption #1"><img src="img.jpg" alt=""></a>
	//Чтобы использовать fancyBox3 для модального окна нужна кнопка <button data-fancybox data-src="#id"></button> и блок <div style="display: none;" id="id"></div>
	$('[data-fancybox]').fancybox({
		focus : false
	});

	/*
	//Маска
	$('.phone_mask').mask('(999) 999-9999', {placeholder:'sdfsdf'});
	*/

	var trailerSlider = $('#trailerSlider'),
		advantagesSlider = $('#advantagesSlider');
		
	trailerSlider.owlCarousel({
		loop : true,
		nav : false,
		dots : true,
		items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        onInitialize: function (){
			var slides = $('#trailerSlider').find('.slide'),
				descriptionBox = $('.description_box .slide_description'),
				description = $('.description', slides[0]).html();
			
			descriptionBox.html(description);

        },
		onTranslate: function (elem) {
			var current = elem.item.index,
				slides = $('#trailerSlider').find('.slide'),
				descriptionBox = $('.description_box .slide_description'),
				description = $('.description', slides[current]).html();
			
			descriptionBox.html(description);

		},
		onChanged: function(elem) {

			var count = elem.item.count,
			current = elem.item.index;

			if( count == current+1){

				setTimeout( function(){
					trailerSlider.trigger('to.owl.carousel', [0,400]);
				}, 5000);

			}
		}
	});	

	// Go to the next item
	$('.trailer_slider_section .next_slide').click(function(e) {
		e.preventDefault();
		trailerSlider.trigger('next.owl.carousel', [400]);
	});
	// Go to the previous item
	$('.trailer_slider_section .prev_slide').click(function(e) {
		e.preventDefault();
		trailerSlider.trigger('prev.owl.carousel', [400]);
	});

	advantagesSlider.owlCarousel({
		loop : true,
		nav : false,
		dots : true,
		responsive:{
			0:{
				items:1
			},
			560:{
				items:2
			},
			768:{
				items:2
			},
			1200:{
				items:3
			}
		},

		onInitialized: function(){
			var maxHeight = 0;
			$('#advantagesSlider').find('.slider_content').each(function(){

				var itemHeight = parseInt( $(this).height() );
				maxHeight = (maxHeight < itemHeight ) ? itemHeight : maxHeight;
				$('.slide_full_text', this).css('display', 'none');

			});

			$('#advantagesSlider').find('.slide').css( { 'height' : maxHeight + 'px' } );
		}
	});

	// Go to the next item
	$('.our_preim_section .next_slide').click(function(e) {
		e.preventDefault();
		advantagesSlider.trigger('next.owl.carousel', [400]);
	});
	// Go to the previous item
	$('.our_preim_section .prev_slide').click(function(e) {
		e.preventDefault();
		advantagesSlider.trigger('prev.owl.carousel', [400]);
	});


	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 200) {
			$('.btn_scroll_up').fadeIn();
		} else {
			$('.btn_scroll_up').fadeOut();
		}

		var menuPosition = parseInt( $('.page_header').height() );

		if ( $(this).scrollTop() >= menuPosition - 70 ) {

			$('.nav_container').addClass('fixedPosition');

		} else if ( $(this).scrollTop() < menuPosition ) {

			$('.nav_container').removeClass('fixedPosition');

		}

		headerMenuHover();

	});
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});

	$(window).resize(function(){
		
		var containerWidth = parseInt( $(window ).width() );
		
		if( containerWidth > 768){
			$( '.nav_box .nav > ul' ).removeAttr('style');
		}

	});
	
	$('.nav_container .nav a').mPageScroll2id({
		"offset" : 75,
		"highlightClass" : "activeItem"
	});

	toggleNavBtn();
	headerMenuHover();
	cssHover();
	showSliderDescription();
	showPhotoDescription();
	loadFirstPhotoDescription();

});


function toggleNavBtn(){

	var navBtn = $( '#navBtn' ),
		dropdown = navBtn.parent().find('ul:first');

	navBtn.on( "click", function() {
		
		if( navBtn.hasClass( 'open' ) ) {

			navBtn.removeClass('open');

		} else{

			navBtn.addClass('open');

		} 

		dropdown.slideToggle();

	} );

}


function headerMenuHover() {

	var containerWidth = parseInt( $(window ).width() );
		
	if( containerWidth > 992){

		
		var menu = $('.nav_container .nav ul'),
			itemWidth = $('li', menu).width(),
			activeItem = $('.nav_container .nav ul').find('.activeItem');

		if( activeItem.length > 0){

			$('.nav_container .nav ul').removeClass('no_slide_hover');

			if( menu.find('span.hover').length == 0 ){
				menu.append("<span class='hover'></span>");
			}

			var position = activeItem.parent().index(),
				pointer = menu.find('.hover');
			
			pointer.css({'width':itemWidth+'px'});
			pointer.stop(true, true).animate({'left':position*itemWidth+'px'}, 300);

		} else {

			$('.nav_container .nav ul').addClass('no_slide_hover');

		}
	}

}

function cssHover (){

	var menu = $('.nav_container .nav ul'),
		itemWidth = $('li', menu).width(),
		pointer = menu.find('.hover');


	$('li', menu).mouseenter( function(){

		var hoverPosition = $(this).index();
		pointer.stop(true, true).animate({'left':hoverPosition*itemWidth+'px'}, 300);

	});

	$(menu).mouseleave( function(){

		activeItem = $('.nav_container .nav ul').find('.activeItem'),
		position = activeItem.parent().index();
		pointer.stop(true, true).animate({'left': position*itemWidth+'px'}, 300);

	} );

}


function showSliderDescription(){

	$('.link_show_description a').click( function(e) {
		e.preventDefault();

		var descriptionBox = $('.slide_description_container');

		if( descriptionBox.hasClass( 'is_open' ) ) {

			descriptionBox.removeClass('is_open');

		} else{

			descriptionBox.addClass('is_open');

		} 

		descriptionBox.slideToggle();

	});

}


function showPhotoDescription(){

	$('.photos_list a').click( function(e){
		e.preventDefault();

		var content = $('.photo_description_text', this).html(),
			video = $(this).attr('data-video');
		$('.video_wrapper iframe').attr('src', video);
		$('.photo_description_box').html(content);

	} );

}
function loadFirstPhotoDescription(){

	var item = $('.photos_list .item').first(),
		content = item.find('.photo_description_text').html(),
		video = item.find('a').attr('data-video');
	$('.video_wrapper iframe').attr('src', video);
	$('.photo_description_box').html(content);

}