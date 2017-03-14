if($('html').hasClass('inChat')){}else{console.log('NOchat')}
var inAdmin=(document.location.pathname.indexOf('/admin/')==0);
$(document).ready(function(){
	
	if($('html').hasClass('tablet') || $('html').hasClass('mobile') || $('html').hasClass('android')){

		if(sessionStorage.getItem('mobile_version')==null){
			sessionStorage.setItem('mobile_version', 'show');
			}
		
		if(sessionStorage.getItem('mobile_version')=='show'){		
		$('.message_for_mobile').css('display', 'block');
		$('.message_for_mobile > span').click(function(){
			$('.message_for_mobile').remove();
			sessionStorage.setItem('mobile_version', 'hide');
		});
		
		}
		
	}
	
	
	if(!inAdmin) topPanel.init();
	if(!inAdmin) tooltip.init();
	if(!inAdmin) scrollAssistance.init();
	if(!inAdmin) siteFrm.init();
	if(!inAdmin){
		$(document).on('click','a[href^="#"]',function(){
			var p=$($(this).attr('href'));
			if(p.size()>0){
				popup.show($(this).attr('href'));
				return false;
			}
		});
	}
	
	var sc=$('#site-content').outerHeight(), th=$('#top-header').outerHeight(), f=$('#footer').outerHeight();
	function setSW(){
		var winHeight=$(window).height();
		if(winHeight>sc+th+f){
			$('#site-content').css('min-height',(winHeight-f-th-80)+'px');
		}
	}
	setSW();
	$(window).on('resize.setsw',function(){
		setSW()
	});
	
	height100Container.init();
	eScroll.init();
	specialActionsButton.init();
	smiles.init();
	
	var hash=document.location.hash.toString();
	if(hash.indexOf('getFocus')>-1) $('#top-header .logo a').focus();
	
	$('.hide-contact-list').click(function(){
		if($('div#newchat-contacts-list').width()>0){
			$('div#newchat-contacts-list').animate({width: '0%'},700);
			$(this).html('<< <span>My contact list: '+$('div#newchat-contacts-list span.cnt').text()+'</span>');
			$('.newchat-chat-window').animate({width: '100%'},700);
			$('.newchat-contacts-list .items').css('display','none');
			$('.newchat-contacts-list .title').css('display','none');
			$('.newchat-chat-window .bottom-block .right-column button').css({'min-height': '27px'});
			$('.newchat-chat-window .bottom-block .right-column button').css({'margin-top': '0px'});
			$('.newchat-chat-window .bottom-block .textarea').animate({'margin-right': '130px'},700);
		}else{
			
			if($(window).width()<499){
				$('.newchat-online-list > .items .item').animate({'opacity':'0'},500);
				$('.newchat-online-list').animate({width: '0px'},700);
				$('.newchat-main-wrapper').animate({left: '0px'},700);
				var str= $('.newchat-users-list .title span.cnt').text()
				$('span.hide-online-list').html('>> <span>Girls Online: '+ str.substring(0, str.length - 1)+'</span>');
				setTimeout(function(){
					$('.newchat-online-list > .items .item').css('display','none');
					$('.newchat-online-list > .items').css('display','none');
					$('.newchat-online-list > .title').css('display','none');
			});
			}
			
			
			$('div#newchat-contacts-list').animate({width: '32%'},700);
			$(this).text('>>');
			$('.newchat-chat-window').animate({width: '68%'},700);
			$('.newchat-chat-window .bottom-block .textarea').animate({'margin-right': '95px'},700);
			setTimeout(function(){
			$('.newchat-contacts-list .items').css('display','block');
			$('.newchat-contacts-list .title').css('display','block');
			$('.newchat-chat-window .bottom-block .right-column button').css({'min-height': '35px'});
			$('.newchat-chat-window .bottom-block .right-column button').css({'margin-top': '-7px'});
			},600)
		}
	
	});
	if($(window).width()<681){
		$('.hide-contact-list').html('<< <span>My contact list: '+$('div#newchat-contacts-list span.cnt').text()+'</span>');
	}
	$('span.hide-online-list').click(function(){
		
		if($('.newchat-online-list').width()>0){
			sessionStorage.setItem('height_online_block',$('.newchat-users-list .items').height());
			$('.newchat-users-list .items').css({'height': sessionStorage.height_online_block});
			$('.newchat-users-list .items').css({'overflow':'hidden'});
			
			$('.newchat-online-list > .items .item').animate({'opacity':'0'},500);
			$('.newchat-online-list').animate({width: '0px'},700);
			$('.newchat-main-wrapper').animate({left: '0px'},700);
			var str= $('.newchat-users-list .title span.cnt').text()
			$(this).html('>> <span>Girls Online: '+ str.substring(0, str.length - 1)+'</span>');
			setTimeout(function(){
				$('.newchat-online-list > .items .item').css('display','none');
				$('.newchat-online-list > .items').css('display','none');
				$('.newchat-online-list > .title').css('display','none');
			},400);
			
			
		}else{
			
			$('.newchat-online-list > .items .item').animate({'opacity':'1'},500);
			if($(window).width()<680 && $(window).width()>501){
				$('.newchat-online-list').animate({width: '156px'},700);
			}else{
				$('.newchat-online-list').animate({width: '32%'},700);
			}
			$('.newchat-main-wrapper').animate({left: '156px'},700);
			$(this).text('<<');
			setTimeout(function(){
				$('.newchat-online-list > .items .item').css('display','block');
				$('.newchat-online-list > .items').css('display','block');
				$('.newchat-online-list > .title').css('display','block');
				
			},400);
			
			if($(window).width()<499){
				$('div#newchat-contacts-list').animate({width: '0%'},700);
				$('.hide-contact-list').html('<< <span>My contact list: '+$('div#newchat-contacts-list span.cnt').text()+'</span>');
				$('.newchat-chat-window').animate({width: '100%'},700);
				$('.newchat-contacts-list .items').css('display','none');
				$('.newchat-contacts-list .title').css('display','none');
				$('.newchat-chat-window .bottom-block .right-column button').css({'min-height': '27px'});
				$('.newchat-chat-window .bottom-block .right-column button').css({'margin-top': '0px'});
				$('.newchat-chat-window .bottom-block .textarea').animate({'margin-right': '130px'},700);
			}
		}
	});
});

