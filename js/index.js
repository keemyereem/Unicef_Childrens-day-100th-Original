$(function(){
    faqEvent.init();

});



    /* text typing motion */
    var string = "#어린이날100주년 #foreverychild #유니세프후원자라면"; /* type your text here */
    var array = string.split("");
    var timer;
    
    function frameLooper () {
        if (array.length > 0) {
            document.getElementById("typing").innerHTML += array.shift();
        } else {
            clearTimeout(timer);
                }
        loopTimer = setTimeout('frameLooper()',70); /* change 70 for speed */
    
    }
    frameLooper();

    /*  */
    
    var faqEvent = {
        init:function(){
            this.faqtab();
            this.faqToggle();
        },
        faqtab:function(){
            $('.faq_tab li').click(function(){
                alert();
                var tabs_idx = $('.faq_tab li').index(this)+1;
                $('.faq_tab li').removeClass('on');
                $(this).addClass('on');
                console.log();
                $('.faq_cont').removeClass('on');
                $('.faq_cont0' + tabs_idx).addClass('on');
            });
        },
        faqToggle: function(){
            $(".que").click(function() {
                $(this).next(".ans").stop().slideToggle(300);
                $(this).toggleClass('on').siblings().removeClass('on');
                $(this).next(".ans").siblings(".ans").slideUp(300); 
             });
        },
    };    /* text typing motion */
    var string = "#어린이날100주년 #foreverychild #유니세프후원자라면"; /* type your text here */
    var array = string.split("");
    var timer;
    
    function frameLooper () {
        if (array.length > 0) {
            document.getElementById("typing").innerHTML += array.shift();
        } else {
            clearTimeout(timer);
                }
        loopTimer = setTimeout('frameLooper()',70); /* change 70 for speed */
    
    }
    frameLooper();

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
                console.log();
                $('.faq_cont').removeClass('on');
                $('.faq_cont0' + tabs_idx).addClass('on');
            });
        },
        faqToggle: function(){
            $(".que").click(function() {
                $(this).next(".ans").stop().slideToggle(300);
                $(this).toggleClass('on').siblings().removeClass('on');
                $(this).next(".ans").siblings(".ans").slideUp(300); 
             });
        },
    };