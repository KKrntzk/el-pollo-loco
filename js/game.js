let canvas;
let world;
let keyboard = new Keyboard();
let startImage = new Image();
startImage.src = "img_pollo_locco/img/canvas_overlay/overlay.png";

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  startImage.onload = function () {
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
  };
};

function startGame() {
  const btn = document.getElementById("startBtn");
  btn.style.display = "none";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  init();

  AudioHub.backgroundMusic.loop = true;
  AudioHub.backgroundMusic.volume = 0.1;
  AudioHub.backgroundMusic.play();
}

function init() {
  world = new World(canvas, keyboard);
}

function openDialog() {
  const dialogRef = document.getElementById("instructionDialog");
  dialogRef.showModal();
}

function closeDialog() {
  const dialogRef = document.getElementById("instructionDialog");
  dialogRef.close();
}

function openImpressum() {
  const dialogRef = document.getElementById("impressumDialog");
  dialogRef.showModal();
}

function closeDialogImpressum() {
  const dialogRef = document.getElementById("impressumDialog");
  dialogRef.close();
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
