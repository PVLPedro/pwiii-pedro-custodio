// src/scenes/Preloader.js
import Phaser from 'phaser';
import { SCENES, DATA } from '../config/keys';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/game';

export default class Preloader extends Phaser.Scene {
    constructor()
    {
        super(SCENES.PRELOADER);
    }

    preload()
    {
        const bar = this.add.rectangle(
            GAME_WIDTH / 2 - 200,
            GAME_HEIGHT / 2, 0, 20, 0xffffff
        ).setOrigin(0, 0.5);

        this.load.on(
            'progress', p => {
                bar.width = 400 * p;
            }
        );

        // this.load.setPath('assets');
        // this.load.json(DATA.ENEMIES, 'data/enemies.json');
        // this.load.json(DATA.WAVES, 'data/waves.json');
        // this.load.atlas('towers', 'atlas/towers.png', 'atlas/towers.json');
        // this.load.tilemapTiledJSON('level1', 'maps/level1.json');
    }

    create() {
        this.scene.start(SCENES.MENU);
    }
}