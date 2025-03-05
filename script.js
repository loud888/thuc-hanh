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
