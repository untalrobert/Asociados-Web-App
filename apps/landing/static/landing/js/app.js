var device = { mobile: true }

$(document).on('ready', function() {

    // scroll up button
    $().UItoTop({ easingType: 'easeOutQuart' });

    // scroll menu animation
    $(".scroll").on('click', function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top},1200);
    });

    // paralax effects
    $(window).scroll(function() {
        $('#header-parallax').css('top', -($(window).scrollTop() / 3));
    });

    // scroll reveals for animations
    window.sr = new scrollReveal();

    // detect resize for mobile size
    $(window).on('resize', function() {
        device.mobile = ( $( window ).width() > 768 ) ? false : true
    });

    // trigger first resize
    $(window).resize();
    
    // init sections
    benefitView.init();

});
