@auto[]
$type[W]
#^if(def $form:type && $form:type eq 'M'){$type[$form:type]}
^if($user && $user.type eq 'W'){
	$type[M]
}
#$isOnline(in '/girls/' || in '/men/')


$cont[^hash::create[]] 

$cont.online(^form:online.int(0));
$cont.webcam(^form:webcam.int(0));

^if(def $rUri.2){
	^switch[$rUri.2]{ 
		^case[online]{$cont.online(1)} 
		^case[webcam]{$cont.webcam(1)} 
	}
}


$searchLimit(24)

$seo_rep[^table::create{from	to}]

@getSearchData[]
$minYear(18)
$maxYear(^cache[/cache/search_maxYear_$type](120){^int:sql{select max(TIMESTAMPDIFF(YEAR,users.birth,curdate())) from users where type='$type' and active='Y' and verify='Y' and (is_deleted=0) AND (users.birth>'0000-00-00')}})
$maxHeight(^cache[/cache/search_minHeight_$type](120){^int:sql{select min(reference_height) from users where type='$type' and active='Y' and verify='Y' and is_deleted=0 and reference_height>0}})
$maxHeight(^cache[/cache/search_maxHeight_$type](120){^int:sql{select max(reference_height) from users where type='$type' and active='Y' and verify='Y' and is_deleted=0}})

^use[/_mod/profile/reference.p]
$reference[^getPROFILEreference[$type]]
$targets[$reference.targets]

@getSearchSQL[f][locals]
$result[
	$.sql[]
	$.seo_sql[$f in ('N')]
]
$fields[^form:[$f].split[,]]
$isW(false)
^if($fields){
	$list[$reference.[$f]]
	^list.menu{
		^if(!^fields.locate[piece;$list.value]){
			$isW(true)
		}
	}
}
^if($isW){
	$result[
		$.sql[and reference_$f in (^fields.menu{'$fields.piece'}[,])]
		$.seo_sql[$f in ('Y')]
	]
	$list[^list.select(^fields.locate[piece;$list.value])]
	^seo_rep.append{%${f}%	^list.menu{$list.name}[, ]}
}


@getSearhList[]
^use[/_protected/cron/make_online.html]
^make_online_code[]

^getSearchData[]

$seo_sql[1]
$seo_sql2[1]

