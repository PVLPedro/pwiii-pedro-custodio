import * as Phaser from 'phaser';

export default class Slot extends Phaser.GameObjects.Rectangle {

    constructor(scene, x, y, initialCost) {

        super(
            scene,
            x,
            y,
            50,
            50,
            0x00ff00,
            0.1
        );

        this.scene = scene;

        this.image = scene.add.image(
            x,
            y,
            'slot'
        ).setOrigin(0.5).setDepth(100).setScale(0.23);

        this.initialCost = initialCost;

        scene.add.existing(this);
    }
}