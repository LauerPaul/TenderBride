//--------------------------------------------------------------------------------------
//----------------------------- More TOGGLE USER PANEL ---------------------------------
$(document).on('click', function(e) {
	if (!$(e.target).closest("#user-panel .setup-menu-more-userpanel-hide, #user-panel .more-option-userpanel").length && $('#user-panel .more-option-userpanel').hasClass('open')) {
		$('#user-panel .setup-menu-more-userpanel-hide').removeClass('animated slideInLeft');
		$('#user-panel .setup-menu-more-userpanel-hide').addClass('animated slideOutLeft');
		setTimeout(function() {
			$('#user-panel .setup-menu-more-userpanel-hide').removeClass('animated slideOutLeft');
			$('#user-panel .setup-menu-more-userpanel-hide').css('display', '')
			$('#user-panel .more-option-userpanel').removeClass('open');
		}, 1000);
	} else if ($(e.target).closest("#user-panel .more-option-userpanel").length && !$(e.target).closest("#user-panel .setup-menu-more-userpanel-hide").length) {
		var _this = $('#user-panel .more-option-userpanel');
		if (_this.hasClass('open')) {
			$('#user-panel .setup-menu-more-userpanel-hide').removeClass('animated slideInLeft');
			$('#user-panel .setup-menu-more-userpanel-hide').addClass('animated slideOutLeft');
			setTimeout(function() {
				$('#user-panel .setup-menu-more-userpanel-hide').removeClass('animated slideOutLeft');
				$('#user-panel .setup-menu-more-userpanel-hide').css('display', '')
				_this.removeClass('open');
			}, 1000);
		} else {
			$('#user-panel .setup-menu-more-userpanel-hide').css('display', 'block');
			$('#user-panel .setup-menu-more-userpanel-hide').addClass('animated slideInLeft');
			_this.addClass('open')
		}
	}
	e.stopPropagation();
});
//-------------------------- *More TOGGLE USER PANEL END* ------------------------------
//--------------------------------------------------------------------------------------