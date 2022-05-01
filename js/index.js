
var section0 = {
    init:function(){
        this.scroll_detector();
        this.intro_quote();
        this.intro_fadeup();
    },

    scroll_detector:function(){
        
        $("").on('mousewheel',function(e){
            var wheel = e.originalEvent.wheelDelta;
            
            //스크롤값을 가져온다.
            if(wheel>0){
                //스크롤 올릴때
            } else {
                //스크롤 내릴때
            }
        });
    },

    /* INTRO TYPING */
	intro_quote:function() {
		let el = document.getElementsByClassName('quote')[0];
		let items = el.dataset.items.split(', ');

		TweenMax.to(el.nextElementSibling, 0.6, {
			opacity: 0, 
			repeat: -1, 
			ease: Linear.easeNone
		});

		let tl = new TimelineMax({repeat: 0});	// 반복 설정
		let tmp = { x: 0 };

		items.forEach((word, idx) => {
			let chars = word.split('');

			chars.forEach(char => {    
                tl.to(tmp, 0.1, { x: '+='+1, onComplete: () => {                      
                        el.textContent += char;
                    } 
                });
                
                $(".section").on('mousewheel',function(e){
                    var scTop = $(window).scrollTop();
                    var wheel = e.originalEvent.wheelDelta;

                    if(wheel < 0){
                        el.textContent = word;
                        tl.pause(); 
                        
                    } else if (scTop == $(this).scrollTop()) {
                        el.textContent = '';
                        tl.restart();

                    }
                });       
	        });

            tl.to(tmp, 1, {x: '+='+1});
                chars.forEach(char => {
                    tl.to(tmp, 0.05, {  x: '+='+1, onComplete: () => {
                            //el.textContent = el.textContent.slice(0, -1);   --> 타이핑 종료되면 전부 지우기
                        } 
                    });
                })
            });
            
	},

	/* SCROLL RESPONSIVE */
	intro_fadeup:function() {
        var controller = new ScrollMagic.Controller();

		var sectionList = new TimelineMax();
		sectionList
			.staggerFrom('.second_quote', 0.5, { y: 30, autoAlpha: 0, ease: Power0.easeNone }, "0")
			.staggerTo('.second_quote', 0.5, { y: 0, autoAlpha: 1, ease: Power0.easeNone }, "0")

			.staggerFrom('.third_quote', 0.5, { y: 30, autoAlpha: 0, ease: Power0.easeNone }, "0")
			.staggerTo('.third_quote', 0.5, { y: 0, autoAlpha: 1, ease: Power0.easeNone }, "0")

			.staggerFrom('.third_quote i', 0.5, { scale: 0, ease: Power0.easeNone }, "-1")
			.staggerTo('.third_quote i', 0.5, { scale: 1, ease: Power0.easeNone }, "-1")


		var ourScene = new ScrollMagic.Scene({
				triggerElement: '',
				triggerHook: 0.5,
				duration: '200%'
			})
            .setPin('.section_wrap')
			.setTween(sectionList)
			.addTo(controller);
	},


}

var faqEvent = {
    init:function(){
        this.faqtab();
        this.faqToggle();
    },
    faqtab:function(){
        $('.faq_tab li').click(function(){
            var tabs_idx = $('.faq_tab li').index(this)+1;
            $('.faq_tab li').removeClass('on');
            $(this).addClass('on');
            console.log(tabs_idx);
            $('.faq_cont').removeClass('on');
            $('.faq_cont0' + tabs_idx).addClass('on');
        });
    },
    faqToggle: function(){
        $(".que").click(function() {
            $(this).next(".ans").siblings(".ans").slideUp(300); 
            $(this).next(".ans").stop().slideToggle(300);
            // $(this).toggleClass('on').siblings().removeClass('on');
            });
    },
    
};

