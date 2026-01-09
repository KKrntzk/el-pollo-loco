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
    this.x = 400 + Math.random() * 700;
    this.speed = 0.35 + Math.random() * 0.9;
    this.dead = false;
    this.isDying = false;
  }

  animate() {
    IntervalHub.startInterval(this.animateChicksmovement, 1000 / 60);
    IntervalHub.startInterval(this.animateChicksDeath, 200);
  }

  animateChicksmovement = () => {
    if (!this.dead && !this.isDying) {
      this.moveLeft();
    }
  };

  animateChicksDeath = () => {
    if (this.dead) return;
    if (this.isDying) {
      this.playAnimation(this.imagesDead);
    } else {
      this.playAnimation(this.imagesWalking);
    }
  };
}
