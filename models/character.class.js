class Character extends MovableObject {
  height = 300;
  y = 135;
  imagesWalking = ImageHub.character.walking;

  //  ImageHub.character.walking;

  constructor() {
    super().loadImg("img_pollo_locco/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.imagesWalking.length;
      let path = this.imagesWalking[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 150);
  }

  jump() {}
}
