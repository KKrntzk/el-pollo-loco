class ThrowableObject extends MovableObject {
  imagesRotation = ImageHub.bottle.rotation;

  constructor(x, y) {
    super().loadImg(
      "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.imagesRotation);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 40;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);

    setInterval(() => {
      this.playAnimation(this.imagesRotation);
    }, 1000 / 20);
  }
}
