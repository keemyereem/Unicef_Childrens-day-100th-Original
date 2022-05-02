
var section1 = {
    init:function(){
        this.scroll_detector();
        this.intro_quote();
        this.intro_fadeup();
        this.second_scene();
        this.third_scene();
    },

    scroll_detector:function(){

        

        $(".section").on('mousewheel',function(e){
            var wheel = e.originalEvent.wheelDelta;
            
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

		var scene0_sc = new TimelineMax();
		scene0_sc
        
			.staggerFrom('.scene0 .second_quote', 1, { y: 30, autoAlpha: 0 })
			.staggerTo('.scene0 .second_quote', 1, { y: 0, autoAlpha: 1 })

			.staggerFrom('.scene0 .third_quote', 1, { y: 30, autoAlpha: 0 })
			.staggerTo('.scene0 .third_quote', 1, { y: 0, autoAlpha: 1 })

			.staggerFrom('.scene0 .third_quote i', 1, { scale: 0 })
			.staggerTo('.scene0 .third_quote i', 1, { scale: 1 })

		var scene0 = new ScrollMagic.Scene({
				triggerElement: '',
                triggerHook: 0.5,
				duration: "400%"
			})
            .setPin(".scene0")
			.setTween(scene0_sc)    // 트윈 주석 지우면 자동재생
			.addTo(controller)
            //.addIndicators({name: "1 (duration: 300%)"})
	},

    second_scene:function() {
        var controller = new ScrollMagic.Controller();
        
        var scene1_sc = new TimelineMax();
        scene1_sc

            .staggerFrom('.scene1 .fourth_quote', 1, { y: 30, autoAlpha: 0 })
			.staggerTo('.scene1 .fourth_quote', 1, { y: 0, autoAlpha: 1 })

			.staggerFrom('.scene1 .fifth_quote', 1, { y: 30, autoAlpha: 0 })
			.staggerTo('.scene1 .fifth_quote', 1, { y: 0, autoAlpha: 1 })

            .staggerFrom('.scene1_container', 1, { y: 0, autoAlpha: 1 })
			.staggerTo('.scene1_container', 1, { y: 30, autoAlpha: 0 })

            .staggerFrom('.scene1_bg', 1, {scale: 1 })
            .staggerTo('.scene1_bg', 1, { scale: .6 })

            .staggerFrom('.scene1_bg', 2, { y: 0 })
            .staggerTo('.scene1_bg', 2, { y: '-100%' })

            .staggerFrom('.scroll', 1, { autoAlpha: 1 })
			.staggerTo('.scroll', 1, { autoAlpha: 0 })

        var scene1 = new ScrollMagic.Scene({
				triggerElement: '.scene1',
                triggerHook: 0,
				duration: "400%"
			})
            .setPin(".scene1")
            .setClassToggle(".scene1", 'active')
			.setTween(scene1_sc)
			.addTo(controller)
            //.addIndicators({name: "2 (duration: 300%)"})
            
    },

    third_scene:function() {
        var controller = new ScrollMagic.Controller();

        var scene2_sc = new TimelineMax();
        scene2_sc     
            .staggerFrom('.scene2', 1, {y: 0 })
            .staggerTo('.scene2', 1, { y: "-100%" }) 

        var scene2 = new ScrollMagic.Scene({
				triggerElement: '.scene1',
                triggerHook: 0.5,
				duration: "100%"
			})
			.setTween(scene2_sc)
			.addTo(controller)
            //.addIndicators({name: "3 (duration: 400%)"})
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
        this.hovEvent();
        this.clickEvent();
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
            adaptiveHeight: true,
            prevArrow: $('.section5 .slider_nav .prev'), 
            nextArrow: $('.section5 .slider_nav .next'),
        })
        s5Progress(0);
    },
    hovEvent:function(){
        $(".hov-anim").mouseover(function() {
            $(this).attr("src", $(this).data("animated"))
          }),
          $(".hov-anim").mouseout(function() {
            $(this).attr("src", $(this).data("static"))
          });
          
    },
    clickEvent:function(){
        $(".section5 .slider_wrap .item").click(function() {
            console.log($(this).index());
            //$(this).toggleClass('on');
            $(this).find('.basic').fadeToggle(300)
            $(this).find('.hover').fadeToggle(300)
        });

          
    },
};

