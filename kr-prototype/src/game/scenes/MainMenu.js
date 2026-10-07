// import { Scene } from 'phaser';

// export class MainMenu extends Scene
// {
//     constructor ()
//     {
//         super('MainMenu');
//     }

//     create ()
//     {
//         this.add.image(512, 384, 'background');

//         this.add.image(512, 300, 'logo');

//         this.add.text(512, 460, 'Main Menu', {
//             fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
//             stroke: '#000000', strokeThickness: 8,
//             align: 'center'
//         }).setOrigin(0.5);

//         this.input.once('pointerdown', () => {

//             this.scene.start('Game');

//         });
//     }
// }

import * as Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.cameras.main.setBackgroundColor('#222222');

        this.add.text(
            centerX,
            centerY - 50,
            'KINGDOM DEFENSE',
            {
                fontSize: '48px',
                color: '#ffffff'
            })
        .setOrigin(0.5);

        const startText = this.add.text(
            centerX,
            centerY + 50,
            'CLIQUE PARA INICIAR',
            {
                fontSize: '28px',
                color: '#00ff00'
            })
        .setOrigin(0.5)
        .setInteractive();

        startText.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}