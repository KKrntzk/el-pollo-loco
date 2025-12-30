class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 60;

  imagesWalking = ImageHub.endboss.walking;
  imagesAlert = ImageHub.endboss.alert;
  imagesAttack = ImageHub.endboss.attack;
  imagesHurt = ImageHub.endboss.hurt;
  imagesDead = ImageHub.endboss.dead;

  constructor() {
    super().loadImg("img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesAlert);
    this.x = 2000;
    this.speed = 0.15 + Math.random() * 0.5;
    this.dead = false;
    this.isDying = false;
    this.isHurt = false;
    this.isActive = false;
    this.activationX = 1700;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isActive && !this.dead && !this.isDying) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isActive) {
        this.playAnimation(this.imagesAlert);
        return;
      }

      if (this.dead || this.isDying) {
        this.playAnimation(this.imagesDead);
        return;
      }

      if (this.isHurt) {
        this.playAnimation(this.imagesHurt);
        return;
      }

      this.playAnimation(this.imagesWalking);
    }, 170);
  }
}
