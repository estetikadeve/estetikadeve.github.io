var isAdminBar = false,
isEditMode = false;

(function ($) {

    var WidgetElementsDynamicUsersDCEHandler = function ($scope, $) {

        // init
        var elementSettings = get_Dyncontel_ElementSettings($scope);
        var id_scope = $scope.attr('data-id');

        $block_acfposts = '.dce-grid-users';
        $objBlock_acfposts = $scope.find($block_acfposts);

        if (elementSettings.posts_style == 'grid') {
            // Masonry Isotope

            // ------------ [ Isotope ] -----------
            $layoutMode = 'masonry';
            if ($objBlock_acfposts.data('fitrow'))
                $layoutMode = 'fitRows';
            var $grid_dce_posts = $objBlock_acfposts.isotope({
                itemSelector: '.dce-item-user',
                layoutMode: $layoutMode,
                sortBy: 'original-order',
                percentPosition: true,
                masonry: {
                    columnWidth: '.dce-item-user'
                }
            });
            // ---------- [ imagesLoaded ] ---------
            $grid_dce_posts.imagesLoaded().progress(function () {
                $grid_dce_posts.isotope('layout');
            });

            $scope.find('.dce-users-filters .users-filters-item').on('click', 'a', function (e) {
                var filterValue = $(this).attr('data-filter');
                $(this).parent().siblings().removeClass('filter-active');
                $(this).parent().addClass('filter-active');
                $grid_dce_posts.isotope({filter: filterValue});
                return false;
            });

        }

        //  WOW
        if (elementSettings.enabled_wow) {
            var wow = new WOW(
                    {
                        boxClass: 'wow', // animated element css class (default is wow)
                        animateClass: 'animated', // animation css class (default is animated)
                        offset: 0, // distance to the element when triggering the animation (default is 0)
                        mobile: true, // trigger animations on mobile devices (default is true)
                        live: true, // act on asynchronously loaded content (default is true)
                        callback: function (box) {
                            // the callback is fired every time an animation is started
                            // the argument that is passed in is the DOM node being animated
                        },
                        scrollContainer: null // optional scroll container selector, otherwise use window
                    }
            );
            wow.init();
        }
        // ====================================================================================== VERTCAL-TIMELINE
        function VerticalTimeline(element) {
            this.element = element;
            this.blocks = this.element.getElementsByClassName("js-cd-block");
            this.images = this.element.getElementsByClassName("js-cd-img");
            this.contents = this.element.getElementsByClassName("js-cd-content");
            this.offset = 0.8;
            this.hideBlocks();
        }

        VerticalTimeline.prototype.hideBlocks = function () {
            //hide timeline blocks which are outside the viewport
            if (!"classList" in document.documentElement) {
                return;
            }
            var self = this;
            for (var i = 0; i < this.blocks.length; i++) {
                (function (i) {
                    if (self.blocks[i].getBoundingClientRect().top > window.innerHeight * self.offset) {
                        self.images[i].classList.add("cd-is-hidden");
                        self.contents[i].classList.add("cd-is-hidden");
                    }
                })(i);
            }
        };

        VerticalTimeline.prototype.showBlocks = function () {
            if (!"classList" in document.documentElement) {
                return;
            }
            var self = this;
            for (var i = 0; i < this.blocks.length; i++) {
                (function (i) {
                    if (self.contents[i].classList.contains("cd-is-hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight * self.offset) {
                        // add bounce-in animation
                        self.images[i].classList.add("cd-timeline__img--bounce-in");
                        self.contents[i].classList.add("cd-timeline__content--bounce-in");
                        self.images[i].classList.remove("cd-is-hidden");
                        self.contents[i].classList.remove("cd-is-hidden");
                    }
                })(i);
            }
        };

        // ----- Inizializzo la timeline -----
        var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
                verticalTimelinesArray = [],
                scrolling = false;
        if (verticalTimelines.length > 0) {
            for (var i = 0; i < verticalTimelines.length; i++) {
                (function (i) {
                    verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
                })(i);
            }

            //show timeline blocks on scrolling
            window.addEventListener("scroll", function (event) {
                if (!scrolling) {
                    scrolling = true;
                    (!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
                }
            });
        }

        function checkTimelineScroll() {
            verticalTimelinesArray.forEach(function (timeline) {
                timeline.showBlocks();
            });
            scrolling = false;
        }

    };

    $(window).on('madxartwork/frontend/init', function () {
        if (madxartworkFrontend.isEditMode()) {
            isEditMode = true;
        }

        if ($('body').is('.admin-bar')) {
            isAdminBar = true;
        }
        madxartworkFrontend.hooks.addAction('frontend/element_ready/dyncontel-dynamicusers.default', WidgetElementsDynamicUsersDCEHandler);
    });
    
})(jQuery);
