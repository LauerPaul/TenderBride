// -----------------------------------------------------------------
// -------------------------- SEARCH PAGE --------------------------
// -----------------------------------------------------------------
var searchPage={
  hash:'',
  isGoodBrowser:!!(window.history && history.pushState),
  init:function(countries,cities){
    var _this=this;
    
    var city_item=$('#search-city-item'), city_selector=$('#search-city-selector');
    $('#search-country-selector').on('updateValue',function(){
      var vals=$(this).data('values');
      if(vals.length==0){
        city_item.hide();
      } else {
        city_item.show();
        var isUpdate=false;
        $('li[data-country]',city_selector).show().each(function(){
          if($.inArray($(this).data('country'),vals)==-1){
            var a=$('a.active',this);
            if(a.size()>0){
              a.removeClass('active');
              isUpdate=true;
            }
            $(this).hide();
          }
        });
        if(isUpdate) city_selector.trigger('setValues').trigger('setNames');
      }
    });

    var f=$('#search-main-form');
    $('.one-selector, .checkbox-selector, .slider',f).on('pseudoChange',function(){
      _this.update();
    });
    
    $('.milti-selector',f).on('updateValue',function(){
      _this.update();
    });
    
    var keypressTOT=null;
    $('input[type="checkbox"]',f).change(function(){
      if(keypressTOT){
        window.clearTimeout(keypressTOT);
        keypressTOT=null;
      }
      _this.update();
    });
    
    $('input[type="text"]',f).change(function(){
      _this.update();
    }).keypress(function(){
      if(keypressTOT){
        window.clearTimeout(keypressTOT);
        keypressTOT=null;
      }
      keypressTOT=window.setTimeout(function(){
        _this.update();
      },500);
    });
    
    
    // фильтры
    window.setTimeout(function(){
      _this.hash=_this.serialize();
    },100);
    
    $('.one-selector',f).each(function(){
      $('a.active',this).addClass('default');
    });
    
    $('#search-reset').click(function(){
      $(this).hide();
      $('input[type="checkbox"]',f).iCheck('check');
      $('.checkbox-selector a.active',f).click();
      $('.one-selector a.default',f).click();
      $('.milti-selector a.item.active',f).removeClass('active').trigger('setValues').trigger('setNames').trigger('updateValue');
      $('.slider',f).each(function(){
        var sl=$(this).data('slider');
        var min=$(this).data('min'), max=$(this).data('max');
        sl.slider('values',0,min);
        sl.slider('values',1,max);
        $(this).data('inputMin').val(min);
        $(this).data('inputMax').val(max);
        $(this).data('divMin').text(min);
        $(this).data('divMax').text(max);
        $(this).trigger('updateValue');
      });
      $('input[type="text"]',f).val('');
      _this.update();
    });
    this.pagerInit();
    
    if(this.isGoodBrowser){
      window.setTimeout(function(){
        window.onpopstate=function(event){
          document.location=document.location;  
        };
      },1000);
    }
    
    var countries=countries.split(',');
    var cities=cities.split(',');
    $(document).ready(function(){
      if(countries.length){
        for(var i=0;i<countries.length;i++){
          $('#search-country-selector li a[data-value="'+countries[i]+'"]').click();
        }
      }
      if(cities.length){
        for(var i=0;i<cities.length;i++){
          $('#search-city-selector li a[data-value="'+cities[i]+'"]').click();
        }
      }
    });
  
  },
  pagerInit:function(){
    var _this=this;
    $('#search-girls-list .pager a[data-page]').click(function(){
      _this.load($(this).data('page'));
      return false;
    });
  },
  tot:0,
  xhr:null,
  update:function(){
    if(this.tot) window.clearTimeout(this.tot);
    if(this.xhr) this.xhr.abort();
    var _this=this;
    this.tot=window.setTimeout(function(){
      _this.load();
    },100);
  },
  serialize:function(){
    var f=$('#search-main-form');
    var countries = '';
    var cities = '';
    
    if($('#search-country-selector').data('values') !== null){
      countries = $('#search-country-selector').data('values').join(',');
    }
    if($('#search-city-selector').data('values') !== null){
      cities = $('#search-city-selector').data('values').join(',');
      var res=f.serialize()+'&countries='+countries+'&cities='+cities;;
    }
    var newRes=[];
    this.serializeMain(newRes,'new',$('.item-newcomer',f));
    this.serializeMain(newRes,'online',$('.item-online',f));
    this.serializeMain(newRes,'webcam',$('.item-webcam',f));
    this.serializeDesire(newRes,$('.item-desire',f));
    this.serializeSlider(newRes,'age',$('.item-age',f));
    this.serializeSlider(newRes,'height',$('.item-height',f));
    this.serializeCheckbox(newRes,'eyes_color',$('.item-eyes-color',f));
    this.serializeCheckbox(newRes,'physique',$('.item-physique-color',f));
    this.serializeCheckbox(newRes,'hair_color',$('.item-hair-color',f));
    if(countries!='') newRes.push('countries='+countries);
    if(cities!='') newRes.push('cities='+cities);
    
    $('input[type="text"]',f).filter('[name]').each(function(){
      var name=$(this).attr('name');
      var val=$.trim($(this).val());
      if(val!='') newRes.push(name+'='+val);
    });
    
    var res=newRes.join('&');
    return res;
  },
  serializeMain:function(a,name,item){
    var val=$('input[name="'+name+'"]',item).val();
    if(val && val!='0') a.push(name+'='+val);
  },
  serializeDesire:function(a,item){
    $('input[value!="0"]',item).each(function(){
      a.push($(this).attr('name')+'='+$(this).val());
    });
  },
  serializeSlider:function(a,name,item){
    var slider=$('.slider',item);
    var min=slider.data('min'), max=slider.data('max');
    var values=$('div',slider).slider( "option", "values" );
    if(min!=values[0] || max!=values[1]){
      a.push(name+'_min='+values[0]);
      a.push(name+'_max='+values[1]);
    }
  },
  serializeCheckbox:function(a,name,item){
    var checked=0, val=[];
    var boxes=$('input[type="checkbox"]',item);
    boxes.each(function(){
      if($(this).is(':checked')){
        checked++;
        val.push($(this).val());
      }
    });
    if(checked!=0 && checked!=boxes.size()) a.push(name+'='+val.join(','));
  },
  load:function(page){
    var data=this.serialize();
    if(data!=this.hash) $('#search-reset').show(); else $('#search-reset').hide();
    if(page){
      if(data==''){
        data='page='+page;
      } else {
        data+='&page='+page;
      }
    }
    var _this=this;
    this.xhr=$.ajax({
      url:'/js/html/search/?action=load&'+new Date().getTime(),
      data:data,
      success:function(htmldata){
        $('#search-girls-list').html(htmldata);
        tooltip.init();
        girlsList.init();
        _this.pagerInit();
        if(page) utils.goTo('#search-girls-list');
        
        if(_this.isGoodBrowser){
          var url=document.location.pathname.toString();
          if(data!='') url+='?'+data;
          history.pushState(null,document.title,url);
        }
      }
    })
  }
}
// -----------------------------------------------------------------
// ----------------------- *SEARCH PAGE END* -----------------------
// -----------------------------------------------------------------