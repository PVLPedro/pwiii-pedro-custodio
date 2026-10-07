import Phaser from 'phaser';
import { SCENES, DATA, EVENTS } from '../config/keys';
import WaveManager from '../systems/WaveManager';

export default class Battle extends Phaser.Scene {
  constructor() { super(SCENES.BATTLE); }

  init(data) { this.levelId = data.levelId ?? 1; }

  create() {
    const enemyDefs = this.cache.json.get(DATA.ENEMIES);
    const waves = this.cache.json.get(DATA.WAVES)[`level${this.levelId}`];

    this.path = null;
    this.enemies = this.add.group();

    this.waveManager = new WaveManager(this, this.path, enemyDefs, waves, this.enemies);
    this.waveManager.start();

    this.scene.launch(SCENES.HUD);
  }

  update(time, delta) {
    [...this.enemies.getChildren()].forEach(e => e.step(delta));
  }
}