let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let startImage = new Image();
let isMuted = false;
let isFullscreen = false;
const lvl1 = level1;

/**
 * Creates Level 1 with all enemies, objects, backgrounds, coins, and bottles.
 * @returns {Level} The created level object.
 */
function createLevel1() {
  return new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicks(),
      new Chicks(),
      new Chicks(),
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

/**
 * Initializes the canvas and draws the start image.
 */
window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  startImage.onload = function () {
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
  };
};

document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

/**
 * Handles the transition to and from fullscreen mode.
 */
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

/**
 * Initializes the game by creating the level and world.
 */
function init() {
  const level = createLevel1();
  world = new World(canvas, keyboard, level);
}

/**
 * Hides the start button.
 */
function hideStartButton() {
  document.getElementById("startBtn")?.classList.add("d-none");
}

/**
 * Shows all game controls.
 */
function showGameControls() {
  showDesktopButtons();
  updateMobileControlsVisibility();
}

/**
 * Shows desktop control buttons.
 */
function showDesktopButtons() {
  document.getElementById("muteBtn").classList.remove("d-none");
  document.getElementById("restartBtn").classList.remove("d-none");
  document.getElementById("homeBtn").classList.remove("d-none");
  document.getElementById("fullScreenBtn").classList.remove("d-none");
  document.getElementById("toggleControlsBtn").classList.remove("d-none");
}

/**
 * Shows or hides mobile controls based on saved settings.
 */
function updateMobileControlsVisibility() {
  const controls = document.querySelector(".mobile-controls");
  const saved = getBoolean("showControls");
  if (isMobileDevice()) {
    if (saved) {
      controls.classList.remove("d-none");
      buttonsActive = true;
    } else {
      controls.classList.add("d-none");
      buttonsActive = false;
    }
  } else {
    if (saved) {
      controls.classList.remove("d-none");
      buttonsActive = true;
    } else {
      controls.classList.add("d-none");
      buttonsActive = false;
    }
  }
}

/**
 * Clears the canvas.
 */
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Starts the background music.
 */
function startBackgroundMusic() {
  AudioHub.backgroundMusic.loop = true;
  AudioHub.backgroundMusic.volume = 0.1;
  AudioHub.backgroundMusic.play();
}

/**
 * Initializes the mute button based on saved settings.
 */
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

/**
 * Starts the game: hides start button, clears canvas, initializes world and music.
 */
function startGame() {
  hideStartButton();
  clearCanvas();
  init();
  startBackgroundMusic();
  showGameControls();
  initializeMuteButton();
}

/**
 * Restarts the game: resets variables, stops all intervals and audio, re-initializes world.
 */
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

/**
 * Opens the instructions dialog.
 */
function openDialog() {
  document.getElementById("instructionDialog").showModal();
}

/**
 * Closes the instructions dialog.
 */
function closeDialog() {
  document.getElementById("instructionDialog").close();
}

/**
 * Opens the impressum dialog.
 */
function openImpressum() {
  document.getElementById("impressumDialog").showModal();
}

/**
 * Closes the impressum dialog.
 */
function closeDialogImpressum() {
  document.getElementById("impressumDialog").close();
}

let buttonsActive = false;

/**
 * Handles keydown events for controlling the keyboard.
 * @param {KeyboardEvent} e - The keydown event object.
 */
window.addEventListener("keydown", (e) => {
  if (buttonsActive) return;
  if (e.keyCode == 39) keyboard.RIGHT = true;
  if (e.keyCode == 37) keyboard.LEFT = true;
  if (e.keyCode == 38) keyboard.UP = true;
  if (e.keyCode == 40) keyboard.DOWN = true;
  if (e.keyCode == 32) keyboard.SPACE = true;
  if (e.keyCode == 68) keyboard.D = true;
});

/**
 * Handles keyup events for controlling the keyboard.
 * @param {KeyboardEvent} e - The keyup event object.
 */
window.addEventListener("keyup", (e) => {
  if (buttonsActive) return;
  if (e.keyCode == 39) keyboard.RIGHT = false;
  if (e.keyCode == 37) keyboard.LEFT = false;
  if (e.keyCode == 38) keyboard.UP = false;
  if (e.keyCode == 40) keyboard.DOWN = false;
  if (e.keyCode == 32) keyboard.SPACE = false;
  if (e.keyCode == 68) keyboard.D = false;
});

/**
 * Binds mobile control buttons to keyboard actions.
 */
function bindMobileControls() {
  const map = {
    btnRight: "RIGHT",
    btnLeft: "LEFT",
    btnJump: "SPACE",
    btnThrow: "D",
  };
  Object.entries(map).forEach(([id, key]) => bindButton(id, key));
}

/**
 * Adds start and end event listeners to a button.
 * @param {HTMLElement} btn - The button element.
 * @param {Function} startHandler - Function to run on start events (touchstart, mousedown).
 * @param {Function} endHandler - Function to run on end events (touchend, mouseup, touchcancel, mouseleave).
 */