$not_ids[^form:not_id.split[,]]
$sql[1
	and users.active='Y'
	and users.verify='Y'
	and users.type='$type'
	^if($cont.webcam == 1){
		and users.is_webcam='Y'
		$seo_sql[$seo_sql and webcam='Y']
	}{
		$seo_sql[$seo_sql and webcam='N']
	}
	^if(def $form:id){and users.id='$form:id'}
	^if(def $form:name){and locate('$form:name',users.name)>0}

	^if($cont.online == 1){
		and last_visit>='^onlineDate.sql-string[]'
		$seo_sql[$seo_sql and status='Y']
	}{
		$seo_sql[$seo_sql and status='N']
	}

	^if($form:new eq '1'){
		$newUserDate[^date::create[^now.sql-string[]]]
		^newUserDate.roll[day](-3)
		and regdate>='^newUserDate.sql-string[]'
		$seo_sql[$seo_sql and newcomer='Y']
	}{
		$seo_sql[$seo_sql and newcomer='N']
	}
	^if($targets){
		$isTargers(0)
		$targets_rep[^table::create{name}]
		^targets.menu{
			^if($form:[$targets.value] eq '1'){
				and $targets.value='Y' $isTargers(1)
				^targets_rep.append{$targets.name}
			}
		}
		^if($isTargers){
			$seo_sql2[$seo_sql2 and desire in ('Y')]
			^seo_rep.append{%desire%	^targets_rep.menu{$targets_rep.name}[, ]}
		}{
			$seo_sql2[$seo_sql2 and desire in ('N')]
		}
	}
	^if(^form:age_min.int($minYear)>$minYear){
		and TIMESTAMPDIFF(YEAR,users.birth,curdate())>='^form:age_min.int($minYear)'
		$seo_sql2[$seo_sql2 and age in ('Y')]
	}
	^if(^form:age_max.int($maxYear)<$maxYear){
		and TIMESTAMPDIFF(YEAR,users.birth,curdate())<='^form:age_max.int($maxYear)'
		$seo_sql2[$seo_sql2 and age in ('Y')]
	}
		^if(^form:age_min.int($minYear)<=$minYear && ^form:age_max.int($maxYear)>=$maxYear){
			$seo_sql2[$seo_sql2 and age in ('N')]
		}{
			^seo_rep.append{%age_from%	^form:age_min.int($minYear)}
			^seo_rep.append{%age_to%	^form:age_max.int($maxYear)}
		}
	
	^if(^form:height_min.int($minHeight)>$minHeight){
		and reference_height<>0 and reference_height>='^form:height_min.int($minHeight)'
		$seo_sql2[$seo_sql2 and height in ('Y')]
	}
	^if(^form:height_max.int($maxHeight)<$maxHeight){
		and reference_height<>0 and reference_height<='^form:height_max.int($maxHeight)'
		$seo_sql2[$seo_sql2 and height in ('Y')]
	}
		^if(^form:height_min.int($minHeight)<=$minHeight && ^form:height_max.int($maxHeight)>=$maxHeight){
			$seo_sql2[$seo_sql2 and height in ('N')]
		}{
			^seo_rep.append{%height_from%	^form:height_min.int($minHeight)}
			^seo_rep.append{%height_to%	^form:height_max.int($maxHeight)}
		}
	^if($not_ids){
		and id not in (^not_ids.menu{'$not_ids.piece'}[,])
	}
	
	$ss[^getSearchSQL[eyes_color]]
		$ss.sql $seo_sql2[$seo_sql2 and $ss.seo_sql]
	$ss[^getSearchSQL[hair_color]]
		$ss.sql $seo_sql2[$seo_sql2 and $ss.seo_sql]
	$ss[^getSearchSQL[physique]]
		$ss.sql $seo_sql2[$seo_sql2 and $ss.seo_sql]
	
	$t_countries[^form:countries.split[,]]
	^if($t_countries){
		and country_id in(^t_countries.menu{'$t_countries.piece'}[,])
		$seo_sql2[$seo_sql2 and country in ('Y')]
			$cur_countries[^table::sql{
				select geo_countries.country_id as id, geo_countries.title_$sLang as name
				from geo_countries
				where
					country_id IN (^t_countries.menu{'$t_countries.piece'}[,])
			}]
			^seo_rep.append{%country%	^cur_countries.menu{$cur_countries.name}[, ]}
		$t_cities[^form:cities.split[,]]
		^if($t_cities){
			and city_id in(^t_cities.menu{'$t_cities.piece'}[,])
			$seo_sql2[$seo_sql2 and city in ('Y')]
			$cur_cities[^table::sql{
					select geo_cities.title_$sLang as name
					from geo_cities
					where city_id in(^t_cities.menu{'$t_cities.piece'}[,])
				}]
			^seo_rep.append{%city%	^cur_cities.menu{$cur_cities.name}[, ]}
		}{
			$seo_sql2[$seo_sql2 and city in ('N')]
		}
	}{
		$seo_sql2[$seo_sql2 and country in ('N') and city in ('N')]
	}

]

$result[^hash::create[]]

$page(^form:page.int(1)) ^if($page<1){$page(1)}
$offset(($page-1)*$searchLimit)

$result.list[^table::sql{
	select SQL_CALC_FOUND_ROWS
		^GirlsList:getFileds[]
	from
		users
	where $sql
	order by rating desc, real_last_visit desc, id desc
	limit $offset, $searchLimit
}]

$result.total(^int:sql{select FOUND_ROWS()})

^if($type eq 'W'){
	$f_seo_sql[h1_en,h1_ru,seo_text_en,seo_text_ru,meta_title_en,meta_title_ru,meta_description_en,meta_description_ru,meta_keywords_en,meta_keywords_ru]
	$t_seo_sql[^table::sql{select $f_seo_sql from seo_search where $seo_sql and $seo_sql2 and active='Y' limit 1}]
	^if(!$t_seo_sql){
		$t_seo_sql[^table::sql{select $f_seo_sql from seo_search where $seo_sql and active='Y' limit 1}]
	}
}

