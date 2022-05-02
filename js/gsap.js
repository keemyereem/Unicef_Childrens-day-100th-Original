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
                
                $("section").on('mousewheel',function(e){
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
			.setTween(scene0_sc)
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
            .staggerTo('.scene1_bg', 1, { scale: .8 })

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
            .staggerFrom('.scene2', 0, {y: 0 })
            .staggerTo('.scene2', 0, { y: "-100%" }) 

        var scene2 = new ScrollMagic.Scene({
				triggerElement: '.scene1',
                triggerHook: 0.8,
				duration: "300%"
			})
			.setTween(scene2_sc)
			.addTo(controller)
            .addIndicators({name: "3 (duration: 400%)"})
    },
}

