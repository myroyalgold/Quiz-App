const questions = [
    // question 1
    {
        question: "Which of the following measures is used to describe the central tendency of a dataset?",
        answers: [
            { text: "Standard Deviation", correct: false },
            { text: "Range", correct: false },
            { text: "Mean", correct: true },
            { text: "Variance", correct: false },
        ]
    },
    // question 2
    {
        question: "What is the purpose of a p-value in hypothesis testing?",
        answers: [
            { text: "To measure the strength of the correlation between variables", correct: false },
            { text: "To determine the probability of observing the test results under the null hypothesis", correct: true },
            { text: "To estimate the population mean", correct: false },
            { text: "To calculate the standard error", correct: false },
        ]
    },
    // question 3
    {
        question: "What does a correlation coefficient of -0.8 indicate about the relationship between two variables?",
        answers: [
            { text: "A strong negative linear relationship", correct: true },
            { text: "A strong positive linear relationship", correct: false },
            { text: "A moderate negative linear relationship", correct: false },
            { text: "No linear relationship", correct: false },
        ]
    },
    // question 4
    {
        question: "What type of chart is best suited for displaying the distribution of a single continuous variable?",
        answers: [
            { text: "Bar Chart", correct: false },
            { text: "Histogram", correct: true },
            { text: "Pie Chart", correct: false },
            { text: "Scatter Plot", correct: false },
        ]
    },
    // question 5
    {
        question: "What is the purpose of handling missing values in data wrangling?",
        answers: [
            { text: "To increase the volume of the dataset", correct: false },
            { text: "To reduce the complexity of the data model", correct: false },
            { text: "To ensure the accuracy and completeness of the analysist", correct: true },
            { text: "To speed up the data processing time", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.dataset.correct = answer.correct; // Set data-correct attribute
        answerButtons.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons after an answer is selected
    });
    nextButton.style.display = "block"; // Show next button
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Use a single event listener for the next button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
