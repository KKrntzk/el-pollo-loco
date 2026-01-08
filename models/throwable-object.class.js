class ThrowableObject extends MovableObject {
  //#region Properties
  imagesRotation = ImageHub.bottle.rotation;
  imagesSplash = ImageHub.bottle.splash;

  speedY;
  acceleration = 4;
  throwGroundY = 390;

  targetHit = false;
  splashed = false;

  offset = {top: 5, right: 5, bottom: 5, left: 5};
  //#endregion

  //#region Constructor
  constructor(x, y, direction) {
    super().loadImg(
      "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.imagesRotation);
    this.loadImages(this.imagesSplash);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 40;

    this.direction = direction;
    this.otherDirection = direction === -1;

    this.runThrow();
    this.runAnimation();
  }
  //#endregion

  //#region Throw / Movement
  runThrow() {
    this.speedY = 25;
    this.applyGravity();
    IntervalHub.startInterval(this.updateThrowState, 1000 / 60);
  }

  updateThrowState = () => {
    this.updateThrowPosition();
    this.checkGroundCollision(this.throwGroundY);
  };

  updateThrowPosition() {
    if (!this.targetHit) {
      this.x += 10 * this.direction;
    }
    // if (!this.targetHit) this.x += 10;
  }

  checkGroundCollision(groundY) {
    if (this.y >= groundY && !this.targetHit) this.startSplash();
  }
  //#endregion

  //#region Animation
  runAnimation() {
    IntervalHub.startInterval(this.updateAnimation, 1000 / 10);
  }

  updateAnimation = () => {
    if (this.shouldPlaySplash()) {
      this.playSplashAnimation();
      return;
    }
    if (this.shouldPlayRotation()) this.playRotationAnimation();
  };

  shouldPlaySplash() {
    return this.targetHit && !this.splashed;
  }

  playSplashAnimation() {
    this.playAnimation(this.imagesSplash);
  }

  shouldPlayRotation() {
    return !this.targetHit;
  }

  playRotationAnimation() {
    this.playAnimation(this.imagesRotation);
  }
  //#endregion

  //#region Splash / Hit
  startSplash() {
    this.markTargetHit();
    this.playSplashSound();
    this.scheduleSplashComplete();
  }

  markTargetHit() {
    this.targetHit = true;
  }

  playSplashSound() {
    AudioHub.playOne(AudioHub.bottleBreak);
  }

  scheduleSplashComplete() {
    const splashDuration = (this.imagesSplash.length * 1000) / 20;
    setTimeout(() => {
      this.splashed = true;
      this.removeFromWorld();
    }, splashDuration);
  }
  //#endregion

  //#region Helpers
  removeFromWorld() {
    if (this.world) {
      this.world.throwabelObjects = this.world.throwabelObjects.filter(
        (b) => b !== this
      );
    }
  }
  //#endregion
}
