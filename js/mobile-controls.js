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
 * Binds a button element to a keyboard key for mobile controls.
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
  const mobileControls = document.querySelector(".mobile-controls");
  if (!lock) return;

  const isPortraitMobile =
    isMobileDevice() && window.innerHeight > window.innerWidth;

  if (isPortraitMobile) {
    lock.classList.add("show");
    keyboard = new Keyboard();
    if (mobileControls) mobileControls.classList.add("d-none");
    buttonsActive = false;
  } else {
    lock.classList.remove("show");

    if (world && getBoolean("showControls")) {
      mobileControls?.classList.remove("d-none");
      buttonsActive = true;
    } else {
      mobileControls?.classList.add("d-none");
      buttonsActive = false;
    }
  }
}

window.addEventListener("resize", checkDeviceOrientation);
window.addEventListener("orientationchange", checkDeviceOrientation);
window.addEventListener("DOMContentLoaded", checkDeviceOrientation);

/**
 * Saves a boolean value in localStorage.
 */
function saveBoolean(key, value) {
  if (typeof value === "boolean")
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves a boolean value from localStorage.
 */
function getBoolean(key) {
  const raw = localStorage.getItem(key);
  return raw === null ? null : JSON.parse(raw);
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