jQuery(function($){
	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '&#x3c;Пред',
		nextText: 'След&#x3e;',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader: 'Не',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};

	$.datepicker.regional['en'] = {
		closeText: 'Done',
		prevText: 'Prev',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};

	$.datepicker.setDefaults($.datepicker.regional[sLang]);
});

var scrollAssistance={
    init:function(){
        $('#1-uslugi-1-1').click(function(){
            $('html, body').animate({
                scrollTop: $(".assist-div-1").offset().top -51
            }, 500);
        });
        $('#1-uslugi-2').click(function(){
            $('html, body').animate({
                scrollTop: $(".assist-div-2").offset().top -51
            }, 500);
        });
        $('#1-uslugi-3').click(function(){
            $('html, body').animate({
                scrollTop: $(".assist-div-3").offset().top -51
            }, 500);
        });
        $('#1-uslugi-4').click(function(){
            $('html, body').animate({
                scrollTop: $(".assist-div-4").offset().top -51
            }, 500);
        });
        $('#1-uslugi-5').click(function(){
            $('html, body').animate({
                scrollTop: $(".assist-div-5").offset().top -51
            }, 500);
        });
    }
}
var tooltip={
	init:function(){
		$('*[data-tooltip]').each(function(){
			var o=$(this);
			var text=o.data('tooltip');
			o.attr('data-tooltip-text',text).data('tooltip-text',text).removeAttr('data-tooltip');
			
			var pos='top';
			if($(this).data('tooltip-pos')) pos=$(this).data('tooltip-pos');
			
			var tooltip=$('<div class="tooltip">'+text+'</div>');
			
			switch(pos){
				case 'bottom': tooltip.addClass('bottom');
			}
			
			o.off('mouseenter mouseleave').on({
				mouseenter:function(){
					if($(this).data('tooltip-show')!='undefined'){
						$(this).data('tooltip-show',$(this).data('tooltip-show')-1);
						if($(this).data('tooltip-show')<0) return false;
					}
					$('body').append(tooltip);
					var left, top;
					var left=o.offset().left+o.outerWidth()/2-18
					switch(pos){
						case 'bottom': top=o.offset().top+o.outerHeight()+10; break;
						default: top=o.offset().top-tooltip.outerHeight()-10; break;
					}
					tooltip.css({left:left+'px',top:top+'px'});
				},
				mouseleave:function(){
					tooltip.remove();
				}
			})
		});
	}
}

var popup={
	num:0,
	show:function(e,callback,callback2,onclose){
		if(!callback) callback=function(){ }
		if(!callback2) callback2=function(){ }
		if(!onclose) onclose=function(){ }
		this.num++;
		$(e).get(0).customParent = $(e).get(0).parentNode;
		p=$(e);//.clone(true);
		this.setShawl(p,callback,callback2,onclose);
	},
	setShawl:function(p,callback,callback2,onclose){
		var _this=this;
		if($('#popup-shawl').size()==0){
			var body=$('body');

			body.addClass('lock');
			var w = $(document).width();
			body.removeClass('lock');
			w -= $(document).width();
			body.addClass('lock').attr('style', 'margin-right:' + w + 'px');
			
			$('<div />')
                .attr('id', 'popup-container')
                .append($('<div />').attr('id','popup-wrapper'))
                .on('click', function(e){
                    if( e.target.id == 'popup-container' ) {
                        _this.close(p);
                    }
                })
                .appendTo(body);
			$('<div />').attr('id','popup-shawl').css('opacity',0).appendTo(body).animate({opacity:0.5},200,function(){
				_this.showPopup(p,callback,callback2);
			});
			$(window).on('resize.popupSetpos',function(){
				_this.setPos();
			});
			$(window).on('keydown.popupClose',function(e){
				if(e.keyCode==27) _this.close();
			});
		} else {
			this.close({notRemove:true});
			_this.showPopup(p,callback,callback2);
		}
	},
	showPopup:function(p,callback,callback2,onclose){
		p=$(p);
		if(!callback) callback=function(){};
		if(!callback2) callback2=function(){};
		p.addClass('popup').data('number',this.num).appendTo($('#popup-wrapper')).css({opacity:0,float:'left'}).animate({opacity:1},500,function(){
			callback2(p);
		});
		//p.width(p.outerWidth(true)).css('float','none');
		this.setPos(p);
		var _this=this;
		$('.close',p).click(function(){
			_this.close(p);
		});
		siteFrm.init();
		callback(p);
	},
	oldTop:-50,
	setPos:function(p){
		if($(p).size()==0) p=$('#popup-wrapper .popup:visible');
		var wh=$(window).height(), h=p.outerHeight();
		var top = wh / 2 - h / 2;
		if (top < 10) top = 10;
		if (top != this.oldTop) {
			p.css('margin-top', top + 'px');
			this.oldTop = top;
		}
	},
	tot: null,
	autoPos:function(p){
		var t = 0, i = 0;
		var _this = this;
		if (this.tot){
			window.clearInterval(this.tot);
			this.tot=null;
		}
		
		if($(p).size()==0) p=$('#popup-wrapper .popup:visible');
		
		this.tot = window.setInterval(function () {
			_this.setPos(p);
			if (_this.oldTop == t) i++;
			t = _this.oldTop;
			if (i >= 100) {
				window.clearInterval(_this.tot);
				_this.tot=null;
			}
		}, 1);
	},
	opened:[],
	close:function(setting){
		if(!setting) setting={p:null};
		var p=$(setting.p);
		if(p.size()==0) p=$('#popup-container .popup:visible');
		if(!setting.notRemove){
			var func=function(p){ }
			if(p.data('func')) func=p.data('func');
			if(p.get(0).customParent){p.get(0).customParent.appendChild(p.get(0));}
			//p.remove();
			if(this.opened.length==0){
				$(window).off('resize.popupSetpos');
				$(window).off('keydown.popupClose');
				$('#popup-container').remove();
				$('#popup-shawl').remove();
				$('body').removeClass('lock').css('margin-right',0);
				func();
			} else {
				this.showPopup(this.opened.pop(),null,null);
			}
			this.oldTop=-50;
		} else {
			this.opened.push(p);
			if(p && p.get(0)){
				p.get(0).customParent.appendChild(p.get(0));
			}
			//p.remove();
		}
	},
	showError:function(sText,sTitle){
		
		if(!sText) sText='You have no credits. Please, buy credits to do this.<br /><br /> <a class="striped-button" href="'+GLOBAL_user_uri+'/buy/">Buy credits</a> <a class="close striped-button">Close</a>';
		if(!sTitle) sTitle=lng.lang('Error','Ошибка');
		
		var div=$('<div />').addClass('popup').width(300);
		var title=$('<div />').addClass('title').text(sTitle).appendTo(div);
		$('<span />').addClass('close').appendTo(title);
		$('<div />').addClass('content').html(sText).appendTo(div);
		popup.show(div);
	}
}





