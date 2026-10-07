import * as Phaser from 'phaser';

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

        this.scene = scene;

        this.path = path;
        this.pathLength = path.getLength();
        this.pathDistance = 0;

        this.name = data.name;
        this.health = data.health;
        this.maxHealth = data.health;
        this.speed = data.speed;
        this.damage = data.damage;
        this.lifes = data.lifes;
        this.reward = data.reward;
        this.color = data.color;

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

        const point = this.path.getPoint(this.pathDistance / this.pathLength);

        this.setPosition(point.x, point.y).setDepth(point.y);
    }

    takeDamage(amount) {
        
        this.health -= amount;

        if (this.health <= 0) {

            this.scene.moneySystem.gainMoney(this.reward);

            this.destroy();

            return;
        }

        this.flashDamage();
    }

    flashDamage() {

        this.setFillStyle(0xffffff);

        this.scene.time.delayedCall(100, () => {

            if (this.active) {
                this.setFillStyle(this.color);
            }
        });
    }
}