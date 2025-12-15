class Character extends MovableObject {
  height = 300;
  y = 135;
  imagesWalking = ImageHub.character.walking;
  world;
  speed = 10;

  //  ImageHub.character.walking;

  constructor() {
    super().loadImg("img_pollo_locco/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
    }, 1000 / 60);
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.imagesWalking.length;
        let path = this.imagesWalking[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 50);
  }

  jump() {}
}
