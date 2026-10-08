import * as Phaser from 'phaser';

export default class RunInfoDisplay extends Phaser.GameObjects.Container {

    constructor(scene, x, y, initialLives, initialMoney, currentWave, totalWaves) {
        
        super(scene, x, y);
        scene.add.existing(this);

        // 1. Instanciar o background diretamente (Boa prática)
        let scale = 0.7;
        this.background = new Phaser.GameObjects.Image(scene, 0, 0, 'run-info-bg').setOrigin(0.5).setScale(scale);
        
        // Força o Phaser a calcular o tamanho com base na escala imediatamente
        const bgWidth = this.background.width * scale; 

        // 2. Calcular o início (canto esquerdo do menu) para distribuir os elementos
        const startX = -bgWidth / 2;
        const segment = bgWidth / 9;

        // 3. Criar os elementos usando "new" e posicionando com base no segmento
        this.moneyIcon = new Phaser.GameObjects.Image(scene, startX + (segment * 2), 0, 'money-icon').setOrigin(0.5).setScale(0.1);
        this.moneyText = new Phaser.GameObjects.Text(scene, startX + (segment * 3), 0, `${initialMoney}`, { fontSize: '30px', color: '#ffffff' }).setOrigin(0.5);

        this.livesIcon = new Phaser.GameObjects.Image(scene, startX + (segment * 4), 0, 'lives-icon').setOrigin(0.5).setScale(0.1);
        this.livesText = new Phaser.GameObjects.Text(scene, startX + (segment * 5), 0, `${initialLives}`, { fontSize: '30px', color: '#ffffff' }).setOrigin(0.5);

        this.wavesIcon = new Phaser.GameObjects.Image(scene, startX + (segment * 6), 0, 'waves-icon').setOrigin(0.5).setScale(0.1);
        this.wavesText = new Phaser.GameObjects.Text(scene, startX + (segment * 7), 0, `${currentWave}/${totalWaves}`, { fontSize: '30px', color: '#ffffff' }).setOrigin(0.5);

        // 4. Adiciona tudo ao Container. Removido o setDepth() pois a ordem do array dita o topo.
        this.add([
            this.background,
            this.moneyIcon,
            this.moneyText,
            this.livesIcon,
            this.livesText,
            this.wavesIcon,
            this.wavesText
        ]);
    }

    updateMoney(money) {

        this.moneyText.setText(`${money}`);
    }

    updateLives(lives) {

        this.livesText.setText(`${lives}`);
    }

    updateWaves(info) {

        console.log(info);
        
        this.wavesText.setText(`${info.currentWave}/${info.totalWaves}`);
    }
}
