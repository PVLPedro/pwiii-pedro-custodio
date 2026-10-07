import EnemySpawner from './EnemySpawner';

export default class WaveManager {

    constructor(scene, path, waves, uiManager) {

        this.scene = scene;
        this.waves = waves;

        this.currentWave = 0;

        this.spawner = new EnemySpawner(
            scene,
            path
        );

        this.uiManager = uiManager;

        this.nextWaveTimer = null;

        this.defaultEarlyStartReward = 25;
        this.minimumEarlyStartReward = 3;
        this.currentEarlyStartReward = 0;

        this.nextWaveStartTime = null;
        this.nextWaveDelay = 0;
    }

    setUIManager(uiManager) {

        this.uiManager = uiManager;
    }

    startWave() {

        if (this.currentWave >= this.waves.length) {
            return;
        }

        const wave = this.waves[this.currentWave];

        this.uiManager.hideStartWaveBtn();

        this.spawner.spawnGroups(
            wave.groups,
            wave.groupInterval * 1000,
            wave.repeats,
            () => {

                this.finishWave();
            }
        );
    }

    finishWave() {

        if (this.currentWave >= this.waves.length) {
            return;
        }

        const wave = this.waves[this.currentWave];

        this.currentWave++;

        this.nextWaveStartTime =
            this.scene.time.now;

        this.nextWaveDelay =
            wave.nextWaveDelay * 1000;

        this.uiManager.showStartWaveBtn();

        this.nextWaveTimer =
            this.scene.time.delayedCall(
                this.nextWaveDelay,
                () => {

                    this.nextWaveTimer = null;

                    this.startWave();
                }
            );
    }

    startNextWaveEarly() {

        if (!this.nextWaveTimer) {
            this.startWave();
            return;
        }

        const info = this.getEarlyStartInfo();
        
        this.nextWaveTimer.remove();

        this.nextWaveTimer = null;

        this.scene.moneySystem.gainMoney(
            info.reward
        );

        this.uiManager.hideStartWaveBtn();

        this.startWave();
    }

    getWavesInfo() {

        return {
            currentWave: this.currentWave,
            totalWaves: this.waves.length
        };
    }

    getEarlyStartInfo() {

        if (!this.nextWaveTimer) {
            return null;
        }

        const wave = this.waves[
            this.currentWave - 1
        ];

        const initialReward =
            wave.earlyStartReward ??
            this.defaultEarlyStartReward;

        const elapsed =
            this.scene.time.now -
            this.nextWaveStartTime;

        const remaining =
            Math.max(
                0,
                this.nextWaveDelay - elapsed
            );

        const reward = Math.floor(
            initialReward *
            (remaining / this.nextWaveDelay)
        );

        const finalReward = Math.max(
            this.minimumEarlyStartReward,
            reward
        );

        return {
            reward: finalReward,
            remainingTime: remaining,
            currentWave: this.currentWave,
            totalWaves: this.waves.length
        };
    }

    update(delta) {

        this.spawner.update(delta);
    }
}