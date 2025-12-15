class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 60;

  imagesWalking = ImageHub.endboss.alert;
  constructor() {
    super().loadImg("img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.imagesWalking);
    this.x = 2000;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.imagesWalking);
    }, 170);
  }
}
