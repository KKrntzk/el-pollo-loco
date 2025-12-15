class Cloud extends MovableObject {
  width = 700;
  height = 300;
  y = 20;

  constructor() {
    super().loadImg("img_pollo_locco/img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.15;
    }, 1000 / 60);
  }
}
