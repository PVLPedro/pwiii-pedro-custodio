import * as Phaser from 'phaser';

export default class CombatSystem {

    constructor(scene, enemies) {
        this.scene = scene;
        this.enemies = enemies;
    }

    rollDamage(damage) {
        return Phaser.Math.Between(damage.min, damage.max);
    }

    dealDamage(target, damage) {

        if (!target || !target.active) {
            return;
        }

        // const damage = this.rollDamage(damage);
        
        target.takeDamage(damage);
    }

    dealAreaDamage(x, y, radius, damage) {

        const finalDamage = this.rollDamage(damage);

        this.enemies.forEach(enemy => {

            if (!enemy.active) {
                return;
            }

            const distance = Phaser.Math.Distance.Between(
                x,
                y,
                enemy.x,
                enemy.y
            );

            if (distance <= radius) {

                this.dealDamage(enemy, finalDamage);
            }
        });
    }
}
