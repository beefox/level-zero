// script.js

// TODO
// 1. MAKE GAME POINTS WORK
// 4. ADD ACHIEVEMENT ITEMS - first item (all players) = fire arrows === target burning down animation
//**second item geek - acid melting target 
//**second item goth - cats === cats splatting on target
//***third item geek - nuclear arrow === mushroom cloud vaporizes target and terrifies Robin
//***third item goth - guitar === wailing on the guitar vibrates the target to pieces and Robin begs for the horribly torturous noise to end.
// --UNLOCKABLE CHARACTERS ("GOTHESS & GEEKETTE")
// ADD facebook API for graduation to version 1.0
// --UNLOCKABLE CHARACTER (ALL CHARACTERS FROM G&G - THE SHOW)

$(function () {
    $('.thumbnail').hide();
    alert("Welcome to Geek & Goth: Level Zero -- version: ALPHA");


    //var xTriggered = 0;
    //$(document).keyup(function (event) {
    //    xTriggered++;
    //    //var msg = "Handler for .keyup() called " + xTriggered + " time(s).";
    //    //$.print(msg, "html");
    //    //$.print(event);
    //    alert(event)
    //}).keydown(function (event) {
    //    if (event.which == 'g') {
    //        event.preventDefault();
    //    }
    //});

    //$("#other").click(function () {
    //    $("#target").keyup();
    //});

    /* ---------------------------
       Geek & Goth: Level Zero 0.1
       --------------------------- */

    // Click the NEW GAME button
    $('#fire').click(function () {

        var gameBgStyle = {
            background: "url('../img/giphy.gif') center)",
            height: '200%'
        }

        // set the game back-ground image
        $('#shoot').css({ background: 'url(../img/giphy.gif)', 'background-size': 'contain' });

        // set variables
        var bannerWasShown = false;
        var dt = new Date();// Or get the user login date from an HTML element (i.e. hidden input)
        var interval;
        var postInterval;
        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        //alert(time);

        var playerGold = null;
        var weaponSelected = "normal_arrows"
        var characterSelected = null;
        var buttonCounter = false;
        var music = null;
        var bowdraw = null;
        var bowfire = null;
        var pointsPerRound = null;
        //var play = null;
        //var pause = null;
        var mouseX;
        var mouseY;
        var meterAnimated = false;
        var lastPlayerScore = null;


        // style for shoot button
        var style = {
            color: 'red',
            backgroundColor: 'yellow'
        };

        var bannerStyle = {
            width: '80%',
            margin: '40px auto 0',
            background: '333',
            'background-image': 'url(../img/GAG_banner-1.gif)',
            'background-position-x': 'center',
            'background-position-y': 'center',
            'background-size': '100%',
            height: '200px',
            'box-shadow': '2px 2px 5px 2px grey'
        }

        $('.thumbnail').show();

        bannerShow();

        postInterval = window.setInterval(function () {
            var now = new Date();
            if (now.getDate() >= dt.getDate() && bannerWasShown == true) {
                bannerHide();
            }
        }, 15 * 1000);

        interval = window.setInterval(function () {
            var now = new Date();
            if (now.getDate() >= dt.getDate() && bannerWasShown == false) {
                bannerShow();
            }
        }, 5 * 1 * 60 * 1000);

        //function play() {
        //    music.play();
        //    play.style.color = 'black';
        //    pause.style.color = '#999';
        //}
        //function pause() {
        //    music.pause();
        //    play.style.color = '#999';
        //    pause.style.color = 'black';
        //}

        // initialize audio and character video bio's
        init();
        music.play();

        // select a player character menu (transition)
        $('#first-button-set').hide();
        $('#myflex').hide(1000);
        $('#second-button-set').show();

        // click on the GEEK BUTTON to select Geek as a playable character
        $('#geek-button').click(function () {
            characterSelected = "Geek";
            if (characterSelected == "Geek") {
                $('.thumbnail').hide();
                //alert('you have selected ' + characterSelected);
                // unhide the cloned goth element
                $('#cloned-goth').show();
            }
            $('h1, h2, footer, #second-button-set, #goth').hide();
            $('#game, #chest, #third-button-set').show();
            hudInit();
            shooting();
        });

        // click on the GOTH BUTTON to select Goth as a playable character
        $('#goth-button').click(function () {
            characterSelected = "Goth";
            if (characterSelected == "Goth") {
                $('.thumbnail').hide();
                //alert('you have selected ' + characterSelected);
                // unhide the cloned geek element
                $('#cloned-geek').show();
            }
            $('h1, h2, footer, #second-button-set, #geek').hide();
            $('#third-button-set, #game, #chest').show();
            hudInit();
            shooting();
        });

        // click on the GEEK & GOTH TITLE to open easter egg... happy b-day!
        $('#headertitle').click(function () {
            music.pause();
            $(this).text('Happy Birthday!')
            $('#second-button-set, #gag-footer').hide();
            $('header h2').text('I love you!');
            alert('Happy Birthday Aya!');
            $('head').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/howler/1.1.25/howler.min.js"/></script>');

            $('body').replaceWith('<audio loop autoplay id="bgMusic"><source src="https://dl.dropboxusercontent.com/u/44685969/the_beatles-birthday.mp3" type="audio/mp3" />Your browser does not support the audio element. Download the audio/video in <a href="https://dl.dropboxusercontent.com/u/44685969/the_beatles-birthday.mp3">MP3</a>format.</audio><div id="bdayegg-container"><div id="bdayeggbutton-container" hidden><button id="explosion">BOOM !</button><button id="basic_explosion">Basic Explosion</button></div><canvas id="canvas" width="600" height="600"></canvas><div id = "bdayegg-subcontainer"><div id="bdayegg-text">Happy Birthday!<br>This is your birthday egg. I know it might be pretty nerdy but I wanted to dedicate this to you and show you how importand and how much you mean to me. It sucks that I could not finish it, but when I get done this will be the coolest part of the whole game. Gothess will be the only character in this game and it will be awesome! Maybe it will be a little like mario when I am done? I hope you like this though. I love you so much!!! You are my inspiration in all things... you are what drives me to do great things and I want them to be great for you. I know greateness is not delivered over-night, so I will keep working until I am successful. You are gothess... my eternal soul mate... I did not let her wear black though, well... because it is her birthday. Is that all right?<br>Always and forever!<br>I love you!!!</div></div><iframe id="bdegg-cake" src="//giphy.com/embed/hRS2MZzDx933i?html5=true&hideSocial=true" class="giphy-embed" allowfullscreen="" frameborder="0" height="332" width="480"></iframe></div><iframe id="bdegg-dog" src="//giphy.com/embed/RoUbJeZ6xq1dm?html5=true&hideSocial=true" class="giphy-embed" allowfullscreen="" frameborder="0" height="281" width="480"></iframe><script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.0.js"></script>');
            function init() {
                music = document.getElementById("bgMusic");
            }
            //music.play();
            var canvas;
            var context2D;
            var mousePos;

            var particles = [];

            function randomFloat(min, max) {
                return min + Math.random() * (max - min);
            }

            function removeFromArray(array, object) {
                var idx = array.indexOf(object);
                if (idx !== -1) {
                    array.splice(idx, 1);
                }
                return array;
            }

            /*
             * A single explosion particle
             */
            function Particle() {
                this.scale = 1.0;
                this.x = 0;
                this.y = 0;
                this.radius = 20;
                this.color = "#000";
                this.velocityX = 0;
                this.velocityY = 0;
                this.scaleSpeed = 0.5;
                this.useGravity = false;

                this.update = function (ms) {
                    // shrinking

                    this.scale -= this.scaleSpeed * ms / 1000.0;

                    if (this.scale <= 0) {
                        // particle is dead, remove it
                        removeFromArray(particles, this);

                    }

                    // moving away from explosion center
                    this.x += this.velocityX * ms / 1000.0;
                    this.y += this.velocityY * ms / 1000.0;

                    // and then later come downwards when our
                    // gravity is added to it. We should add parameters 
                    // for the values that fake the gravity
                    if (this.useGravity) {
                        this.velocityY += Math.random() * 4 + 4;
                    }
                };

                this.draw = function (context2D) {
                    // translating the 2D context to the particle coordinates
                    context2D.save();
                    context2D.translate(this.x, this.y);
                    context2D.scale(this.scale, this.scale);

                    // drawing a filled circle in the particle's local space
                    context2D.beginPath();
                    context2D.arc(0, 0, this.radius, 0, Math.PI * 2, true);
                    //context2D.closePath();

                    context2D.fillStyle = this.color;
                    context2D.fill();

                    context2D.restore();
                };
            }

            /*
             * Basic Explosion, all particles move and shrink at the same speed.
             * 
             * Parameter : explosion center
             */
            function createBasicExplosion(x, y) {
                // creating 4 particles that scatter at 0, 90, 180 and 270 degrees
                for (var angle = 0; angle < 360; angle += 90) {
                    var particle = new Particle();

                    // particle will start at explosion center
                    particle.x = x;
                    particle.y = y;

                    particle.color = "#FF0000";

                    var speed = 50.0;

                    // velocity is rotated by "angle"
                    particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
                    particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

                    // adding the newly created particle to the "particles" array
                    particles.push(particle);
                }
            }

            /*
             * Advanced Explosion effect
             * Each particle has a different size, move speed and scale speed.
             * 
             * Parameters:
             * 	x, y - explosion center
             * 	color - particles' color
             */
            function createExplosion(x, y, color) {
                var minSize = 10;
                var maxSize = 30;
                var count = 10;
                var minSpeed = 60.0;
                var maxSpeed = 200.0;
                var minScaleSpeed = 1.0;
                var maxScaleSpeed = 4.0;

                for (var angle = 0; angle < 360; angle += Math.round(360 / count)) {
                    var particle = new Particle();

                    particle.x = x;
                    particle.y = y;

                    // size of particle
                    particle.radius = randomFloat(1, 3);

                    particle.color = color;

                    // life time, the higher the value the faster particle 
                    // will die
                    particle.scaleSpeed = randomFloat(0.3, 0.5);

                    // use gravity
                    particle.useGravity = true;

                    var speed = randomFloat(minSpeed, maxSpeed);

                    particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
                    particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

                    particles.push(particle);
                }

            }

            // Delta = time between two consecutive frames,
            // for time-based animation
            function updateAndDrawParticules(delta) {
                for (var i = 0; i < particles.length; i++) {
                    var particle = particles[i];

                    particle.update(delta);
                    particle.draw(context2D);
                }
            }

            //------------- ANIMATION PART -------------------------
            var delta, oldTime = 0;

            function timer(currentTime) {
                var delta = currentTime - oldTime;
                oldTime = currentTime;
                return delta;

            }

            function animationLoop(time) {
                // number of ms since last frame draw
                delta = timer(time);

                // Clear canvas
                context2D.clearRect(0, 0, canvas.width, canvas.height);

                // Move and draw particles
                updateAndDrawParticules(delta);


                // call again the animation loop at 60f/s, i.e in about 16,6ms
                requestAnimationFrame(animationLoop);
            }


            window.addEventListener("load", function () {
                // canvas and 2D context initialization
                canvas = document.getElementById("canvas");
                context2D = canvas.getContext("2d");

                // Button click : BOOM !
                var button1 = document.getElementById("explosion");
                button1.addEventListener("click", function () {
                    var x = randomFloat(100, 400);
                    var y = randomFloat(100, 400);
                    startDoubleExplosion(x, y);
                });

                // Button click : basic effect
                var button2 = document.getElementById("basic_explosion");

                button2.addEventListener("click", function () {
                    createBasicExplosion(250, 200);
                    //sound.play('laser');
                });

                canvas.addEventListener("mousedown", function (evt) {
                    mousePos = getMousePos(canvas, evt);
                    startDoubleExplosion(mousePos.x, mousePos.y);
                }, false);

                // starting the game loop at 60 frames per second
                requestAnimationFrame(animationLoop);
            });
            function getMousePos(canvas, evt) {
                // necessary to take into account CSS boudaries
                var rect = canvas.getBoundingClientRect();
                return {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };
            }
            function startDoubleExplosion(x, y) {
                createExplosion(x, y, "#525252");
                // On peut multiplier la densité en générant plusieurs 
                // explositons de couleurs différentes...
                createExplosion(x, y, "#FFA318");
                //createExplosion(x, y, "green");
                //sound.play('blast');

            }
            // SOUND WITH HOWLER JS
            //var sound = new Howl({
            //    urls: ['http://goldfirestudios.com/proj/howlerjs/sounds.mp3', 'http://goldfirestudios.com/proj/howlerjs/sounds.ogg'],
            //    sprite: {
            //        blast: [0, 2000],
            //        laser: [3000, 700],
            //        winner: [5000, 9000]
            //    },
            //    onload: function () { console.log("Sound loaded"); }
            //});

        });

        function mousePage() {

            $(document).mousemove(function (e) {
                mouseX = e.pageX;
                mouseY = e.pageY;
            });
        }
        
        function init() {
            music = document.getElementById("bgMusic");
            bowdraw = document.getElementById("bowReadySFX");
            bowfire = document.getElementById("bowShotSFX");
            //play = document.getElementById("music-play");
            //pause = document.getElementById("music-pause");

            $(document).ready(function () {

                $(".thumbnail").hover(function () {
                    //$(this).fadeToggle('medium');
                    $('.thumbnail img').css('opacity', '0.1');
                    $(this).children("video")[0].play();
                }, function () {
                    var el = $(this).children("video")[0];
                    el.pause();
                    el.currentTime = 0;
                    $('.thumbnail img').removeAttr("opacity");
                });
            });
        }

        function bannerShow() {
            $('#shootingInfoContainer').css(bannerStyle);
            bannerWasShown = true;
        }

        function bannerHide() {
            $('#shootingInfoContainer').removeAttr('style');
            bannerWasShown = false;
        }

        // will look for the player in the DOM to clone and give an id
        function cloneOpponent(myValue) {

            // never did get this working right... couldn't seem to move cloned object...
            // ended up just using the DOM for this


            $('.player').css('max-height', '20%');
            $('.player').css('max-width', '08%');
            $('.player').css('bottom', '65%');

            // keeps track of original name
            var origValue = myValue;
            // translates to '#myValue'
            var myValue = '#' + myValue;
            // looks for '#myValue' on the DOM
            var orig = $('.game #shooting-range').find(myValue);



            // translatels to '$myValue'
            var $user = '$' + origValue;
            // clones the object
            var $user = $(orig).clone();
            // creates a name for the clone. ie..'cloned-myValue'
            var cloneName = 'cloned-' + origValue;
            // creates an Id name. ie.. '#cloned-myValue'
            var myId = "'#cloned-" + origValue; //+ "'"
            // change the class and id
            $user.removeAttr('id', 'class');
            $user.attr('id', cloneName);
            $user.attr('class', 'clone');

            //add the element to the DOM
            $('#shooting-range #geek').before($user.clone());
            /// THIS ISNT WORKING
            // changes the attribuse before cloning
            //max-height: 25%; max-width: 10%; bottom: 50%;

            $('#game .clone.player').css('max-height', '01%');
            $('#game .clone.player').css('max-width', '01%');
            $('#game .clone.player').css('bottom', '01%');

            //$('.player').css(style);
            //$('#cloned-goth').css(style);
        }

        // initialize the hud
        function hudInit() {
            $(".thumbnail").hover(function () {
                $('.thumbnail img').css('opacity', '0.1');
                $(this).children("video")[0].play();
            }, function () {
                var el = $(this).children("video")[0];
                el.pause();
                el.currentTime = 0;
                $('.thumbnail img').removeAttr("opacity");
            });

            // Weapons and acheivememts menu
            $("#blue-button").hover(function () {

                //tell to click to open acheivements menu
                mousePage();
                mouseX -= 150;
                $('#weaponsbutton-info').css({ 'bottom': mouseY, 'left': mouseX }).fadeIn('slow');
                $(self).one('click', function () {
                    $('#menubar-container')
                        .animate({ top: '02%', bottom: '02%' }, 'slow', function () {
                            // make close button appear
                            $("#close-menu-button").css('opacity', '1.0').fadeIn();
                        });
                })
            }, function () {
                // hides description on exit hover
                // unbindes self
                $(self).unbind("click");
                $('#weaponsbutton-info').fadeOut('slow');

            });

            $("#close-menu-button").hover(function () {
                //tell to click to open acheivements menu
                mousePage();
                mouseX -= 150;
                $('#closemenubutton-info').css({ 'top': mouseY, 'left': mouseX }).fadeIn('slow');
                $(self).one('click', function () {
                    $('#menubar-container')
                        .animate({ top: '90%', bottom: '0' }, 'slow', function () {
                            // make close button disapear 
                            $('#close-menu-button').fadeOut();
                        });
                })
            }, function () {
                $(self).unbind("click");
                // hides description on exit hover
                $('#closemenubutton-info').fadeOut('slow');
            });

            // Weapons and acheivememts menu
            $("#white-button").hover(function () {
                //tell to click to open acheivements menu
                mousePage();
                mouseX -= 150;
                $('#upgradesbutton-info').css({ 'bottom': mouseY, 'left': mouseX }).fadeIn('slow');
                $(self).one('click', function () {
                    $('#menubar-container2')
                        .animate({ top: '02%', bottom: '02%' }, 'slow', function () {
                            // make close button appear
                            $("#close-menu-button2").css('opacity', '1.0').fadeIn();
                        });
                })
            }, function () {
                // hides description on exit hover
                $(self).unbind("click");
                $('#upgradesbutton-info').fadeOut('slow');
            });

            $("#close-menu-button2").hover(function () {
                //tell to click to open acheivements menu
                mousePage();
                mouseX -= 150;
                $('#closemenubutton-info').css({ 'top': mouseY, 'left': mouseX }).fadeIn('slow');
                $(self).one('click', function () {
                    $('#menubar-container2')
                        .animate({ top: '0', bottom: '99%' }, 'slow', function () {
                            // make close button disapear 
                            $('#close-menu-button2').fadeOut();
                        });
                })
            }, function () {
                $(self).unbind("click");
                // hides description on exit hover
                $('#closemenubutton-info').fadeOut('slow');
            });

            // What's new menu
            $("#tv-button").hover(function () {
                //tell to click to open what's mew menu
                mousePage();
                mouseX -= 150;
                $('#whatsnewbutton-info').css({ 'bottom': mouseY, 'left': mouseX }).fadeIn('slow');
                $(self).one('click', function () {
                    $('#menubar-container3')
                        .show()
                        .animate({ opacity: '1.0' }, 'slow', function () {
                            // make close button appear
                            $("#close-menu-button3").css('opacity', '1.0');
                        });
                })
            }, function () {
                // hides description on exit hover
                $(self).unbind("click");
                $('#whatsnewbutton-info').fadeOut('slow');
            });

            $("#close-menu-button3").hover(function () {
                //tell to click for close
                mousePage();
                mouseX -= 150;
                $('#closemenubutton-info').css({ 'top': mouseY, 'left': mouseX }).fadeIn('slow');
                $(self).one('click', function () {
                    $('#menubar-container3')
                        .fadeOut('slow').promise().done(function () {
                            // make close button disapear 
                            $('#close-menu-button3').removeAttr('style');
                        })
                })
            }, function () {
                // hides description on exit hover
                $(self).unbind("click");
                $('#closemenubutton-info').fadeOut('slow');
            });
        }

        // arm motion after a shot
        function armAfter() {
            $('custom #arm-drawn-change').hide(600).promise().done(function () {
                $('#ready-button').show();
                $('#geeks-arm, #goths-arm').show();
                shootingagain();
            });
        }

        function calcScore() {
            // get the width of the window
            var windowWidth = $(window).width();
            // get the width of the meter
            var meterWidth = windowWidth - (windowWidth * 0.4);
            // get the width of the meter ball
            var ballWidth = $('#meter-ball').width();
            // get the width of the bullseye and set variable data for bullsLeft, bullsRight, and bullsCenter
            var bullseyeWidth = $('#bullseye').width();
            var x = $('#bullseye').position();
            var bullsLeft = x.left;
            var bullsRight = bullsLeft + bullseyeWidth;
            var bullsCenter = (bullsLeft + bullsRight) / 2;
            // set variable data for meterLeft, meterRight, and meterCenter            
            var meterLeft = windowWidth * 0.2;
            var meterRight = meterLeft + meterWidth;
            var meterCenter = (meterLeft + meterRight) / 2;
            // create and set variable data for ballLeft, ballRight, and ballCenter
            var ballLeft;
            var ballRight;
            x = $('#meter-ball').position();
            ballLeft = x.left;
            ballRight = ballLeft + ballWidth;
            var ballCenter = (ballLeft + ballRight) / 2;
            // set highest possile payout
            var cash = 1000;
            // if the ball is left of bullseye center
            var deductable;
            if (ballCenter < meterCenter) {
                deductable = (meterCenter % ballCenter) * 2;
                cash -= deductable;
                pointsPerRound = cash;
                // if the ball is right of bullseye center
            } else if (ballCenter >= meterCenter) {
                deductable = (ballCenter % meterCenter) * 2;
                cash -= deductable;
                pointsPerRound = cash;
            } else {
                console.log('A ball positioning error has occured during score calculation');
            }
            // check for bullseye
            var safety = windowWidth * .01;
            if (ballLeft <= bullsRight - safety / 2 && ballLeft >= bullsLeft - safety) {
                playerGold += 2;
                pointsPerRound += 200;
                $('#treasure span').text(playerGold);
                alert('BULLSEYE BONUS: +2 GOLD!');
            }
            return pointsPerRound;
        }

        // when the shoot button is clicked
        function buttonFireEvent() {
            $('#shoot-button').one("click", function () {
                $(this).hide();
                $('#third-button-set h3').text('You have fired at the target!');
                $('custom #bow-drawn').hide();
                $('#meter-ball').stop();

                $('.ready #bow-ready, .cloned #bow-ready').show();
                shootprojectile();
                bowfire.play();
                armAfter();

                // show the poi
                $('#poi').attr('style', 'visibility: visible');
                // shows the poi on big target
                getPsudoPOIpos();

                //shows the big target
                $('.player_stats').fadeIn(1000).promise().done(function () {
                    // hides the game meter
                    $('#meter-ball').hide(2000);

                    $('#animated-meter').fadeToggle(2000);
                    // hides the big target
                    $('.player_stats').fadeOut(3000).promise().done(function () {
                        // emables ready button
                        $('#ready-button').removeAttr('disabled')
                            // changes button color back to green
                            .css({ 'background-color': '#77b72f' });
                        $('#poi').attr('style', 'visibility: hidden');
                    });
                });
            });
        }

        //maybe a psudo get poi position is a better option for now
        //var targetRadius = $('.player_stats').width();
        //var lastPlayerScore = null;

        function getPsudoPOIpos() {

            function bullsMod3() {
                if (lastPlayerScore % 3 == 1) {
                    $('#poi').css({
                        'left': '48%',
                        'bottom': '48%'
                    });
                } else if (lastPlayerScore % 3 == 2) {
                    $('#poi').css({
                        'left': '42%',
                        'bottom': '48%'
                    });
                } else
                    // %3 == 0
                    $('#poi').css({
                        'left': '48%',
                        'bottom': '44%'
                    });
            }

            function closeMod3() {
                if (lastPlayerScore % 3 == 1) {
                    $('#poi').css({
                        'left': '46%',
                        'bottom': '46%'
                    });
                } else if (lastPlayerScore % 3 == 2) {
                    $('#poi').css({
                        'left': '46%',
                        'bottom': '44%'
                    });
                } else
                    // %3 == 0
                    $('#poi').css({
                        'left': '49%',
                        'bottom': '45%'
                    });
            }

            function almostMod3() {
                if (lastPlayerScore % 3 == 1) {
                    $('#poi').css({
                        'left': '44%',
                        'bottom': '49%'
                    });
                } else if (lastPlayerScore % 3 == 2) {
                    $('#poi').css({
                        'left': '46%',
                        'bottom': '45%'
                    });
                } else
                    $('#poi').css({
                        'left': '50%',
                        'bottom': '44%'
                    });
            }

            if (lastPlayerScore > 900) {
                var expression = 1;
            } else if (lastPlayerScore < 901 && lastPlayerScore > 700) {
                expression = 2;
            } else if (lastPlayerScore < 701 && lastPlayerScore > 500) {
                expression = 3;
            } else {
                expression = 4;
            }
            switch (expression) {
                case 1:
                    bullsMod3();
                    break;
                case 2:
                    closeMod3();
                    break;
                case 3:
                    almostMod3();
                    break;
                default:
                    if (lastPlayerScore % 2 === 1) {
                        $('#poi').css({
                            'left': '53%',
                            'bottom': '56%'
                        });
                    } else {
                        $('#poi').css({
                            'left': '50%',
                            'bottom': '52%'
                        });
                    }
            }
        }

        //var targetRadius = $('.player_stats').width(),
        //    markerRadii = {
        //        bullseye: 40,
        //        close: 85,
        //        medium: 120,
        //        far: 160
        //    };
        /////// needs fixed
        function getPOIpos(markerRadii) {
            var posX, posY;

            //position a poi and use the while to make sure it meets meets the correct parameters before stopping
            do {
                posX = Math.floor(Math.random() * ((targetRadius * 2) - 1));
                posY = Math.floor(Math.random() * ((targetRadius * 2) - 1));
            } while (Math.sqrt(Math.pow(targetRadius - posX, 2) + Math.pow(targetRadius - posY, 2)) > targetRadius - markerRadii)

            //return { x: posX, y: posY }
            $('#poi').attr('style', 'visibility: visible')
                .css({
                    'left': posX,
                    'bottom': posY
                });
        }

        // method for shooting after the first shot
        function shootingagain() {
            // clear the player and opponent shooting info -- this might be a good spot to update user score when implimented
            $('.shootingInfo span').text('');
            $('#ready-button').one("click", function () {
                // hide the button and let the user that they can fire
                readyButtonClicked();
                // show the shoot button
                $('#shoot-button').show();
                // Hide arm and bow
                $('#geeks-arm, #goths-arm, #bow-ready').hide();
                // Add drawn items
                $('custom #bow-drawn, custom #arm-drawn-change').show();
                // click to fire pojectile
                buttonFireEvent();
            });
        }

        // method for shooting the first shot
        function shooting() {
            // click to get ready to shoot
            $('#ready-button').one("click", function () {
                // check to make sure this is the first time through
                if (buttonCounter == false) {
                    readyButtonClicked();
                    // create a new button
                    $('#third-button-set').append('<input type="button" value="Shoot" id="shoot-button" />');
                    $('#shoot-button').css(style);
                    $('#geeks-arm, #goths-arm, #bow-ready').hide();
                    $('custom').show();
                    // click to fire pojectile
                    buttonFireEvent();
                    buttonCounter = true;
                } else {
                    shootingagain();
                }
            });
        }

        function meterAnimation() {

            // get the width of the ball to be animated
            var ballWidth = $('#meter-ball').width();

            // get the width of the meter
            var meterWidth = $(window).width() - ballWidth;
            var meterAdj = meterWidth * .205;
            meterWidth = meterWidth - meterAdj;

            var x = $('#meter').position();
            var meterPosLeft = x.left;

            // sets the speed of the animated ball in miliseconds
            var meterballSpeed = 1700

            function meterLeft() {
                $(document).ready(function () {
                    $('#meter-ball')
                        .show()
                        .css({ 'left': meterWidth })
                        .animate({ left: meterPosLeft }, meterballSpeed, function () {
                            $('#meter-ball')
                                .css({ 'left': meterPosLeft })
                                .hide();
                            meterAnimated = false;
                            meterAnimation();
                        });
                });
            }
            function meterRight() {
                $(document).ready(function () {
                    $('#meter-ball')
                        .show()
                        .css({ 'left': meterPosLeft })
                        .animate({ left: meterWidth }, meterballSpeed, function () {
                            $('#meter-ball')
                                .css({ 'left': meterWidth })
                                .hide();
                            meterAnimated = true;
                            meterAnimation();
                        });
                });
            }
            if (meterAnimated === false) {
                meterRight();
            } else {
                meterLeft();
            }

        }

        // header & button transition on ready-button click event
        function readyButtonClicked() {

            if (buttonCounter == false) {
                $('#third-button-set h3').text('Impress Robin-Hood with your extra-ordinary precision and you just might win him over. Press the "Shoot" button to fire!');
                // makes ready button unclickable after the fire button event
                $('#ready-button').css({ 'background-color': 'grey' });
                $('#ready-button').attr('disabled', 'disabled');
                $('#ready-button, #reset').hide();
                $('#animated-meter, #selected-projectile').show();
                $('#meter-ball').hide();
                meterAnimation();
                bowdraw.play();
            } else {
                $('#third-button-set h3').text('Impress Robin-Hood with your extra-ordinary precision and you just might win him over. Press the "Shoot" button to fire!');
                // makes ready button unclickable after the fire button event
                $('#ready-button').css({ 'background-color': 'grey' });
                $('#ready-button').attr('disabled', 'disabled');
                $('#ready-button, #reset').hide();
                $('#selected-projectile').show();
                $('#animated-meter').fadeToggle();
                $('#meter-ball').hide();
                meterAnimation();
                bowdraw.play();
            }
        }

        function sleep(miliseconds) {
            var startingTime = new Date().getTime();
            var stopTime = startingTime + miliseconds;
            while (stopTime >= new Date().getTime()) { }
        }

        // method for animating the projectile and deciding who wins
        function shootprojectile() {

            // build a function that checks to see if an archer has won the round
            function checkAccuracy() {
                if (playerAccuracy >= opponentAccuracy) {
                    place = 'winner';
                    place2 = 'loser';
                } else {
                    place = 'loser';
                    place2 = 'winner';
                }
            }
            // get the width of the projectiles to be fired
            var projectileWidth = $('#player1').width();
            // get the width of the road
            var roadWidth = $(window).width() - projectileWidth;
            var roadAdjust = $(window).width() * .025;
            roadWidth = roadWidth - roadAdjust;
            // accuracy for opponents shot
            var opponentAccuracy = Math.floor((Math.random() * 1000) + 300);
            // impliment player acuracy button and display method to set accuracy
            var playerAccuracy = Math.floor(pointsPerRound);
            lastPlayerScore = playerAccuracy;
            // set variable for who got closest to the target?
            var place2 = 'loser';
            var place = 'winner';

            // projectile animation
            $(document).ready(function () {
                $('#player1').animate({
                    // move the projectile the width of the road
                    left: roadWidth
                }, 1000, function () {
                    // animation is done -- check for score and winner
                    calcScore();
                    playerAccuracy = Math.floor(pointsPerRound)
                    lastPlayerScore = playerAccuracy;
                    checkAccuracy();
                    // update the info container with score and place
                    $('#shootingInfoPlayer span').text('You are the ' + place + ' and you scored ' + playerAccuracy + ' points!');
                    playerGold += Math.floor((playerAccuracy / 100) / 2);
                    $('#treasure span').text(playerGold);
                });
                // animate opponent projectile
                $('#opponent').animate({
                    // move the projectile the width of the road
                    left: roadWidth
                }, 1000, function () {
                    // animation is done -- check for score and winner
                    checkAccuracy();
                    // update the info container with score and place
                    $('#shootingInfoOpponent span').text('You are the ' + place2 + ' and you scored ' + opponentAccuracy + ' points!');
                    // hold the screen for a few seconds and then reset
                    sleep(3000);
                    $('#player1, #opponent').css('left', '5%');
                });
            });
        }
    });

    // CLICK THE LOAD / SAVE BUTTON
    $('#reset').click(function () {
        alert('Sorry... This function has not yet been implimented. Look for it in the release of version 1.0');
    });
});


















