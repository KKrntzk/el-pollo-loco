class Coins extends DrawableObject {
  height = 100;
  width = 100;
  images = ImageHub.coin.coin;

  offset = {
    top: 35,
    right: 35,
    bottom: 35,
    left: 35,
  };

  constructor() {
    super().loadImg("img_pollo_locco/img/8_coin/coin_1.png");
    this.loadImages(this.images);
    this.x = 200 + Math.random() * 1500;
    this.y = 150 + Math.random() * 100;
    this.collected = false;
    this.animateCoin();
  }

  animateCoin() {
    setInterval(() => {
      let i = this.currentImage % this.images.length;
      let path = this.images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 300);
  }
}
