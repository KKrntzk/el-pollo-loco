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

    const groundY = 390;

    IntervalHub.startInterval(() => {
      if (!this.targetHit) {
        this.x += 10;
      }
      if (this.y >= groundY && !this.targetHit) {
        this.y = groundY;
        this.startSplash();
      }
    }, 1000 / 60);
  }

  runAnimation() {
    IntervalHub.startInterval(() => {
      if (this.targetHit && !this.splashed) {
        this.playAnimation(this.imagesSplash);
        return;
      }

      if (!this.targetHit) {
        this.playAnimation(this.imagesRotation);
      }
    }, 1000 / 10);
  }

  startSplash() {
    this.targetHit = true;
    const splashDuration = (this.imagesSplash.length * 1000) / 20;
    setTimeout(() => {
      this.splashed = true;
    }, splashDuration);
  }
}
