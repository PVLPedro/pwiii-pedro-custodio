import * as Phaser from 'phaser';

import MainMenu from './scenes/MainMenu';
import GameScene from './scenes/GameScene';
import GameOver from './scenes/GameOver';

export default function StartGame(parent) {

    const config = {
        type: Phaser.AUTO,

        width: 1920,
        height: 1080,

        backgroundColor: '#028af8',
        
        parent: parent,

        scale: {
            // mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [
            MainMenu,
            GameScene,
            GameOver
        ]
    };

    return new Phaser.Game(config);
}