var siteFrm={
	init:function(){
		this.rememberInit();
		this.regFormInit();
		this.chosenInit();
		this.maskInit();
		this.iCheckInit();
		this.selectorInit();
		this.multiSelectorInit();
		this.sliderInit();
		this.validation.init();
		this.autoCompleteInit();
		this.blinkInit();
		this.calendarInit();
		
		$('form[data-auto-target]').each(function(){
			$(this).data('target',$(this).data('auto-target')).removeAttr('data-auto-target');
			$(this).submit(function(){
				if(!$(this).data('error')){
					var f=$(this);
					var cObj = f.find(".g-recaptcha:not(:hidden)");
					var cKey = cObj.attr("str-id");
					var CID = cObj.attr("id");
					if(!isNaN(parseInt(cKey))){
						console.log("Капча");
						$(".g-recaptcha").removeClass("error-red");
						//alert(CID);
						var currentWidget = widgetList[CID];
						//alert(currentWidget);
						var Response = grecaptcha.getResponse(currentWidget);
						//alert(Response);
						if(Response.length == 0){
							console.log("Robot");
							$(".g-recaptcha").addClass("error-red");
							$('.worked',f).removeAttr('disabled').removeClass('worked');
							//f.trigger("reset");
							return false;
						}
						else{
							console.log("No Robot");
							$.post(f.data('target'),f.serialize(),function(){
								$('.worked',f).removeAttr('disabled').removeClass('worked');
								f.trigger("reset");
								grecaptcha.reset(currentWidget);
							},'script');
							/*
							$.post("/js/html/recaptcha/", {"action": "check", "resp": Response}, function(data){
								console.log(data);
								if(data.success){
									console.log("Recaptcha OK");
									
								}
								else{
									console.log("Recaptcha ERROR");
									alert("Recaptcha error");
									$('.worked',f).removeAttr('disabled').removeClass('worked');
									grecaptcha.reset();
								}
							}, 'json');
							*/
						}
						
						return false;
					}
					else{
						console.log("Нет капчи");
						$.post(f.data('target'),f.serialize(),function(){
							$('.worked',f).removeAttr('disabled').removeClass('worked');
							f.trigger("reset");
						},'script');
					}
					return false;
				}
			});
		});
		
		$('[placeholder]').focus(function(){
			$(this).data('real-placeholder',$(this).attr('placeholder')).removeAttr('placeholder');
		}).blur(function(){
			$(this).attr('placeholder',$(this).data('real-placeholder'));
		});
		
	},
	calendarInit:function(){
		$('input.calendar').removeClass('calendar').each(function(){
			$(this).datepicker({
				changeMonth:true,
				changeYear:true,
				onSelect:function(){
					if($(this).data('time')) $(this).val($(this).val()+' '+$(this).data('time'));
				}
			});
		})
	},
	blinkInit:function(){
		$('.blink').not('[data-blink-init]').each(function(){
			var o=$(this);
			o.attr('data-blink-init',true);
			var tot=window.setInterval(function(){
				o.toggleClass('blink-opa');
			},400);
			o.data('blinkTot',tot);
		});
	},
	multiSelectorInit:function(){
		$('.milti-selector').each(function(){
			var select=$(this);
			
			var dropdown=$('.dropdown',this);
			$('a.item',this).click(function(){
				if(!$(this).hasClass('disabled')){
					$(this).toggleClass('active');
					select.trigger('setValues');
					select.trigger('updateValue');
					if(!$('a.item.active',dropdown).size()){
						$('a.all',dropdown).addClass('active');
					} else {
						$('a.all',dropdown).removeClass('active');
					}
				}
				return false;
			});
			$('a.all',this).click(function(){
				$('a.active',dropdown).removeClass('active');
				$(this).addClass('active');
				select.trigger('setValues');
				select.trigger('updateValue');
			});
			
			$('.chosen-single',select).click(function(){
				select.toggleClass('active chosen-with-drop');
				dropdown.slideToggle(200);
			});
			
			/*
			select.click(function(){
				select.addClass('active chosen-with-drop');
				dropdown.slideDown(200);
				if(!select.data('isClick')){
					select.data('isClick',true);
					window.setTimeout(function(){
						$(document).on('click.hideDropdown',function(){
							select.removeClass('active chosen-with-drop');
							$(document).off('click.hideDropdown');
							select.data('isClick',false);
							dropdown.slideUp(200);
						});
					},1);
				}
			});
			*/
			
			$(this).on('updateValue',function(){
				$(this).trigger('setNames');
			});
			
			$(this).on('setNames',function(){
				var dropdown=$('.dropdown',this);
				var value='';
				if($('a.active',dropdown).not('.all').size()==0){
					value=$(this).data('default');
				} else {
					var names=[];
					$('a.item.active',dropdown).each(function(){
						names.push($.trim($(this).text()));
					});
					value=names.join(', ');
				}
				$('.value span',this).html(value);
			});
			
			$(this).on('setValues',function(){
				var dropdown=$('.dropdown',this);
				var values=[];
				$('a.item.active',dropdown).each(function(){
					values.push($(this).data('value'));
				});
				$(this).data('values',values);
			});
			
			
			select.trigger('setValues');
		});
	},
	autoCompleteInit:function(){
		$('input.autocomplete').each(function(){
			var opt={};
			opt.source=$(this).data('autocomplete-url');
			opt.autoFocus=true;
			$(this).autocomplete(opt);
		});
	},
	sliderInit:function(){
		$('.slider').not('[data-init]').each(function(){
			var div=$(this);
			div.attr('data-init','true');
			var min=div.data('min'), max=div.data('max'), name=div.data('name');
			var divMin=$('<span />').addClass('min').text(min).appendTo(div);
			var divMax=$('<span />').addClass('max').text(max).appendTo(div);
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
	},
	rememberInit:function(){
		$('.remember-checked[name]').each(function(){
			$(this).removeClass('remember-checked');
			var name='remember_'+$(this).attr('name');
			var val=utils.getVal(name);
			if(val && val=='1') $(this).prop('checked',true);
			if(val && val=='0') $(this).prop('checked',false);
			$(this).change(function(){
				var val='0';
				if($(this).is(':checked')) val='1';
				utils.saveVal(name,val);
			});
		});
	},
    regFormInit: function(){
        var $form = $('#registration');
        $('.item-gen-pass input[name="gen_pass"]', $form).on('change', function() {
            if(this.checked){
                $('#popup-wrapper .register .item-ico-pass').hide().find('input[name^="pass"]').val(function(){
                    return $(this).data('pass');
                }).removeAttr('required');
            } else {
                $('#popup-wrapper .register .item-ico-pass').show().find('input[name^="pass"]').val('').attr('required', 'required');
            }
        });
    },
	chosenInit:function(){
		$('select.chosen-select').chosen({disable_search_threshold:10}).removeClass('chosen-select');
	},
	maskInit:function(){
		$('input[data-mask]').each(function(){
			$(this).mask($(this).data('mask')).removeAttr('data-mask');
		})
	},
	iCheckInit:function(){
		if(!$.fn.iCheck) return false;
		/*
		$('input:visible').filter(':checkbox').not('.i-chek-init').addClass('i-chek-init').iCheck({
			checkboxClass: 'icheckbox_flat-grey',
			radioClass: 'iradio_flat-grey'
		}).on('ifChanged',function(){
			$(this).trigger('change');
		});
		*/
		$('input:visible').filter(':checkbox').not('.i-chek-init').addClass('i-chek-init').each(function(){
			$(this).iCheck({
				checkboxClass: 'icheckbox_flat-grey',
				radioClass: 'iradio_flat-grey'
			}).on('ifChanged',function(){
				$(this).trigger('change');
			});
		})
	},
	selectorInit:function(){
		$('.one-selector').not('[data-init]').each(function(){
			var div=$(this);
			$(this).attr('data-init','true');
			var input=$('input',this);
			input.val($('a.active',this).data('value'));
			$('a',this).click(function(){
				if($(this).hasClass('active')) return false;
				$('a.active',div).removeClass('active');
				$(this).addClass('active');
				input.val($(this).data('value'));
				div.trigger('pseudoChange');
				return false;
			});
		});
		
		$('.checkbox-selector').not('[data-init]').each(function(){
			$(this).attr('data-init','true');
			$('a',this).click(function(){
				$(this).toggleClass('active');
				var val=0;
				if($(this).hasClass('active')) val=1;
				$('input',this).val(val);
				$(this).trigger('pseudoChange');
			});
		});
	},
	validation:{
		init:function(){
			var _this=this;
			$('form').each(function(){
				_this._init(this);
			});
		},
		_init: function (f) {
			f = $(f);
			if(f.data('isInit')) return false;
			f.data('isInit',true);
			var _this = this;
	
			$('*[required]', f).not(':checkbox').removeAttr('required').addClass('required');
			this.checkRequired(f);
			//this.checkMinLength(f);
			//this.checkIdentical(f);
	
			f.submit(function(e){
				var error = (!_this.checkRequired(this, true) || !_this.checkMinLength(this, true) || !_this.checkIdentical(this, true));
				var error = (!_this.checkRequired(this, true));
				$(this).data('error', error);
				
				if(!error){
					FLTR.returnType = "list"
					FLTR.frmReplace(f);
					f.trigger('successSubmit');
					$('[type="submit"]',f).attr('disabled','disabled').addClass('worked');
				}
				return !error;
			});
		},
	
	
		checkRequired: function (f, isSubmit) {
			var error = false;
			var _this = this;
			$('.required', f).each(function () {
				if (!$(this).data('requiredReady')) {
					$(this).data('requiredReady', true);
					$(this).focus(function () {
						_this.removeError(this);
					});
					$(this).on('change', function () {
						var input = $(this);
						if(input.hasClass('required')){
							window.setTimeout(function () { // mask bug
								if ($.trim(input.val()) == '') {
									_this.setError(input, input.data('required-error'),'required');
								} else {
									if(input.attr('type')=='email'){
										var re=	/.+?@.+?\..+?/i;
										if(re.test(input.val())){
											_this.setSuccess(input);
										} else {
											_this.setError(input, input.data('required-error'),'email');
										}
									} else {
										_this.setSuccess(input);
									}
								}
							}, 1);
						}
					});
				}
				if ($.trim($(this).val()) != '' || (isSubmit && !$(this).data('autocomplete-url'))){
					$(this).trigger('change');
				}
				if ($.trim($(this).val()) == '') error = true;
			});
			return (!error);
		},
	
		checkMinLength: function (f, isSubmit) {
			var error = false;
			var _this = this;
			$('*[data-min-length]', f).each(function () {
				if (!$(this).data('requiredMinLength')) {
					$(this).data('requiredMinLength', true);
					$(this).focus(function () {
						_this.removeError(this);
					});
					$(this).blur(function () {
						var input = $(this);
						window.setTimeout(function () {
							if ($.trim(input.val()).length < input.data('min-length')) {
								_this.setError(input, input.data('min-length-error') || 'Минимальное кол-во символов &mdash; ' + input.data('min-length'),'min-length',{min:input.data('min-length')}); 
							}
						}, 2);
					});
				}
				if ($.trim($(this).val()) != '' || isSubmit) $(this).trigger('blur');
				if ($.trim($(this).val()).length < $(this).data('min-length')) error = true;
			});
			return (!error);
		},
	
		checkIdentical: function (f, isSubmit) {
			var error = false;
			var _this = this;
			$('*[data-identical]', f).each(function () {
				var main = $(this).closest('form').find('[name="' + $(this).data('identical') + '"]');
				if (!$(this).data('requiredIdentical')) {
					$(this).data('requiredIdentical', true);
					$(this).focus(function () {
						_this.removeError(this);
					});
					$(this).blur(function () {
						var input = $(this);
						window.setTimeout(function () {
							if (input.val() != main.val()) {
								_this.setError(input, $(input).data('identical-error') || 'Значения полей не совпадают','identical');
							}
						}, 3);
					});
				}
				if ($.trim($(this).val()) != '' || isSubmit) $(this).trigger('blur');
				if ($(this).val() != main.val()) error = true;
			});
			return (!error);
		},
	
		setError:function(e,text,type,data){
			e = $(e);
			if(!text || text==''){
				switch(type){
					case 'required': text=lng.lang('This field is required','Заполните поле'); break;
					case 'email': text=lng.lang('Bad E-mail','Неверный E-mail'); break;
				}
			}
			this.removeSuccess(e);
			e.addClass('error');
			var item = e.closest('.item');
			item.addClass('item-error');
			if (text && $('.error-message', item).size() == 0) e.before('<div class="error-message">' + text + '</div>');
		},
		removeError: function (e) {
			e = $(e);
			e.removeClass('error');
			var item = e.closest('.item');
			item.removeClass('item-error');
			$('.error-message', item).remove();
		},
		setSuccess: function (e) {
			e = $(e);
			this.removeError(e);
			e.addClass('success');
			e.closest('.item').addClass('item-success');
		},
		removeSuccess: function (e) {
			e = $(e);
			e.removeClass('success');
			e.closest('.item').removeClass('item-success');
		}
	}
}




var utils={
	setText:function(selector,html){
		$(selector).slideUp(function(){
			$(this).html(html).slideDown();
		});
		var p=$('.popup:visible');
		if(p.size()>0) popup.autoPos(p);
	},
	getUrl:function(url,params,setting){
		return url+'?'+$.param(params)+'&'+new Date().getTime();
	},
	replaceTags:function(str){
		str=str.replace(/</g,'&lt;');
		str=str.replace(/>/g,'&gt;');
		str=str.replace(/\n/g,'<br />');
		return str;
	},
	saveVal:function(name,value){
		if(typeof(localStorage)!=='undefined') localStorage[name]=value;
	},
	getVal:function(name){
		if(typeof(localStorage)!=='undefined') return localStorage[name]; else return '';		
	},
	delTiem:function(a,callback){
		if(!callback) callback=function(a){ };
		var item=$(a).closest('.item');
		item.slideUp(function(){
			$(this).remove();
			callback(a);
		})
	},
	printFileSize:function(size){
		var names={b:'b',kb:'Kb',mb:'Mb',gb:'Gb'};
		if(size<1024){
			return size+' '+names.b;
		} else {
			if(size<1204*1024){
				return (size/1024).toFixed(2)+' '+names.kb;
			} else {
				if(size<1204*1204*1024){
					return (size/(1024*1024)).toFixed(2)+' '+names.mb;
				} else {
					return (size/(1024*1024*1024)).toFixed(2)+' '+names.gb;
				}
			}
		}
	},
	numberDecline:function(num,genitive_plural,nominative,genitive_singular){
		var res='';
		if(num > 10 && parseInt((num%100)/10) == 1){
			res=genitive_plural;
		} else {
			switch(num%10){
				case 1: res=nominative; break;
				case 2: case 3: case 4: res=genitive_singular; break;
				case 5: case 6: case 7: case 8: case 9: case 0: res=genitive_plural; break;
			}
		}
		return res;
	},
	setCookie:function(name,value,options){
	  options = options || {};
	
	  var expires = options.expires;
	
	  if (typeof expires == "number" && expires) {
	    var d = new Date();
	    d.setTime(d.getTime() + expires*1000);
	    expires = options.expires = d;
	  }
	  if (expires && expires.toUTCString) { 
	  	options.expires = expires.toUTCString();
	  }
	
	  value = encodeURIComponent(value);
	
	  var updatedCookie = name + "=" + value;
	
	  for(var propName in options) {
	    updatedCookie += "; " + propName;
	    var propValue = options[propName];    
	    if (propValue !== true) { 
	      updatedCookie += "=" + propValue;
	     }
	  }
	
	  document.cookie = updatedCookie;
	},
	getCookie:function(name) {
		var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	},
	
	goTo:function(o){
		o=$(o);
		if(o.size()==0) return false;
		var top=o.offset().top-100;
		$('html,body').animate({scrollTop:top},500);
	},
	
	openWnd:function(a){
		var params='width=800,height=600,location=0,menubar=0,copyhistory=0,directories=0,resizable=1,scrollbars=1,status=0,toolbar=0';
		window.open($(a).attr('href'),'',params);
	}
}


var fakeFile={
	setFile:function(input){
		var name='';
		if(input.files && input.files.length){
			var f=[];
			for(var i=0;i<input.files.length;i++){
				f.push(input.files[i].name);
			}
			name=f.join(', ');
			input=$(input);
		} else {
			input=$(input);
			name=this.getFileName(input.val());
		}
		input.parent().find('span.name').text(name);
		input.blur();
	},
	isExt:function(name){
		var ext=name.split('.');
		ext=ext[ext.length-1].toString().toLowerCase();
		var e=['jpg','gif','png','jpeg'];
		if($.inArray(ext,e)==-1) return false; else return true;
	},
	getFileName:function(val){
		var name=val;
		var splitter='\\';
		if(name.indexOf('/')>-1) splitter='/';
		if(name.indexOf(splitter)>-1){
			name=name.split(splitter);
			name=name[name.length-1];
		}
		return name;
	}
}


var lng={
	setLang:function(s,a){
		if(!a) a=$('.header .language-site a');
		var button=$(a).closest('.language-button');
		$('.begunok',button).toggleClass('on-right');
		$.get('/js/html/utils/?action=lang&lang='+s+'&'+new Date().getTime(),function(){
			document.location=document.location;
		});
	},
	lang:function(en,ru){
		var res=en;
		if(sLang=='ru' || res=='') res=ru;
		return res;
	}
}




height100Container={
	init:function(){
		var _this=this;
		$(window).on('resize.setHeight100',function(){
			$('.height-100-container').each(function(){
				_this.setSize(this);
			});
		});
		$(window).trigger('resize.setHeight100');
	},
	setSize:function(div){
		div=$(div);
		
		div.css('height',($(div).data('min-height') || 300)+'px').css('overflow','hidden');
		var footer=$('#footer');
		var fTop=footer.offset().top;
		if(div.hasClass('height-100-footer')) fTop+=footer.outerHeight(true)+100;
		var winHeight=$(window).height();
		if(fTop+footer.outerHeight(true)<winHeight) fTop=winHeight-footer.outerHeight(true);
		var h=fTop-$(div).offset().top-30;
		div.css('height',h+'px');
		if(div.hasClass('height-100-overflow-visible')) div.css('overflow','visible');
	}
}


var eScroll={
	init:function(){
		if(!$.fn.enscroll) return false;
		$('.small-scroll-init').removeClass('small-scroll-init').attr('data-scroll-init',true).enscroll({
			verticalTrackClass:'small-scroll-track',
			verticalHandleClass:'small-scroll-handle',
			drawScrollButtons:true,
			scrollUpButtonClass:'small-scroll-up',
			scrollDownButtonClass:'small-scroll-down'
		});
		$('.small-scroll-track').parent().addClass('small-scroll');
		
		$('.scroll-init').removeClass('scroll-init').attr('data-scroll-init',true).enscroll({
			verticalTrackClass:'scroll-track',
			verticalHandleClass:'scroll-handle',
			drawScrollButtons:true,
			scrollUpButtonClass:'scroll-up',
			scrollDownButtonClass:'scroll-down',
			addPaddingToPane:true
		});
		$('.scroll-track').parent().addClass('scroll');
	}
}



var fileUploader={
	isGoodBrowser:(window.File && window.FileReader && window.FileList && window.Blob),
	setFile:function(input){
		if(!this.isGoodBrowser){
			this.badBrowsers(input);
			return false;
		}
		var files=input.files;
		this.startFiles(input.files,$($(input).data('query')),$(input).data('callback'),$(input).data('callback-param'))
	},
	startFiles:function(files,target,callback_name,callback_param){
		if(!this.isGoodBrowser){
			alert('bad browser');
			return false;
		}
		if(!files) return false;
		for(var i=0;i<files.length;i++){
			var isExt=fakeFile.isExt(files[i].name);
			if(!isExt){
				alert(files[i].name+' is not image');
			} else {
				this.startFile(files[i],target,callback_name,callback_param);
			}
		}
	},
	startFile:function(file,target,callback_name,callback_param){
		target=$(target);
		if(target.size()==0){
			alert('not target!');
			return false;
		}
		var item=$('<div />').addClass('item');
		$('<span />').addClass('name').text(file.name).appendTo(item);
		var progress=$('<div />').addClass('progress').appendTo(item);
		$('<div />').appendTo(progress);
		target.append(item);
		
		var reader = new FileReader();
		reader.onload=function(){
			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress",function(e){
				if(e.lengthComputable){
					var progress = (e.loaded * 100) / e.total;
					$('.progress div',item).css('width',progress+'%');
				}
			},false);
			
			xhr.onreadystatechange=function(){
				if(this.readyState==4){
					if(this.status==200){
						var res=this.responseText;
						item.slideUp(function(){
							$(this).remove();
							var data=$.parseJSON(res);
							if(callback_param) data.callback_param=callback_param;
							var func=eval(callback_name)
							func(data);
						});
					}
				}
			}
			
			xhr.open("POST",'/js/html/upload/');
			var boundary = "xxxxxxxxx";
			xhr.setRequestHeader("Content-Type", "multipart/form-data, boundary="+boundary);
			xhr.setRequestHeader("Cache-Control", "no-cache");
			var body = "--" + boundary + "\r\n";
			body += "Content-Disposition: form-data; name='myFile'; filename='" + encodeURIComponent(file.name) + "'\r\n";
			body += "Content-Type: application/octet-stream\r\n\r\n";
			body += reader.result + "\r\n";
			body += "--" + boundary + "--";
			if(xhr.sendAsBinary){
				xhr.sendAsBinary(body);
			} else {
				xhr.send(body);
			}
			
		}
		reader.readAsDataURL(file);
		
	},
	badBrowsers:function(input){
		input=$(input);
		var f=input.closest('form');
		var div=input.parent();
		var span=$('span.name',div);
		
		var isExt=fakeFile.isExt(input.val());
		if(!isExt){
			alert(input.val()+' is not image');
			return false;
		}
		
		if(!span.data('real-text')) span.data('real-text',span.text());
		var name=fakeFile.getFileName(input.val());
		input.hide();
		div.addClass('working');
		span.text(lng.lang('Upload file','Загрузка файла')+' '+name);
		f.get(0).submit();
	},
	resetForm:function(id){
		var f=$('#'+id);
		var span=$('span.name',f);
		var input=$('input.f',f);
		var div=input.parent();
		span.text(span.data('real-text'));
		input.show().css('opacity',0);
		div.removeClass('working');
	}
}


