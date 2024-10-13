var gamePattern = []; //actual game pattern
var userClickedPattern = [];  //the  buttons user clicks
var buttonColours = ["red","blue","green","yellow"];

var started = false;

var level = 0;

$(document).keydown(function(){
  if(!started) {

    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
})
 
//the next button in sequence
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor( Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

//to click the button
$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
 
  checkAnswer(userClickedPattern.length-1);
});

//play sound
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

//animate the clicking
function animatePress(currentcolour){
  $("."+currentcolour).addClass("pressed");
  setTimeout(function(){
    $("."+currentcolour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel) {
  
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("fail");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, press any key to restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
   
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

