// src/scenes/Boot.js
import Phaser from 'phaser';
import { SCENES } from '../config/keys';

export default class Boot extends Phaser.Scene {
    constructor()
    {
        super(SCENES.BOOT);
    }

    preload()
    {
        this.load.setPath('assets');
        this.load.image('logo', 'ui/logo.png');
    }

    create()
    {
        this.scene.start(SCENES.PRELOADER);
    }
}