var indexPage={
	init:function(slides){
		/*
		var f=$('#index-best-girls-form');
		$('.one-selector, .checkbox-selector, .slider',f).on('pseudoChange',function(){
			var data=f.serialize();
			$('#index-best-girls-list').load('/js/html/index/?action=best&'+data+'&'+new Date().getTime(),function(){
				tooltip.init();
				girlsList.init();
			});
		});
		*/
		
		var f2=$('#index-girls-form');
		$('select',f2).change(function(){
			f2go();
		});
		var cs=$('.checkbox-slider',f2);
		$('a',cs).click(function(){
			var a=$(this)
			if(a.hasClass('active')) return false;
			$('a.active',cs).removeClass('active');
			a.addClass('active');
			$('.begunok',cs).toggleClass('on-right');
			$('input',cs).val(a.data('value'));
			f2go();
		});
		$('.begunok div',cs).click(function(){
			$('a',cs).not('.active').click();
		});
		$('select[name="webcam"]',f2).change(function(){
			$(this).closest('.place').removeClass('webcam-place-1 webcam-place-2').addClass('webcam-place-'+$(this).val());
		});
		
		function f2go(){
			var data=f2.serialize();
			$('#index-girls-list').load('/js/html/index/?action=all&'+data+'&'+new Date().getTime(),function(){
				tooltip.init();
				girlsList.init();
			});			
		}
		
		if(slides && slides.length>0){
			$('#index-slideshow').nivoSlider({
				directionNav:false,
				pauseTime:3000,
				effect:'random',
				manualAdvance:false,
				beforeChange:function(a){

				}
			});
			var nav=$('#index-slideshow-container .nivo-controlNav');
			$('a',nav).each(function(i){
				$(this).html('<img src="'+slides[i]+'" />');
			});
		}
		
		var auth=$('#index-auth-form');
		if(auth.size()==0) return false;
		var links=$('.links',auth);
		$('a',links).click(function(){
			var a=$(this);
			if(a.hasClass('active')) return false;
			$('a.active',links).removeClass('active');
			a.addClass('active');
			$('.group-item',auth).hide();
			$('.group-item[data-target="'+a.data('target')+'"]',auth).show();
			siteFrm.iCheckInit();
		});
	},
	listMore:function(button){
		button=$(button);
		button.attr('disabled','disabled');
		var div=button.closest('.more-button');
		var not_id=[];
		$('#index-girls-list a[data-id]').each(function(){
			not_id.push($(this).data('id'));
		});
		$('<div />').load('/js/html/index/?action=all&'+$('#index-girls-form').serialize()+'&not_id='+not_id.join(',')+'&'+new Date().getTime(),function(data){
			$('#index-girls-list-append').append(data);
			button.removeAttr('disabled');
			div.remove();
			tooltip.init();
			girlsList.init();
		});
	}
}


