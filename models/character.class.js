class Character extends MovableObject {
  height = 300;
  y = 25;
  imagesWalking = ImageHub.character.walking;
  imagesJumping = ImageHub.character.jumping;
  imagesHurt = ImageHub.character.hurt;
  imagesDead = ImageHub.character.dead;
  imagesIdle = ImageHub.character.idle;
  imagesSleep = ImageHub.character.sleep;
  world;
  speed = 10;

  offset = {
    top: 130,
    right: 20,
    bottom: 10,
    left: 30,
  };

  constructor() {
    super().loadImg("img_pollo_locco/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesJumping);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesSleep);
    this.applyGravity();
    this.animate();
  }

  animate() {
    IntervalHub.startInterval(this.checkMovement, 1000 / 60);
    IntervalHub.startInterval(this.animateMovement, 200);
    IntervalHub.startInterval(this.animateJump, 200);
  }

  checkMovement = () => {
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
  };

  animateMovement = () => {
    if (this.isDead()) {
      this.playAnimation(this.imagesDead);
    } else if (this.isHurt()) {
      this.playAnimation(this.imagesHurt);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.imagesWalking);
    } else if (this.isSleeping()) {
      this.playAnimation(this.imagesSleep);
    } else {
      this.playAnimation(this.imagesIdle);
    }
  };

  animateJump = () => {
    if (this.isAboveGround() && !this.isDead()) {
      this.playAnimation(this.imagesJumping);
    }
  };

  useBottle() {
    this.bottleCount--;
    this.world.statusbarBottle.setPercentage(this.bottleCount * 10);
    this.lastMove = Date.now();
  }
}
