let customQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

// Attach button event listener after DOM is loaded
window.onload = () => {
  document.getElementById("generate-form-btn").addEventListener("click", generateForm);
};

function generateForm() {
  const num = parseInt(document.getElementById("num-questions").value);
  const form = document.getElementById("question-form");
  form.innerHTML = "";

  if (!num || num <= 0) return alert("Please enter a valid number.");

  for (let i = 0; i < num; i++) {
    form.innerHTML += `
      <fieldset>
        <legend>Question ${i + 1}</legend>
        <input type="text" name="q${i}" placeholder="Enter the question" required />
        <input type="text" name="q${i}_a" placeholder="Option A" required />
        <input type="text" name="q${i}_b" placeholder="Option B" required />
        <input type="text" name="q${i}_c" placeholder="Option C" required />
        <input type="text" name="q${i}_d" placeholder="Option D" required />
        <select name="q${i}_correct" required>
          <option value="">Select correct answer</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
          <option value="D">Option D</option>
        </select>
      </fieldset>
      <br />
    `;
  }

  form.innerHTML += `<button type="submit">Start Quiz 🚀</button>`;
  form.style.display = "block";

  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    buildQuizData(num, formData);
  };
}

function buildQuizData(num, formData) {
  customQuestions = [];

  for (let i = 0; i < num; i++) {
    const q = formData.get(`q${i}`);
    const options = [
      formData.get(`q${i}_a`),
      formData.get(`q${i}_b`),
      formData.get(`q${i}_c`),
      formData.get(`q${i}_d`)
    ];
    const correctLetter = formData.get(`q${i}_correct`);
    const correctIndex = { A: 0, B: 1, C: 2, D: 3 }[correctLetter];

    customQuestions.push({
      question: q,
      options: options,
      correctAnswer: options[correctIndex]
    });
  }

  document.getElementById("setup-container").style.display = "none";
  document.getElementById("question-form").style.display = "none";
  startQuiz();
}

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  timeLeft = 30;
  document.getElementById("quiz-section").style.display = "block";
  document.getElementById("result-container").innerHTML = "";
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  const q = customQuestions[currentQuestionIndex];
  document.getElementById("question-text").innerText = q.question;

  const btnContainer = document.getElementById("answer-buttons");
  btnContainer.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option);
    btnContainer.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === customQuestions[currentQuestionIndex].correctAnswer) {
    score++;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < customQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("quiz-section").style.display = "none";

  const total = customQuestions.length;
  const percent = Math.round((score / total) * 100);

  let message = "🧠 Good Try!";
  if (percent === 100) message = "🏆 Perfect Score!";
  else if (percent >= 80) message = "🔥 Excellent!";
  else if (percent >= 60) message = "✅ Well Done!";
  else if (percent >= 40) message = "🙂 Keep Practicing!";
  else message = "😅 Try Again!";

  document.getElementById("result-container").innerHTML = `
    <h2>🎉 Quiz Complete!</h2>
    <p>Score: ${score} out of ${total}</p>
    <p>Percentage: ${percent}%</p>
    <p>${message}</p>
  `;
}