var girlsList={
	init:function(){
		siteFrm.blinkInit();
	}
}

var chatPopup={
	start:15*1000,
	hide:30*1000,
	isDestroy:false,
	init:function(){
		var _this=this;
		window.setTimeout(function(){
			_this.show();
		},this.start);
		
		/*
		window.setInterval(function(){
			var n=$('#chat-online-now');
			if(n.size()!=0 && n.closest('#chat-popup').size()>0){
				var i=parseInt($.trim(n.text()));
				var j=Math.floor(Math.random()*(10-3+1))+3;
				if(Math.random()>0.5) j=-j;
				i+=j;
				n.text(i);
			}
		},5000);
		*/
		
		var _this=this;
		window.setTimeout(function(){
			var p=$('#chat-popup');
			var bottom=-p.outerHeight()-10;
			$('#chat-popup').animate({bottom:bottom},1000,function(){
				var id=$(this).data('id');
				$(this).remove();
				$.get('/js/html/utils/?action=chat_popup&id='+id+'&'+new Date().getTime(),function(html){
					var p=$(html);
					$('body').append(p);
					_this.init();
				});
			});
		},this.hide+this.start);
		
		var s=$('#index-slideshow-container');
		if(s.size()==0) return false;
		$('input',s).focus(function(){
			_this.isDestroy=true;
		});
	},
	show:function(isNow){
		if(this.isDestroy) return false;
		var p=$('#chat-popup');
		var img=$('.content .photo img');
		function go(){
			var bottom=0;
			var up=$('#user-panel');
			if(up.size()>0) bottom=up.outerHeight();
			p.css('bottom',-p.outerHeight()+'px').animate({bottom:bottom},500);			
		}
		
		if(isNow){
			go();
		} else {
			img.load(function(){
				go();
			}).attr('src',img.data('src'));
		}
		
	},
	min:function(){
		$('#chat-popup').addClass('minimize');
	},
	max:function(){
		$('#chat-popup').removeClass('minimize');
	},
	remove:function(){
		$('#chat-popup').remove();
	}
}


