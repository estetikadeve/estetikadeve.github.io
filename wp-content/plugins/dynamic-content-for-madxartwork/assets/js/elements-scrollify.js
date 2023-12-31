( function( $ ) {
	var settings_page = {};
	var is_scrollify = false;
	var PosttElements_ScrollifyHandler = function( ) {
		//console.log( $scope );
		//alert('scrollify Handle');

		//var sezioni = '.madxartwork-inner > .madxartwork-section-wrap > .madxartwork-section';
		//var sezioni = '.madxartwork[data-madxartwork-type=post] > .madxartwork-inner > .madxartwork-section-wrap > .madxartwork-section';
		$('body').addClass('dce-scrollify dce-scrolling');
		// $("body").addClass('scrollify').append(scrollify_pagination);	

		if( settings_page.custom_class_section_sfy ){
	        $customClass = settings_page.custom_class_section_sfy;
    	}else{
    		$customClass = 'madxartwork-section';
    	}
    	//alert($customClass);
    	//sezioni = '.madxartwork-' + settings_page.scrollEffects_id_page + ' > .madxartwork-inner > .madxartwork-section-wrap > .madxartwork-section';
    	
    	//$target_sections = settings_page.scroll_target+' ';
    	$target_sections = '.madxartwork-'+settings_page.scroll_id_page;
    	if(!$target_sections) $target_sections = '';

    	var sezioni = $target_sections + '.madxartwork > .madxartwork-inner > .madxartwork-section-wrap > .' + $customClass;
    	
    	// Class direction
    	$($target_sections).addClass('scroll-direction-'+settings_page.directionScroll);
    	/*if( settings_page.directionScroll == 'vertical' ){
			
		}*/

		//alert(settings_page.scrollify_id_page);
		//alert($customClass);
		//alert('count '+$(sezioni).length);
		
		// --------------------------------------------------------
		//console.log(madxartwork.settings.page.model.attributes);
		//alert(madxartwork.settings.page.model.get( 'scrollSpeed' ));
		//alert(madxartwork.settings.page.model.attributes.scrollSpeed.size);
		// --------------------------------------------------------
		//alert(settings_page.scrollSpeed.size);

		//console.log(settings_page);
		$.scrollify({
		    section : sezioni,
		    sectionName : 'id',
		    interstitialSection : settings_page.interstitialSection, //"header, footer.site-footer",
		    //easing: settings_page.ease_scrollify || "easeOutExpo",
		    scrollSpeed: Number(settings_page.scrollSpeed.size) || 1100, //1100,
		    offset : Number(settings_page.offset.size) || 0, //0,
		    
		    //scrollbars:  Boolean( settings_page.scrollbars ), //true,
		    
		    // standardScrollElements: "",
		    
		    setHeights: Boolean( settings_page.setHeights ), //true,
		    overflowScroll: Boolean( settings_page.overflowScroll ), //true,
		    updateHash: Boolean( settings_page.updateHash ), //true,
		    touchScroll: Boolean( settings_page.touchScroll ), //true,
		    // before:function() {},
		    // after:function() {},
		    // afterResize:function() {},
		    // afterRender:function() {}
		    before:function(i,panels) {
 		      var ref = panels[i].attr("data-id");
 		      //
		      $(".dce-scrollify-pagination .active").removeClass("active");
		      $(".dce-scrollify-pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
		      //
		    },
		    afterRender:function() {
		      is_scrollify = true;
		      //
		      //alert(settings_page.enable_scrollify_nav);
		      if(settings_page.enable_scrollify_nav){
		      	  //alert('pagination');
			      var scrollify_pagination = "<ul class=\"dce-scrollify-pagination\">";
			      var activeClass = "";
			      $(sezioni).each(function(i) {
			        activeClass = "";
			        if(i===0) {
			          activeClass = "active";
			        }
			        //<span class=\"hover-text\">"+$(this).attr("data-id")+"</span>
			        scrollify_pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-id") + "\"></a></li>";
			        //scrollify_pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-id") + "\"><span class=\"hover-text\">" + $(this).attr("data-id").charAt(0).toUpperCase() + $(this).attr("data-id").slice(1) + "</span></a></li>";
			      });
			      scrollify_pagination += "</ul>";

			      $("body").append(scrollify_pagination);		      

			      //Tip: The two click events below are the same:
			      
			      $("body").on("click",".dce-scrollify-pagination a",function() {
			        $.scrollify.move($(this).attr("href"));
			      });
			  }
		    }
		  });
		$.scrollify.update();
	};
	function handleScrollify ( newValue ) {
		
		//settings_page.enable_scrollify = newValue;
		
		//madxartwork.reloadPreview();
		//console.log( 'aaaa '.settings_page );
		if(newValue){
			// SI
			
			if(is_scrollify){
				$.scrollify.enable();
				$('body').find('.dce-scrollify-pagination').show();
			}else{
				settings_page = madxartwork.settings.page.model.attributes;
			}
			//alert('Siiii');
			
			PosttElements_ScrollifyHandler();
		}else{
			// NO
			//$.scrollify.isDisabled();
			$.scrollify.destroy();
			$('body').find('.dce-scrollify-pagination').hide();
			//alert('Noooooo');
			//
			
		}
	}
	function handleScrollify_speed ( newValue ) {
		//alert(newValue.size)
		$.scrollify.setOptions({scrollSpeed: newValue.size});

	}
	function handleScrollify_interstitialSection ( newValue ) {
		$.scrollify.setOptions({scrollSpeed: newValue});
	}
	function handleScrollify_offset ( newValue ) {
		$.scrollify.setOptions({offset: newValue.size});
	}
	function handleScrollify_ease ( newValue ) {
		$.scrollify.setOptions({easing: newValue});
	}
	function handleScrollify_setHeights ( newValue ) {
		//alert(newValue ? true : false);
		$.scrollify.setOptions({setHeights: newValue ? true : false });
	}
	function handleScrollify_overflowScroll ( newValue ) {
		$.scrollify.setOptions({overflowScroll: newValue ? true : false });
	}
	function handleScrollify_updateHash ( newValue ) {
		$.scrollify.setOptions({updateHash: newValue ? true : false });
	}
	function handleScrollify_touchScroll ( newValue ) {
		$.scrollify.setOptions({touchScroll: newValue ? true : false });
	}
	function handleScrollify_enablenavigation ( newValue ) {
		if(newValue){
			$('body').addClass('dce-scrollify').find('.dce-scrollify-pagination').show();
		}else{
			$('body').removeClass('dce-scrollify').find('.dce-scrollify-pagination').hide();
		}
	}
	
	// Make sure you run this code under madxartwork..
    $(document).on('ready', function () {
		//
		if( typeof madxartworkFrontendConfig.settings.page !== 'undefined' ){
			
			/*if ( madxartworkFrontend.isEditMode() ){
				
			}else{
				settings_page = JSON.parse( $('.madxartwork').attr('data-madxartwork-settings') ); //
			}*/
			settings_page = madxartworkFrontendConfig.settings.page;
			//
			//alert(settings_page.enable_scrollify);
			// console.log( settings_page );
			if(settings_page){
				var is_enable_dceScrolling = settings_page.enable_dceScrolling;
				var is_enable_scrollify = settings_page.enable_scrollify;
				/*setTimeout(function(){
				},1000);*/
				if( is_enable_scrollify && is_enable_dceScrolling ){
					PosttElements_ScrollifyHandler( );
				}
				//
				//console.log( madxartworkFrontendConfig.settings.page);
				// per il renderin della preview in EditMode
				if ( madxartworkFrontend.isEditMode() ){
					/*madxartwork.once( 'preview:loaded', function() {
						// questo è il callBack di fine loading della preview
						//alert('fine '+settings_page.enable_scrollify);
					} );*/

					madxartwork.settings.page.addChangeCallback( 'enable_scrollify', handleScrollify );
					madxartwork.settings.page.addChangeCallback( 'scrollSpeed', handleScrollify_speed );
					madxartwork.settings.page.addChangeCallback( 'offset', handleScrollify_offset );
					madxartwork.settings.page.addChangeCallback( 'ease_scrollify', handleScrollify_ease );
					madxartwork.settings.page.addChangeCallback( 'setHeights', handleScrollify_setHeights );
					madxartwork.settings.page.addChangeCallback( 'overflowScroll', handleScrollify_overflowScroll );
					madxartwork.settings.page.addChangeCallback( 'updateHash', handleScrollify_updateHash );
					madxartwork.settings.page.addChangeCallback( 'touchScroll', handleScrollify_touchScroll );
					madxartwork.settings.page.addChangeCallback( 'enable_scrollify_nav', handleScrollify_enablenavigation );
					//madxartwork.settings.page.addChangeCallback( 'enable_dceScrolling', handleScrollify );

					/*var c_settings = Object.keys(settings_page).length;
					var c = 1;
					for (var key in settings_page) {
					    console.log(key, settings_page[key]);
						alert(key+' '+settings_page[key]);
						madxartwork.settings.page.addChangeCallback( key, function ( newValue ) {
												
												//settings_page = madxartworkFrontendConfig.settings.page;
												settings_page[key] = newValue;
												//console.log( settings_page );

												if( c == c_settings ) PosttElements_ScrollifyHandler( settings_page );

												//madxartwork.reloadPreview();

												c ++;
											} );
					}*/

				}
			}
		}
		// ------------
		/*madxartwork.hooks.addAction( 'panel/open_editor/post/enable_scrollify', function( panel, model, view ) {
		   var $element = view.$el.find( '.madxartwork-selector' );
		   alert('open editor');
		   if ( $element.length ) {
		   	$element.click( function() {
		   	  alert( 'Some Message' );
		   	} );
		   }
		} );*/
		// -----------
		/*madxartworkFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {
			console.log($scope);
			if ( $scope.data( 'shake' ) ){
				$scope.shake();
			}
		} );*/

	} );
} )( jQuery );