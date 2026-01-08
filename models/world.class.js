class World {
  //#region Properties
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  character = new Character();
  level = null;
  throwObject = false;

  throwabelObjects = [];
  coins = [];
  bottles = [];

  statusbar = new Statusbar();
  statusbarBoss = new StatusbarBoss();
  statusbarBottle = new StatusbarBottle();
  statusbarCoin = new StatusbarCoin();
  //#endregion

  //#region Constructor
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
  //#endregion

  //#region Main Game Loop
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
  //#endregion

  //#region Throwing Objects
  checkThrowObjects = () => {
    if (this.canThrow()) this.throwBottle();
    else if (this.throwObject && !this.keyboard.D) this.resetThrow();
  };

  canThrow = () => {
    return (
      this.keyboard.D && !this.throwObject && this.character.bottleCount >= 1
    );
  };

  throwBottle = () => {
    const direction = this.character.otherDirection ? -1 : 1;
    const offsetX = direction === 1 ? 100 : -40;

    const bottle = new ThrowableObject(
      this.character.x + offsetX,
      this.character.y + 100,
      direction
    );

    this.throwObject = true;
    this.throwabelObjects.push(bottle);
    this.character.useBottle();
    // const bottle = new ThrowableObject(
    //   this.character.x + 100,
    //   this.character.y + 100
    // );
    // this.throwObject = true;
    // this.throwabelObjects.push(bottle);
    // this.character.useBottle();
  };

  resetThrow = () => {
    this.throwObject = false;
  };
  //#endregion

  //#region Collisions
  checkCollisions = () => {
    this.level.enemies.forEach((enemy) => {
      if (enemy.dead || enemy.isDying) return;
      if (this.character.isColliding(enemy)) {
        if (this.character.isAboveGround() && this.character.speedY < 0)
          enemy.die();
        else {
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
        this.statusbarBottle.setPercentage(
          (this.character.bottleCount / 10) * 100
        );
      }
    });
  };

  checkCoinCollisions = () => {
    this.level.coins.forEach((coin) => {
      if (!coin.collected && this.character.isColliding(coin)) {
        coin.collected = true;
        this.character.collectCoin();
        this.statusbarCoin.setPercentage((this.character.coinCount / 10) * 100);
      }
    });
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

        if (boss.isDead()) this.killBossAfterDelay(boss);
      });
    });
  };

  killBossAfterDelay = (boss) => {
    boss.isDying = true;
    setTimeout(() => {
      boss.dead = true;
    }, 1500);
  };

  checkEndbossActivation = () => {
    this.level.endboss.forEach((boss) => {
      if (!boss.isActive && this.character.x >= boss.activationX)
        boss.isActive = true;
    });
  };
  //#endregion

  //#region Drawing
  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.drawBackground();
    this.drawGameObjects();

    this.ctx.translate(-this.camera_x, 0);
    this.drawUI();

    requestAnimationFrame(() => this.draw());
  };

  drawBackground = () => {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  };

  drawGameObjects = () => {
    this.addObjectsToMap(this.throwabelObjects.filter((b) => !b.splashed));
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies.filter((e) => !e.dead));
    this.addObjectsToMap(this.level.endboss.filter((b) => !b.dead));
    this.addToMap(this.character);
  };

  drawUI = () => {
    this.addToMap(this.statusbar);
    this.addToMap(this.statusbarBoss);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarCoin);
  };
  //#endregion

  //#region Helpers
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      if (!o.collected) this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
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
  //#endregion
}
