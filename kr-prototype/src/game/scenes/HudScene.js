import * as Phaser from 'phaser';

import { GameEvents } from '../constants/events';

import RunInfoDisplay from '../ui/RunInfoDisplay';

import TowerSelection from '../ui/TowerSelection';
import TowerPanel from '../ui/TowerPanel';
import WaveOptions from '../ui/WaveOptions';

export default class HudScene extends Phaser.Scene {

    constructor() {
        super('HudScene');
    }

    init(data) {

        this.gameScene = data.gameScene;
    }

    preload() {

        this.load.path = 'assets/icons/';

        this.load.image('money-icon', 'money-icon.png');
        this.load.image('lives-icon', 'lives-icon.png');
        this.load.image('waves-icon', 'waves-icon.png');

        this.load.path = 'assets/images/';

        this.load.image('run-info-bg', 'run-info-bg.jpg');
    }

    create() {

        const {
            lifeSystem,
            moneySystem,
            towerManager,
            waveManager
        } = this.gameScene;

        const centerX = this.scale.width / 2;

        this.add.text(
            centerX,
            50,
            'FASE 1',
            {
                fontSize: '32px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        const info = this.gameScene.waveManager.getWavesInfo();

        this.runInfoDisplay = new RunInfoDisplay(
            this,
            this.scale.width - 300,
            100,
            lifeSystem.lives,
            moneySystem.money,
            info.currentWave,
            info.totalWaves,
        );

        this.towerSelection = new TowerSelection(
            this,
            towerManager
        );

        this.waveOptions = new WaveOptions(
            this,
            waveManager
        );

        this.towerPanel = new TowerPanel(this);

        this.input.keyboard.on('keydown-T', () => {
            this.towerPanel.show();
        });

        this.input.keyboard.on('keydown-E', () => {
            this.towerPanel.hide();
        });

        this.bindGameEvents();
    }

    bindGameEvents() {

        const gameEvents = this.gameScene.events;

        const listeners = {
            [GameEvents.LIVES_CHANGED]: lives =>
                this.runInfoDisplay.updateLives(lives),

            [GameEvents.MONEY_CHANGED]: money =>
                this.runInfoDisplay.updateMoney(money),

            [GameEvents.SLOT_CLICKED]: slot =>
                this.towerSelection.show(slot),

            [GameEvents.WAVE_STARTED]: info => {
                this.runInfoDisplay.updateWaves(info);
                this.waveOptions.hide()
            },

            [GameEvents.WAVE_FINISHED]: () =>
                this.waveOptions.show(),
        };

        Object.entries(listeners).forEach(([event, listener]) => {
            gameEvents.on(event, listener);
        });

        this.events.once('shutdown', () => {
            Object.entries(listeners).forEach(([event, listener]) => {
                gameEvents.off(event, listener);
            });
        });
    }

    update() {

        this.waveOptions.update();
    }
}
