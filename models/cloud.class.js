class Cloud extends MovableObject {
  width = 700;
  height = 300;
  y = 20;
  randomImg;

  constructor() {
    super();
    this.getRandomImg();
    if (this.randomImg === 0) {
      this.loadImg("img_pollo_locco/img/5_background/layers/4_clouds/1.png");
    } else {
      this.loadImg("img_pollo_locco/img/5_background/layers/4_clouds/2.png");
    }
    this.x = Math.random() * 3500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  getRandomImg() {
    this.randomImg = Math.floor(Math.random() * 2);
  }
}
