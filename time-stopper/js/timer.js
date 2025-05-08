let startTime;
let timerId;
let running = false;

const display = document.getElementById("display");
const btn = document.getElementById("startBtn");
const message = document.getElementById("message");

btn.addEventListener("click", () => {
  if (!running) {
    // スタート処理
    running = true;
    startTime = Date.now();
    display.classList.remove("bounce");//6.8秒時の特殊効果をリセット
    btn.textContent = "ストップ";
    message.textContent = "ドキドキ…";

    timerId = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed >= 9.9) {
        stopTimer();
        display.textContent = "9.9";
        message.textContent = "ゲームオーバー";
      } else {
        display.textContent = elapsed.toFixed(1);
      }
    }, 100);
  } else {
    // ストップ処理
    stopTimer();
    const finalTime = parseFloat(display.textContent);
    
    // 判定処理
    if (finalTime === 6.8) {
      message.textContent = "ピッタリ！";
    } else if (finalTime === 6.7 || finalTime === 6.9) {
      message.textContent = "惜しい！";
    } else if (finalTime >= 5.8 && finalTime <= 7.8) {
      message.textContent = "残念…";
    } else {
      message.textContent = "頑張って！";
    }
  }
});


//6.8秒ピッタリで止める用のテストボタン（最終的に消す）
function stopTimer() {
  clearInterval(timerId);
  running = false;
  btn.textContent = "スタート";
  display.classList.remove("bounce");
}

document.getElementById("testPerfect").addEventListener("click", () => {
  finalTime = 6.8;
  display.textContent = finalTime.toFixed(1);
  display.classList.remove("bounce");

  // ↓ 本番のstopTimerと同じ判定ロジック
  if (finalTime === 6.8) {
    message.textContent = "ピッタリ！";
    display.classList.add("bounce");
  } else if (finalTime === 6.7 || finalTime === 6.9) {
    message.textContent = "惜しい！";
  } else if (finalTime >= 5.8 && finalTime <= 7.8) {
    message.textContent = "残念…";
  } else {
    message.textContent = "頑張って！";
  }
});