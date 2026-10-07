export default class LivesDisplay {

    constructor(scene, x, y, initialLives) {

        this.text = scene.add.text(
            x,
            y,
            `Vidas: ${initialLives}`,
            {
                fontSize: '24px',
                color: '#ffffff'
            }
        );

        this.text.setDepth(100).setOrigin(0.5);
    }

    update(lives) {

        this.text.setText(
            `Vidas: ${lives}`
        );
    }
}