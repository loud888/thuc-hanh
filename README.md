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
        .question label {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-right: 15px; 
}

.question input[type="radio"],
.question input[type="checkbox"] {
    margin: 0;
}


.question input[type="radio"],
.question input[type="checkbox"] {
    margin-right: 5px;
}
    </style>
</head>
<body>
    <div class="container">
        <h2>Multiple Choice Test</h2>
        <div id="user-info">
            <label>Full Name: <input type="text" id="name" required></label><br>
            <label>Date of Birth: <input type="date" id="dob" required></label><br>
            <label>Student ID: <input type="text" id="student-id" required></label><br>
            <label>Class: <input type="text" id="class" required></label><br>
            <button id="start-btn">Start Test</button>
        </div>
        <div id="quiz-container" style="display:none;">
            <div id="questions"></div>
            <button id="submit-btn">Next</button>
        </div>
        <div id="results" style="display:none;"></div>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
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
 let currentGroup = 1;
           document.getElementById("start-btn").addEventListener("click", function () {
        if (document.getElementById("name").value && document.getElementById("dob").value && document.getElementById("student-id").value && document.getElementById("class").value) {
            document.getElementById("user-info").style.display = "none";
            document.getElementById("quiz-container").style.display = "block";
            loadQuestions();
        } else {
            alert("Please fill in all fields.");
        }
    });

    function loadQuestions() {
        const questionContainer = document.getElementById("questions");
        questionContainer.innerHTML = "";

        questions.forEach((q, index) => {
            let questionElement = `<div class='question'><p>${index + 1}. ${q.question}</p>`;

            if (q.type === "true-false") {
                questionElement += `<input type='radio' name='q${index}' value='true'> True`;
                questionElement += `<input type='radio' name='q${index}' value='false'> False`;
            } else if (q.type === "single-choice") {
                q.options.forEach(opt => {
                    questionElement += `<input type='radio' name='q${index}' value='${opt}'> ${opt}<br>`;
                });
            } else if (q.type === "multiple-choice") {
                q.options.forEach(opt => {
                    questionElement += `<input type='checkbox' name='q${index}' value='${opt}'> ${opt}<br>`;
                });
            } else if (q.type === "text") {
                questionElement += `<input type='text' name='q${index}'>`;
            }

            questionElement += "</div>";
            questionContainer.innerHTML += questionElement;
        });

        // Hiển thị nút Submit
        questionContainer.innerHTML += `<button id="submit-btn">Submit</button>`;

        document.getElementById("submit-btn").addEventListener("click", showResults);
    }

    function submitQuiz() {
    let score = 0;
    const correctAnswers = { q1: "False", q2: "4" }; // Đáp án đúng
    let totalQuestions = Object.keys(correctAnswers).length;

    for (let key in correctAnswers) {
        let selected = document.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === correctAnswers[key]) {
            score++;
        }
    }

    document.getElementById("result").innerText = `Your Score: ${score} / ${totalQuestions}`;
}
});
    </script>
</body>
</html>