var section4 = {
    init:function(){
        this.sec4_quote();
    },

    sec4_quote:function() {
        let el = document.getElementsByClassName('quote2')[0];
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
                
                $(".section4").on('mousewheel',function(e){
                    var scTop = $(window).scrollTop();
                    var wheel = e.originalEvent.wheelDelta;

                    if(wheel < 0){
                        el.textContent = word;
                        tl.pause(); 
                        
                    } else {
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
        }).on('afterChange', function(event, slick, currentSlide, nextSlide){ 
            console.log('slick index : ' + currentSlide);
            
            if (currentSlide == 1) {
                draw(22, '#mov_graph02', '#1cabe2');
                replay1();
                $('.item02').addClass('on');
            }else if (currentSlide == 2){
                draw(69, '#mov_graph03', '#ffc20e');
                replay2();
                $('.item03').addClass('on');
            }
            else if (currentSlide == 3){
                draw(33, '#mov_graph04', '#1cabe2');
                replay3();
                $('.item04').addClass('on');
            }
            else if (currentSlide == 4){
                draw(25, '#mov_graph05', '#ffc20e');
                replay4();
                $('.item05').addClass('on');
            }else if (currentSlide == 5) {
                $('.item06 li').addClass('on');
            }else {
                $('.item').removeClass('on');
                $('.item06 li').removeClass('on');
            }
            

        });

        function draw(max, classname, colorname){
            var i=1;
             var func1 = setInterval(function(){
               if(i<max){
                   color1(i,classname,colorname);
                   i++;
               } else{
                 clearInterval(func1);
               }
             },10);
         }
         function color1(i, classname,colorname){
            $(classname).css({
                 "background":"conic-gradient("+colorname+" 0% "+i+"%, transparent "+i+"% 100%)"
            });
         }
         
         
         function replay1(){
           draw(22, '#mov_graph02', '#1cabe2');
         }
         function replay2(){
            draw(69, '#mov_graph03', '#ffc20e');
          }
          function replay3(){
            draw(33, '#mov_graph04', '#1cabe2');
          }
          function replay4(){
            draw(25, '#mov_graph05', '#ffc20e');
          }

    }
};

var scrollFadeUp = {
    init:function(){
        this.scrollEvent();
        this.tweenmax();
    },
    scrollEvent:function(){
        $(window).on('scroll', function() {
            const st = $(window).scrollTop();
        
            var sec2 = $('.section2').offset().top - 400;
            var sec3 = $('.section3').offset().top - 400;
            var sec4 = $('.section4').offset().top - 400;
        
        
            if (st > sec2) {
                $(sec2).addClass('a_on');
                // alert();
            }
            if (st > sec3) {
                $(sec3).addClass('a_on');
            }
            if (st > sec4) {
                $(sec4).addClass('a_on');
                
            }
        
        });
    },


    tweenmax:function() {
        (function () {

            var controller = new ScrollMagic.Controller();
            var scene1 = new ScrollMagic.Scene({
                triggerElement: "#trigger1", //트리거 설정
                triggerHook: 0.8
              })
              .setClassToggle("#animate1", "visible")
              .addTo(controller)
              //.addIndicators();
            
            var revealElements = document.getElementsByClassName("animation2");
            for (var i=0; i<revealElements.length; i++) {
              
              var scene2 = new ScrollMagic.Scene({
                triggerElement: revealElements[i],
                offset: 50,
                triggerHook: 0.9
              })
              .setClassToggle(revealElements[i], "visible") // add class toggle
              .addTo(controller)
              //.addIndicators({name: "(box) " + (i+1), colorStart:"#F6B352", colorTrigger:"#F6B352"});
            }
            
          
          }())
    },
};