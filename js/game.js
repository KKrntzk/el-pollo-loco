// =======================
// GLOBAL VARIABLES
// =======================
let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let startImage = new Image();
let isMuted = false;

const lvl1 = level1;

let isFullscreen = false;

// =======================
// WINDOW ONLOAD
// =======================
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

// =======================
// GAME INITIALIZATION
// =======================
function init() {
  world = new World(canvas, keyboard, lvl1);
}

function startGame() {
  const btn = document.getElementById("startBtn");
  btn.classList.add("d-none");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  init();

  AudioHub.backgroundMusic.loop = true;
  AudioHub.backgroundMusic.volume = 0.1;
  AudioHub.backgroundMusic.play();

  document.getElementById("muteBtn").classList.remove("d-none");
  const savedMute = getBoolean("isMuted");
  if (savedMute !== null) {
    isMuted = savedMute;
  } else {
    isMuted = false; // Standardwert
  }

  // Mute anwenden
  if (isMuted) {
    AudioHub.mute();
    muteBtn.textContent = "🔇";
  } else {
    AudioHub.unmute();
    muteBtn.textContent = "🔊";
  }

  document.getElementById("restartBtn").classList.remove("d-none");
  document.getElementById("homeBtn").classList.remove("d-none");
  document.getElementById("fullScreenBtn").classList.remove("d-none");
}

// =======================
// DIALOG FUNCTIONS
// =======================
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

// =======================
// KEYBOARD EVENT LISTENERS
// =======================
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) keyboard.RIGHT = true;
  if (e.keyCode == 37) keyboard.LEFT = true;
  if (e.keyCode == 38) keyboard.UP = true;
  if (e.keyCode == 40) keyboard.DOWN = true;
  if (e.keyCode == 32) keyboard.SPACE = true;
  if (e.keyCode == 68) keyboard.D = true;
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) keyboard.RIGHT = false;
  if (e.keyCode == 37) keyboard.LEFT = false;
  if (e.keyCode == 38) keyboard.UP = false;
  if (e.keyCode == 40) keyboard.DOWN = false;
  if (e.keyCode == 32) keyboard.SPACE = false;
  if (e.keyCode == 68) keyboard.D = false;
});

// =======================
// AUDIO CONTROLS
// =======================
function toggleMute() {
  const muteBtn = document.getElementById("muteBtn");
  isMuted = !isMuted;

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

// =======================
// LOCAL STORAGE
// =======================

function saveBoolean(key, value) {
  if (typeof value !== "boolean") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function getBoolean(key) {
  const raw = localStorage.getItem(key);
  if (raw === null) return null;
  return JSON.parse(raw);
}

function goHome() {
  window.location.href = "index.html";
}

function showLosingScreen() {
  const losingScreen = document.getElementById("loosingScreen");
  losingScreen.classList.remove("d-none");
}

function hideLosingScreen() {
  const losingScreen = document.getElementById("loosingScreen");
  losingScreen.classList.add("d-none");
}

function showWinningScreen() {
  const winningScreen = document.getElementById("winningScreen");
  winningScreen.classList.remove("d-none");
}

function hideWinningScreen() {
  const winningScreen = document.getElementById("winningScreen");
  winningScreen.classList.add("d-none");
}

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
