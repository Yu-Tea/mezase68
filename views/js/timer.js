const display = document.getElementById("timer");
const button = document.getElementById("startStopBtn");
const tweetBtn = document.getElementById("tweetBtn");

let startTime = null;
let timerInterval = null;
let isRunning = false;
let tweetText = "";
let finalTime = 0.0;

// 画像を非表示に
function hideAllMessages() {
  const ids = [
    "defaultImg",
    "dokidokiImg","hatenaImg", "perfectImg", "closeImg",
    "failImg", "tryImg", "gameoverImg"
  ];
  ids.forEach(id => {
    document.getElementById(id).style.display = "none";
  });
}

// タイマーをスタートときの仕組み
function startTimer() {
  hideAllMessages(); // すべて非表示に
  document.getElementById("dokidokiImg").style.display = "block"; // ドキドキ表示

  startTime = performance.now();
  let hidden = false;

  timerInterval = setInterval(() => {
    const elapsed = (performance.now() - startTime) / 1000;

    // 3秒経過後に表示を変える（中級・上級用）
    if (!hidden && elapsed >= 3.0) {
      hidden = true;
      if (mode === "chukyu" || mode === "jokyu") {
        document.getElementById("dokidokiImg").style.display = "none";
        document.getElementById("hatenaImg").style.display = "block"; // ← 中級・上級だけ画像変更
      }
      if (mode === "chukyu") {
        const intPart = Math.floor(elapsed);
        display.innerHTML = `<span id="visiblePart">${intPart}.</span><span class="hatena">?</span>`;
      } else if (mode === "jokyu") {
        display.innerHTML = `<span class="hatena">?.?</span>`;
      }
    } else if (hidden && mode === "chukyu") { // ← 中級の一の位更新し続ける処理
      const intPart = Math.floor(elapsed);
      const visibleSpan = document.getElementById("visiblePart");
      if (visibleSpan) {
        visibleSpan.textContent = `${intPart}.`;
      }
    }

    // 初級モードのときの処理（3秒経過後も更新させる）
    if (!hidden || mode === "shokyu") {
      display.textContent = elapsed.toFixed(1);
    }

    // タイマーが9.9秒を超えたら強制停止させる
    if (elapsed >= 9.9) {
      clearInterval(timerInterval);
      display.textContent = "9.9";
      hideAllMessages(); // 全部非表示
      document.getElementById("gameoverImg").style.display = "block"; // ゲームオーバー表示
      button.textContent = "リセット";
      isRunning = false;      
    }
  }, 100);
}

// タイマーを止める時の仕組み
function stopTimer() {
  if (!isRunning) {
    resetTimer();
    return;
  }

  clearInterval(timerInterval);
  isRunning = false;

  const elapsed = (performance.now() - startTime) / 1000;
  finalTime = parseFloat(elapsed.toFixed(1));
  display.textContent = finalTime.toFixed(1); // 本当の数値をここで表示

  //タイマーの結果で画像を切替
  hideAllMessages();
  if (finalTime === 6.8) {
    document.getElementById("perfectImg").style.display = "block";
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
    document.getElementById("closeImg").style.display = "block";
  } else if (finalTime >= 5.8 && finalTime <= 7.8) {
    document.getElementById("failImg").style.display = "block";
  } else {
    document.getElementById("tryImg").style.display = "block";
  }

  // ツイートボタン表示
  tweetBtn.style.visibility = "visible";

  // ボタンを「リセット」にする
  button.textContent = "リセット";
  isRunning = false;
}

// ツイート時のメッセージ
tweetBtn.addEventListener("click", () => {
  let tweetText;
  if (mode === "chukyu") {
    tweetText = `目指せ6.8秒！中級モードでタイマーを ${finalTime.toFixed(1)} 秒で止めたよ！ #ロバタイマー https://roba-timer.onrender.com/`;
  } else if (mode === "jokyu") {
    tweetText = `目指せ6.8秒！上級モードでタイマーを ${finalTime.toFixed(1)} 秒で止めたよ！ #ロバタイマー https://roba-timer.onrender.com/`;
  } else {
    tweetText = `目指せ6.8秒！初級モードでタイマーを ${finalTime.toFixed(1)} 秒で止めたよ！ #ロバタイマー https://roba-timer.onrender.com/`;
  }

  const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;  
  window.open(tweetURL, "_blank");
});

window.addEventListener("DOMContentLoaded", () => {
  hideAllMessages();
  document.getElementById("defaultImg").style.display = "block";
});

// 「リセット」ボタンを押してからの処理
function resetTimer() {
  display.textContent = "0.0";
  hideAllMessages();
  document.getElementById("defaultImg").style.display = "block";
  display.classList.remove("bounce");
  button.textContent = "スタート";
  tweetBtn.style.visibility = "hidden";;
  isRunning = false;
  display.style.color = "";
  display.style.transform = "";
  display.style.transition = "";
}

button.addEventListener("click", () => {
  const label = button.textContent;

  if (label === "スタート") {
    display.textContent = "0.0";
    document.getElementById("dokidokiImg").style.display = "block";
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