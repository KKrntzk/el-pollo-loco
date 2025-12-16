class MovableObject {
  x = 120;
  y = 330;
  img;
  width = 120;
  height = 50;
  imageCache = [];
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

  real_x;
  real_y;
  real_width;
  real_height;

  offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  getRealFrame() {
    this.real_x = this.x + this.offset.left;
    this.real_y = this.y + this.offset.top;
    this.real_width = this.width - this.offset.left - this.offset.right;
    this.real_height = this.height - this.offset.top - this.offset.bottom;
  }

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  isColliding(mo) {
    return (
      this.real_x + this.real_width > mo.real_x &&
      this.real_y + this.real_height > mo.real_y &&
      this.real_x < mo.real_x &&
      this.real_y < mo.real_y + mo.real_height
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