var girlsReg={
	show:function(){
		popup.show('#registration-for-girl',function(p){
			$('input[name="birth"]',p).mask('99.99.9999').addClass('calendar');
			$('select',p).addClass('chosen-select');
			$('input[name="city"]',p).addClass('autocomplete');
			siteFrm.chosenInit();
			siteFrm.calendarInit();
			siteFrm.autoCompleteInit();
			$('.fake-file-form .name',p).click(function(){
				$(this).closest('.fake-file-form').find('input').click();
			})
		},function(p){

		});
	},
	getCities:function(select,country_id){
		var p=$(select).closest('form');
		$('.select-country',p).hide();
		var input=$('input[name="city"]',p);
		input.show().val('').autocomplete('option','source','/js/html/profile/?action=city_autocomplete&country_id='+country_id+'&lang=ru');
		window.setTimeout(function(){
			input.focus();
		},100);
	}
}




var topPanel={
	init:function(){
		var h=$('#top-header');
		if(h.size()==0) return false;
		var p=$('#top-panel');
		if(p.size()==0) return false;
		var top=h.outerHeight()+10;
		var isVisible=false;
		var time=400;
		$(document).on('scroll.toppanel',function(){
			var t=$(document).scrollTop();
			if(t>top && !isVisible){
				p.stop().fadeIn(time);
				isVisible=true;
			}
			if(t<=top && isVisible){
				p.stop().fadeOut(time);
				isVisible=false;
			}
		}).trigger('scroll.toppanel');
	}
}


