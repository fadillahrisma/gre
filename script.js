const words = [
  {
    word: "Aberrant",
    meaning: "Menyimpang",
    sentence: "His behavior was aberrant from the norm."
  },
  {
    word: "Capitulate",
    meaning: "Menyerah",
    sentence: "They capitulated after long negotiations."
  },
  {
    word: "Ephemeral",
    meaning: "Sementara",
    sentence: "Life is ephemeral."
  },
  {
    word: "Obfuscate",
    meaning: "Membingungkan",
    sentence: "The explanation only obfuscated the issue."
  },
  {
    word: "Pragmatic",
    meaning: "Praktis",
    sentence: "She is pragmatic in solving problems."
  }
];

let currentQuestion = 0;
let score = 0;

const wordList = document.getElementById("word-list");

words.forEach(w => {
  const div = document.createElement("div");
  div.innerHTML = `<b>${w.word}</b>: ${w.meaning}<br><i>${w.sentence}</i>`;
  wordList.appendChild(div);
});

function startQuiz() {
  document.getElementById("quiz-container").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const q = words[currentQuestion];
  document.getElementById("question").innerText =
    `Apa arti dari "${q.word}"?`;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  const options = shuffle([
    q.meaning,
    ...getRandomMeanings(q.meaning)
  ]);

  options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "choice";
    div.innerText = opt;
    div.onclick = () => checkAnswer(opt);
    choicesDiv.appendChild(div);
  });
}

function checkAnswer(selected) {
  const correct = words[currentQuestion].meaning;
  if (selected === correct) score++;

  currentQuestion++;

  if (currentQuestion < words.length) {
    showQuestion();
  } else {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("result").innerHTML = `<h2>Score: ${score}/5</h2>`;
  }
}

function getRandomMeanings(correct) {
  const all = words.map(w => w.meaning).filter(m => m !== correct);
  return shuffle(all).slice(0, 3);
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}