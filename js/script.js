// SECTION CHECKBOXES DEFINITION 
// Declare a variable on which definition it creates an HTML element style
var cbox1_style = document.createElement("style");
// Assign to this variable the css styles we want to inject by using <.textContent>
cbox1_style.textContent = ".right-box article:first-child{background-color: black;color:red;}  #article-first-child{display:block;};"
// Assign an id to this variable
// TODO: We assign an id to this variable because :
cbox1_style.id = "cbox1_style";

var cbox2_style = document.createElement("style");
cbox2_style.textContent = ".right-box article :first-child {background-color: black;color:red;} #article_-first-child{display:block};"
cbox2_style.id = "cbox2_style";

var cbox3_style = document.createElement("style");
cbox3_style.textContent = ".right-box div:first-child {background-color: black;color:red;} #div-first-child{display:block;}";
cbox3_style.id = "cbox3_style";

var cbox4_style = document.createElement("style");
cbox4_style.textContent = ".right-box div :first-child {background-color: black;color:red;} #div_-first-child{display:block;} ";
cbox4_style.id = "cbox4_style";

var cbox5_style = document.createElement("style");
cbox5_style.textContent = ".right-box article:only-child {background-color: black;color:red;} #span-only-child{display:block;} ";
cbox5_style.id = "cbox5_style";

