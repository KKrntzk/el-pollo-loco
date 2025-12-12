class MovableObject {
  x = 120;
  y = 250;
  img;
  height = 100;
  width = 100;

  loadImg(path) {
    this.image = new Image();
    this.image.src = path;
  }

  moveRight() {
    console.log("moving right");
  }

  moveLeft() {}
}
