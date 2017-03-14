jQuery(document).ready(function($) {
//------------------------------------------------------------------------------------
	//SLIDER HOME
	// $('.carousel').carousel({
	//   interval: 60000,
	//   pause: 'hover',
	//   wrap: true
	// });
	//*SLIDER HOME END*
//------------------------------------------------------------------------------------
	//SELECT FILTER
	$( ".btn-group.select" ).delegate( ".dropdown-menu > li > a", "click", function() {
		var _this = $(this);
		var _value = _this.parents('.btn-group.select').find('.value');
		var _disabled = _this.parents('.btn-group.select').find('li.disabled');
		var _wrap = _this.parents('.dropdown-menu');
		var _select = $(_this).parent().addClass('disabled');

		$(_disabled).removeClass('disabled');
		$(_wrap).prepend(_select);
		$(_value).text(_this.text());
	});
	//*SELECT FILTER END*
});	

//------------------------------------------------------------------------------------
// LOGIN / REGISTRATION TOGGLE (HOME)
function login_reg_tooggle() {
	if ($('.login-form.registretion').hasClass('hide')) {
		$('.login_reg-wrapper').removeClass('animated flipInY');
		$('.login_reg-wrapper').addClass('animated fadeOut');
		setTimeout(function() {
			$('.login_reg-wrapper').removeClass('animated fadeOut');
			$('.login-form.registretion.hide').removeClass('hide');
			$('.login-form.autoriz').addClass('hide');
			$('.login_reg-wrapper').addClass('animated fadeIn');
		}, 700)
	} else {
		$('.login_reg-wrapper').removeClass('animated fadeIn');
		$('.login_reg-wrapper').addClass('animated fadeOut');
		setTimeout(function() {
			$('.login_reg-wrapper').removeClass('animated fadeOut');
			$('.login-form.autoriz.hide').removeClass('hide');
			$('.login-form.registretion').addClass('hide');
			$('.login_reg-wrapper').addClass('animated fadeIn');
		}, 700)
	}
}
// *LOGIN / REGISTRATION TOGGLE (HOME) END*
//------------------------------------------------------------------------------------







// REMOVE
// ------------------------------------------------------------------------------ toggle popup chat_now
	$('#chat-popup .close').click(function() {
		if ($(this).parents('#chat-popup').hasClass('open')) {
			$('.wrapper-popup-chat-now').removeClass('animated flipInY');
			$('.wrapper-popup-chat-now').addClass('animated zoomOut');
			setTimeout(function() {
				$('.wrapper-popup-chat-now').hide();
				$('.wrapper-popup-chat-now').removeClass('animated zoomOut');
				$('#chat-popup').removeClass('open');
				$('.lable-popup-hide-cont-message').show();
				$('.lable-popup-hide-cont-message').addClass('animated slideInUp');
			}, 700)
		}
	});
	$('#chat-popup .lable-popup-hide-cont-message').click(function() {
		$('.lable-popup-hide-cont-message').removeClass('animated slideInUp');
		$('.lable-popup-hide-cont-message').addClass('animated slideOutDown');
		setTimeout(function() {
			$('.lable-popup-hide-cont-message').removeClass('animated slideOutDown');
			$('.lable-popup-hide-cont-message').hide();
			$('.wrapper-popup-chat-now').show();
			$('.wrapper-popup-chat-now').addClass('animated flipInY');
			$('#chat-popup').addClass('open');
		}, 700)
	});


