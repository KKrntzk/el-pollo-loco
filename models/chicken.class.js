class Chicken extends MovableObject {
  y = 370;
  height = 60;
  width = 60;
  imagesWalking = ImageHub.chicken.walking;
  constructor() {
    super().loadImg(
      "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.imagesWalking);
    this.x = 200 + Math.random() * 500;
    this.animate();
    this.speed = 0.15 + Math.random() * 0.5;
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      let i = this.currentImage % this.imagesWalking.length;
      let path = this.imagesWalking[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 170);
  }
}