var s5Slider = {
    init:function(){
        this.slider();
    },
    slider:function(){
        var $s5_slider = $('.section5 .slider_wrap');
        var $s5_progressBar = $('.section5 .progress');

        function s5Progress(index) {
            var count = $s5_slider.slick('getSlick').slideCount;
            console.log(count);
            console.log('index : ' + index)
            if (index == 0) {
                index = index + 5;
            }
            var s5_calc = index * 20;
            $s5_progressBar
            .css('background-size', s5_calc + '% 100%')
            .attr('aria-valuenow', s5_calc );
            console.log('s5_calc : '+s5_calc);
            console.log(index);
        };

        $s5_slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
            s5Progress(nextSlide);
        });

        $s5_slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            // autoplaySpeed: 5000,
            infinite: true,
            swipeToSlide: true,
            cssEase: 'ease-out',
            centermode: true,
            // variableWidth: true,
            // adaptiveHeight: true,
            prevArrow: $('.section5 .slider_nav .prev'), 
            nextArrow: $('.section5 .slider_nav .next'),
        })
        s5Progress(0);
    },
};
var s3Slider = {
    init:function(){
        this.s3Slider();
    },

    s3Slider:function(){
        var $slide = $('.section3 .slider_wrap');
        var $nav = $('.section3 .slider_dots').find('li');
        var enableNav = true; //클릭하여 내비게이션 이동 허용 여부(슬라이드 동작 중 클릭되는 것을 방지)
        var speed = 1000;//슬라이드 속도
      
        $slide.on('init reInit', function (event, slick) {//페이징이니셜
          if(!slick.$dots) return;
          $("#slide_paging").html('<b class="page">'+ (slick.currentSlide+1) +'</b> / ' + (slick.$dots[0].children.length));
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide){ //슬라이드 변경 시 내비 및 페이징 변경
          //내비 변경
          if(enableNav){
            $nav.removeClass("on");
            $nav.eq(nextSlide).addClass("on");
            navStatus();
          }
          //페이징 변경
          if(!slick.$dots) return;
          var i = (nextSlide ? nextSlide : 0) + 1;
          $("#slide_paging").find(".page").text(i);
        });
      
        function navStatus(){ //슬라이드 동작 중 내비클릭 방지
          enableNav = false;
          setTimeout(function() {
            enableNav = true;
          }, speed);
        }
      
        $nav.on("click", function(){ //내비 클릭시 해당 인덱스로 이동
          if(enableNav){
            var slideNo = $(this).index();
            $slide.slick('slickGoTo', slideNo);
            $nav.removeClass("on");
            $(this).addClass("on")
            $("#slide_paging").find(".page").text(slideNo +1);
            navStatus();
          }
        });

        
        $('.section3 .slider_wrap').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            // autoplaySpeed: 5000,
            infinite: false,
            swipeToSlide: true,
            cssEase: 'ease-out',
            centermode: true,
            // variableWidth: true,
            // adaptiveHeight: true,
            prevArrow: $('.section3 .slider_nav .prev'), 
            nextArrow: $('.section3 .slider_nav .next'),
            dotsClass: '.slider_dots ul',
            customPaging: function(slide, i) {
                // console.log( slide.$slider[0] )
                //아래 마크업처럼 적용할 버튼들의 마크업을 대입하면 된다.
    
                // slick내부에서 슬라이드 개수 만큼 for문으로 생성 ( 슬라이드 개수 만큼 복제된다. )
                return '<div class="slider_wrap">' +
                    ' <div class="item"> 테스트 버튼'+(i+1)+ '</div>' +
                    '</div>'
            }
        })
    }
};

var section1 = {
    init:function(){
        this.scaleTween();
    },
    scaleTween:function(){
        // Init ScrollMagic
        var controller = new ScrollMagic.Controller();
        
        
            
        // Scene intro - pin the intro section
        
        var tween = TweenMax.to(".s1_bg", 1, {scale:.8, opacity:1, ease:Linear.easeNone});
        
        var pinSceneIntro = new ScrollMagic.Scene({
            triggerElement: '.section1',
            triggerHook: 0,
            duration: '100%'		
        })
        .setTween(tween)
        .setPin('.section1 .s1_bg')
        .addIndicators()
        .addTo(controller)
        ;
    },
};

    