import * as Phaser from 'phaser';

export default class CombatSystem {

    constructor(scene, enemies) {

        this.scene = scene;
        this.enemies = enemies;
    }

    dealDamage(target, damage) {

        if (!target || !target.active) {
            return;
        }

        const finalDamage = Math.floor(Math.random() * (damage.max - damage.min + 1)) + damage.min

        target.takeDamage(finalDamage);
    }

    dealAreaDamage(x, y, radius, damage) {

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

                this.dealDamage(
                    enemy,
                    damage
                );
            }
        });
    }
}