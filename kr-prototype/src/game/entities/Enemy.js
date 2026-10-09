import * as Phaser from 'phaser';

let healthBarWidth = 30;
export default class Enemy extends Phaser.GameObjects.Arc {

    constructor(scene, path, data) {

        const start = path.getPoint(0);

        super(
            scene,
            start.x,
            start.y,
            data.size,
            0,
            360,
            false,
            data.color
        );

        this.path = path;
        this.pathLength = path.getLength();
        this.pathDistance = 0;

        this.name = data.name;
        this.health = data.health;
        this.maxHealth = data.health;
        this.speed = data.speed;
        this.actualSpeed = data.speed;
        this.damage = data.damage;
        this.lifes = data.lifes;
        this.reward = data.reward;
        this.color = data.color;
        this.size = data.size;

        this.container = scene.add
            .container(start.x, start.y - 20)
            .setDepth(100);

        this.healthBarBg = scene.add.rectangle(
            0,
            0 + this.size / 2,
            healthBarWidth,
            5,
            0x002200
        );

        this.healthBar = scene.add.rectangle(
            0,
            0 + this.size / 2,
            healthBarWidth,
            5,
            0x00aa00
        );

        this.container.add([
            this.healthBarBg,
            this.healthBar
        ]);

        scene.add.existing(this);
    }

    update(delta) {

        if (!this.active) return;

        this.pathDistance += this.speed * (delta / 1000);

        if (this.pathDistance >= this.pathLength) {

            this.scene.lifeSystem.loseLife(this.lifes);
            this.destroy();

            return;
        }

        const point = this.path.getPoint(
            this.pathDistance / this.pathLength
        );

        this.setPosition(point.x, point.y)
            .setDepth(point.y);

        this.container
            .setPosition(point.x, point.y - 20)
            .setDepth(point.y);
    }

    takeDamage(amount) {

        this.health -= amount;

        this.updateHealthBar();

        if (this.health <= 0) {

            this.scene.moneySystem.gainMoney(this.reward);
            this.destroy();

            return;
        }

        this.flashDamage();
    }

    updateHealthBar() {

        const percentage = Phaser.Math.Clamp(
            this.health / this.maxHealth,
            0,
            1
        );

        this.healthBar.width = healthBarWidth * percentage;
    }

    flashDamage() {

        this.setFillStyle(0xffffff);

        this.scene.time.delayedCall(100, () => {

            if (this.active) {
                this.setFillStyle(this.color);
            }
        });
    }

    destroy(fromScene) {

        if (this.container) {
            this.container.destroy();
            this.container = null;
        }

        super.destroy(fromScene);
    }
}