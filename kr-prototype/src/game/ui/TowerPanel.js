import * as Phaser from 'phaser';
import { towerTypes } from '../data/towers';

export default class TowerPanel {
    constructor(scene) {
        this.scene = scene;

        this.width = 260;
        this.height = scene.scale.height;

        this.create();
        this.hide();
    }

    create() {
        this.background = this.scene.add.rectangle(
            this.scene.scale.width - this.width / 2,
            this.scene.scale.height / 2,
            this.width,
            this.height,
            0x151515,
            0.8
        ).setDepth(100);

        this.title = this.scene.add.text(
            this.scene.scale.width - this.width + 20,
            25,
            'TORRE',
            {
                fontSize: '28px',
                color: '#ffffff'
            }
        ).setDepth(101);

        this.description = this.scene.add.text(
            this.scene.scale.width - this.width + 20,
            70,
            'Selecione uma torre.',
            {
                fontSize: '18px',
                color: '#cccccc',
                wordWrap: {
                    width: this.width - 40
                }
            }
        ).setDepth(101);

        this.closeButton = this.scene.add.text(
            this.scene.scale.width - 35,
            25,
            'X',
            {
                fontSize: '24px',
                color: '#ffffff'
            }
        ).setOrigin(0.5).setInteractive().setDepth(101);

        this.closeButton.on('pointerdown', () => {
            this.hide();
        });

        // const spacing = 50;

        // Object.entries(towerTypes).forEach(tower => {

        //     spacing += 50;
            
        //     this.add.text(
        //         0,
        //         spacing,
        //         tower.name,
        //         {
        //             fontSize: '20px',
        //             padding: { x: 10, y: 8 },
        //             backgroundColor: '#122630'
        //         }
        //     )
        // });
    }

    // handleSelection(tower) {

    //     if (this.selectedSlot) {
    //         this.towerManager.buildTower(this.selectedSlot, tower);
    //     }

    //     this.hide();
    // }

    show() {
        this.background.setVisible(true);
        this.title.setVisible(true);
        this.description.setVisible(true);
        this.closeButton.setVisible(true);
    }

    hide() {
        this.background.setVisible(false);
        this.title.setVisible(false);
        this.description.setVisible(false);
        this.closeButton.setVisible(false);
    }
}