class MovableObject {
  x = 120;
  y = 330;
  img;
  width = 100;
  height = 100;

  loadImg(path) {
    this.image = new Image();
    this.image.src = path;
  }

  moveRight() {
    console.log("moving right");
  }

  moveLeft() {}
}