function addButtonListeners(btn, startHandler, endHandler) {
  ["touchstart", "mousedown"].forEach((evt) =>
    btn.addEventListener(evt, startHandler)
  );
  ["touchend", "mouseup", "touchcancel", "mouseleave"].forEach((evt) =>
    btn.addEventListener(evt, endHandler)
  );
}

/**
 * Binds a button element to a keyboard key for mobile controls.
 * @param {string} id - The button element ID.
 * @param {string} key - The keyboard key to bind (e.g., "RIGHT", "SPACE").
 */
function bindButton(id, key) {
  const btn = document.getElementById(id);
  if (!btn) return;
  const startHandler = (e) => {
    if (e.cancelable) e.preventDefault();
    keyboard[key] = true;
    btn.classList.add("active");
  };
  const endHandler = (e) => {
    if (e.cancelable) e.preventDefault();
    keyboard[key] = false;
    btn.classList.remove("active");
  };
  addButtonListeners(btn, startHandler, endHandler);
}

/**
 * Initializes mobile controls and hides them on load.
 */
window.addEventListener("DOMContentLoaded", () => {
  const controls = document.querySelector(".mobile-controls");
  if (controls) controls.classList.add("d-none");
  bindMobileControls();
  buttonsActive = false;
});

/**
 * Toggles the visibility of mobile controls.
 */
function toggleMobileControls() {
  const contrlBtn = document.getElementById("toggleControlsBtn");
  const controls = document.querySelector(".mobile-controls");
  controls.classList.toggle("d-none");
  buttonsActive = !controls.classList.contains("d-none");
  if (!isMobileDevice()) saveBoolean("showControls", buttonsActive);
  contrlBtn.blur();
}

/**
 * Checks if the device is a mobile device.
 * @returns {boolean} True if the device is mobile.
 */
function isMobileDevice() {
  return window.matchMedia("(pointer: coarse)").matches;
}

/**
 * Hides mobile controls and deactivates buttons.
 */
function hideMobileControls() {
  const controls = document.querySelector(".mobile-controls");
  if (controls) controls.classList.add("d-none");
  buttonsActive = false;
}

/**
 * Shows the device lock screen for portrait mode on mobile.
 */
function showLockScreen() {
  const lock = document.querySelector(".device-lock");
  if (lock) lock.classList.add("show");
  buttonsActive = false;
  keyboard = new Keyboard();
  hideMobileControls();
}

/**
 * Shows mobile controls if the user has enabled them.
 */
function showMobileControlsIfNeeded() {
  const lock = document.querySelector(".device-lock");
  const mobileControls = document.querySelector(".mobile-controls");
  if (!lock || !mobileControls) return;
  lock.classList.remove("show");
  if (getBoolean("showControls")) {
    mobileControls.classList.remove("d-none");
    buttonsActive = true;
  } else {
    buttonsActive = false;
  }
}

/**
 * Checks device orientation and adjusts mobile controls and lock screen accordingly.
 */
function checkDeviceOrientation() {
  const lock = document.querySelector(".device-lock");
  if (!lock) return;
  if (!world) {
    hideMobileControls();
    return;
  }
  if (isMobileDevice() && window.innerHeight > window.innerWidth) {
    showLockScreen();
  } else {
    showMobileControlsIfNeeded();
  }
}

window.addEventListener("resize", checkDeviceOrientation);
window.addEventListener("orientationchange", checkDeviceOrientation);
window.addEventListener("DOMContentLoaded", checkDeviceOrientation);

/**
 * Toggles the mute state of the game.
 */
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

/**
 * Saves a boolean value in localStorage.
 * @param {string} key - The key to store the value under.
 * @param {boolean} value - The boolean value to save.
 */
function saveBoolean(key, value) {
  if (typeof value === "boolean")
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves a boolean value from localStorage.
 * @param {string} key - The key to retrieve the value from.
 * @returns {boolean|null} The stored boolean value, or null if not found.
 */
function getBoolean(key) {
  const raw = localStorage.getItem(key);
  return raw === null ? null : JSON.parse(raw);
}

/**
 * Navigates to the home page.
 */
function goHome() {
  window.location.href = "index.html";
}

/**
 * Shows the losing screen and stops all intervals after a delay.
 */
function showLosingScreen() {
  document.getElementById("loosingScreen").classList.remove("d-none");
  setTimeout(() => {
    IntervalHub.stopAllIntervals();
  }, 1000);
}

/**
 * Hides the losing screen.
 */
function hideLosingScreen() {
  document.getElementById("loosingScreen").classList.add("d-none");
}

/**
 * Shows the winning screen and stops all intervals after a delay.
 */
function showWinningScreen() {
  document.getElementById("winningScreen").classList.remove("d-none");
  setTimeout(() => {
    IntervalHub.stopAllIntervals();
  }, 1000);
}

/**
 * Hides the winning screen and stops all intervals.
 */
function hideWinningScreen() {
  document.getElementById("winningScreen").classList.add("d-none");
  IntervalHub.stopAllIntervals();
}

/**
 * Toggles fullscreen mode for the game canvas.
 */
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