// !SECTION CHECKBOXES DEFINITION 
// SECTION INTERACTIVE LOGIC
document.getElementById("cbox1").addEventListener("change", function (event) {
    if (event.target.checked) {
        document.querySelector("head").appendChild(cbox1_style);
        console.log(event.target.id)
    } else {
        cbox1_style.remove();
    }
});
document.getElementById("cbox2").addEventListener("change", function (event) {
    if (event.target.checked) {
        document.querySelector("head").appendChild(cbox2_style);
        console.log(event.target.id)
    } else {
        cbox2_style.remove();
    }
});
document.getElementById("cbox3").addEventListener("change", function (event) {
    if (event.target.checked) {
        document.querySelector("head").appendChild(cbox3_style);
        console.log(event.target.id)
    } else {
        cbox3_style.remove();
    }
});
document.getElementById("cbox4").addEventListener("change", function (event) {
    if (event.target.checked) {
        document.querySelector("head").appendChild(cbox4_style);
        console.log(event.target.id)
    } else {
        cbox4_style.remove();
    }
});
document.getElementById("cbox5").addEventListener("change", function (event) {
    if (event.target.checked) {
        document.querySelector("head").appendChild(cbox5_style);
        console.log(event.target.id)
    } else {
        cbox5_style.remove();
    }
});
// !SECTION INTERACTIVE LOGIC
// SECTION TIME COUNTER
var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");
// ! ANCHOR TIMER SETUP
var timerInterval;
var secondsLeft = 150;
// stop timer can be called externally to clear the time interval 
// this is used to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
} 
function setTime() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left.";
        // THIS PREVENT NEGATIVE TIMING
        if (secondsLeft <= 0) {
            stopTimer();
            sendMessage();
        }
    }, 1000);
}
//@submit button definition@ 
var submit = document.querySelector( "#submit" );
function sendMessage() {
    timeEl.textContent = " ";
    var imgEl = document.createElement("img");
    //imgEl.setAttribute("src", "images/image_1.jpg");
    mainEl.appendChild(imgEl);
    // this disables the button
    submit.setAttribute("disabled","");
    alert("game over");
    goToScores();
}
setTime();
// !SECTION TIME COUNTER
// SECTION CHECKBOXES ANSWER
var initialQuestion = 0;
var currentQuestion = initialQuestion; 
var answers = [
    "01111110001111110000000",
    "00111000000111000111000",
    "00111000000111000111000",
    "00010000000010000010000",
    "01111110000000000000000"
];
// SECTION SUBMISSION
// SECTION EVENT LISTENER
//·#submit button definition#
submit.addEventListener("click", function(event) {
    submit.setAttribute("disabled","");
    if (getCheckboxStatus()===answers[ currentQuestion ]){
        document.querySelector( "#correct-alert" ).classList.remove("d-none"); 
        // ! The alert message will remain on the interface by 4 seconds
        setTimeout(function(){
            document.querySelector( "#correct-alert" ).classList.add("d-none");     
        },4000);       
    }else {
        document.querySelector( "#incorrect-alert" ).classList.remove("d-none");
        // ! The alert message will remain on the interface by 4 seconds
        setTimeout(function(){
            document.querySelector( "#incorrect-alert" ).classList.add("d-none");     
        },4000); 
        // If the player provides a incorrect answer the player will get a ten seconds penalty
        secondsLeft = Math.max( 0, secondsLeft - 10 ); 
    }
    // SECTION SHOW CORRECT ANSWER
    // Show the correct answer for 4 seconds
    // !! ANCHOR CREATE BUBLING CUSTOM EVENT 
    // * This creates an event so it can be triggered afterwards 
    var event = new Event('change', { bubbles: true });
    // !! ANCHOR DYNAMIC QUERY SELECTOR
    // @index-matching-plus-one@ (currentQuestion +1) is used because we are buiding the key of the 
    // selector with the value of the current question but hence we are 
    // answers is an array to match the position in the index we add 1 to
    // the value to match the listing of the questions hence a normal listing
    // of the questions mays start from 1  
    var checkedBox = document.querySelector("#Q" + (currentQuestion +1) + " input");
    checkedBox.checked = true;
    // Trigger custom event in checked box
    checkedBox.dispatchEvent(event);
    // !SECTION SHOW CORRECT ANSWER
    // SECTION HIDE ANSWER
    setTimeout(function(){
        checkedBox.checked = false;
        // Trigger custom event in checked box
        checkedBox.dispatchEvent(event);
        // see #index-matching-plus-one#
        document.querySelector("#Q" + (currentQuestion + 1) ).classList.add("d-none");
        clearCheckboxAnswers();
        // SECTION ENABLE NEXT QUESTION
        currentQuestion++;   
        // SECTION EVALUATE QUESTIONS COUNT 
        if (currentQuestion >= answers.length) {
            stopTimer();
            submit.setAttribute("disabled","");
            goToScores();
        }else {
            document.querySelector("#Q" + (currentQuestion + 1) ).classList.remove("d-none");
            submit.removeAttribute("disabled");
        }
        // !SECTION EVALUATE QUESTIONS COUNT 
        // !SECTION ENABLE NEXT QUESTION
    },4000);
    // !SECTION HIDE ANSWER 
});
// !SECTION EVENT LISTENER
// !SECTION SUBMISSION
// !SECTION CHECKBOXES ANSWER
// SECTION CHECKBOXES MANAGER
var cboxes = document.querySelectorAll('.code-table input[type="checkbox"]');
function getCheckboxStatus() {
    // !! Select all the inputs of type checkbox inside the element with the class .code-table
    // ? Query selectorAll returns an array of the element of the selection 
    // * some times you may nos see an array of elelemts defined on the code 
    // This can be because the array is implicitly defined by the querySelector
    var cboxesEval = "";
    for (var i = 0; i < cboxes.length; i++) {
        if (cboxes[i].checked === true) {
            cboxesEval = cboxesEval + "1";
        } else {
            cboxesEval = cboxesEval + "0";
        }
    }
    return cboxesEval;
}
// SECTION CLEAR CHECKBOX
function clearCheckboxAnswers(){
    for (var i = 0; i < cboxes.length; i++) {
        cboxes[i].checked = false ;     
    }   
}
// !SECTION CLEAR CHECKBOX
// !SECTION CHECKBOXES MAMAGER
// SECTION GO TO SCORES
// SECTION REDIRECTIONING TO ANOTHER HTML DOCUMENT
function goToScores () {
    localStorage.setItem("currentScore",secondsLeft);
    location.assign("scores.html");
}
// !SECTION REDIRECTIONING TO ANOTHER HTML DOCUMENT
// !SECTION GO TO SCORES