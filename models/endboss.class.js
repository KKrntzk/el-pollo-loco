class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 60;

  imagesWalking = ImageHub.endboss.walking;
  imagesAlert = ImageHub.endboss.alert;
  imagesAttack = ImageHub.endboss.attack;
  imagesHurt = ImageHub.endboss.hurt;
  imagesDead = ImageHub.endboss.dead;

  dead = false;
  isDying = false;
  isHurt = false;
  isActive = false;
  isAttacking = false;

  activationX = 1500;
  deathSoundPlayed = false;
  idleSoundPlaying = false;
  endbossSoundPlaying = false;

  attackSpeed = 0;
  enrageSpeed = 0;
  x = 2000;

  constructor() {
    super().loadImg("img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png");

    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesAlert);
    this.loadImages(this.imagesAttack);

    this.speed = 0.15 + Math.random() * 0.5;
    this.attackSpeed = this.speed * 3;
    this.enrageSpeed = this.speed * 7;

    this.animate();
  }
  /* SOUND */
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

  playDeathSoundOnce() {
    if (!this.deathSoundPlayed) {
      this.playDeathSound();
      this.deathSoundPlayed = true;
    }
  }

  startEndbossSound() {
    if (!this.endbossSoundPlaying) {
      AudioHub.endbossSound.loop = true;
      AudioHub.playOne(AudioHub.endbossSound);
      this.endbossSoundPlaying = true;
    }
  }

  /* ANIMATION / INTERVALS */
  animate() {
    IntervalHub.startInterval(this.animateMovement, 1000 / 60);
    IntervalHub.startInterval(this.animateState, 170);
  }

  /* MOVEMENT */
  animateMovement = () => {
    if (!this.canMove()) return;

    if (this.energy < 40) {
      this.enragedMove();
    } else if (this.isAttacking) {
      this.attackMove();
    } else {
      this.normalMove();
    }
  };

  canMove() {
    return this.isActive && !this.dead && !this.isDying && !this.isHurt;
  }

  enragedMove() {
    this.x -= this.enrageSpeed;
  }

  attackMove() {
    this.x -= this.attackSpeed;
  }

  normalMove() {
    this.moveLeft();
  }

  /* STATES */
  animateState = () => {
    if (!this.isActive) {
      this.handleAlertState();
      return;
    }

    this.startEndbossSound();

    if (this.handleDeadState()) return;
    if (this.handleHurtState()) return;
    if (this.handleAttackState()) return;

    this.handleWalkingState();
  };

  handleDeadState() {
    if (this.dead || this.isDying) {
      this.playAnimation(this.imagesDead);
      AudioHub.stopOne(AudioHub.endbossSound);
      this.stopIdleSound();
      this.playDeathSoundOnce();
      showWinningScreen();
      return true;
    }
    return false;
  }

  handleHurtState() {
    if (this.isHurt) {
      this.playAnimation(this.imagesHurt);
      this.stopIdleSound();
      return true;
    }
    return false;
  }

  handleAttackState() {
    if (this.isAttacking) {
      this.playAnimation(this.imagesAttack);
      this.stopIdleSound();
      return true;
    }
    return false;
  }

  handleWalkingState() {
    this.playAnimation(this.imagesWalking);
    this.playIdleSound();
  }

  handleAlertState() {
    this.playAnimation(this.imagesAlert);
    this.stopIdleSound();
  }

  /* ATTACK LOGIC */
  checkAttackState() {
    if (!this.isAttacking && this.energy < 50 && this.isActive && !this.dead) {
      this.isAttacking = true;
    }
  }
}
