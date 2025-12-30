class Chicks extends MovableObject {
  y = 390;
  height = 30;
  width = 30;
  imagesWalking = ImageHub.chicks.walking;
  imagesDead = ImageHub.chicks.dead;

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
    this.loadImages(this.imagesDead);
    this.x = 200 + Math.random() * 500;
    this.speed = 0.35 + Math.random() * 0.9;
    this.dead = false;
    this.isDying = false;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.dead && !this.isDying) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.dead) return;

      if (this.isDying) {
        this.playAnimation(this.imagesDead);
      } else {
        this.playAnimation(this.imagesWalking);
      }
    }, 200);
  }
}
