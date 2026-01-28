// 1. Dữ liệu câu hỏi
const quizData = [
    {
        question: "Which coastal city inspired Marina Travel's journey?",
        a: "Nha Trang", b: "Vũng Tàu", c: "Phan Thiết", d: "Da Nang",
        correct: "b",
    },
    {
        question: "What is the primary goal of Marina Travel?",
        a: "Selling hiking gear", b: "Promoting tourism services", c: "Building skyscrapers", d: "Car racing",
        correct: "b",
    },
    {
        question: "Which of these is a key sea-themed tour we offer?",
        a: "The Waves – Vũng Tàu", b: "Mountain High", c: "Desert Safari", d: "City Lights",
        correct: "a",
    },
    {
        question: "Why is responsive design important for our website?",
        a: "To make it heavy", b: "To work on both desktop and mobile", c: "To change the company logo", d: "To increase prices",
        correct: "b",
    },
    {
        question: "Which animal is known as the 'King of the Sea'?",
        a: "Goldfish", b: "Crab", c: "Great White Shark", d: "Turtle",
        correct: "c",
    }
];

// 2. Lấy các phần tử HTML
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const questionEl = document.getElementById('question-text');
const answerBtns = document.getElementById('answer-buttons');
const progressText = document.getElementById('question-number');
const progressFill = document.querySelector('.progress-fill');
const scoreEl = document.getElementById('score-display');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const finalScoreText = document.getElementById('final-score-text');

let currentQuiz = 0;
let score = 0;
let canClick = true;

// 3. Logic bắt đầu Game
if(startBtn) {
    startBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        initGame();
    });
}

function initGame() {
    currentQuiz = 0;
    score = 0;
    if(scoreEl) scoreEl.innerText = `Score: 0`;
    loadQuiz();
}

function loadQuiz() {
    canClick = true;
    answerBtns.innerHTML = ''; // Xóa sạch các nút cũ
    
    const currentQuizData = quizData[currentQuiz];
    
    // Đổ nội dung câu hỏi (Dùng h3 để khớp CSS)
    questionEl.innerHTML = `<h3>${currentQuizData.question}</h3>`;
    
    // Cập nhật số thứ tự câu hỏi
    progressText.innerText = `QUESTION ${currentQuiz + 1}/${quizData.length}`;
    
    // Chạy thanh Progress Bar
    const progressPercent = ((currentQuiz + 1) / quizData.length) * 100;
    if(progressFill) progressFill.style.width = `${progressPercent}%`;

    // Tạo các nút đáp án
    const options = ['a', 'b', 'c', 'd'];
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = `${option.toUpperCase()}) ${currentQuizData[option]}`;
        btn.classList.add('option-btn');
        btn.addEventListener('click', () => selectAnswer(btn, option));
        answerBtns.appendChild(btn);
    });
}

function selectAnswer(selectedBtn, choice) {
    if (!canClick) return;
    canClick = false;

    const correctAnswer = quizData[currentQuiz].correct;
    const allBtns = document.querySelectorAll('.option-btn');

    if (choice === correctAnswer) {
        score++;
        selectedBtn.classList.add('correct');
        selectedBtn.innerHTML += " ✅";
    } else {
        selectedBtn.classList.add('wrong');
        selectedBtn.innerHTML += " ❌";
        
        // Làm nổi bật đáp án đúng để người chơi học hỏi
        allBtns.forEach(btn => {
            if (btn.innerText.toLowerCase().startsWith(correctAnswer)) {
                btn.classList.add('correct');
            }
        });
    }

    if(scoreEl) scoreEl.innerText = `Score: ${score}`;

    // Đợi 1.5 giây rồi mới chuyển sang câu tiếp theo
    setTimeout(() => {
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreText.innerText = `You scored ${score} out of ${quizData.length}!`;
}

// 4. Sự kiện chơi lại
if(restartBtn) {
    restartBtn.addEventListener('click', () => {
        resultScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        initGame();
    });
}