class Character extends MovableObject {
  //#region Properties / Attributes
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
  //#endregion

  //#region Constructor
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
  //#endregion

  //#region Animation & Interval Setup
  animate() {
    IntervalHub.startInterval(this.checkMovement, 1000 / 60);
    IntervalHub.startInterval(this.animateMovement, 200);
    IntervalHub.startInterval(this.animateJump, 200);
  }

  animateMovement = () => {
    if (this.isDead()) this.handleDeadAnimation();
    else if (this.isHurt()) this.handleHurtAnimation();
    else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
      this.handleRunningAnimation();
    else if (this.isSleeping()) this.handleSleepingAnimation();
    else this.handleIdleAnimation();
  };

  handleDeadAnimation() {
    this.playAnimation(this.imagesDead);
    this.playSoundOnce(AudioHub.characterDead);
    this.stopSnoring();
    showLosingScreen();
  }

  handleHurtAnimation() {
    this.playAnimation(this.imagesHurt);
    this.stopSnoring();
  }

  handleRunningAnimation() {
    this.playAnimation(this.imagesWalking);
  }

  handleSleepingAnimation() {
    this.playAnimation(this.imagesSleep);
    this.startSnoring();
  }

  handleIdleAnimation() {
    this.playAnimation(this.imagesIdle);
    this.stopSnoring();
  }

  animateJump = () => {
    if (this.isAboveGround() && !this.isDead()) {
      this.playAnimation(this.imagesJumping);
    }
  };
  //#endregion

  //#region Movement & Input
  checkMovement = () => {
    this.handleRunningSound();
    this.handleHorizontalMovement();
    this.handleJump();
    this.updateCamera();
  };

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

  handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      AudioHub.playOne(AudioHub.characterJump);
    }
  }

  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }
  //#endregion

  //#region Sound Control
  startSnoring() {
    if (!this.isSnoring) {
      AudioHub.characterSnoring.loop = true;
      AudioHub.playOne(AudioHub.characterSnoring);
      this.isSnoring = true;
    }
  }

  stopSnoring() {
    if (this.isSnoring) {
      AudioHub.stopOne(AudioHub.characterSnoring);
      this.isSnoring = false;
    }
  }

  playSoundOnce(sound) {
    if (this.currentSound !== sound) {
      if (this.currentSound) {
        AudioHub.stopOne(this.currentSound);
      }
      AudioHub.playOne(sound);
      this.currentSound = sound;
    }
  }
  //#endregion

  //#region Bottle Usage
  useBottle() {
    this.bottleCount--;
    this.world.statusbarBottle.setPercentage(this.bottleCount * 10);
    this.lastMove = Date.now();
  }
  //#endregion
}