var specialActionsButton={
	init:function(){
		$(document).on('click','[data-user-id] .special-actions-buttons .ico',function(e){
			var id=$(this).closest('[data-user-id]').data('user-id');
			var buttons=$('.buttons',this);
			// 
			e.preventDefault();
			// 
			if(GLOBAL_user_id==0){
				popup.show('#registration');
				return;
			}
			if($(this).hasClass('disabled')) return;
			// 
			var isInChat=(document.location.pathname.indexOf('/chat/')==0 || document.location.pathname.indexOf('/newchat/')==0)
			// 
			function docLoc(uri){
				if(isInChat){
					window.opener.document.location=uri;
					window.opener.focus();
				} else {
					document.location=uri;
				}
			}
			// 
			if(GLOBAL_user_id!=0){
				if($(this).hasClass('ico-wink')){
					profileAction.wink(id,this,true);
				} else if($(this).hasClass('ico-like')){
					profileAction.like(id,this,true);
				} else if($(this).hasClass('ico-star')){
					profileAction.fav(id,this,true);
				} else if($(this).hasClass('ico-chat') || $(this).hasClass('ico-webcam')){
					if(!isInChat) chat.openWin(id);
					console.log('Here');
				} else if($(this).hasClass('ico-mail')){
					if(isInChat){
						docLoc(GLOBAL_user_uri+'/messages/write/?to='+id);
					} else {
						if(!e.ctrlKey){
							docLoc(GLOBAL_user_uri+'/messages/write/?to='+id);
						} else {
							window.open(GLOBAL_user_uri+'/messages/write/?to='+id);
						}
					}
				} else if($(this).hasClass('ico-gift')){
					if(isInChat){
						docLoc('/send-gift/?user_id='+id);
					} else {
						if(!e.ctrlKey){
							docLoc('/send-gift/?user_id='+id);
						} else {
							window.open('/send-gift/?user_id='+id);
						}
					}
				} else if($(this).hasClass('ico-reply')){
					var d_id = $(this).closest('[data-dialog-id]').data('dialog-id');
					document.location = GLOBAL_user_uri+'/messages/dialog-'+d_id+'/';
				}
			}
		});
	}
}


