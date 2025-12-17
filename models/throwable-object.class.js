class ThrowableObject extends MovableObject {
  constructor() {
    super().loadImg(
      "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.x = 100;
    this.y = 100;
    this.height = 100;
    this.width = 70;
  }

  throw() {}
}
