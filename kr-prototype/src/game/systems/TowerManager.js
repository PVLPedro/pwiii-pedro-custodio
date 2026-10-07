import Tower from '../entities/Tower';

export default class TowerManager {

    constructor(scene, enemies, projectileManager) {

        this.scene = scene;

        this.enemies = enemies;
        this.projectileManager = projectileManager;

        this.towers = [];
    }

    setSlotManager(slotManager) {

        this.slotManager = slotManager;
    }

    buildTower(slot, towerType) {

        const moneySystem = this.scene.moneySystem;

        if (!moneySystem.spendMoney(towerType.cost)) {
            return;
        }

        const tower = new Tower(
            this.scene,
            slot.x,
            slot.y,
            towerType,
            this.enemies,
            this.projectileManager
        );

        tower.buildSlot = slot;

        this.towers.push(tower);

        slot.image.setVisible(false);
        slot.setVisible(false);
        slot.disableInteractive();

        tower.setInteractive();

        tower.on('pointerdown', () => {

            this.sellTower(tower);

        });
    }

    sellTower(tower) {

        const slot = tower.buildSlot;

        this.scene.moneySystem.refundMoney(
            tower.cost
        );

        tower.destroy();

        this.towers = this.towers.filter(
            currentTower => currentTower !== tower
        );

        this.slotManager.releaseSlot(slot);
    }

    update(delta) {

        this.towers.forEach(tower => {
            tower.update(delta);
        });
    }
}