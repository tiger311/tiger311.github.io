var pages;
var currentIndex;      // current index in pages[]
var leftBack = new Array();
var startX;

let app = {
    //pages: null,
    //startX: 0.0,

    init: function() {
        console.log('in init');
        document.addEventListener('DOMContentLoaded', app.ready);
        //document.addEventListener('deviceready', app.ready);
        //document.querySelector('#music').play();
    },
    ready: function() {
        //document.querySelector('#audio-btn').addEventListener('click', app.changeClass(this, 'music'));
        document.querySelector('#audio-btn').addEventListener('click', app.changeClass);
        pages = document.querySelectorAll('div .page');
        console.log(pages);
        for (var i = 0; i < pages.length; i++) {
            pages[i].addEventListener('touchstart', app.handleTouchStart);
            pages[i].addEventListener('touchmove', app.handleTouchMove);
            pages[i].addEventListener('touchend', app.handleTouchEnd);
        }
        console.log('in ready');
        //var d = document.querySelector('#audio-btn');
        //var au = document.createElement('audio');
        //au.src = 'audio/buzzsaw.mp3';      // use the relative path of page1.html  !!!
        //au.id = 'music';
        //au.controls = true;
        //au.loop = true;
        //au.autoplay = true;
        //au.load();
        //d.appendChild(au);
        //d.addEventListener('click', app.changeClass(this, 'music'));
    },
    handleTouchStart: function(ev) {
        var i;
        startX = ev.touches[0].clientX;
        for (i = 0; i < pages.length; i++) {
            if (ev.currentTarget.id == pages[i].id) {
                currentIndex = i;
                break;
            }
        }
        for (i = 0; i < pages.length; i++) {
            leftBack[i] = pages[i].offsetLeft;       //record origin Left value
        }
        console.log(leftBack);
    },
    handleTouchMove: function(ev) {
        var touch = ev.touches[0];
        var change = startX - touch.clientX;
        //console.log(target.id);
        if ((change < 0 && currentIndex == 0) || (change > 0 && currentIndex == (pages.length - 1))) {
            return;
        }
        for (var i = 0; i < pages.length; i++) {
            pages[i].style.left = pages[i].offsetLeft + change + 'px';
        }
        ev.preventDefault();
    },
    handleTouchEnd: function(ev) {
        //console.log('screen width =' + screen.width);
        var i;
        var change = startX - ev.changedTouches[0].clientX;
        if ((change < 0 && currentIndex == 0) || (change > 0 && currentIndex == (pages.length - 1))) {
            return;
        }
        var threshold = screen.width / 3;
        if (Math.abs(change) < threshold) {
            for (i = 0; i < pages.length; i++) {
                pages[i].style.left = (leftBack[i] / screen.width) * 100 + '%';
            }
        } else {
            pages[currentIndex].style.transition = 'all .3s';
            if (change > 0) {
                //往右翻页
                pages[currentIndex + 1].style.transition = 'all .3s';
                for (i = 0; i < pages.length; i++) {
                    pages[i].style.left = (leftBack[i] / screen.width - 1) * 100 + '%';
                    console.log('to right: pages' + i + "  " + pages[i].style.left);
                }
            } else {
                //往左翻页
                pages[currentIndex - 1].style.transition = 'all .3s';
                for (i = 0; i < pages.length; i++) {
                    pages[i].style.left = (leftBack[i] / screen.width + 1) * 100 + '%';
                    console.log('to right: pages' + i + "  " + pages[i].style.left);

                }
            }
        }
    },
    changeClass: function(ev) {
        //alert('here');
        var target = ev.currentTarget;
        var className = $(target).attr('class');
        //var player = document.getElementById(id);
        
        console.log('in changeclass');
        console.log(target);
        console.log(ev);
        (className == 'on')
            ? $(target).removeClass('on').addClass('off')
            : $(target).removeClass('off').addClass('on');
        //var au = target.firstChild;
        var au = target.children[0];
        console.log(au);
        (className == 'on') ? au.pause() : au.play();
    }
    //play: function() {
    //    document.getElementById('music').play();
    //}
};
app.init();