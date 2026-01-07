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

// Set the start image source
startImage.src = "img_pollo_locco/img/canvas_overlay/overlay.png";

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

// =======================
// GAME INITIALIZATION
// =======================
function init() {
  world = new World(canvas, keyboard, lvl1);
}

function startGame() {
  // Hide start button
  const btn = document.getElementById("startBtn");
  btn.style.display = "none";

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Initialize the game world
  init();

  // Play background music
  AudioHub.backgroundMusic.loop = true;
  AudioHub.backgroundMusic.volume = 0.1;
  AudioHub.backgroundMusic.play();

  // Show UI buttons
  document.getElementById("muteBtn").classList.remove("d-none");
  document.getElementById("restartBtn").classList.remove("d-none");
  document.getElementById("homeBtn").classList.remove("d-none");
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

  muteBtn.blur();
}
