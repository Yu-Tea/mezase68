const display = document.getElementById("timer");
const message = document.getElementById("message");
const button = document.getElementById("startStopBtn");
const tweetBtn = document.getElementById("tweetBtn");

let startTime = null;
let timerInterval = null;
let isRunning = false;

// タイマーをスタートときの仕組み
function startTimer() {
  startTime = performance.now();
  timerInterval = setInterval(() => {
    const elapsed = (performance.now() - startTime) / 1000;
    display.textContent = elapsed.toFixed(1);

    // タイマーが9.9秒を超えたら強制停止させる
    if (elapsed >= 9.9) {
      clearInterval(timerInterval);
      display.textContent = "9.9";
      message.textContent = "ゲームオーバー！";
      button.textContent = "リセット";
      isRunning = false;      
    }
  }, 100);
}

//タイマーの結果での分岐
function judgeTime(finalTime) {
  if (finalTime === 6.8) {
    message.textContent = "ピッタリ！";
    document.body.style.overflowX = "hidden";
    display.style.color = "#f55d10";
    display.style.transform = "scale(1.2)";
    display.style.transition = "transform 0.2s";
    setTimeout(() => {
      display.style.transform = "scale(1)";
    }, 200);
    setTimeout(() => {
      document.body.style.overflowX = "";
    }, 500);
  } else if (finalTime === 6.7 || finalTime === 6.9) {
    message.textContent = "惜しい！";
  } else if (finalTime >= 5.8 && finalTime <= 7.8) {
    message.textContent = "残念…";
  } else {
    message.textContent = "頑張って！";
  }
}

// タイマーを止める時の仕組み
function stopTimer() {
  clearInterval(timerInterval);
  const finalTime = parseFloat(display.textContent);

  // タイマーの結果を呼び出し
  judgeTime(finalTime);

  // ツイートボタン表示
  // 仕様上ハッシュタグに「.」を入れるとそこでタグが途切れてしまうので「6.8秒」表記が使えない…タイトルに入れるのは良くないかも…
  // ツイート時に表示される文章は仮のものなのでURL含め後で修正すること！！！！！！
  tweetBtn.style.display = "inline-block";
  tweetBtn.addEventListener("click", () => {
    const time = parseFloat(display.textContent);
    const tweetText = `目指せ6.8秒！タイマーを ${time.toFixed(1)} 秒で止めたよ！ #目指せ6_8秒 https://example.com`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  
    window.open(tweetUrl, "_blank");
  });

  // ボタンを「リセット」にする
  button.textContent = "リセット";
  isRunning = false;
}

// 「リセット」ボタンを押してからの処理
function resetTimer() {
  display.textContent = "0.0";
  message.textContent = "スタートボタンを押してね！";
  display.classList.remove("bounce");
  button.textContent = "スタート";
  tweetBtn.style.display = "none";
  isRunning = false;
  display.style.color = "";
  display.style.transform = "";
  display.style.transition = "";
}

button.addEventListener("click", () => {
  const label = button.textContent;

  if (label === "スタート") {
    display.textContent = "0.0";
    message.textContent = "ドキドキ…";
    startTimer();
    button.textContent = "ストップ";
    isRunning = true;
  } else if (label === "ストップ" && isRunning) {
    stopTimer();
  } else if (label === "リセット") {
    resetTimer();
  }
});


//＝＝＝＝＝＝＝＝＝＝＝＝6.8秒ピッタリで止めるテストボタン用＝＝＝＝＝＝＝＝＝＝＝＝
function stopTimerTest() {
  clearInterval(timerId);
  running = false;
  btn.textContent = "スタート";
}

document.getElementById("testPerfect").addEventListener("click", () => {
  finalTime = 6.8;
  display.textContent = finalTime.toFixed(1);

  // タイマーの結果を呼び出し
  judgeTime(finalTime);
});