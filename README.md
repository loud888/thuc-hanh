<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multiple Choice Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            background-color: #f9f9f9;
        }

        label, input {
            display: block;
            margin: 10px auto;
            width: 90%;
            padding: 8px;
        }

        button {
            background-color: #007BFF;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
        }

        button:hover {
            background-color: #0056b3;
        }

        .question {
            text-align: left;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Multiple Choice Test</h2>

       
        <div id="user-info">
            <label for="name">Full Name:</label>
            <input type="text" id="name" required>
            
            <label for="dob">Date of Birth:</label>
            <input type="date" id="dob" required>
            
            <label for="student-id">Student ID:</label>
            <input type="text" id="student-id" required>

            <label for="class">Class:</label>
            <input type="text" id="class" required>

            <button id="start-btn">Start Test</button>
        </div>

        
        <div id="quiz-container" style="display:none;">
            <div id="questions"></div>
            <button id="submit-btn">Submit</button>
        </div>

       
        <div id="results" style="display:none;"></div>
    </div>

    <script>
       const questions = [
   
    { question: "The Earth is flat.", type: "true-false", group: 1 },
    { question: "What is 2 + 2?", type: "single-choice", options: ["3", "4", "5"], group: 1 },
    { question: "What is the capital of France?", type: "single-choice", options: ["Paris", "London", "Rome"], group: 1 },
    { question: "Which of these are colors?", type: "multiple-choice", options: ["Red", "Green", "Dog"], group: 1 },
    { question: "What is the largest ocean?", type: "single-choice", options: ["Atlantic", "Pacific", "Indian"], group: 1 },
    { question: "The sun rises in the west.", type: "true-false", group: 1 },
    { question: "Solve: 5 x 3", type: "single-choice", options: ["15", "10", "20"], group: 1 },
    { question: "What is H2O?", type: "text", group: 1 },
    { question: "Who wrote Hamlet?", type: "single-choice", options: ["Shakespeare", "Einstein", "Newton"], group: 1 },
    { question: "What is the square root of 16?", type: "single-choice", options: ["2", "4", "8"], group: 1 },

    
    { question: "What is the capital of Japan?", type: "single-choice", options: ["Tokyo", "Seoul", "Beijing"], group: 2 },
    { question: "Is Python a programming language?", type: "true-false", group: 2 },
    { question: "Which animals can fly?", type: "multiple-choice", options: ["Eagle", "Dog", "Bat"], group: 2 },
    { question: "Name one planet in our solar system.", type: "text", group: 2 },
    { question: "Who painted the Mona Lisa?", type: "single-choice", options: ["Da Vinci", "Van Gogh", "Picasso"], group: 2 },
    { question: "The moon is made of cheese.", type: "true-false", group: 2 },
    { question: "What is the speed of light?", type: "text", group: 2 },
    { question: "Which is a fruit?", type: "single-choice", options: ["Apple", "Carrot", "Potato"], group: 2 },
    { question: "What is 10 / 2?", type: "single-choice", options: ["5", "6", "4"], group: 2 },
    { question: "What is DNA?", type: "text", group: 2 },

   
    { question: "What is the capital of Canada?", type: "single-choice", options: ["Ottawa", "Toronto", "Vancouver"], group: 3 },
    { question: "Does ice sink in water?", type: "true-false", group: 3 },
    { question: "Which of the following are programming languages?", type: "multiple-choice", options: ["Java", "Python", "Banana"], group: 3 },
    { question: "Who discovered gravity?", type: "single-choice", options: ["Newton", "Einstein", "Tesla"], group: 3 },
    { question: "What gas do plants absorb?", type: "text", group: 3 },
    { question: "Is the speed of sound faster than the speed of light?", type: "true-false", group: 3 },
    { question: "What is the largest planet in our solar system?", type: "single-choice", options: ["Jupiter", "Earth", "Mars"], group: 3 },
    { question: "Which of these are mammals?", type: "multiple-choice", options: ["Dolphin", "Shark", "Elephant"], group: 3 },
{ question: "Who developed the theory of relativity?", type: "single-choice", options: ["Einstein", "Newton", "Darwin"], group: 3 },
    { question: "What is the chemical symbol for gold?", type: "text", group: 3 },

   
    { question: "What is the capital of Australia?", type: "single-choice", options: ["Canberra", "Sydney", "Melbourne"], group: 4 },
    { question: "Do fish breathe oxygen?", type: "true-false", group: 4 },
    { question: "Which of these are renewable energy sources?", type: "multiple-choice", options: ["Solar", "Wind", "Coal"], group: 4 },
    { question: "Name a continent.", type: "text", group: 4 },
    { question: "Who invented the telephone?", type: "single-choice", options: ["Bell", "Edison", "Tesla"], group: 4 },
    { question: "Water boils at 100°C at sea level.", type: "true-false", group: 4 },
    { question: "Which planet is closest to the sun?", type: "single-choice", options: ["Mercury", "Venus", "Earth"], group: 4 },
    { question: "What is the hardest natural substance on Earth?", type: "single-choice", options: ["Diamond", "Gold", "Iron"], group: 4 },
    { question: "What is the sum of angles in a triangle?", type: "single-choice", options: ["180°", "360°", "90°"], group: 4 },
    { question: "What is photosynthesis?", type: "text", group: 4 }
];

        document.getElementById("start-btn").addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const studentId = document.getElementById("student-id").value;
    const className = document.getElementById("class").value;

    if (name && dob && studentId && className) {
        document.getElementById("user-info").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";
        loadQuestions(1);
    } else {
        alert("Please fill in all fields.");
    }
});

