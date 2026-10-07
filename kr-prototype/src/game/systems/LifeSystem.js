import LivesDisplay from '../ui/LivesDisplay';

export default class LifeSystem {

    constructor(scene, initialLives) {

        this.scene = scene;

        this.lives = initialLives;

        this.livesDisplay = new LivesDisplay(
            scene,
            this.scene.centerX,
            100,
            this.lives
        );
    }

    loseLife(amount) {

        this.lives -= amount;

        if (this.lives <= 0) {

            this.lives = 0;

            this.livesDisplay.update(
                this.lives
            );

            this.scene.scene.start('GameOver');

            return;
        }

        this.livesDisplay.update(
            this.lives
        );
    }
}