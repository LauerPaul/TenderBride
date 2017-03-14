//----------------------------------- SCRIPTS DOCUMENT -------------------------------------
//------------------------------------------------------------------------------------------
$(document).ready(function() {
	// -------------------------------CHECKBOX AND RADIO STYLE------------------------------
	$('input[type="radio"], input[type="checkbox"]').iCheck({
		checkboxClass: 'checkbox',
		radioClass: 'radio',
		increaseArea: '20%' // optional
	});
	// ---------------------------- *CHECKBOX AND RADIO STYLE END* -------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------- SEARCH PAGE TOGGLE FILTERS -------------------------------
	$('.top_name_toggle_filter').click(function() {
		if($(window).width() > 780){
			var _this = $(this)
			if (_this.parent().hasClass('open')) {
				_this.parent().removeClass('open');
			} else {
				_this.parent().addClass('open');
			}
		}
	});
	//------------------------ *SEARCH PAGE TOGGLE FILTERS END* ----------------------------
	//--------------------------------------------------------------------------------------
	//-------------------------------- JQ UI SLIDER FILTERS --------------------------------
	$('.slider').not('[data-init]').each(function(){
		var div=$(this);
		var div_fir = $('.l_inp', div);
		var div_sec = $('.r_inp', div);
		div.attr('data-init','true');
		var min=div.data('min'), max=div.data('max'), name=div.data('name');
		var divMin=$('<span />').addClass('min').text(min).appendTo(div_fir);
		var divMax=$('<span />').addClass('max').text(max).appendTo(div_sec);
		var inputMin=$('<input />').attr('name',name+'_min').attr('type','hidden').val(min).appendTo(div);
		var inputMax=$('<input />').attr('name',name+'_max').attr('type','hidden').val(max).appendTo(div);
		var slider=$('div',div);
		$(this).data('slider',slider).data('inputMin',inputMin).data('inputMax',inputMax).data('divMin',divMin).data('divMax',divMax);
		var val_min=min, val_max=max;
		if($(this).data('value-min')) val_min=$(this).data('value-min');
		if($(this).data('value-max')) val_max=$(this).data('value-max');
		
		divMin.text(val_min);
		divMax.text(val_max);
		inputMin.val(val_min);
		inputMax.val(val_max);
		
		slider.slider({
			range:true,
			min:min,
			max:max,
			values:[val_min,val_max],
			slide:function(e,ui){
				divMin.text(ui.values[0]);
				divMax.text(ui.values[1]);
				inputMin.val(ui.values[0]);
				inputMax.val(ui.values[1]);
			},
			stop:function(){
				div.trigger('pseudoChange');
			}
		});
	});
	//----------------------------- *JQ UI SLIDER FILTERS END* -----------------------------
});