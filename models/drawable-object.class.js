class DrawableObject {
  x = 120;
  y = 330;
  width = 120;
  height = 50;
  img;
  imageCache = [];
  currentImage = 0;

  offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  realX;
  realY;
  realWidth;
  realHeight;

  constructor() {
    IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
  }

  getRealFrame = () => {
    this.realX = this.x + this.offset.left;
    this.realY = this.y + this.offset.top;
    this.realWidth = this.width - this.offset.left - this.offset.right;
    this.realHeight = this.height - this.offset.top - this.offset.bottom;
  };

  isColliding(mo) {
    return (
      this.realX + this.realWidth > mo.realX &&
      this.realY + this.realHeight > mo.realY &&
      this.realX < mo.realX + mo.realWidth &&
      this.realY < mo.realY + mo.realHeight
    );
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
    if (
      // this instanceof Coins
      // this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Chicks ||
      this instanceof Endboss ||
      this instanceof ThrowableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.realX, this.realY, this.realWidth, this.realHeight);
      ctx.stroke();
    }
  }
}
