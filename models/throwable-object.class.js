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

    this.offset = {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5,
    };
    this.runThrowAnimation();
  }

  runThrowAnimation() {
    this.speedY = 30;
    this.applyGravity();
    IntervalHub.startInterval(this.throw, 1000 / 20);
  }

  throw = () => {
    this.x += 10;
    this.playAnimation(this.imagesRotation);
    this.getRealFrame();
  };
}
