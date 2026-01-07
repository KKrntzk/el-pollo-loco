class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  character = new Character();
  level = null;
  throwObject = false;

  throwabelObjects = [];
  statusbarBottle = new StatusbarBottle();
  statusbar = new Statusbar();
  statusbarCoin = new StatusbarCoin();
  statusbarBoss = new StatusbarBoss();
  coins = [];
  bottles = [];

  constructor(canvas, keyboard, _level) {
    this.level = _level;
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.level.startLevel();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    IntervalHub.startInterval(this.checkCollisions, 1000 / 60);
    IntervalHub.startInterval(this.checkThrowObjects, 1000 / 60);
    IntervalHub.startInterval(this.checkBottleCollisions, 1000 / 60);
    IntervalHub.startInterval(this.checkBottleThrowCollisions, 1000 / 60);
    IntervalHub.startInterval(this.checkCoinCollisions, 1000 / 60);
    IntervalHub.startInterval(this.checkEndbossCollisions, 1000 / 60);
    IntervalHub.startInterval(this.checkEndbossBottleCollision, 1000 / 60);
    IntervalHub.startInterval(this.checkEndbossActivation, 1000 / 60);
    IntervalHub.startInterval(() => {
      this.level.endboss.forEach((boss) => boss.checkAttackState());
    }, 1000 / 60);
  }

  checkThrowObjects = () => {
    if (
      this.keyboard.D &&
      !this.throwObject &&
      this.character.bottleCount >= 1
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwObject = true;
      this.throwabelObjects.push(bottle);
      this.character.useBottle();
    } else if (this.throwObject && !this.keyboard.D) {
      this.throwObject = false;
    }
  };

  checkBottleThrowCollisions = () => {
    this.throwabelObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.dead || bottle.targetHit) return;

        if (bottle.isColliding(enemy)) {
          enemy.die();
          bottle.startSplash();
        }
      });
    });
  };

  checkEndbossActivation = () => {
    this.level.endboss.forEach((boss) => {
      if (!boss.isActive && this.character.x >= boss.activationX) {
        boss.isActive = true;
      }
    });
  };

  checkEndbossBottleCollision = () => {
    this.throwabelObjects.forEach((bottle) => {
      if (bottle.targetHit) return;

      this.level.endboss.forEach((boss) => {
        if (boss.dead) return;

        if (bottle.isColliding(boss)) {
          bottle.targetHit = true;
          boss.hitBoss();
          this.statusbarBoss.setPercentage(boss.energy);
          bottle.startSplash();
        }

        if (boss.isDead()) {
          boss.isDying = true;

          setTimeout(() => {
            boss.dead = true;
          }, 1500);
        }
      });
    });
  };

  checkCollisions = () => {
    this.level.enemies.forEach((enemy) => {
      if (enemy.dead || enemy.isDying) return;
      if (this.character.isColliding(enemy)) {
        if (this.character.isAboveGround() && this.character.speedY < 0) {
          enemy.die();
        } else {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
        }
      }
    });
  };

  checkEndbossCollisions = () => {
    this.level.endboss.forEach((boss) => {
      if (this.character.isColliding(boss)) {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }
    });
  };

  checkBottleCollisions = () => {
    this.level.bottles.forEach((bottle) => {
      if (!bottle.collected && this.character.isColliding(bottle)) {
        bottle.collected = true;
        this.character.collect();
        let percentage = (this.character.bottleCount / 10) * 100;
        this.statusbarBottle.setPercentage(percentage);
      }
    });
  };

  checkCoinCollisions = () => {
    this.level.coins.forEach((coin) => {
      if (!coin.collected && this.character.isColliding(coin)) {
        coin.collected = true;
        this.character.collectCoin();
        let percentage = (this.character.coinCount / 10) * 100;
        this.statusbarCoin.setPercentage(percentage);
      }
    });
  };

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);

    this.addObjectsToMap(
      this.throwabelObjects.filter((bottle) => !bottle.splashed)
    );

    this.addObjectsToMap(this.level.coins);

    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);
    this.addToMap(this.statusbarBoss);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarCoin);
    this.ctx.translate(this.camera_x, 0);

    if (!this.dead) {
      this.addObjectsToMap(this.level.endboss.filter((boss) => !boss.dead));
    }

    if (!this.collected) {
      this.addObjectsToMap(this.level.bottles);
    }

    if (!this.collected) {
      this.addObjectsToMap(this.level.coins);
    }

    if (!this.dead) {
      this.addObjectsToMap(this.level.enemies.filter((enemy) => !enemy.dead));
    }

    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      if (!o.collected) {
        this.addToMap(o);
      }
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
    mo.realX = mo.realX * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    mo.realX = mo.realX * -1;

    this.ctx.restore();
  }
}
