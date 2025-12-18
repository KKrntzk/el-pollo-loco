class Cloud extends MovableObject {
  width = 700;
  height = 300;
  y = 20;
  imagesClouds = ImageHub.background.clouds;

  constructor() {
    super().loadImg("img_pollo_locco/img/5_background/layers/4_clouds/1.png");
    this.loadImg("img_pollo_locco/img/5_background/layers/4_clouds/2.png");
    this.loadImages(this.imagesClouds);
    this.x = Math.random() * 2000;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