let currentGroup = 1;

function loadQuestions(group) {
    const questionContainer = document.getElementById("questions");
    questionContainer.innerHTML = "";

    const groupQuestions = questions.filter(q => q.group === group);

    groupQuestions.forEach((q, index) => {
        let questionElement = `<div class="question">
            <p>${(group - 1) * 10 + index + 1}. ${q.question}</p>`;

        if (q.type === "true-false") {
            questionElement += `<input type="radio" name="q${index}" value="true"> True <input type="radio" name="q${index}" value="false"> False`;
        } else if (q.type === "single-choice") {
            q.options.forEach(opt => {
                questionElement += `<input type="radio" name="q${index}" value="${opt}"> ${opt}<br>`;
            });
        } else if (q.type === "multiple-choice") {
            q.options.forEach(opt => {
                questionElement += `<input type="checkbox" name="q${index}" value="${opt}"> ${opt}<br>`;
            });
        } else if (q.type === "text") {
            questionElement += `<textarea name="q${index}" rows="2" cols="30"></textarea>`;
        }

        questionElement += "</div>";
        questionContainer.innerHTML += questionElement;
    });

    document.getElementById("submit-btn").innerText = group < 4 ? "Next" : "Submit";
}

document.getElementById("submit-btn").addEventListener("click", function () {
    if (currentGroup < 4) {
        currentGroup++;
        loadQuestions(currentGroup);
    } else {
        showResults();
    }
});
        document.getElementById("submit-btn").addEventListener("click", function () {
            let score = 0;
            let totalQuestions = questions.length;

            questions.forEach((q, index) => {
                let userAnswer;
                if (q.type === "true-false" || q.type === "single-choice") {
                    userAnswer = document.querySelector(`input[name="q${index}"]:checked`);
                    if (userAnswer && userAnswer.value === q.correctAnswer) {
                        score++;
                    }
                } else if (q.type === "multiple-choice") {
                    let selectedAnswers = Array.from(document.querySelectorAll(`input[name="q${index}"]:checked`)).map(e => e.value);
                    if (JSON.stringify(selectedAnswers.sort()) === JSON.stringify(q.correctAnswers.sort())) {
                        score++;
                    }
                }
            });

            document.getElementById("quiz-container").style.display = "none";
            document.getElementById("results").style.display = "block";
