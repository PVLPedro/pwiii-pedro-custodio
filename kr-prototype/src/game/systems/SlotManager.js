import Slot from '../entities/Slot';

export default class SlotManager {

    constructor(scene, slotData, towerManager, uiManager) {

        this.scene = scene;

        this.towerManager = towerManager;

        this.uiManager = uiManager;

        this.slots = [];

        this.createSlots(slotData);
    }

    setUIManager(uiManager) {

        this.uiManager = uiManager;
    }

    createSlots(slotData) {

        this.slots = slotData.map(data => {

            const slot = new Slot(
                this.scene,
                data.x,
                data.y,
                data.initialCost
            );

            slot.setInteractive();

            slot.on('pointerdown', () => {
                
                this.uiManager.showTowerSelection(slot);
            });

            return slot;
        });
    }

    releaseSlot(slot) {

        slot.image.setVisible(true);
        slot.setVisible(true);
        slot.setInteractive();
    }
}