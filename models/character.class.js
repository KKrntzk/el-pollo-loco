class Character extends MovableObject {
  height = 300;
  y = 25;
  speed = 10;
  world;
  currentSound = null;
  isRunningSoundPlaying = false;
  isSnoring = false;

  bottleCount = 0;
  lastMove = Date.now();

  offset = {
    top: 130,
    right: 20,
    bottom: 10,
    left: 30,
  };

  imagesWalking = ImageHub.character.walking;
  imagesJumping = ImageHub.character.jumping;
  imagesHurt = ImageHub.character.hurt;
  imagesDead = ImageHub.character.dead;
  imagesIdle = ImageHub.character.idle;
  imagesSleep = ImageHub.character.sleep;

  constructor() {
    super().loadImg("img_pollo_locco/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesJumping);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesSleep);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts all intervals for animation updates.
   */
  animate() {
    IntervalHub.startInterval(this.checkMovement, 1000 / 60);
    IntervalHub.startInterval(this.animateMovement, 200);
    IntervalHub.startInterval(this.animateJump, 200);
  }

  /**
   * Updates character animation based on state (running, hurt, dead, idle, sleeping).
   */
  animateMovement = () => {
    if (this.isDead()) this.handleDeadAnimation();
    else if (this.isHurt()) this.handleHurtAnimation();
    else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
      this.handleRunningAnimation();
    else if (this.isSleeping()) this.handleSleepingAnimation();
    else this.handleIdleAnimation();
  };

  /**
   * Handles dead animation and triggers losing screen.
   */
  handleDeadAnimation() {
    this.playAnimation(this.imagesDead);
    this.playSoundOnce(AudioHub.characterDead);
    this.stopSnoring();
    showLosingScreen();
  }

  /** Plays hurt animation and stops snoring. */
  handleHurtAnimation() {
    this.playAnimation(this.imagesHurt);
    this.stopSnoring();
  }

  /** Plays running animation. */
  handleRunningAnimation() {
    this.playAnimation(this.imagesWalking);
  }

  /** Plays sleeping animation and starts snoring. */
  handleSleepingAnimation() {
    this.playAnimation(this.imagesSleep);
    this.startSnoring();
  }

  /** Plays idle animation and stops snoring. */
  handleIdleAnimation() {
    this.playAnimation(this.imagesIdle);
    this.stopSnoring();
  }

  /** Plays jump animation if character is above ground and not dead. */
  animateJump = () => {
    if (this.isAboveGround() && !this.isDead()) {
      this.playAnimation(this.imagesJumping);
    }
  };

  /**
   * Checks keyboard input and updates movement, jump, and camera position.
   */
  checkMovement = () => {
    this.handleRunningSound();
    this.handleHorizontalMovement();
    this.handleJump();
    this.updateCamera();
  };

  /** Plays or stops running sound based on movement keys. */
  handleRunningSound() {
    const isRunningKey = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;

    if (isRunningKey && !this.isRunningSoundPlaying) {
      AudioHub.playOne(AudioHub.characterRun);
      this.isRunningSoundPlaying = true;
    } else if (!isRunningKey && this.isRunningSoundPlaying) {
      AudioHub.stopOne(AudioHub.characterRun);
      this.isRunningSoundPlaying = false;
    }
  }

  /** Moves the character horizontally based on keyboard input. */
  handleHorizontalMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
    }

    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /** Initiates a jump if the SPACE key is pressed and character is on the ground. */
  handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      AudioHub.playOne(AudioHub.characterJump);
    }
  }

  /** Updates camera position to follow the character. */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  /** Starts looping snoring sound if character is sleeping. */
  startSnoring() {
    if (!this.isSnoring) {
      AudioHub.characterSnoring.loop = true;
      AudioHub.playOne(AudioHub.characterSnoring);
      this.isSnoring = true;
    }
  }

  /** Stops snoring sound if it is playing. */
  stopSnoring() {
    if (this.isSnoring) {
      AudioHub.stopOne(AudioHub.characterSnoring);
      this.isSnoring = false;
    }
  }

  /**
   * Plays a sound once, stopping any previously playing sound.
   * @param {HTMLAudioElement} sound - The sound to play.
   */
  playSoundOnce(sound) {
    if (this.currentSound !== sound) {
      if (this.currentSound) {
        AudioHub.stopOne(this.currentSound);
      }
      AudioHub.playOne(sound);
      this.currentSound = sound;
    }
  }

  /** Uses a bottle, decreases bottle count, and updates the status bar. */
  useBottle() {
    this.bottleCount--;
    this.world.statusbarBottle.setPercentage(this.bottleCount * 10);
    this.lastMove = Date.now();
  }
}
