class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 60;

  imagesWalking = ImageHub.endboss.walking;
  imagesAlert = ImageHub.endboss.alert;
  imagesAttack = ImageHub.endboss.attack;
  imagesHurt = ImageHub.endboss.hurt;
  imagesDead = ImageHub.endboss.dead;

  constructor() {
    super().loadImg("img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesAlert);
    this.loadImages(this.imagesAttack);
    this.x = 2000;
    this.speed = 0.15 + Math.random() * 0.5;
    this.attackSpeed = this.speed * 3;
    this.enrageSpeed = this.speed * 7;
    this.dead = false;
    this.isDying = false;
    this.isHurt = false;
    this.isActive = false;
    this.activationX = 1700;
    this.isAttacking = false;
    this.animate();
    this.deathSoundPlayed = false;
  }

  playIdleSound() {
    if (!this.idleSoundPlaying) {
      AudioHub.endbossIdle.loop = true;
      AudioHub.playOne(AudioHub.endbossIdle);
      this.idleSoundPlaying = true;
    }
  }

  stopIdleSound() {
    AudioHub.stopOne(AudioHub.endbossIdle);
    this.idleSoundPlaying = false;
  }

  playDeathSound() {
    AudioHub.playOne(AudioHub.endbossDeath);
  }

  startEndbossSound() {
    if (!this.endbossSoundPlaying) {
      AudioHub.endbossSound.loop = true;
      AudioHub.playOne(AudioHub.endbossSound);
      this.endbossSoundPlaying = true;
    }
  }

  animate() {
    setInterval(() => {
      if (this.isActive && !this.dead && !this.isDying && !this.isHurt) {
        if (this.energy < 40) {
          this.x -= this.enrageSpeed;
        } else if (this.isAttacking) {
          this.x -= this.attackSpeed;
        } else {
          this.moveLeft();
        }
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isActive) {
        this.playAnimation(this.imagesAlert);
        this.stopIdleSound();
        return;
      }

      this.startEndbossSound();

      if (this.dead || this.isDying) {
        this.playAnimation(this.imagesDead);
        AudioHub.stopOne(AudioHub.endbossSound);
        this.stopIdleSound();
        if (!this.deathSoundPlayed) {
          this.playDeathSound();
          this.deathSoundPlayed = true;
        }
        return;
      }

      if (this.isHurt) {
        this.playAnimation(this.imagesHurt);
        this.stopIdleSound();
        return;
      }

      if (this.isAttacking) {
        this.playAnimation(this.imagesAttack);
        this.stopIdleSound();
        return;
      }

      this.playAnimation(this.imagesWalking);
      this.playIdleSound();
    }, 170);
  }

  checkAttackState() {
    if (!this.isAttacking && this.energy < 50 && this.isActive && !this.dead) {
      this.isAttacking = true;
    }
  }
}