var faq={
	init:function(){
		$('#faq-list .title').click(function(){
			var a=$(this);
			var item=a.closest('.item');
			var hide=$('.hide',item);
			if(a.hasClass('active')){
				a.removeClass('active');
				hide.slideUp();
			} else {
				a.addClass('active');
				hide.slideDown();
			}
		});
	}
}



var smiles={
	init:function(){
		$(document).on('click','.smiles img[data-code]',function(){
			var textarea=$($(this).closest('.smiles').data('input'));
			textarea.val(textarea.val()+' '+$(this).data('code')+' ').trigger('change').focus();
		});
		$(document).on('click','.smiles .button',function(){
			var sm=$(this).closest('.smiles');
			var list=sm.find('.list');
			list.show();
			sm.addClass('active');
			$(document).one('click.hideSmileList',function(){
				list.hide();
				sm.removeClass('active');
			});
		});
	},
	replaceText:function(text,list){
		for(var i=0;i<list.length;i++){
			while(text.indexOf(list[i].from)>-1){
				text=text.replace(list[i].from,list[i].to);
			}
		}
		return text;
	}
}


var tickets={
	addFile:function(data){
		var div=$('<div />').addClass('item');
		if(data.preview && data.preview!='') $('<img />',{src:data.preview}).addClass('preview').appendTo(div);
		$('<span />').addClass('name').html(data.name+' ('+data.size+')').appendTo(div);
		$('<a />').addClass('delete').html('<span>'+lng.lang('Remove','Удалить')+'</span>').click(function(){
			utils.delTiem(this);
		}).prependTo(div);
		$('<input />',{type:'hidden',name:'tmp_file_id'}).val(data.id).appendTo(div);
		$('#ticket-files').append(div);
	}
}



var usersCheckedList={
	init:function(selector,callback,setting){
		if(!callback) callback=function(){ };
		if(!setting) setting={
			selected:[]
		};

		var o=$(selector);

		function setSelectedText(e){
			$('.selected-text strong',o).text($('.item.selected',o).size());
		}

		$('.item',o).each(function(){
			var html='<img class="photo" src="'+$(this).data('photo')+'" /><div class="id">id '+$(this).data('id')+'</div><div class="name">'+$(this).data('name')+'</div>';
			$(this).html(html);
			if($.inArray($(this).data('id'),setting.selected)>-1) $(this).addClass('selected');
		});
		$(document).on('click', selector + ' .item', function(){
			if($(this).hasClass('disabled')) return false;
			$(this).toggleClass('selected');
			setSelectedText(this);
			var ids=[];
			$('.item.selected',o).each(function(){
				ids.push($(this).data('id'));
			});
			callback(this,ids);
		});

		$('input',o).keypress(function(){
			var input=$(this);
			
			$('.item',o).show();
			var val=$.trim(input.val());
			if(val!=''){
				$('.item',o).each(function(){
					if($(this).data('id').toString().indexOf(val)==-1 && $(this).data('name').toString().toLowerCase().indexOf(val)==-1)
						$(this).hide();
				});
			}
		});

		setSelectedText($('.item.selected:first',o));
	}
}

var images = (new function(){

	this.load_img = function(element){
		// 
		var w = $(window);
		var w_height = w.height();
		var w_scrolltop = w.scrollTop();
		var w_screen_top = w_scrolltop + w_height;
		// 
		if(!element) element = $('body');
		// 
		$(element).find('[data-lazysrc],[data-lazy-src]').filter(':visible').each(function(){
			// 
			var th = $(this);
			var src = th.attr('data-lazysrc') || th.attr('data-lazy-src');
			var th_top = th.offset().top;
			// 
			if(th_top > w_scrolltop && th_top < w_screen_top){
				th.attr('src', src).removeAttr('data-lazysrc').removeAttr('data-lazy-src');
			}
		});
	}
});

$(function(){
	$(window).on('scroll', function(){
		images.load_img();
	}).on('resize', function(){
		images.load_img();
	});
	$(document).on('click', function(){
		images.load_img();
	})
});

$(document).click(function(){
	if($('#new-photo-wrapper').is(':visible')){
		setTimeout(function(){
		$('#new-photo-wrapper>.container>.inner>.item>span>img').attr('src', $('.hidephoto>img').attr('src'));}, 1000);
		return false;
	}
});

jQuery(document).ready(function($) {
	$(function () {
	    var tabContainers = $('div.tabs > div');
	    tabContainers.hide().filter(':first').show();
	    $('div.tabs ul.tabNavigation a').click(function () {
	        tabContainers.hide();
	        tabContainers.filter(this.hash).show(); 
	        $('div.tabs ul.tabNavigation a').removeClass('selected');
	        $(this).addClass('selected');
	        return false;
	    }).filter(':first').click();
	});
});