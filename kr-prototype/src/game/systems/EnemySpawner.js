import Enemy from '../entities/Enemy';

export default class EnemySpawner {

    constructor(scene, path) {

        this.scene = scene;
        this.path = path;

        this.enemies = [];
    }

    spawn(type) {

        const enemy = new Enemy(
            this.scene,
            this.path,
            type
        );

        this.enemies.push(enemy);

        return enemy;
    }

    spawnGroup(type, count, interval, onComplete) {

        this.spawn(type);

        if (count <= 1) {

            if (onComplete) {
                onComplete();
            }

            return;
        }

        let remaining = count - 1;

        this.scene.time.addEvent({

            delay: interval * 1000,

            callback: () => {

                this.spawn(type);

                remaining--;

                if (remaining === 0) {

                    if (onComplete) {
                        onComplete();
                    }

                }

            },

            repeat: count - 2

        });
    }

    spawnGroups(groups, groupInterval, repeats = 1, onComplete) {

        let currentGroup = 0;
        let currentRepeat = 0;

        const spawnNextGroup = () => {

            if (currentGroup >= groups.length) {

                currentRepeat++;

                if (currentRepeat >= repeats) {

                    if (onComplete) {
                        onComplete();
                    }

                    return;
                }

                currentGroup = 0;
            }

            const spawn = () => {

                const group = groups[currentGroup];

                currentGroup++;

                this.spawnGroup(
                    group.type,
                    group.count,
                    group.interval,
                    spawnNextGroup
                );
            };

            if (currentGroup === 0 && currentRepeat === 0) {

                spawn();

            } else {

                this.scene.time.delayedCall(
                    groupInterval,
                    spawn
                );

            }
        };

        spawnNextGroup();
    }

    update(delta) {

        this.enemies.forEach(enemy => {

            enemy.update(delta);

        });

    }
}