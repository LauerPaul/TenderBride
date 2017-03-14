jQuery(document).ready(function($) {
	$('#menu-toggle-left').click(function(event) {
		var body_ = $('body');
		if(body_.hasClass('nav-sm')){body_.removeClass('nav-sm')}else{body_.addClass('nav-sm')}
	});
	$('#menu-toggle-right').click(function(event) {
		var body_ = $('body');
		if(body_.hasClass('nav-md')){body_.removeClass('nav-md')}else{body_.addClass('nav-md')}
	});
});