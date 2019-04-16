let app = {
    init: function() {
        console.log('in init');
        document.addEventListener('DOMContentLoaded', app.ready);
        //document.addEventListener('deviceready', app.ready);
        //document.querySelector('#music').play();
    },
    ready: function() {
        //document.querySelector('#audio-btn').addEventListener('click', app.changeClass(this, 'music'));
        document.querySelector('#audio-btn').addEventListener('click', app.changeClass);
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