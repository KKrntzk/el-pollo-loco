class CollectableObject extends DrawableObject {
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
    this.x = 150 + Math.random() * 2000;
    this.y = 70 + Math.random() * 70;
  }
}
