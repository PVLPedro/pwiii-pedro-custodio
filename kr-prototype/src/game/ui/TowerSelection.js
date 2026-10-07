import * as Phaser from 'phaser';
import { towerTypes } from '../data/towers';

export default class TowerSelection {

    constructor(scene, towerManager) {

        this.scene = scene;
        this.towerManager = towerManager;
        this.selectedSlot = null;

        this.container = this.scene.add.container(0, 0).setVisible(false);
        
        this.createMenu();
    }

    createMenu() {

        const spacing = 50;

        const buttons = Object.values(towerTypes).map((tower, index) => {
            const y = (index + 1) * spacing;
            return this.createButton(tower, y);
        });

        this.container.add(buttons);
    }

    createButton(tower, y) {

        const buttonContainer = this.scene.add.container(0, y);

        const text = this.scene.add.text(
            0,
            0,
            `${tower.name} ($${tower.cost})`,
            {
                fontSize: '18px',
                color: '#ffffff',
                backgroundColor: '#555555',
                padding: { x: 10, y: 8 }
            }
        ).setOrigin(0.5);

        const icon = this.scene.add.image(
            text.width,
            0,
            tower.icon
        ).setOrigin(2.2, 0.5).setDisplaySize(50, 50);

        buttonContainer.add([text, icon]);

        const hitArea = new Phaser.Geom.Rectangle(
            -text.width,
            -text.height / 2,
            text.displayWidth * 1.5 + icon.displayWidth,
            text.height
        );

        buttonContainer.setInteractive(
            hitArea,
            Phaser.Geom.Rectangle.Contains
        ).setDepth(9999)
            .on('pointerdown', () => this.handleSelection(tower));

        return buttonContainer;
    }

    handleSelection(tower) {

        if (this.selectedSlot) {
            this.towerManager.buildTower(this.selectedSlot, tower);
        }

        this.hide();
    }

    show(slot) {

        this.selectedSlot = slot;

        this.container.setPosition(
            slot.x,
            slot.y
        ).setVisible(true);
    }

    hide() {

        this.selectedSlot = null;
        this.container.setVisible(false);
    }
}
