﻿// script.js

// TODO
// 1. ADD ROUNDS - 10 shots per round
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
    alert("Welcome to Geek & Goth: Level Zero -- version: ALPHA. This a non-publicated version and may use some temporary place-holders and non-appropriating material.");

    /* ---------------------------
       Geek & Goth: Level Zero 0.1
       --------------------------- */

    // Click the NEW GAME button
    $('#fire').click(function () {
        // set variables
        var fireImagePlayed = false;
        var gameBgStyle = {
            background: "url('img/giphy.gif') center)",
            height: '200%'
        }
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
        var mouseX;
        var mouseY;
        var meterAnimated = false;
        var lastPlayerScore = null;
        var bowdrawPlayerPos = null;
        var bowdrawOpponentPos = null;
        var cashbonus = null;
        var fireworks = null;
        var robinSFX1 = null;
        var robinSFX2 = null;
        var robinSFX3 = null;
        var geekSFX1 = null;
        var geekSFX2 = null;
        var introSFX1 = null;
        var dndSFX = null;
        var friendsSFX = null;
        var burntitSFX = null;
        var dothisSFX = null;
        // style for shoot button
        var style = {
            color: 'red',
            backgroundColor: 'yellow'
        };
        var bannerStyle = {
            width: '80%',
            margin: '40px auto 0',
            background: '333',
            'background-image': 'url(img/GAG_banner-1.gif)',
            'background-position-x': 'center',
            'background-position-y': 'center',
            'background-size': '100%',
            height: '200px',
            'box-shadow': '2px 2px 5px 2px grey'
        }
        $('#myBGVideo').hide();

        // set the game back-ground image setup banner image
        $('#shoot').css({ background: 'url(img/giphy.gif)', 'background-size': 'contain' });
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

        // initialize audio and character video bio's
        init();
        music.play();
        coinAnimation();

        // select a player character menu (transition)
        $('#first-button-set').hide();
        $('#myflex').hide(1000);
        $('#second-button-set').show();

        // click on the GEEK BUTTON to select Geek as a playable character
        $('#geek-button').click(function () {
            characterSelected = "Geek";
            if (characterSelected == "Geek") {
                $('.thumbnail').hide();
                // unhide the cloned goth element
                $('#cloned-goth').show();
            }
            $('h1, h2, footer, #second-button-set, #goth').hide();
            $('#game, #chest, #third-button-set').show();
            hudInit();
            repositionArrow(characterSelected);
            robinIntro();
            shooting();            
        });

        // geekVid hover cursor pointer change
        $('#geekVid').hover(function () {
            $(this).css('cursor', 'pointer');
        }, function() {
            $(this).css('cursor', 'auto');
        });

        // click on the GEEK VIDEO to select Geek as a playable character 
        $('#geekVid').click(function () {
            characterSelected = "Geek";
            if (characterSelected == "Geek") {
                $(".thumbnail").children("video")[0].pause();
                $('.thumbnail').hide();
                // unhide the cloned goth element
                $('#cloned-goth').show();
            }
            $('h1, h2, footer, #second-button-set, #goth').hide();
            $('#game, #chest, #third-button-set').show();
            hudInit();
            repositionArrow(characterSelected);
            robinIntro();
            shooting();
        });

        // click on the GOTH BUTTON to select Goth as a playable character
        $('#goth-button').click(function () {
            characterSelected = "Goth";
            if (characterSelected == "Goth") {
                $('.thumbnail').hide();
                // unhide the cloned geek element
                $('#cloned-geek').show();
            }
            $('h1, h2, footer, #second-button-set, #geek').hide();
            $('#third-button-set, #game, #chest').show();
            hudInit();
            repositionArrow(characterSelected);
            robinIntro();
            shooting();
        });

        // gothVid hover cursor pointer change
        $('#gothVid').hover(function () {
            $(this).css('cursor', 'pointer');
        }, function () {
            $(this).css('cursor', 'auto');
        });

        // click on the GOTH VIDEO to select Goth as a playable character
        $('#gothVid').click(function () {
            characterSelected = "Goth";
            if (characterSelected == "Goth") {
                $(".thumbnail").children("video")[1].pause();
                $('.thumbnail').hide();
                // unhide the cloned goth element
                $('#cloned-geek').show();
            }
            $('h1, h2, footer, #second-button-set, #geek').hide();
            $('#third-button-set, #game, #chest').show();
            hudInit();
            repositionArrow(characterSelected);
            robinIntro();
            shooting();
        });
        
        // click on the GEEK & GOTH TITLE to open easter egg... happy b-day!
        $('#headertitle').click(function () {
            music.pause();
            $(this).text("Gothess's Birthday Bash!")
            $('#second-button-set, #gag-footer').hide();
            $('header h2').text('Gothess!');

            $('body').replaceWith('<audio loop autoplay id="bgMusic"><source src="https://dl.dropboxusercontent.com/u/44685969/the_beatles-birthday.mp3" type="audio/mp3" />Your browser does not support the audio element. Download the audio/video in <a href="https://dl.dropboxusercontent.com/u/44685969/the_beatles-birthday.mp3">MP3</a>format.</audio><div id="bdayegg-container"><div id="bdayeggbutton-container" hidden><button id="explosion">BOOM !</button><button id="basic_explosion">Basic Explosion</button></div><canvas id="canvas" width="600" height="600"></canvas><div id = "bdayegg-subcontainer"><div id="bdayegg-text">Gothess Birthday Bash!<br>This is the "Gothess Birthday Egg - a side scrolling mario-like video game... <i>or, it will be.</i> Gothess has some birthday cake that she wishes to deliver to Goth. When she is at full power, she will wear black leather, and bare an aura. The boss is the giant elderly man-creature known as Harry Ballz with the vision of a mule and hearing of an ant... but packs a deadly breath oder of imaculant power<hr /><br><marked style="background-color: pink; color: white; width: 500px;"><br>At least that is the plan<br><font face="Consolas size="62px" color="purple">Let me know what you think!!!</font></marked></div></div><iframe id="bdegg-cake" src="//giphy.com/embed/hRS2MZzDx933i?html5=true&hideSocial=true" class="giphy-embed" allowfullscreen="" frameborder="0" height="332" width="480"></iframe></div><iframe id="bdegg-dog" src="//giphy.com/embed/RoUbJeZ6xq1dm?html5=true&hideSocial=true" class="giphy-embed" allowfullscreen="" frameborder="0" height="281" width="480"></iframe><script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.0.js"></script>');
            function init() {
                music = document.getElementById("bgMusic");
            }
        });
        
        // audio and text for the start of the game
        function robinIntro() {
            if (playerGold == null) {
                // for Geek
                if (characterSelected == "Geek") {
                    $('.playerTextbox').fadeIn(500).promise().done(function () {
                        setTimeout(function () {
                            $('.playerText').fadeToggle(2000);
                            $('.playerTextbox').fadeToggle(3000);
                        }, 1200);
                        setTimeout(function () {
                            $('.playerTextbox').css('width', '15%');
                            $('.opponentTextbox').fadeIn(300).promise().done(function () {
                                $('.opponentText').fadeIn(300).promise().done(function () {
                                    setTimeout(function () {
                                        $('.opponentText').fadeToggle(2000);
                                        $('.opponentTextbox').fadeToggle(3000);
                                        $('.playerText').fadeToggle(2000);
                                        $('.playerTextbox').fadeToggle(3000);
                                        $('#player-textbox span').text('HUH? WHAT???');
                                        setTimeout(function () {
                                            $('.playerText').fadeToggle(2000);
                                            $('.playerTextbox').fadeToggle(3000);
                                        }, 2200);
                                    }, 2200);
                                })
                            })
                        }, 3000);
                    })
                } else {
                    // for Goth
                    $('#opponent-textbox span').html('ALL BECAUSE YOU WANT TO LIVE A ROCK AND ROLL FANTASY!').hide();
                    $('#player-textbox span').html("FANTASY! I THOUGHT YOU WAS MY FRIEND, BUT NOW I SEE...<br />YOU'RE JUST LIKE MY DAD!!!").hide();
                    $('.opponentTextbox').fadeIn(500).promise().done(function () {
                        $('.opponentText').fadeToggle(300);
                        setTimeout(function () {
                            $('.opponentText').fadeToggle(1300);
                            $('.opponentTextbox').fadeToggle(3000).promise().done(function () {
                                $('#opponent-textbox span').html('HUH?<br /> WHAT???');
                            });
                        }, 1200);
                        setTimeout(function () {
                            $('.playerTextbox').fadeIn(300).promise().done(function () {
                                $('.playerText').fadeIn(300).promise().done(function () {
                                    setTimeout(function () {
                                        $('.playerText').fadeToggle(2000);
                                        $('.playerTextbox').fadeToggle(3000);
                                        $('.opponentText').fadeToggle(2000);
                                        $('.opponentTextbox').fadeToggle(3000);
                                        setTimeout(function () {
                                            $('.opponentText').fadeToggle(2000);
                                            $('.opponentTextbox').fadeToggle(3000);
                                        }, 2200);
                                    }, 2200);
                                })
                            })
                        }, 3000);
                    })
                }
                introSFX1.play();
                setTimeout(function () {
                    $('.robinsTextbox').fadeIn(1000).promise().done(function () {
                        $('.robinsText').fadeIn(1000).promise().done(function () {
                            $('.robinsText').fadeOut(8000);
                            $('.robinsTextbox').fadeOut(8000);
                        });
                    });
                }, 9000);
                
                setTimeout(function () {
                    geekSFX2.play();
                }, 8300)
                setTimeout(function () {
                    robinSFX1.play();
                }, 9300);
                
            }
        }

        function coinAnimation() {
            var imgWidth = 25;
            var numImgs = 5;
            var cont = 0;
            var img = $('#coin-ani-container').find('img');

            var animation = setInterval(moveSprite, 200);

            function moveSprite() {
                
                img.css('margin-left', -1 * (cont * imgWidth));

                cont++;
                if (cont == numImgs) {
                    clearInterval(animation);
                    coinAnimation();
                }
            }
        }

        function animateCoin(counter) {
            var orig = counter;
            function coinMover(counter) {
                if (counter < orig) {
                    cashbonus.currentTime = 0;
                    cashbonus.play();
                }
                $(document).ready(function () {
                    cashbonus.play();
                    $('#coin-ani-container')
                        //.show()
                        //.fadeToggle()
                        .css({ 'top': '20%', 'visibility': 'visible' })
                        .animate({ top: '05%' }, 1000, function () {
                            $('#coin-ani-container')
                                .css({ 'top': '20%', 'visibility': 'hidden' });
                            counter--;
                            if (counter > 0) {
                                coinMover(counter);
                            }
                        });
                });
            }
            coinMover(counter)
        }

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
            cashbonus = document.getElementById("cash-registerSFX");
            fireworks = document.getElementById("fireworksSFX");
            robinSFX1 = document.getElementById("robinhoodIntroDLG");
            robinSFX2 = document.getElementById("robinHatesGeek");
            robinSFX3 = document.getElementById("robinHatesGoth");
            geekSFX1 = document.getElementById("geek-huh");
            geekSFX2 = document.getElementById("geek-huh-what");
            introSFX1 = document.getElementById("just-like-my-dad");
            dndSFX = document.getElementById("go-play-dnd");
            friendsSFX = document.getElementById("your-friends");
            burntitSFX = document.getElementById("you-burnt-it");
            dothisSFX = document.getElementById("lets-do-this");
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
                $(this).css('cursor', 'pointer');
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
                $(this).css('cursor', 'auto');
            });

            $("#close-menu-button").hover(function () {
                $(this).css('cursor', 'pointer');
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
                $(this).css('cursor', 'auto');
            });

            // Weapons and acheivememts menu
            $("#white-button").hover(function () {
                $(this).css('cursor', 'pointer');
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
                $(this).css('cursor', 'auto');
            });

            $("#close-menu-button2").hover(function () {
                $(this).css('cursor', 'pointer');
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
                $(this).css('cursor', 'auto');
            });

            // What's new menu
            $("#tv-button").hover(function () {
                $(this).css('cursor', 'pointer');
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
                $(this).css('cursor', 'auto');
            });

            $("#close-menu-button3").hover(function () {
                $(this).css('cursor', 'pointer');
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
                $(this).css('cursor', 'auto');
            });
        }

        function repositionArrow(player) {            
            var pos, offset, width, height, setTop, setLeft, adjust = 0, popTop;

            if (player === 'Geek') {
                player = '.ready #geeks-arm';
                opponent = '.cloned #goths-arm';
            } else {
                player = '.ready #goths-arm';
                opponent = '.cloned #geeks-arm';
                adjust = .2;
            }

            // get player
            width = $(player).width();
            width /= 2;
            height = $(player).height();
            height /= 3;
            //alert(height);
            pos = $(player).position();
            adjust *= height;
            //alert(adjust);
            setTop = pos.top + height - adjust;
            setLeft = pos.left + (width * 1.5);
            bowdrawPlayerPos = pos.left + width;
            // set player1
            $('#player1').css({ top: setTop, left: setLeft });
            setTop -= (height / 1.6) - (adjust *.8);
            
            //alert(setTop + ' ' + adjust);
            
            $('#p-target').css({ top: setTop });

            // get opponent
            width = $(opponent).width();
            width /= 2;
            height = $(opponent).height();
            height /= 4;
            pos = $(opponent).position();
            setTop = pos.top + height + adjust;
            setLeft = pos.left + (width * 1.4);
            bowdrawOpponentPos = pos.left + width;
            // set player1
            $('#opponent').css({ top: setTop, left: setLeft });
            setTop -= height;
            $('#o-target').css({ top: setTop });

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

            // set up duplicate animated gifs for fireworks animation
            var fireImage = new Image();
            fireImage.src = "img/fireworls.gif";
            var fireImage2 = new Image();
            fireImage2.src = "img/fireworks.gif";

            if (ballLeft <= bullsRight - safety / 2 && ballLeft >= bullsLeft - safety) {
                playerGold += 2;
                pointsPerRound += 200;
                $('#treasure span').text(playerGold);
                animateCoin(2);

                if (fireImagePlayed === true) {
                    $('.goodShooting').removeAttr('src');
                    $('.goodShooting').attr('src', fireImage.src);
                    fireImagePlayed = false;
                } else {
                    $('.goodShooting').removeAttr('src');          
                    $('.goodShooting').attr('src', fireImage2.src);
                    fireImagePlayed = true;
                }

                $('.goodShooting').show().promise().done(function () {
                    fireworks.play();
                    $('.goodShooting').hide(7000);          
                });
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
        //need to make this so that #poi appears according to the position, width and height of the big target
        function getPsudoPOIpos() {

            function bullsMod3() {
                if (lastPlayerScore % 3 == 1) {
                    $('#poi').css({
                        'left': '48%',
                        'bottom': '28%'
                    });
                } else if (lastPlayerScore % 3 == 2) {
                    $('#poi').css({
                        'left': '42%',
                        'bottom': '28%'
                    });
                } else
                    // %3 == 0
                    $('#poi').css({
                        'left': '48%',
                        'bottom': '24%'
                    });
            }

            function closeMod3() {
                if (lastPlayerScore % 3 == 1) {
                    $('#poi').css({
                        'left': '46%',
                        'bottom': '26%'
                    });
                } else if (lastPlayerScore % 3 == 2) {
                    $('#poi').css({
                        'left': '46%',
                        'bottom': '24%'
                    });
                } else
                    // %3 == 0
                    $('#poi').css({
                        'left': '49%',
                        'bottom': '25%'
                    });
            }

            function almostMod3() {
                if (lastPlayerScore % 3 == 1) {
                    $('#poi').css({
                        'left': '44%',
                        'bottom': '29%'
                    });
                } else if (lastPlayerScore % 3 == 2) {
                    $('#poi').css({
                        'left': '46%',
                        'bottom': '25%'
                    });
                } else
                    $('#poi').css({
                        'left': '50%',
                        'bottom': '24%'
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
                            'bottom': '36%'
                        });
                    } else {
                        $('#poi').css({
                            'left': '50%',
                            'bottom': '32%'
                        });
                    }
            }
        }

        // method for shooting after the first shot
        function shootingagain() {
            // clear the player and opponent shooting info -- this might be a good spot to update user score when implimented
            $('.shootingInfo span').text('');
            $(window).resize(function () {
                repositionArrow(characterSelected);
            });
            $('#ready-button').one("click", function () {
                // hide the button and let the user that they can fire
                readyButtonClicked();
                // show the shoot button
                $('#shoot-button').show();
                // Hide arm and bow
                $('#geeks-arm, #goths-arm, #bow-ready').hide();
                // Add drawn items
                $('custom #bow-drawn, custom #arm-drawn-change').show();
                $('#player1').css({ left: bowdrawPlayerPos });
                $('#opponent').css({ left: bowdrawOpponentPos });
                // click to fire pojectile
                buttonFireEvent();
            });
        }

        // method for shooting the first shot
        function shooting() {
            // click to get ready to shoot
            $(window).resize(function () {
                repositionArrow(characterSelected);
            });
            $('#ready-button').one("click", function () {
                // check to make sure this is the first time through
                if (buttonCounter == false) {
                    readyButtonClicked();
                    // create a new button
                    $('#third-button-set').append('<input type="button" value="Shoot" id="shoot-button" />');
                    $('#shoot-button').css(style);
                    $('#geeks-arm, #goths-arm, #bow-ready').hide();
                    $('custom').show();
                    $('#player1').css({ left: bowdrawPlayerPos });
                    $('#opponent').css({ left: bowdrawOpponentPos });
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
            // get the position of the meter
            var x = $('#meter').position();
            var meterPosLeft = x.left;
            // sets the speed of the animated ball in miliseconds
            var meterballSpeed = 1700;
            // check for ball placement
            if (meterAnimated === false) {
                meterRight();
            } else {
                meterLeft();
            }

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
        }

        // header & button transition on ready-button click event
        function readyButtonClicked() {
            //change the textbox styles
            $('.robinsText').css({ "position": "absolute", "font":'16px/20px "Hobo Std"', "top": "50%", "left": "10%", "right": "75%"});
            $('.robinsTextbox').css({ "position": "fixed", "top": "48%", "width": "20%", "height": "8%" });
            // check for which player
            if (buttonCounter == false) {
                if (characterSelected == "Goth") {
                    // wait for the bow-stretching sound to end
                    setTimeout(function () {
                        // playing "I hate you Goth!" sequence
                        robinSFX3.play();
                        $('#robins-textbox span').text('I HATE YOU GOTH!');
                        $('.robinsTextbox').fadeToggle(300).promise().done(function () {
                            $('.robinsText').fadeToggle(1000).promise().done(function () {
                                $('.robinsText').fadeToggle(3000);
                                $('.robinsTextbox').fadeToggle(3000);
                            });
                        });
                    }, 2000);                    
                } else {
                    $('#player-textbox span').text('HUH???');
                    $('.playerTextbox').css('width', '10%');
                    // wait for the bow-stretching sound to end
                    setTimeout(function () {
                        // playing I hate you Geek sequence
                        robinSFX2.play();
                        $('#robins-textbox span').text('I HATE YOU GEEK!');
                        $('.robinsTextbox').fadeToggle(300).promise().done(function () {
                            $('.robinsText').fadeToggle(300).promise().done(function () {
                                $('.robinsText').fadeToggle(3000);
                                $('.robinsTextbox').fadeToggle(3000);
                            });
                        });
                    }, 2000);
                    setTimeout(function () {
                        $('.playerTextbox').fadeToggle(300);
                        $('.playerText').fadeToggle(500).promise().done(function () {
                            $('.playerText').fadeToggle(800);
                            $('.playerTextbox').fadeToggle(1000);
                        });
                        geekSFX1.play();
                    }, 3300);
                    
                }
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
                    // comment on score
                    if (characterSelected=="Geek" && playerAccuracy < 501) {
                        dndSFX.play();
                    } else if (characterSelected == "Geek" && playerAccuracy > 1000) {
                        setTimeout(function () {
                           friendsSFX.play();
                        }, 1200)                        
                    } else if (characterSelected == "Goth" && playerAccuracy < 501) {
                        burntitSFX.play();
                    } else if (characterSelected == "Goth" && playerAccuracy > 1000) {
                        setTimeout(function () {
                            dothisSFX.play();
                        }, 1200)
                    }
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
                    //sleep(3000);
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