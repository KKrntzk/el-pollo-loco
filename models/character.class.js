class Character extends MovableObject {
  height = 300;
  y = 30;
  imagesWalking = ImageHub.character.walking;
  imagesJumping = ImageHub.character.jumping;
  imagesHurt = ImageHub.character.hurt;
  imagesDead = ImageHub.character.dead;
  imagesIdle = ImageHub.character.idle;
  world;
  speed = 10;

  offset = {
    top: 130,
    right: 20,
    bottom: 10,
    left: 30,
  };
  //  ImageHub.character.walking;

  constructor() {
    super().loadImg("img_pollo_locco/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesJumping);
    this.loadImages(this.imagesDead);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.imagesDead);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.imagesJumping);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.imagesWalking);
        }
      }
    }, 50);
  }
}

//   animate(){
//   IntervalHub.startInterval(this.checkMovement, 1000 / 60);
//   IntervalHub.startInterval(this.animateMovement, 1000 / 60);
//   }

// checkMovement = () => {
//   if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
//     this.moveRight();
//     this.otherDirection = false;
//   }

//   if (this.world.keyboard.LEFT && this.x > 0) {
//     this.moveLeft();
//     this.otherDirection = true;
//   }

//   if (this.world.keyboard.SPACE && !this.isAboveGround()) {
//     this.jump();
//   }

//   this.world.camera_x = -this.x + 100;
// };
// animateMovement = () => {
//   if (this.isAboveGround()) {
//     this.playAnimation(this.imagesJumping);
//   } else {
//     if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
//       this.playAnimation(this.imagesWalking);
//     }
//   }
// };
