class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  character = new Character();
  level = level1;
  throwObject = false;

  throwabelObjects = [];
  statusbarBottle = new StatusbarBottle();
  statusbar = new Statusbar();
  statusbarCoin = new StatusbarCoin();
  coins = [];
  bottles = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    IntervalHub.startInterval(this.checkCollisions, 1000 / 60);
    IntervalHub.startInterval(this.checkThrowObjects, 1000 / 60);
    IntervalHub.startInterval(this.checkBottleCollisions, 1000 / 60);
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

  checkCollisions = () => {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
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
      }
    });
  };

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.throwabelObjects);
    this.addObjectsToMap(this.level.coins);

    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarCoin);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);

    if (!this.collected) {
      this.addObjectsToMap(this.level.bottles);
    }

    this.addObjectsToMap(this.level.enemies);

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
