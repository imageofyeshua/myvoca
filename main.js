export function renderWords(words) {
  let wordPool = words;
  let currentQuestions = [];
  let currentIdx = 0;
  let score = 0;
  let timer;
  let timeLeft = 50; // Deciseconds (50 * 100ms = 5s)

  // Function to pick 10 random items using Math.random
  function getRandomQuestions() {
    const shuffled = [...wordPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }

  function initQuiz() {
    currentQuestions = getRandomQuestions();
    loadQuestion();
  }

  function loadQuestion() {
    if (currentIdx >= 10) return showResults();

    timeLeft = 50;
    const qData = currentQuestions[currentIdx];
    document.getElementById("question-text").innerText = `${qData.q}`;

    const optionsBox = document.getElementById("answer-options");
    optionsBox.innerHTML = "";

    // Shuffle options for the question as well
    const shuffledOptions = [...qData.options].sort(() => 0.5 - Math.random());

    shuffledOptions.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.innerText = `${opt}`;
      btn.onclick = () => handleAnswer(opt === qData.correct);
      optionsBox.appendChild(btn);
    });

    startTimer();
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer-fill").style.width = timeLeft * 2 + "%";

      if (timeLeft <= 0) {
        handleAnswer(false); // Time's up is an incorrect answer
      }
    }, 100);
  }

  function handleAnswer(isCorrect) {
    clearInterval(timer);
    const indicator = document.getElementById(`ind-${currentIdx}`);

    if (isCorrect) {
      score++;
      indicator.innerText = "O";
      indicator.classList.add("correct");
    } else {
      indicator.innerText = "X";
      indicator.classList.add("incorrect");
    }

    currentIdx++;
    setTimeout(loadQuestion, 500); // Brief pause before next question
  }

  function showResults() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("timer-box").classList.add("hidden");
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("final-score").innerText = `${score} / 10`;
  }

  initQuiz();
}
