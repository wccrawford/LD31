$(function() {
    var level = 0;
    var levelState = {};
    var audioEnabled = true;
    var timerStart = null;
    var timer = null;
    var timerActive = true;

    var tagRed = 0,
        tagBlue = 1,
        tagGreen = 2,
        tagYellow = 3,
        tagInside = 4,
        tagOutside = 5,
        tagX = 6,
        tagCircle = 7,
        tagSquare = 8,
        tagTriangle = 9,
        tagStar = 10,
        tagWhite = 11,
        tagLightGrey = 12,
        tagDarkGrey = 13,
        tagBlack = 14;

    var levels = [
        {
            tags: [
                tagRed,
                tagRed,
                tagRed,
                tagRed
            ]
        },
        {
            tags: [
                tagBlue,
                tagBlue,
                tagBlue,
                tagBlue
            ]
        },
        /*
        {
            tags: [
                tagRed,
                tagBlue,
                tagRed,
                tagBlue,
                tagRed,
                tagBlue,
                tagRed,
                tagBlue
            ]
        },
        {
            tags: [
                tagX,
                tagX,
                tagX,
                tagX,
                tagX,
                tagX,
                tagX,
                tagX
            ]
        },
        {
            tags: [
                tagInside,
                tagInside,
                tagInside,
                tagInside
            ]
        },
        {
            tags: [
                tagOutside,
                tagOutside,
                tagOutside,
                tagOutside,
                tagOutside,
                tagOutside,
                tagOutside,
                tagOutside,
                tagOutside,
                tagOutside,
                tagOutside,
                tagOutside
            ]
        },
        {
            tags: [
                tagCircle,
                tagCircle,
                tagCircle,
                tagCircle
            ]
        },
        {
            tags: [
                tagStar,
                tagStar,
                tagStar,
                tagStar
            ]
        },
*/
        {
            tags: [
                tagBlack,
                tagDarkGrey,
                tagLightGrey,
                tagWhite,
                tagLightGrey,
                tagDarkGrey,
                tagBlack,
                tagDarkGrey,
                tagLightGrey,
                tagWhite,
                tagLightGrey,
                tagDarkGrey
            ]
        },
    ];

    function updateTimer() {
        timer = Date.now();

        $('.timerDisplay').text(Math.floor(timer - timerStart) / 1000);

        if(timerActive) {
            window.requestAnimationFrame(updateTimer);
        }
    }

    function startLevel() {
        levelState = {
            button: 0
        };

        $('#buttons .button').removeClass('active');

        $('#levelDisplay').text(level+1);

        //flashText("Level "+(level+1));
    }

    function playAudio(name) {
        if(!audioEnabled) { return; }

        document.getElementById(name+'Audio').load();
        document.getElementById(name+'Audio').play();
    }

    function flashText(text) {
        $('#flashtext')
            .unbind('animationstart webkitAnimationStart MSAnimationStart')
            .text(text)
            .bind('animationstart webkitAnimationStart MSAnimationStart', function() {
                $('#flashtext')
                    .unbind('animationstart webkitAnimationStart MSAnimationStart')
                    //.hide()
                    .removeClass('flashtext');
            })
            .show()
            .addClass('flashtext')
        ;
    }

    function checkButton(button) {
        var tag = levels[level].tags[levelState.button];
        return (button.tags.indexOf(tag) !== -1);
    }

    function onResize() {
        var buttonWrapper = $('#buttonWrapper');
        buttonWrapper.hide();
        var height = $(window).height();
        var width = $(window).width();
        var size = height > width ? width : height;
        buttonWrapper
            .height(size)
            .width(size)
            .show();
    }

    window.onresize = onResize;

    onResize();

    var buttons = document.querySelectorAll('#buttons .button');

    buttons[0].tags = [
        tagRed,
        tagOutside,
        tagX,
        tagCircle,
        tagBlack
    ];
    buttons[1].tags = [
        tagBlue,
        tagOutside,
        tagSquare,
        tagDarkGrey
    ];
    buttons[2].tags = [
        tagGreen,
        tagOutside,
        tagTriangle,
        tagLightGrey
    ];
    buttons[3].tags = [
        tagYellow,
        tagOutside,
        tagX,
        tagStar,
        tagWhite
    ];

    buttons[4].tags = [
        tagYellow,
        tagOutside,
        tagSquare,
        tagDarkGrey
    ];
    buttons[5].tags = [
        tagRed,
        tagInside,
        tagX,
        tagTriangle,
        tagBlack
    ];
    buttons[6].tags = [
        tagBlue,
        tagInside,
        tagX,
        tagCircle,
        tagWhite
    ];
    buttons[7].tags = [
        tagGreen,
        tagOutside,
        tagStar,
        tagLightGrey
    ];

    buttons[8].tags = [
        tagGreen,
        tagOutside,
        tagCircle,
        tagLightGrey
    ];
    buttons[9].tags = [
        tagYellow,
        tagInside,
        tagX,
        tagTriangle,
        tagDarkGrey
    ];
    buttons[10].tags = [
        tagRed,
        tagInside,
        tagX,
        tagSquare,
        tagBlack
    ];
    buttons[11].tags = [
        tagBlue,
        tagOutside,
        tagStar,
        tagDarkGrey
    ];

    buttons[12].tags = [
        tagBlue,
        tagOutside,
        tagX,
        tagTriangle,
        tagWhite
    ];
    buttons[13].tags = [
        tagGreen,
        tagOutside,
        tagSquare,
        tagLightGrey
    ];
    buttons[14].tags = [
        tagYellow,
        tagOutside,
        tagCircle,
        tagDarkGrey
    ];
    buttons[15].tags = [
        tagRed,
        tagOutside,
        tagX,
        tagStar,
        tagBlack
    ];

    $('#buttons .button').bind('click', function(){
        activateButton(this);
    });

    function activateButton(button) {
        if(timerStart === null) {
            timerStart = Date.now();
            updateTimer();
        }

        $(button).addClass('active');
        if(checkButton(button)) {
            //console.log('valid');
            levelState.button += 1;
            if(levelState.button >= levels[level].tags.length) {
                //console.log('advance level');
                level += 1;
                if(typeof(levels[level]) !== 'undefined') {
                    startLevel();
                    playAudio('levelup');
                } else {
                    $('#buttons .button')
                        .removeClass('active')
                        .unbind('click');
                    //flashText('You Win!');
                    $('#statusWrapper').hide();
                    $('#winWrapper').show();
                    timerActive = false;
                }
            } else {
                playAudio('select');
            }
        } else {
            //console.log('invalid');
            $('#buttons .button').removeClass('active');
            startLevel();
            playAudio('incorrect');
        }
    }

    startLevel(level);
});
