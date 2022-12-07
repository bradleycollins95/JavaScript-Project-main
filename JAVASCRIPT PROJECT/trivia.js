const $ = selector => document.querySelector(selector);

// Keep track of the current question number
let questionCount = 1;

// keep track of the current count
var count = 0;
// Keep track of the user's score
var score = 0;

// Variable to store the timeout for when an answer is clicked
let timeout;

window.onload = () => {
    // Start the quiz by loading the first question
    nextQuestion();
}

// Function to start the quiz by redirecting the user to the first question page
const startQuiz = () =>{
    // Save the user's name to local storage
    window.localStorage.setItem("usernameUser", $("#usersname").value);

    // Redirect the user to the first question page
    window.location.href='triviaquestionpage1.html';
}

// Function to load the next question
const nextQuestion = () =>{
    // Update the question counter with the current question number
    document.getElementById("questioncounter").textContent = `Question ${questionCount} / ${Questions.length}`;

    // Update the question text
    document.getElementById("questioninfo").textContent = Questions[count].question;

    // Update the text for each answer choice
    document.getElementById("a").textContent = Questions[count].answers.a;
    document.getElementById("b").textContent = Questions[count].answers.b;
    document.getElementById("c").textContent = Questions[count].answers.c;
    document.getElementById("d").textContent = Questions[count].answers.d;

    // Increment the count and question number
    count += 1;
    questionCount += 1;
}

// Function to validate whether the answer the user clicked is correct or not
const validateAnswers = evt =>{
    // Get the id of the answer the user clicked on
    let clicked = evt.currentTarget.id;

    // Check if all questions have not been answered yet
    if(Questions.length != count){
        // Check if the answer the user clicked is the correct answer
        if(document.getElementById(clicked).textContent == Questions[count - 1].correctAnswer){
            // If the answer is correct, update the button's color to green
            document.getElementById(clicked).style.backgroundColor = "#00cc00"

            // Increment the user's score
            score += 1

            // Set a timeout to move to the next question after 3 seconds
            timeout = setTimeout(() =>{
                // Reset the button colors
                buttonColor()

                // Load the next question
                nextQuestion()
            }, 3000);
        } else{
            // If the answer is incorrect, update the button's color to red
            document.getElementById(clicked).style.backgroundColor = "#ff0000"

            // Set a timeout to change the button color and move to the next question
            timeout = setTimeout(() => {
                buttonColor();
                nextQuestion();
            }, 3000);
        }
    }

    // If the question is the last question
    if (Questions.length == count) {
        // If the clicked element's text matches the correct answer
        if (document.getElementById(clicked).textContent == Questions[count - 1].correctAnswer) {
            // Set the background color to green
            document.getElementById(clicked).style.backgroundColor = "#00cc00";
            // Increment the score
            score += 1;
            // Set a timeout to change the button color
            timeout = setTimeout(() => {
                buttonColor();
            }, 3000);
            // Show the quiz results
            $(".showresult").style.display = 'block';
            displayPage();
        } else {
            // If the answer is incorrect, set the background color to red
            document.getElementById(clicked).style.backgroundColor = "#ff0000";
            // Set a timeout to change the button color
            timeout = setTimeout(() => {
                buttonColor();
            }, 3000);
            // Show the quiz results
            $(".showresult").style.display = 'block';
            displayPage();
        }
    }
}

// Function that changes the button color to white
const buttonColor = () => {
// Get all elements with the class "answers"
const allAnswers = document.getElementsByClassName("answers");
// Loop through the elements
for (let i = 0; i < allAnswers.length; i++) {
// Set the background color to white
    allAnswers[i].style.backgroundColor = "white";
}
}

// Function that displays the quiz results
const displayPage = () => {
// Set the text of the element with the id "quizresults" to show the number of correct answers out of the total number of questions
    document.getElementById("quizresults").textContent = `You got ${score} out of ${Questions.length} correct!`;
  // Set the text of the element with the id "percent" to show the percentage score
    document.getElementById("percent").textContent = `${score*10}%`;
}

document.addEventListener("DOMContentLoaded", () => {
    // Get all elements with the class "answers"
    const buttons = document.getElementsByClassName("answers");
    // Loop through the elements
    for (const button of buttons) {
      // Add a click event listener to each element that calls the "validateAnswers" function
      button.addEventListener("click", validateAnswers);
    }
  
    // Get the element with the id "playagain"
    const playAgainButton = document.getElementById("playagain");
    // Add a click event listener to the element
    playAgainButton.addEventListener("click", () => {
      // Refresh the page
      location.reload();
      // Hide the quiz results
      $(".showresult").style.display = 'none';
      // Enable the "nextquestion" button
      document.getElementById("nextquestion").disabled = false;
      
      score = 0;

      count = 0;

      questionCount = 1;

      // Move to the next question
      nextQuestion();
    });
  });