$result.seo_sql[$seo_sql]
$result.seo_sql2[$seo_sql2]
$result.seo[$t_seo_sql]

$seo_rep_blank_s[%desire%,%eyes_color%,%physique%,%hair_color%,%age_from%,%age_to%,%height_from%,%height_to%,%country%,%city%]
$seo_rep_blank_s[^seo_rep_blank_s.split[,]]
^seo_rep_blank_s.menu{
	^if(^seo_rep.locate[from;$seo_rep_blank_s.piece]){
		^seo_rep.append{$seo_rep_blank_s.piece}
	}
}


@mod_code[t]
#$type[$t]
$sTitle[^lang[Find Russian and Ukrainian Single Women at Tenderbride.com;Поиск]]
$list[^getSearhList[]]

#^Debug:dstop[$list]

^if($list.seo){
	$MAIN:sTitle[^lang[$list.seo.meta_title_en;$list.seo.meta_title_ru]]
		$MAIN:sTitle[^MAIN:sTitle.replace[$seo_rep]]
	$MAIN:sDescription[^lang[$list.seo.meta_description_en;$list.seo.meta_description_ru]]
		$MAIN:sDescription[^MAIN:sDescription.replace[$seo_rep]]
	$MAIN:sKeywords[^lang[$list.seo.meta_keywords_en;$list.seo.meta_keywords_ru]]
		$MAIN:sDescription[^MAIN:sDescription.replace[$seo_rep]]
}

<div data-role="content">
	<div class="wrapper-cataloge container">
		^if($user.type eq 'M'){
			^horizontal_banner[]
		}

		<div class="top-block">
			<h1 class="grey-mini-descript">^lang[^if(!$user || $user.type eq 'M'){Search Single Women}{Search Single Men};Поиск]</h1>
			<h3 class="black-normal-descript" style="clear:both^; margin-bottom: 50px^; padding: 0^; text-align: center^;">
				^lang[Choose the best ^if(!$user || $user.type eq 'M'){girl}{man} for you;Выбери ^if(!$user || $user.type eq 'M'){лучшую девушку}{лучшего мужчину} для себя]</h3>
		</div>
		<div class="search-page clearfix">
			<div class="left-column left-column-cataloge filters search-form block">
				^printLeftColumn[]
			</div>
			<!-- result -->
			<div class="right-column-cataloge result right-column">
				<!-- line-top-right-column -->
				<div class="line-top-right-column">
					<div class="left_block_line-top-right-column"></div>
					<div class="right_block_line-top-right-column">

						<form class="site-form search-main-form" onsubmit="return false">
							<div class="search item">
								<input class="input" type="text" name="id" id="s_id_lau" value="$form:id" autocomplete="off" placeholder="^lang[Account №;Аккаунт №]">
							</div>
							<div class="search item">
								<input class="input" type="text" name="name" id="s_name_lau" value="$form:name" autocomplete="off" placeholder="^lang[Nickname of ^if(!$user || $user.type eq 'M'){girl}{men};Поиск по имени]">
							</div>
						</form>
					</div>
				</div>
				<!-- /line-top-right-column- -->
				<div class="result-wrapper girls-list" id="search-girls-list">
					^printListOnly[$list]
				</div>
			</div>
			<!-- /result -->
		</div>
		
	</div>
</div>



<link rel="stylesheet" href="/style/slider/iThing.css" />
<script type="text/javascript" src="/script/slider/jquery.mousewheel.min.js"></script>
<script type="text/javascript" src="/script/slider/jQAllRangeSliders-min.js"></script>
<script type="text/javascript">searchPage.init('^form:countries.trim[]','^form:cities.trim[]')</script>





@printListOnly[list]
^if(!$list){$list[^getSearhList[]]}

^if($list.seo){
	$seo_h1[^lang[$list.seo.h1_en;$list.seo.h1_ru]]
	<h1 class="search-h1">^seo_h1.replace[$seo_rep]</h1>
	$seo_title[^lang[$list.seo.meta_title_en;$list.seo.meta_title_ru]]
	<script type="text/javascript">document.title='^seo_title.replace[$seo_rep]'</script>
}

