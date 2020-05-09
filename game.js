var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var level=0;
var started=false;


$(document).keypress(function(){
  if(!started)
  {
    $("#level-title").text("Level "+level);
      nextSequence();
      started=true;
  }

  });

  $(".btn").click(function(){
    var underChosenColour=$(this).attr("id");
    userClickedPattern.push(underChosenColour);
    playsound(underChosenColour);
    animatePress(underChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

  function checkAnswer(currentLevel)
  {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if (userClickedPattern.length === gamePattern.length)
        {
              setTimeout(function(){nextSequence();},1000);
        }
    }
      else
      {
            var audio=new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            setTimeout(function(){$("body").removeClass("game-over")},200);
            startover();
     }

  }

  function nextSequence()
  {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNum=Math.random();
    randomNum=Math.floor(randomNum*4);
    var randomChosenColour=buttonColors[randomNum];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
  }
function startover()
{
  level=0;
  gamePattern=[];
  started=false;
}

function playsound(name)
{
  var audio = new Audio("sounds/" +name+ ".mp3");
    audio.play();
}
function animatePress(currentColor)
{
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){$("."+currentColor).removeClass("pressed");},100);
}
