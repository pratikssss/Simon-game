var buttoncolors = ["red", "blue", "green", "yellow"];
var level = 0;
var gamepattern = [];
var userpattern = [];
function nextsequence() {
    level++;
    $("h1").html("Level " + level);
    var x = Math.random();
    x *= 4;
    x = Math.floor(x);
    gamepattern.push(buttoncolors[x]);
    $("#" + buttoncolors[x]).fadeOut(100).fadeIn(100);
    return x;
}
$(document).keypress(function () {
    if (gamepattern.length === 0) {
        level = 0;
        var randomchosennumber = nextsequence();
        var colorr = buttoncolors[randomchosennumber];
        var selected = "#" + colorr;


        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'sounds/' + colorr + '.mp3');
        audioElement.play();
        $("h1").html("Level " + level);
    }
});
playsound("green");
playsound("red");
playsound("yellow");
playsound("blue");
function playy() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'sounds/wrong.mp3');
    audioElement.play();
}
function playsound(name) {
    $(document).ready(function () {
        var audioElement = document.createElement('audio');

        $('#' + name).click(function () {
            animatepress(name);
            audioElement.setAttribute('src', 'sounds/' + name + '.mp3');
            audioElement.play();
            userpattern.push(name);
            var userlen = userpattern.length;
            var gamelen = gamepattern.length;

            if (userlen === gamelen && userpattern[userlen - 1] === gamepattern[gamelen - 1]) {


                userpattern = [];
                $("h1").html("Level " + level);
                setTimeout(function () {
                    nextsequence();
                }, 1000);
            }
            else if (userlen == gamelen && userpattern[userlen - 1] !== gamepattern[gamelen - 1]) {
                $("h1").html("Game over . Press any key to restart! ");
                $("body").addClass("game-over");

                setTimeout(function () {
                    $("body").removeClass("game-over");
                }, 200);
                playy();
                userpattern = [];
                gamepattern = [];
                level = 0;
            }
            else {
                if (userpattern[userlen - 1] !== gamepattern[userlen - 1]) {
                    $("h1").html("Game over . Press any key to restart! ");
                    $("body").addClass("game-over");

                    setTimeout(function () {
                        $("body").removeClass("game-over");
                    }, 200);
                    playy();
                    userpattern = [];
                    gamepattern = [];
                    level = 0;
                }
            }
            //           console.log(gamepattern);
            // $("#status").text("Status: Playing");
        });
    });
}
function animatepress(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
}