^if($list.list){
	^GirlsList:print[$list.list;$.alt[STANDART]]
	^if($list.total>$searchLimit){
		^Paginator:print[
			$.total($list.total)
			$.limit($searchLimit)
			$.isData(true)
		]
	}
}{
	<div class="search-not-found blue">^lang[Sorry, but nobody matched your query;Ивизите, по вашему запросу ничего не найдено]</div>
	^print_not_result_block[]
}
^if($list.seo && ^form:page.int(0)<=1){
	$seo_text[^lang[$list.seo.seo_text_en;$list.seo.seo_text_ru]]
	<div class="search-seo-text">^untaint{^seo_text.replace[$seo_rep]}</div>
}


@print_not_result_block[][locals]
$isNew(^Users:isNew[^now.sql-string[]])
$date[$Users:newUserDate]
$list[^table::sql{
	select ^GirlsList:getFileds[],
	if(users.regdate>='$date',1,0) as is_new,
	if(users.last_visit>='^onlineDate.sql-string[]',1,0) as is_online
	from users
	where 1
		and type='$type'
		and active='Y'
		and verify='Y'
		and is_deleted=0
	order by rating desc, is_new desc, is_online desc
	limit 4
}]

^if($type eq 'W'){
	<h2 class="search-h1">^lang[Newest Girls;Новые девушки]</h2>
}{
	<h2 class="search-h1">^lang[Newest Boys;Новые парни]</h2>
}
^GirlsList:print[$list;$.alt[STANDART]]

^if($type eq 'W'){
	$list[^table::sql{
		select ^GirlsList:getFileds[],
		if(users.last_visit>='^onlineDate.sql-string[]',1,0) as is_online
		from users
		where 1
			and type='$type'
			and active='Y'
			and verify='Y'
			and is_deleted=0
			and is_webcam='Y'
			^if($list){and id not in (^list.menu{$list.user_id}[,])}
		order by rating desc, is_online desc
		limit 4
	}]
	
	<h2 class="search-h1">^lang[Girls with WebCam;Девушки с веб-камерой]</h2>
	^GirlsList:print[$list;$.alt[STANDART]]
}

