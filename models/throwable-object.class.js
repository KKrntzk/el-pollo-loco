class ThrowableObject extends MovableObject {
  imagesRotation = ImageHub.bottle.rotation;
  imagesSplash = ImageHub.bottle.splash;

  constructor(x, y) {
    super().loadImg(
      "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.imagesRotation);
    this.loadImages(this.imagesSplash);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 40;

    this.acceleration = 4;

    this.targetHit = false;
    this.splashed = false;

    this.offset = {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5,
    };
    this.runThrow();
    this.runAnimation();
  }

  runThrow() {
    this.speedY = 25;
    this.applyGravity();
    this.throwGroundY = 390;

    IntervalHub.startInterval(this.updateThrowState, 1000 / 60);
  }

  updateThrowState = () => {
    this.updateThrowPosition();
    this.checkGroundCollision(this.throwGroundY);
  };

  updateThrowPosition() {
    if (!this.targetHit) {
      this.x += 10;
    }
  }

  checkGroundCollision(groundY) {
    if (this.y >= groundY && !this.targetHit) {
      this.y = groundY;
      this.startSplash();
    }
  }

  runAnimation() {
    IntervalHub.startInterval(this.updateAnimation, 1000 / 10);
  }

  updateAnimation = () => {
    if (this.shouldPlaySplash()) {
      this.playSplashAnimation();
      return;
    }

    if (this.shouldPlayRotation()) {
      this.playRotationAnimation();
    }
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

  removeFromWorld() {
    if (this.world) {
      this.world.throwabelObjects = this.world.throwabelObjects.filter(
        (b) => b !== this
      );
    }
  }
}
