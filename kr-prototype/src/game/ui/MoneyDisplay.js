export default class MoneyDisplay {

    constructor(scene, x, y, money) {

        this.text = scene.add.text(
            x,
            y,
            `Dinheiro: ${money}`,
            {
                fontSize: '24px',
                color: '#ffffff'
            }
        );

        this.text.setDepth(100).setOrigin(0.5);
    }

    update(money) {

        this.text.setText(
            `Dinheiro: ${money}`
        );
    }
}