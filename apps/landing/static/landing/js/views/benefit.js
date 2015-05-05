var benefitView = {

    init: function(){
        this.mc = new Hammer(document.getElementById('section-benefit'));
        this.owl = $("#carousel");
        this.start();
        this.events();
    },

    start: function(){
        this.owl.owlCarousel();

        // force to update
        this.update()
    },

    events: function(){
        $('#carousel-info .info').on('mouseover', function(e){
            if(device.mobile == false){
                var slide = $(e.currentTarget).data('slide');
                benefitView.owl.trigger('owl.jumpTo', slide);
            }
        })

        watch(device, 'mobile', function(){
            benefitView.update()
        });

        this.mc.on("swipeleft swiperight", function(ev) {
            if(ev.type == 'swiperight'){
                benefitView.owl.trigger('owl.prev');
            }else{
                benefitView.owl.trigger('owl.next');
            }
        });
    },

    update: function(){
        var options = {
            singleItem : true,
            afterMove: this.onMove,
            mouseDrag: true,
            touchDrag: true,
        }

        if(device.mobile == true){
            options.mouseDrag = false;
            options.touchDrag = false;
            this.mc.set({ enable: true });
        }else{
            this.mc.set({ enable: false });
        }

        this.owl.data('owlCarousel').reinit(options);
    },
    
    onMove: function(){
        $('#carousel-info .info').each( function(){ $(this).removeClass('active'); })
        $('#carousel-info .info[data-slide='+this.currentItem+']').addClass('active');
    }
}
