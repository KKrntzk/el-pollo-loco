class Chicks extends MovableObject {
  y = 390;
  height = 30;
  width = 30;
  imagesWalking = ImageHub.chicks.walking;

  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };

  constructor() {
    super().loadImg(
      "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png"
    );
    this.loadImages(this.imagesWalking);
    this.x = 200 + Math.random() * 500;
    this.animate();
    this.speed = 0.35 + Math.random() * 0.9;
    this.dead = false;
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.imagesWalking);
    }, 200);
  }
}
