import * as Phaser from 'phaser';

import LifeSystem from '../systems/LifeSystem';
import MoneySystem from '../systems/MoneySystem';
import WaveManager from '../systems/WaveManager';
import SlotManager from '../systems/SlotManager';
import ProjectileManager from '../systems/ProjectileManager';
import TowerManager from '../systems/TowerManager';
import CombatSystem from '../systems/CombatSystem';

import { waves } from '../data/waves';
// import { slots } from '../data/levels';
import { slotSpecs, generateSlots } from '../data/levels';
import { buildRoundedPath } from '../utils/buildRoundedPath';

export default class GameScene extends Phaser.Scene {

    constructor() {

        super('GameScene');
    }

    preload() {

        this.load.path = 'assets/icons/';

        this.load.image('nature', 'nature-icon.png');
        this.load.image('magic', 'magic-icon.png');
        this.load.image('industrial', 'industrial-icon.png');
        this.load.image('alchemy', 'alchemy-icon.png');

        this.load.path = 'assets/images/';

        this.load.image('slot', 'slot.webp')
    }

    create() {

        this.cameras.main.setBackgroundColor('#423130');

        this.centerX = this.scale.width / 2;
        this.centerY = this.scale.height / 2;

        this.width = this.scale.width;
        this.height = this.scale.height;

        // =========================
        // CAMINHO
        // =========================

        const W = this.scale.width;
        const H = this.scale.height;

        const waypoints = [
            { x: W * 0.20, y: -20 },
            { x: W * 0.20, y: H * 0.25 },
            { x: W * 0.75, y: H * 0.25, radius: 120 },
            { x: W * 0.75, y: H * 0.50 },
            { x: W * 0.30, y: H * 0.50 },
            { x: W * 0.30, y: H * 0.75, radius: 60 },
            { x: W * 0.60, y: H * 0.75 },
            { x: W * 0.85, y: H * 0.60 },
            { x: W + 20,   y: H * 0.60 }
        ];

        const path = buildRoundedPath(waypoints, 90);
        this.path = path;

        const visualPath = this.add.graphics().setDepth(0);
        visualPath.lineStyle(44, 0x8a6d46, 1);
        path.draw(visualPath, 64);

        // Debug: marca os pontos de virada
        // const DEBUG_PATH = true;

        // if (DEBUG_PATH) {
        //     waypoints.forEach((point, index) => {
        //         this.add.circle(point.x, point.y, 8, 0x00ff00).setDepth(1);

        //         this.add.text(point.x, point.y - 25, `${index}`, {
        //             fontSize: '16px',
        //             color: '#ffffff'
        //         }).setOrigin(0.5).setDepth(1);
        //     });
        // }

        // VIDAS

        this.lifeSystem = new LifeSystem(
            this,
            20
        );

        // DINHEIRO

        this.moneySystem = new MoneySystem(
            this,
            225,
            0.75
        );

        // WAVES

        this.waveManager = new WaveManager(
            this,
            this.path,
            waves,
        );

        // COMBATE

        this.combatSystem = new CombatSystem(
            this,
            this.waveManager.spawner.enemies
        );

        // TORRES e PROJÉTEIS

        this.projectileManager = new ProjectileManager(
            this,
            this.combatSystem
        );

        this.towerManager = new TowerManager(
            this,
            this.waveManager.spawner.enemies,
            this.projectileManager
        );

        // SLOTS

        const slots = generateSlots(this.path, slotSpecs, {
            width: this.scale.width,
            height: this.scale.height
        });

        this.slotManager = new SlotManager(
            this,
            slots,
            this.towerManager
        );

        this.towerManager.setSlotManager(
            this.slotManager
        );

        // HUD (cena paralela, desenhada por cima)

        this.scene.launch('HudScene', { 
            gameScene: this
        });

        this.events.once('shutdown', () => {
            this.scene.stop('HudScene');
        });
    }


    update(time, delta) {

        this.waveManager.update(delta);

        this.towerManager.update(delta);

        this.projectileManager.update(delta);
    }
}