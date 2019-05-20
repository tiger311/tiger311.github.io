var pages;
var currentIndex; // current index in pages[]
var leftBack = new Array();
var startX;

var divs, startY, currComIndex, divHeight;
var topBack = new Array();

let app = {
    init: function() {
        console.log('in init');
        document.addEventListener('DOMContentLoaded', app.ready);
        //document.addEventListener('deviceready', app.ready);
        //document.querySelector('#music').play();
    },

    ready: function() {
        document
            .querySelector('#audio-btn')
            .addEventListener('click', app.changeClass);
        document
            .querySelector('.editBtn')
            .addEventListener('click', app.enableEditing);

        pages = document.querySelectorAll('div .page');
        //console.log(pages);
        for (var i = 0; i < pages.length; i++) {
            pages[i].addEventListener('touchstart', app.handleTouchStart);
            pages[i].addEventListener('touchmove', app.handleTouchMove);
            pages[i].addEventListener('touchend', app.handleTouchEnd);
        }
        document
            .querySelector('#saveBtn')
            .addEventListener('click', app.savePage);
        //document.getElementById('div-page1').addEventListener('onload', app.page1Loaded); //div has no onload event!
        //app.addBackgroundInPage1('../image/astronaut4-1-10801920.jpg');   // ensure that run after all the background loaded!
        //window.onload = app.slideStart;
        app.page1Loaded(); //确保背景图load完才 slideStart()
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
    ////////////////////////////////////
    enableEditing: function(ev) {
        console.log('in enableEditing');
        ev.currentTarget.style.zIndex = -1;
        btns = document.querySelector('.save-cancel').style.zIndex = 0;
        //editBtn = document.querySelector('editBtn')
        divs = document.querySelectorAll('#div-page2 .commander');
        console.log(divs);
        for (var i = 0; i < divs.length; i++) {
            divs[i].addEventListener('touchstart', app.commanderTouchStart);
            divs[i].addEventListener('touchmove', app.commanderTouchMove);
            divs[i].addEventListener('touchend', app.commanderTouchEnd);
            //divs[i].children[0].style.border = '2px solid yellow';
            divs[i].style.border = '2px solid yellow';
        }
    },
    //////////////////////////////////////
    savePage: function(ev) {
        console.log('in savePage.');
        var serialized = document.documentElement.outerHTML;
        var user = 'u1';
        var file = new File([serialized], 'index-' + user + '.html', {type: 'text/html'});
        var action = 'put';
        //console.log('file name and type: ' + file.name + '  ' + file.type);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://brainstar.herokuapp.com/sign-s3?file-name=${file.name}&file-type=${file.type}&action=${action}`);
        //xhr.open('GET', `http://cors.io/?https://brainstar.herokuapp.com/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        //xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        //xhr.open('GET', '/sign-s3?user=' + user);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    app.uploadFile(file, response.signedRequest, response.url);
                } else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    },
    //////////////////////////////////////////
    uploadFile: function(file, signedRequest, url) {
        console.log('in uploadFile.');
        const xhr = new XMLHttpRequest();
        console.log(signedRequest);
        xhr.open('PUT', signedRequest);
        //xhr.setRequestHeader('Content-Type', 'binary');
        //xhr.setRequestHeader('x-amz-acl', 'public-read');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    //document.getElementById('preview').src = url;
                    //document.getElementById('avatar-url').value = url;
                    console.log('xhr status == 200');
                } else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    },

    // savePage: function(ev) {
    //     console.log('in savePage');
    //     const uri = 'https://brainstar.herokuapp.com/savepage';

    //     // new Request(uri);
    //     // new Request(uri, options);
    //     //options - method, headers, body, mode
    //     //methods: GET, POST, PUT, DELETE, OPTIONS

    //     //new Headers();
    //     //headers.append(name, value);
    //     //Content-Type, Content-Length, Accept, Accept-Language,
    //     var serialized = document.documentElement.outerHTML;
    //     console.log(serialized);
    //     var h = new Headers();
    //     //h.append('Content-Type', 'application/x-www-form-urlencoded');
    //     h.append('Cache-Control', 'no-cache');
    //     var formData = new FormData();
    //     formData.append('username', 'u1');
    //     formData.append('userpage', serialized);
    //     var req = new Request(uri, {
    //         method: 'POST',
    //         headers: h,
    //         mode: 'no-cors',
    //         body: formData
    //     });

    //     fetch(req)
    //         .then(response => {
    //             if (response.ok) {
    //                 console.log('save page ok.');
    //             } else {
    //                 throw new Error('bad http stuff!');
    //             }
    //         })
    //         // .then(response => {
    //         //     if (response.ok) {
    //         //         return response.json();
    //         //     } else {
    //         //         throw new Error('bad http stuff!');
    //         //     }
    //         // })
    //         // .then(jsonData => {
    //         //     console.log(jsonData);
    //         // })
    //         .catch(err => {
    //             console.log('error: ', err.message);
    //         });
    // },
    /////////// page1Loaded() 作用是在page1背景图load完毕之后才启动文本滑动进入
    page1Loaded: function() {
        console.log('page1 loaded!');
        //var bg = document.querySelectorAll('#div-page1').style.background;
        var bg = $('#div-page1').css('background');
        //console.log(bg);
        //var pattern = /".*?"/g;
        //var url = pattern.exec(bg);
        var url = bg.match(/".*?"/g)[0]; //取出""内字符串
        url = '..' + url.match(/\/image\/.*/)[0].replace(/\"/, ''); //取出"/image/..."并删除结尾处的"
        console.log('url: ' + url);
        var img = new Image();
        img.onload = function() {
            console.log('img loaded.');
            app.slideStart();
        };
        img.src = url;
        if (img.complete) img.onload();
    },
    // addBackgroundInPage1: function(url) {
    //     var img = new Image();
    //     img.src = url;
    //     var page1 = document.getElementById('div-page1');
    //     page1.style.background = 'url(' + url + ')';
    //     page1.style.backgroundSize = 'cover';
    //     img.onload = function() {
    //         app.slideStart();
    //     };
    // },
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
    },
    ///////////////////////////////////////////////
    handleTouchStart: function(ev) {
        console.log('in touchstart');
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
            else leftBack[i] = pages[i].offsetLeft / screen.width + '00%'; //record origin Left value
        }
        console.log(leftBack);
    },
    /////////////////////////////////////////////
    handleTouchMove: function(ev) {
        console.log('in touchmove');
        var scrWidth = screen.width;
        var touch = ev.touches[0];
        var change = startX - touch.clientX;
        if (
            (change < 0 && currentIndex == 0) ||
            (change > 0 && currentIndex == pages.length - 1)
        ) {
            ev.stopPropagation();
            return;
        }
        //if (change > 0) //往右翻页
        //    pages[currentIndex + 1].style.display = 'block';
        //else    //往左翻页
        //    pages[currentIndex - 1].style.display = 'block';
        for (var i = 0; i < pages.length; i++) {
            pages[i].style.left =
                (parseInt(leftBack[i]) / 100) * scrWidth - change + 'px';
        }
        ev.preventDefault();
    },
    ///////////////////////////////////////
    handleTouchEnd: function(ev) {
        console.log('in touchend');
        var i;
        var change = startX - ev.changedTouches[0].clientX;
        if (
            (change < 0 && currentIndex == 0) ||
            (change > 0 && currentIndex == pages.length - 1)
        ) {
            ev.stopPropagation();
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
            pages[currentIndex].style.transition = 'all 0.2s';
            pages[currentIndex].style.WebkitTransition = 'all 0.2s';
            if (change > 0) {
                //往右翻页
                pages[currentIndex + 1].style.transition = 'all 0.2s';
                pages[currentIndex + 1].style.WebkitTransition = 'all 0.2s';
                for (i = 0; i < pages.length; i++) {
                    pages[i].style.left = parseInt(leftBack[i]) - 100 + '%';
                    //console.log('to right: pages' + i + "  " + pages[i].style.left);
                }
            } else {
                //往左翻页
                pages[currentIndex - 1].style.transition = 'all 0.2s';
                pages[currentIndex - 1].style.WebkitTransition = 'all 0.2s';
                for (i = 0; i < pages.length; i++) {
                    //pages[i].style.left = (leftBack[i] / screen.width + 1) * 100 + '%';
                    pages[i].style.left = parseInt(leftBack[i]) + 100 + '%';
                    //console.log('to left: pages' + i + "  " + pages[i].style.left);
                }
            }
            console.log(pages[1].style.left);
        }
    },
    ////////////////////////////////////////////////
    changeClass: function(ev) {
        var target = ev.currentTarget;
        var className = $(target).attr('class');
        console.log('in changeclass');
        console.log(target);
        console.log(ev);
        className == 'on'
            ? $(target)
                  .removeClass('on')
                  .addClass('off')
            : $(target)
                  .removeClass('off')
                  .addClass('on');
        //var au = target.firstChild;
        var au = target.children[0];
        console.log(au);
        className == 'on' ? au.pause() : au.play();
    },
    //play: function() {
    //    document.getElementById('music').play();
    //}
    /////////////////////////////////////////////////////
    //divs: null, startY: 0, currComIndex: 0, divHeight: 0, topBack: new Array(),
    ////////////////////////////////////////////////////
    commanderTouchStart: function(ev) {
        console.log('in commanderTouchStart');
        console.log(
            'screen width: ' + screen.width + ' screen height: ' + screen.height
        );
        console.log(
            'inner width: ' + innerWidth + ' inner height: ' + innerHeight
        );
        console.log(
            'outer width: ' + outerWidth + ' outer height: ' + outerHeight
        );
        divHeight = divs[0].offsetHeight;
        //console.log(ev.touches[0]);
        startY = ev.touches[0].clientY;
        for (var i = 0; i < divs.length; i++) {
            if (divs[i].style.top) topBack[i] = parseInt(divs[i].style.top);
            else topBack[i] = divs[i].offsetTop; //record origin Left value
            if (ev.currentTarget.id == divs[i].id) {
                currComIndex = i;
            }
        }
        console.log(topBack);
        //console.log(topBack[1] + topBack[1]);
        console.log('current index: ' + currComIndex);
        ev.stopPropagation();
    },
    /////////////////////////////////////////////////
    commanderTouchMove: function(ev) {
        console.log('in commanderTouchmove');
        var touch = ev.touches[0];
        var change = touch.clientY - startY;
        console.log(
            (change < 0 && currComIndex == 0) ||
                (change > 0 && currComIndex == divs.length - 1)
        );
        if (
            // (change < 0) scroll up, (change > 0) scroll down
            (change < 0 && currComIndex == 0) ||
            (change > 0 && currComIndex == divs.length - 1)
        ) {
            console.log(change);
            ev.stopPropagation();
            return;
        }
        console.log('here!');
        for (var i = 0; i < divs.length; i++) {
            //divs[i].style.top = topBack[i] + change + 'px';
            divs[i].style.top = topBack[i] + change;
        }

        // if (    // (change < 0) scroll up, (change > 0) scroll down
        //     !((change < 0 && currComIndex == 0) ||
        //     (change > 0 && currComIndex == (divs.length - 1)))
        // ) {
        //     console.log('here!');
        //     for (var i = 0; i < divs.length; i++) {
        //         //divs[i].style.top = topBack[i] + change + 'px';
        //         divs[i].style.top = topBack[i] + change;
        //     }
        // }
        ev.stopPropagation();
    },
    //////////////////////////////////////////////
    commanderTouchEnd: function(ev) {
        console.log('in commanderTouchend');
        var i;
        var change = ev.changedTouches[0].clientY - startY;
        if (
            (change < 0 && currComIndex == 0) ||
            (change > 0 && currComIndex == divs.length - 1)
        ) {
            ev.stopPropagation();
            return;
        }
        var threshold = divHeight / 3;
        //console.log('change ' + change + ', threshold ' + threshold);
        if (Math.abs(change) < threshold) {
            for (i = 0; i < divs.length; i++) {
                divs[i].style.top = topBack[i];
            }
        } else {
            divs[currComIndex].style.transition = 'all 0.2s';
            divs[currComIndex].style.WebkitTransition = 'all 0.2s';
            if (change > 0) {
                //往下翻页
                divs[currComIndex + 1].style.transition = 'all 0.2s';
                divs[currComIndex + 1].style.WebkitTransition = 'all 0.2s';
                for (i = 0; i < divs.length; i++) {
                    divs[i].style.top = topBack[i] + divHeight;
                    //console.log('to right: pages' + i + "  " + pages[i].style.left);
                }
            } else {
                //往上翻页
                divs[currComIndex - 1].style.transition = 'all 0.2s';
                divs[currComIndex - 1].style.WebkitTransition = 'all 0.2s';
                for (i = 0; i < divs.length; i++) {
                    divs[i].style.top = topBack[i] - divHeight;
                }
            }
            for (i = 0; i < divs.length; i++) {
                console.log(divs[i].style.top);
            }
        }
        ev.stopPropagation();
    },
};
app.init();
