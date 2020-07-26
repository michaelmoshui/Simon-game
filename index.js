$("button").css("outline", "none");

$("#navbarContent").hide();
$(".navbar-toggler").click(function() {
  $("#navbarContent").slideToggle();
});

// Show and hide instructions
$(".instruction").hide();
var instructionCount = 0;
$(".title button").click(function() {
  instructionCount += 1;
  $(".instruction").slideToggle();
  if (instructionCount % 2 !== 0){
    $(".title button").text("Hide Instructions");
  } else{
    $(".title button").text("Show Instructions");
  }
});

// Initial variables
var colours = ["green", "red", "yellow", "blue"];
var clickPattern = [];
var userPattern = [];
var start = false;
var level = 0;

// Press any key to start
$(document).keydown(function (){
  if (!start) {
    level = -1;
    nextSequence();
    start = true;
  }
});

// Clicking on buttons
$(".button").click(function () {
    var chosenColour = $(this).attr("id");
    userPattern.push(chosenColour);
    if (!start) {
      level = -2;
      nextSequence();
      start = true;
      userPattern[0] = clickPattern[0];
    }
    checkAnswer(userPattern.length - 1); // Checks answer of the current index in userPattern
    if (start) { // If answer is correct
      makeSound(chosenColour);
      flash(chosenColour, "pressed");
    }
});

// Checks if user's input is correct
function checkAnswer (currentLevel) { // currentLevel = the index of the click
  if (userPattern[currentLevel] === clickPattern[currentLevel]){
    // In most cases do nothing and continue on with checking user's next input
    if (userPattern.length === clickPattern.length){ // Begins next sequence after user successfully completes one level
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // User gets answer wrong, game ended
    makeSound("wrong");
    $("#main").css("background-color", "red");
    setTimeout(function () {
      $("#main").css("background-color", "#0f4c75");
    }, 100);
    $("#head").html("Game over.<br>You have reached level " + level + "." + "<br><br><em>Press any key to restart.</em>");    
    startOver(); // Starts over
  }

}

// Generates one level of sequence
function nextSequence () {
  userPattern = []; // Clear User's previous clicking pattern
  level++; // level up
  if (level === 100) { // Game ends when user reaches 100. Let's ignore reality :)
    $("#head").html("Congradulation!<br>You have achieved the impossible!<br><br>Press any key to restart.");
    startOver();
  } else { // Before reaching level 100
    $("#head").text("Level " + level); // Display level
    var randomNumber = Math.round(Math.random()*3);
    var randomColour = colours[randomNumber];
    clickPattern.push(randomColour); // Push a random colour into clickPattern
    makeSound(randomColour);
    $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
  }
}

// When game ends, clear values and start over
function startOver (){
  clickPattern = [];
  level = 0;
  start = false;
}

// Make weird noises when buttons get clicked (Purpose: to annoy people)
function makeSound (key) {
  var audio = new Audio("sounds/" + key + ".mp3");
  audio.volume = 0.1;
  audio.play();
}

// Make weird flashes to inflict suffering upon photophobic people
function flash (key, cl) {
  $("#" + key).addClass(cl);
  setTimeout(function (){
    $("#" + key).removeClass(cl);
  }, 100);
}