@printLeftColumn[]
<form class="site-form form-search-filter search-main-form" onsubmit="return false">
	<input type="hidden" name="type" value="$type" />
	
	
	<!-- ITEM -->
	<div class="block-toggle open item item-newcomer ">
		<!-- NEW GIRLS -->
		<div class="top_name_toggle_filter">
			<h5>^lang[NEW ^if($type eq 'W'){ GIRLS}{ MEN}; НОВЫЕ ^if($type eq 'W'){ДЕВУШКИ}{МУЖЧИНЫ}]</h5>
		</div>
		<div class="hide_content_toggle_filter inputs">
			<div class="one-selector one-selector-yellow">
				<input name="new" value="^form:new.int(0)" type="hidden" />
				<div class="inner">
					<a data-value="1"^if(^form:new.int(0)){ class="active"}>
						<label for="new_girl">^lang[Show only new^if($type eq 'W'){ Girls};Новые]</label>
						<input type="radio" value="1" data-value="1" name="new" id="new_girl"^if(def $form:new){ checked}>
					</a>
					<a data-value="0"^if(!^form:new.int(0)){ class="active"}>
						<label for="all-girls">^lang[Show all^if($type eq 'W'){ Girls};Все]</label>
						<input type="radio" value="0" data-value="0" name="new" id="all-girls"^if(!def $form:new){ checked}>
					</a>
				</div>
			</div>
		</div>
	</div>
	<!-- /ITEM- -->
	
	<!-- ITEM -->
	<div class="block-toggle open item item-online">
		<!-- GIRLS ONLINE -->
		<div class="top_name_toggle_filter">
			<h5>^lang[^if($type eq 'W'){GIRLS}{MEN} ONLINE; ^if($type eq 'W'){ДЕВУШКИ}{МУЖЧИНЫ} ОНЛАЙН]</h5>
		</div>
		<div class="hide_content_toggle_filter inputs">
			<div class="one-selector one-selector-green">
				$isOnline($cont.online)
				<input name="online" value="^if($isOnline){1;0}" type="hidden" />
				<div class="inner">
					<a ^if($isOnline){class="active"} data-value="1">
						<label for="online-girls">^lang[Show ^if($type eq 'W'){Girls}{Men} Online;^if($type eq 'W'){Девушки}{Мужчины} Online]</label>
						<input type="radio" value="1" name="online" id="online-girls"^if(def $form:online){ checked}>
					</a>
					<a ^if(!$isOnline){class="active"} data-value="0">
						<label for="all-online-offline">^lang[Show all ^if($type eq 'W'){Girls}{Men};Все ^if($type eq 'W'){Девушки}{Мужчины}]</label>
						<input type="radio" value="0" name="online" id="all-online-offline"^if(!def $form:online){ checked}>
					</a>
				</div>
			</div>
		</div>
	</div>
	<!-- /ITEM- -->
	
	
	^if($type eq 'W'){
		<!-- ITEM -->
		<div class="block-toggle item item-webcam" id="webcam_i">
			<!-- WEBCAM -->
			<div class="top_name_toggle_filter">
				<h5>^lang[WEBCAM;КАМЕРА]</h5>
			</div> 
			<div class="hide_content_toggle_filter inputs">
				<div class="one-selector one-selector-blue">
					$isWebcam($cont.webcam)
					<input name="webcam" value="$isWebcam" type="hidden" />
					<div class="inner">
						<a data-value="1" class="^if($isWebcam){active }webcam mini">
							<label for="Webcam">^lang[Show ^if($type eq 'W'){Girls}{Men} with Webcam;^if($type eq 'W'){Девушки}{Мужчины} Камерой]</label>
							<input type="radio" value="1" name="webcam" id="Webcam"^if(def $form:webcam){ checked}>
						</a>
						<a data-value="0" class="^if(!$isWebcam){active}">
							<label for="all-Webcam">^lang[Show all ^if($type eq 'W'){Girls}{Men};Все ^if($type eq 'W'){Девушки}{Мужчины}]</label>
							<input type="radio" value="0" name="webcam" id="all-Webcam"^if(!def $form:webcam){ checked}>
						</a>
					</div>
				</div>
			</div>
		</div>
		<!-- /ITEM- -->
	}
	<!-- ITEM -->
	<div class="block-toggle open item item-age">
		<!-- AGE -->
		<div class="top_name_toggle_filter">
			<h5>^lang[AGE;ВОЗРАСТ]</h5>
		</div>
		<div class="hide_content_toggle_filter item-age item">
			<div class="inputs">
				<div class="slider" data-min="$minYear" data-value-min="^form:age_min.int($minYear)" data-max="$maxYear" data-value-max="^form:age_max.int($maxYear)" data-name="age">
					<div class="ui-slider">
						<a class="ui-slider-handle l_inp" href="#"></a>
						<a class="ui-slider-handle r_inp" href="#"></a> 
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /ITEM- -->
	<div class="block-toggle open item item-height">
		<!-- HEIGHT -->
		<div class="top_name_toggle_filter">
			<h5>^lang[HEIGHT;РОСТ]</h5>
		</div>
		<div class="item item-height hide_content_toggle_filter">
			<label class="label"></label>
			<div class="inputs">
				<div class="slider" data-value-min="^form:height_min.int($minHeight)" data-min="$minHeight" data-max="$maxHeight" data-value-max="^form:height_max.int($maxHeight)" data-name="height">
					<div class="ui-slider">
						<a class="ui-slider-handle l_inp" href="#"></a>
						<a class="ui-slider-handle r_inp" href="#"></a> 
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- PHYSIQUE -->
	$physique[$reference.[physique]]
	<div class="block-toggle item item-physique-color">
		<!-- PHYSIQUE -->
		<div class="top_name_toggle_filter">
			<h5>^lang[BODY;ТЕЛОСЛОЖЕНИЕ]</h5>
		</div>
		<div class="hide_content_toggle_filter inputs checkbox-inputs">
			$ex_box[^form:physique.split[,]]
			^physique.menu{
			<label>$physique.name
				<input type="checkbox" name="physique" value="$physique.value" ^if(!$ex_box || ^ex_box.locate[piece;$physique.value]){checked} />
			</label>
			}
		</div>
	</div>
	<!-- EYES COLOURS -->
	$colors[$reference.[eyes_color]]
	<div class="block-toggle item item-eyes-color">
		<!-- EYES COLOR -->
		<div class="top_name_toggle_filter">
			<h5>^lang[EYES;ГЛАЗА]</h5>
		</div>
		<div class="hide_content_toggle_filter inputs inputs-mini-checkbox">
			$ex_box[^form:eyes_color.split[,]]
			^colors.menu{
			<label data-tooltip="$colors.name">$colors.name
				<input ^if(!$ex_box || ^ex_box.locate[piece;$colors.value]){checked} id="eyes_color_$colors.value" name="eyes_color" value="$colors.value" type="checkbox" />
			</label>
			}
		</div>
	</div>
	<!-- HAIR COLOURS -->
	$colors[$reference.[hair_color]]
	<div class="block-toggle item item-hair-color">
		<!-- HAIR COLOR -->
		<div class="top_name_toggle_filter">
			<h5>^lang[HAIR;ВОЛОСЫ]</h5>
		</div>
		<div class="hide_content_toggle_filter inputs inputs-mini-checkbox">
			^colors.menu{
			<label>$colors.name
				<input ^if(!$ex_box || ^ex_box.locate[piece;$colors.value]){checked} id="hair_color_$colors.value" name="hair_color" value="$colors.value" type="checkbox" />
			</label>
			}
		</div>
	</div>
	<!-- COUNTRIES -->
	<div class="block-toggle item">
		<div class="top_name_toggle_filter">
			<h5>^lang[COUNTRY;СТРАНА]</h5>
		</div>
		<div class="hide_content_toggle_filter chosen-container chosen-container-single milti-selector" id="search-country-selector">
			<ul class="dropdown">
				$countriesDropdown[^cache[/cache/countriesDropdown${sLang}${type}](0){
					$countries[^table::sql{
						select distinct geo_countries.country_id as id, geo_countries.title_$sLang as name
						from geo_countries, users
						where
							1
							and users.type='$type'
							and users.active='Y'
							and users.verify='Y'
							and users.is_deleted=0
							and users.country_id=geo_countries.country_id
						order by rating desc, name
					}]
					^countries.menu{
						<li><a class="item" data-value="$countries.id" ><label for="$countries.id">$countries.name<input type="checkbox" id="$countries.id" value="$countries.id" name="countries"></label></a></li>
					}
				}]
				$countriesDropdown
			</ul>
		</div>
	</div>
	<!-- CITIES -->
	<div class="block-toggle open item hide" id="search-city-item">
		<div class="top_name_toggle_filter">
			<h5>^lang[CITY;ГОРОД]</h5>
		</div>
		<div class="hide_content_toggle_filter chosen-container chosen-container-single milti-selector" id="search-city-selector">
			<ul class="dropdown">
				$citiesDropdown[^cache[/cache/citiesDropdown${sLang}${type}](0){
				$cities[^table::sql{
					select distinct geo_cities.city_id as id, geo_cities.country_id, geo_cities.title_$sLang as name
					from geo_cities, users
					where
						1
						and users.type='$type'
						and users.active='Y'
						and users.verify='Y'
						and users.is_deleted=0
						and users.city_id=geo_cities.city_id
					order by rating desc, name
				}]
				^cities.menu{
						<li data-country="$cities.country_id"><a class="item" data-value="$cities.id"><label for="$cities.id" >$cities.name<input type="checkbox" value="$cities.id" name="cities" id="$cities.id" ^if($ex_box && ^ex_box.locate[piece;$cities.id]){ checked}></label></a></li>
						}
				}]
				$citiesDropdown
			</ul>
		</div>
	</div>

	<div class="reset block-toggle" style="border: none">
		<button type="button" class="white_button" id="search-reset" style="max-width: 100%">RESET ALL FILTERS</button>
	</div>
</form>
<script>
	jQuery(document).ready(function() {
		if(^$(window).width() < 780){
			^$('.top_name_toggle_filter').parents('.block-toggle').find('.hide_content_toggle_filter').show('slow');
			^$('.top_name_toggle_filter').parent().addClass('open');
		}
	});
</script>