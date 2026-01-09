//#region GLOBAL VARIABLES
let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let startImage = new Image();
let isMuted = false;
let isFullscreen = false;

const lvl1 = level1;
//#endregion

//#region LEVEL CREATION
function createLevel1() {
  return new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicks(),
      new Chicks(),
      new Chicks(),
      new Chicks(),
      new Chicks(),
    ],
    [new Endboss()],
    [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
    ],
    [
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        -719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        0
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/1.png",
        0
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/1.png",
        0
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/1.png",
        0
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/2.png",
        719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/2.png",
        719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/2.png",
        719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        719 * 2
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        719 * 3
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),
    ],
    [
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
    ],
    [
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
    ]
  );
}
//#endregion

//#region WINDOW & CANVAS SETUP
window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  startImage.onload = function () {
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
  };
};

document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

function handleFullscreenChange() {
  const btn = document.getElementById("fullScreenBtn");
  if (document.fullscreenElement) {
    isFullscreen = true;
    btn.textContent = "❌";
  } else {
    isFullscreen = false;
    btn.textContent = "📺";
  }
}
//#endregion

//#region GAME INITIALIZATION
function init() {
  const level = createLevel1();
  world = new World(canvas, keyboard, level);
}
//#endregion

//#region START GAME HELPERS
function hideStartButton() {
  document.getElementById("startBtn")?.classList.add("d-none");
}

