class Bottles extends DrawableObject {
  height = 70;
  width = 70;
  images = [ImageHub.bottle.onGround];

  offset = {
    top: 15,
    right: 15,
    bottom: 5,
    left: 28,
  };

  constructor() {
    super().loadImg(
      "img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"
    );
    this.loadImages(this.images);
    this.x = 200 + Math.random() * 1500;
    this.y = 350 + Math.random() * 10;
  }
}
