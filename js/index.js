var pages;
var currentIndex; // current index in pages[]
var leftBack = new Array();
var startX;

let app = {
  init: function() {
    console.log("in init");
    document.addEventListener("DOMContentLoaded", app.ready);
    //document.addEventListener('deviceready', app.ready);
    //document.querySelector('#music').play();
  },

  ready: function() {
    //document.querySelector('#audio-btn').addEventListener('click', app.changeClass(this, 'music'));
    document
      .querySelector("#audio-btn")
      .addEventListener("click", app.changeClass);
    document.querySelector('#div-page1 .slide-wrapper').addEventListener('click', app.slideStart);
    pages = document.querySelectorAll("div .page");
    console.log(pages);
    for (var i = 0; i < pages.length; i++) {
      pages[i].addEventListener("touchstart", app.handleTouchStart);
      pages[i].addEventListener("touchmove", app.handleTouchMove);
      pages[i].addEventListener("touchend", app.handleTouchEnd);
    }
    //var p = document.querySelector('#p-slide');
    //p.style.transition = 'all 10s';
    //p.style.WebkitTransition = 'top 10s';
    //p.style.top = '0';

    //p.style.display = 'block';
    console.log("in ready");
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
  slideStart: function(ev) {
    console.log('in slideStart');
    //var p = document.getElementById('p-slide');
    //p.className += ' fade-in';
    //p.style.top = '10px';
    //window.setTimeout( function() {
    //  p.className += ' fade-in';
    //}, 100);
    //console.log(p);
    var p1 = document.querySelectorAll('#p-slide');
    p1[0].style.top = '0';
    console.log(p1[0]);
    console.log(p1[0].style.top);
    //p.style.transition = 'all 10s';
    //p.style.WebkitTransition = 'all 10s';
    //p.style.top = '0';
    //p.style.display = 'block';
  },
  ///////////////////////////////////////////////
  handleTouchStart: function(ev) {
    console.log("in touchstart");
    var i;
    startX = ev.touches[0].clientX;
    for (i = 0; i < pages.length; i++) {
      if (ev.currentTarget.id == pages[i].id) {
        currentIndex = i;
        break;
      }
    }
    for (i = 0; i < pages.length; i++) {
      if (pages[i].style.left) leftBack[i] = pages[i].style.left;
      else leftBack[i] = pages[i].offsetLeft / screen.width + "00%"; //record origin Left value
    }
    console.log(leftBack);
  },
  /////////////////////////////////////////////
  handleTouchMove: function(ev) {
    console.log("in touchmove");
    var scrWidth = screen.width;
    var touch = ev.touches[0];
    var change = startX - touch.clientX;
    if (
      (change < 0 && currentIndex == 0) ||
      (change > 0 && currentIndex == pages.length - 1)
    ) {
      return;
    }
    //if (change > 0) //往右翻页
    //    pages[currentIndex + 1].style.display = 'block';
    //else    //往左翻页
    //    pages[currentIndex - 1].style.display = 'block';
    for (var i = 0; i < pages.length; i++) {
      pages[i].style.left =
        (parseInt(leftBack[i]) / 100) * scrWidth - change + "px";
    }
    ev.preventDefault();
  },
  ///////////////////////////////////////
  handleTouchEnd: function(ev) {
    console.log("in touchend");
    var i;
    var change = startX - ev.changedTouches[0].clientX;
    if (
      (change < 0 && currentIndex == 0) ||
      (change > 0 && currentIndex == pages.length - 1)
    ) {
      return;
    }
    var threshold = screen.width / 3;
    if (Math.abs(change) < threshold) {
      //if (change > 0) //撤回往右翻页
      //    pages[currentIndex + 1].style.display = 'none';
      //else    //撤回往左翻页
      //    pages[currentIndex - 1].style.display = 'none';
      for (i = 0; i < pages.length; i++) {
        pages[i].style.left = leftBack[i];
      }
    } else {
      pages[currentIndex].style.transition = "all 0.2s";
      pages[currentIndex].style.WebkitTransition = "all 0.2s";
      if (change > 0) {
        //往右翻页
        pages[currentIndex + 1].style.transition = "all 0.2s";
        pages[currentIndex + 1].style.WebkitTransition = "all 0.2s";
        for (i = 0; i < pages.length; i++) {
          pages[i].style.left = parseInt(leftBack[i]) - 100 + "%";
          //console.log('to right: pages' + i + "  " + pages[i].style.left);
        }
      } else {
        //往左翻页
        pages[currentIndex - 1].style.transition = "all 0.2s";
        pages[currentIndex - 1].style.WebkitTransition = "all 0.2s";
        for (i = 0; i < pages.length; i++) {
          //pages[i].style.left = (leftBack[i] / screen.width + 1) * 100 + '%';
          pages[i].style.left = parseInt(leftBack[i]) + 100 + "%";
          //console.log('to left: pages' + i + "  " + pages[i].style.left);
        }
      }
      console.log(pages[1].style.left);
    }
  },

  changeClass: function(ev) {
    //alert('here');
    var target = ev.currentTarget;
    var className = $(target).attr("class");
    //var player = document.getElementById(id);

    console.log("in changeclass");
    console.log(target);
    console.log(ev);
    className == "on"
      ? $(target)
          .removeClass("on")
          .addClass("off")
      : $(target)
          .removeClass("off")
          .addClass("on");
    //var au = target.firstChild;
    var au = target.children[0];
    console.log(au);
    className == "on" ? au.pause() : au.play();
  }
  //play: function() {
  //    document.getElementById('music').play();
  //}
};
app.init();
