// const 一度代入したら値を変えれない変数
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

const startTimerBtn = document.getElementById("start-timer-btn");
const stopTimerBtn = document.getElementById("stop-timer-btn");
const timerDisplay = document.getElementById("timer-display");

let startTime, timerInterval;

// 要素が正しく取得できているかを確認
console.log(startBtn, startScreen, gameScreen);

// スタート画面 → ゲーム画面へ
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
});

// タイマー開始
startTimerBtn.addEventListener("click", () => {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const now = Date.now();
    const elapsed = ((now - startTime) / 1000).toFixed(2);
    timerDisplay.textContent = elapsed;
  }, 10);
});

// タイマー停止
stopTimerBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
});