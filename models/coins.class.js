class Coins extends DrawableObject {
  height = 50;
  width = 50;
  images = ImageHub.coin.coin;

  //   offset = {
  //     top: 10,
  //     right: 10,
  //     bottom: 10,
  //     left: 10,
  //   };

  constructor() {
    super().loadImg("img_pollo_locco/img/8_coin/coin_1.png");
    this.loadImages(this.images);
    this.x = 150 + Math.random() * 2000;
    this.y = 70 + Math.random() * 70;
    // this.animateCoin();
  }

  //   animateCoin() {
  //     setInterval(() => {
  //       let i = this.currentImage % this.images.length;
  //       let path = this.images[i];
  //       this.img = this.imageCache[path];
  //       this.currentImage++;
  //     }, 300);
  //   }
}
