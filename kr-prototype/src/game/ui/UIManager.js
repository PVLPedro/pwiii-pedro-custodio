import TowerSelection from './TowerSelection';
import WaveOptions from './WaveOptions';

export default class UIManager {

    constructor(scene, towerManager, waveManager) {

        this.scene = scene;

        this.towerManager = towerManager;

        this.waveManager = waveManager;

        this.towerSelection = new TowerSelection(
            scene,
            towerManager
        );

        this.waveOptions = new WaveOptions(
            scene,
            waveManager
        );

        this.waveOptions.update();
        
        this.create();
    }

    create() {

        this.scene.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.update();
            }
        });
    }

    showTowerSelection(slot) {

        this.towerSelection.show(slot);
    }

    hideTowerSelection() {

        this.towerSelection.hide();
    }

    showStartWaveBtn() {

        this.waveOptions.show();
    }

    hideStartWaveBtn() {

        this.waveOptions.hide();
    }

    update() {

        this.waveOptions.update();
    }
}