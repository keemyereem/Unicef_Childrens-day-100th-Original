$(function(){
    faqEvent.init();
    s5Slider.init();

    /* text typing motion */
    var string = "#어린이날100주년 #foreverychild #유니세프후원자라면"; /* type your text here */
    var array = string.split("");
    var timer;
    
    function frameLooper () {
        if (array.length > 0) {
            $("#typing").html() += array.shift();
        } else {
            clearTimeout(timer);
                }
        loopTimer = setTimeout('frameLooper()',70); /* change 70 for speed */
    
    }
    frameLooper();
});






    /*  */
    
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