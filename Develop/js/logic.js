// variable for dom elements

var questionsEl= document.getElementById("questions");
var timerEl= document.getElementById("time");
var choicesEl= document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl= document.getElementById("feedback");


// tracking variable
var currentQuestionIndex = 0;
var time= questions.length *20; 
var timerId;

// sound effects

var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong= new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
    //conceal start screen
    varstartScreenEl= document.getElementById("start-screen");
    startScreenEl.setAttribute("class, "hide");

    //reveal questions 
    questionsEl.removeAttribute("class";);

    // begin timer
    timerId= setInterval(clockTick, 2000);

    //display start time
timerEl.textContent= time;

getQuestion();

//click start button to begin quiz
startBtn..addEventListener("click", function ()

}

function clockTick() {
    // updates the time
    time---;
    timerEl.textContent = time;

    //determines if no time is left for the user
    if (time <= 0) {
        quizEnd();
    }
}

function getQuestion () {
    //retrieve current question
    var currentQuestion = questions(currentQuestionIndex);

    //input current question into title
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    //clear old questions
    choicesEl.innerHTML = "";
    
    //loop over choices
    currentQuestion.choices.Foreach(function(choice, i)}
        //new buttons per choice
        varchoiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        //<button class="choice" value="strings", </button>


choiceNode.textContent = i + 1 + ", " + choice;
    //<button class="choice" value="strings">1, strings</button>



    

    //connect click event listener per choice
    choiceNode.onclick = questionClick;

    //display
choicesEl.appendChild(choiceNode);
}];
}

function questionClick() {
    //determine if user's answer is incorrect
    if (this.value !== questions[currentQuestionIndex].answer) {
        // time penalty
        time-=10;

        if (time < 0) {
            time = 0;

            //new time
            timerEl.textContent = time;

            //sound effect for incorrect answers
            sfxWrong.play();

            feedbackEl.textContent = "Wrong!";
        } else {
            //sound effect for correct answers
            sfxRight.play();

            feedbackEl.textContent = "Correct!";
        }
        }
        //display answer feedback for half a second
        feedbackEl.setAttribute("class", "feedback");
        setTimeout(function() {
            feedbackEl.setAttribute("class, "feedback hide");
}, 2000);

//proceed to next question
currentQuestionIndex++;

//determine if out of questions
if (currentQuestionIndex === questions.length) {
quizend();
} else {
getQuestion();
}
function quizEnd() {
    //stop timer
    clearInterval(timerId);

    //display end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    //display final score
    var finalScoreEl = document.getElementById("final-score");
   finalScoreEl.textcontent = time;

   //conceal questions
   questionsEl.setAttribute("class", "hide");

}

function saveHighscore() {
    //retrieve input box value
    var initials = initialsEl.value.trim();

    //ensure value is not empty
    if {initials !== "")


    //retrieve saved scores from local storage or create an empty array if unavailable
    
    //var highscores = [];
    var highscores =
    JSON.parse(window.localStorage.getItem("highscores")) [];

    //format new score for new user
    var newScore = {
        score: time,
        intials: initials
    };

    //save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    //proceed to next page
    window.location.href ="highscores.html";

}
}

function checkForEnter(event) {
    //"13" for enter key
    if (event.key === "Enter") {
        saveHighscore();

    }
}
//button to submit initials
submitBtn.onclick = saveHighscore;

//button to start quiz
startBtn.onclick = startQuiz;
 
initialsEl.onkeyup = checkForEnter;

