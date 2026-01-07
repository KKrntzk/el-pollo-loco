class MovableObject extends DrawableObject {
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  bottleCount = 0;
  coinCount = 0;
  lastMove = Date.now();

  startEnemiesRun() {
    this.animate();
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  applyGravity() {
    setInterval(() => {
      if (this.splashed || this.targetHit) {
        return;
      }
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    }
    return this.y < 130;
  }

  hit() {
    this.energy -= 0.5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
    AudioHub.playOne(AudioHub.characterDamage);
  }

  hitBoss() {
    if (this.isHurt || this.dead) return;

    this.energy -= 20;
    if (this.energy < 0) this.energy = 0;

    this.isHurt = true;

    setTimeout(() => {
      this.isHurt = false;
    }, 400);
  }

  collect() {
    AudioHub.playOne(AudioHub.bottleCollectSound);
    this.bottleCount++;
    if (this.bottleCount >= 10) {
      this.bottleCount = 10;
    }
  }

  collectCoin() {
    AudioHub.playOne(AudioHub.coinCollectSound);
    this.coinCount++;
    if (this.coinCount >= 10) {
      this.coinCount = 10;
    }
  }

  isSleeping() {
    return Date.now() - this.lastMove > 10000;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
    this.lastMove = Date.now();
  }

  moveLeft() {
    this.x -= this.speed;
    this.lastMove = Date.now();
  }

  jump() {
    this.speedY = 30;
    this.lastMove = Date.now();
  }

  die() {
    if (this.dead || this.isDying) return;

    this.isDying = true;

    const sound =
      Math.random() < 0.5 ? AudioHub.chickenDead : AudioHub.chickenDead2;
    AudioHub.playOne(sound);

    setTimeout(() => {
      this.dead = true;
    }, 1000);
  }
}
