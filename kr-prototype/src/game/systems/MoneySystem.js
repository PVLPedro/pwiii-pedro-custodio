import MoneyDisplay from '../ui/MoneyDisplay';

export default class MoneySystem {

    constructor(scene, initialMoney, refundRate) {

        this.scene = scene;

        this.money = initialMoney;

        this.refundRate = refundRate;

        this.moneyDisplay = new MoneyDisplay(
            scene,
            this.scene.centerX,
            140,
            this.money
        );
    }

    canSpend(amount) {

        return this.money >= amount;
    }

    spendMoney(amount) {

        if (!this.canSpend(amount)) {
            return false;
        }

        this.money -= amount;

        this.moneyDisplay.update(
            this.money
        );

        return true;
    }

    gainMoney(amount) {

        this.money += amount;

        this.moneyDisplay.update(
            this.money
        );
    }

    refundMoney(originalCost) {

        const refund = Math.floor(
            originalCost * this.refundRate
        );

        this.gainMoney(refund);
    }
}