function showGameControls() {
  document.getElementById("muteBtn").classList.remove("d-none");
  document.getElementById("restartBtn").classList.remove("d-none");
  document.getElementById("homeBtn").classList.remove("d-none");
  document.getElementById("fullScreenBtn").classList.remove("d-none");
  document.getElementById("toggleControlsBtn").classList.remove("d-none");
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startBackgroundMusic() {
  AudioHub.backgroundMusic.loop = true;
  AudioHub.backgroundMusic.volume = 0.1;
  AudioHub.backgroundMusic.play();
}

function initializeMuteButton() {
  const muteBtn = document.getElementById("muteBtn");
  const savedMute = getBoolean("isMuted");
  isMuted = savedMute !== null ? savedMute : false;

  if (isMuted) {
    AudioHub.mute();
    muteBtn.textContent = "🔇";
  } else {
    AudioHub.unmute();
    muteBtn.textContent = "🔊";
  }
}
//#endregion

//#region START / RESTART GAME
function startGame() {
  hideStartButton();
  clearCanvas();
  init();
  startBackgroundMusic();
  showGameControls();
  initializeMuteButton();
}

function restartGame() {
  const restartBtn = document.getElementById("restartBtn");
  hideLosingScreen();
  hideWinningScreen();

  IntervalHub.stopAllIntervals();
  AudioHub.stopAll();

  keyboard = new Keyboard();
  clearCanvas();

  world = null;
  init();

  if (!isMuted) AudioHub.backgroundMusic.play();
  restartBtn.blur();
}
//#endregion

//#region DIALOG FUNCTIONS
function openDialog() {
  document.getElementById("instructionDialog").showModal();
}
function closeDialog() {
  document.getElementById("instructionDialog").close();
}
function openImpressum() {
  document.getElementById("impressumDialog").showModal();
}
function closeDialogImpressum() {
  document.getElementById("impressumDialog").close();
}
//#endregion

//#region KEYBOARD EVENTS
let buttonsActive = false;

window.addEventListener("keydown", (e) => {
  if (buttonsActive) return;

  if (e.keyCode == 39) keyboard.RIGHT = true;
  if (e.keyCode == 37) keyboard.LEFT = true;
  if (e.keyCode == 38) keyboard.UP = true;
  if (e.keyCode == 40) keyboard.DOWN = true;
  if (e.keyCode == 32) keyboard.SPACE = true;
  if (e.keyCode == 68) keyboard.D = true;
});

window.addEventListener("keyup", (e) => {
  if (buttonsActive) return;

  if (e.keyCode == 39) keyboard.RIGHT = false;
  if (e.keyCode == 37) keyboard.LEFT = false;
  if (e.keyCode == 38) keyboard.UP = false;
  if (e.keyCode == 40) keyboard.DOWN = false;
  if (e.keyCode == 32) keyboard.SPACE = false;
  if (e.keyCode == 68) keyboard.D = false;
});

function bindMobileControls() {
  const map = {
    btnRight: "RIGHT",
    btnLeft: "LEFT",
    btnJump: "SPACE",
    btnThrow: "D",
  };

  Object.entries(map).forEach(([id, key]) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener("touchstart", (e) => {
      if (e.cancelable) e.preventDefault();
      keyboard[key] = true;
      btn.classList.add("active");
    });

    btn.addEventListener("touchend", (e) => {
      if (e.cancelable) e.preventDefault();
      keyboard[key] = false;
      btn.classList.remove("active");
    });

    btn.addEventListener("touchcancel", () => {
      keyboard[key] = false;
      btn.classList.remove("active");
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  bindMobileControls();

  const controls = document.querySelector(".mobile-controls");

  if (isMobileDevice()) {
    controls.classList.remove("d-none");
    buttonsActive = true;
  } else {
    const saved = JSON.parse(localStorage.getItem("showControls"));
    if (saved !== null) {
      if (saved) {
        controls.classList.remove("d-none");
        buttonsActive = true;
      } else {
        controls.classList.add("d-none");
        buttonsActive = false;
      }
    } else {
      controls.classList.add("d-none");
      buttonsActive = false;
    }
  }
});

function toggleMobileControls() {
  const contrlBtn = document.getElementById("toggleControlsBtn");
  const controls = document.querySelector(".mobile-controls");
  controls.classList.toggle("d-none");

  buttonsActive = !controls.classList.contains("d-none");

  if (!isMobileDevice()) {
    localStorage.setItem("showControls", JSON.stringify(buttonsActive));
  }

  contrlBtn.blur();
}

function isMobileDevice() {
  return window.matchMedia("(pointer: coarse)").matches;
}

//#endregion

//#region AUDIO CONTROLS
function toggleMute() {
  isMuted = !isMuted;
  const muteBtn = document.getElementById("muteBtn");

  if (isMuted) {
    AudioHub.mute();
    muteBtn.textContent = "🔇";
  } else {
    AudioHub.unmute();
    muteBtn.textContent = "🔊";
  }
  saveBoolean("isMuted", isMuted);
  muteBtn.blur();
}
//#endregion

//#region LOCAL STORAGE
function saveBoolean(key, value) {
  if (typeof value !== "boolean") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function getBoolean(key) {
  const raw = localStorage.getItem(key);
  if (raw === null) return null;
  return JSON.parse(raw);
}
//#endregion

//#region NAVIGATION
function goHome() {
  window.location.href = "index.html";
}
//#endregion

//#region SCREENS
function showLosingScreen() {
  document.getElementById("loosingScreen").classList.remove("d-none");
  setTimeout(() => {
    IntervalHub.stopAllIntervals();
  }, 1000);
}

function hideLosingScreen() {
  const losingScreen = document.getElementById("loosingScreen");
  losingScreen.classList.add("d-none");
}

function showWinningScreen() {
  document.getElementById("winningScreen").classList.remove("d-none");
  setTimeout(() => {
    IntervalHub.stopAllIntervals();
  }, 1000);
}

function hideWinningScreen() {
  const winningScreen = document.getElementById("winningScreen");
  winningScreen.classList.add("d-none");
  IntervalHub.stopAllIntervals();
}
//#endregion

//#region FULLSCREEN

function goFullscreen() {
  const fullScreenBtn = document.getElementById("fullScreenBtn");
  const container = document.querySelector(".canvas-container");
  const gameState = document.getElementById("loosingScreen");
  const winningState = document.getElementById("winningScreen");
  if (!document.fullscreenElement) {
    container.requestFullscreen();
    gameState.classList.add("loosing-screen-fullscreen");
    winningState.classList.add("winning-screen-fullscreen");
  } else {
    document.exitFullscreen();
    gameState.classList.remove("loosing-screen-fullscreen");
    winningState.classList.remove("winning-screen-fullscreen");
  }
  fullScreenBtn.blur();
}
//#endregion
