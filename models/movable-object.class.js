class MovableObject extends DrawableObject {
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

  offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  isColliding(mo) {
    return (
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top
    );
  }

  playAnimation(images) {
    let i = this.currentImage % this.imagesWalking.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 130;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
