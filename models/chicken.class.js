class Chicken extends MovableObject {
  y = 360;
  height = 60;
  width = 60;
  imagesWalking = ImageHub.chicken.walking;
  imagesDead = ImageHub.chicken.dead;

  constructor() {
    super().loadImg(
      "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesDead);
    this.x = 500 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.dead = false;
    this.isDying = false;
  }

  animate() {
    IntervalHub.startInterval(this.animateChickenmovement, 1000 / 60);
    IntervalHub.startInterval(this.animateChickenDeath, 170);
  }

  animateChickenmovement = () => {
    if (!this.dead && !this.isDying) {
      this.moveLeft();
    }
  };

  animateChickenDeath = () => {
    if (this.dead) return;
    if (this.isDying) {
      this.playAnimation(this.imagesDead);
    } else {
      this.playAnimation(this.imagesWalking);
    }
  };
}
