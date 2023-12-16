// var soundCorrect = new Audio("sounds/correct.mp3");
// var soundIncorrect = new Audio("sounds/incorrect.mp3");
  
  //Runs once at the beginning
  function setup() {
    var googleSheetLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3DsQtSbtgDpBqn8rPlwi10gUwsLdWW0zCBKtNG5am1X61JQ9xz8Q0ufFl9RqsXBtrPmLWLVcjxfdQ/pub?output=csv";
    trivia.loadGoogleSheet(googleSheetLink).then(displayWelcome); 
    trivia.categoriesEnabled = true;
  }
  //Loops continously for background effects and animations. (p5.js)
// function draw() {
//     if (trivia.state == "welcome") background("grey");
//     else if (trivia.state == "question") background("grey");
//     else if (trivia.state == "correct") background("grey");
//     else if (trivia.state == "incorrect") background("grey");
//     else if (trivia.state == "thankyou") background("grey");
//   }
  
  function displayWelcome() {
    $(".screen").hide();
    $("#welcome-screen").show();
  }
  function displayCategories() {
    $(".screen").hide();
    $("#category-screen").show();
    trivia.insertCategoriesInfo();
  }
  
  function displayQuestion() {
    $(".screen").hide();
    $("#question-screen").show();
    $("#correctAnswer").removeClass("highlight");
    $("#feedback").hide();
    trivia.insertQuestionInfo();
    if (trivia.currentQuestion.image)
    $('#image-holder').html(`<img src='/images/${trivia.currentQuestion.image}'</img>`);
else 
    $('#image-holder').html(``);
    trivia.shuffleAnswers();
    var timeLimit = 45;
var startTime = Date.now(); //get the time at the moment a user first sees the question
clearInterval(trivia.countDown);
trivia.countDown = setInterval(function () {
  if (trivia.state == "question") { //ensure the user has not already answered
    var elapsedTime = (Date.now() - startTime)/1000; //calculate the time elapsed
    var clock = timeLimit - Math.floor(elapsedTime);//calculate the countdown w/o decimals
    $('#timer').html(clock);// place the clock time in the html for viewing
    if (clock == 0) { //if time is up
      clearInterval(trivia.countDown); //stops our timer at 0. Don't want -1 ...
      trivia.triggerAnswer(false); //marks the answer as incorrect in trivia library
    }
  }
  else clearInterval(trivia.countDown);
}, 100);//100 is the time interval in milliseconds
  }
  
  function displayThankyou() {
    $(".screen").hide();
    $("#thankyou-screen").show();
    $("#game-results").html(`Tienes ${trivia.totalCorrect} de ${trivia.totalAnswered} correcto.`);
  }
  
  function onClickedAnswer(isCorrect) {
    if (isCorrect){
 $("#feedback").html(trivia.currentQuestion.feedback).show();
    }
  else  { 
$("#feedback").html(trivia.currentQuestion.feedback).show();
}
    $("#correctAnswer").addClass("highlight"); //highlight right answer
      $("#feedback").append(`<br><button onclick="trivia.gotoNextQuestion();">Próxima Pregunta</br>`);
    
  }
  
  function onClickedCategory() {
    displayQuestion();
  }
  
  function onClickedStart() {
    displayCategories();
  }



  