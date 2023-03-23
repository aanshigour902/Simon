var gamePattern=[];

var buttonColors=["red","blue","green","yellow"];

userClickedPattern=[];

var level=0;

var started=false;

function nextStep() {
    userClickedPattern=[];
    console.log("nextStep called");
    level++;
    $("h1").text("Level "+level);
    randomChosenColor=buttonColors[Math.floor(Math.random()*4)]
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function(event) {
    userChosenColor=$(event.target).attr("id");
    userClickedPattern.push(userChosenColor);
    // $("#"+userChosenColor).fadeOut(100).fadeIn(100);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {

    console.log("currentLevel="+currentLevel);
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function(){
                nextStep();
            },1000);
        }
    }
    else {
        playSound("wrong");
        $("h1").text("Game Over");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },500);

        setTimeout(startOver, 2000);
    }
}

function startOver() {
    gamePattern=[];
    started=false;
    level=0;
    $("h1").text("Press a key to Start");
}

$(document).keydown(function() {
    if(started===false)
    {
        $("h1").text("Level "+level);
        nextStep();
        started=true;
    }
});

