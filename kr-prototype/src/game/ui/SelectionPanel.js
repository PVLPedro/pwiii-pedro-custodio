import * as Phaser from 'phaser';

import { towerTypes } from '../data/towers';
import UIButton from './components/UIButton';

export default class SelectionPanel {

    constructor(scene, towerManager) {

        this.scene = scene;
        this.towerManager = towerManager;

        this.width = 400;
        this.height = 600;

        this.selectedObject = null;
        this.selectedTowerType = null;
        this.mode = null;

        this.towerTypeButtons = [];

        this.create();
        this.hide();
    }

    create() {

        const screenWidth = this.scene.scale.width;
        const screenHeight = this.scene.scale.height;

        const x = screenWidth - this.width;
        const y = (screenHeight - this.height) / 2;

        this.panel = this.scene.add.container(x, y)
            .setDepth(100);

        this.background = this.scene.add.rectangle(
            0,
            0,
            this.width,
            this.height,
            0x151515,
            0.9
        )
        .setOrigin(0, 0)
        .setInteractive();

        this.title = this.scene.add.text(
            20,
            16,
            '',
            {
                fontSize: '26px',
                fontStyle: 'bold',
                color: '#FFFFFF'
            }
        );

        this.closeButton = new UIButton(
            this.scene,
            this.width - 28,
            27,
            42,
            42,
            'X',
            {
                backgroundColor: 0x34414a,
                hoverColor: 0x465660,
                pressedColor: 0x26343b,

                onClick: () => {
                    this.hide();
                }
            }
        );

        this.createSlotContent();
        this.createTowerContent();

        this.panel.add([
            this.background,
            this.slotContent,
            this.towerContent,
            this.title,
            this.closeButton
        ]);
    }

    createSlotContent() {

        this.slotContent = this.scene.add.container(0, 0);

        this.slotDescription = this.scene.add.text(
            20,
            62,
            'Selecione uma torre para construir.',
            {
                fontSize: '16px',
                color: '#cccccc',
                wordWrap: {
                    width: this.width - 40
                }
            }
        );

        this.slotContent.add(this.slotDescription);

        this.createTowerButtons();

        this.slotFeedback = this.scene.add.text(
            20,
            this.height - 300,
            'Selecione uma torre.',
            {
                fontSize: '14px',
                color: '#cccccc',
                wordWrap: {
                    width: this.width - 40
                }
            }
        );

        this.slotContent.add(this.slotFeedback);

        this.buyButton = new UIButton(
            this.scene,
            this.width / 2,
            this.height - 27,
            this.width - 40,
            42,
            'COMPRAR',
            {
                backgroundColor: 0x547943,
                hoverColor: 0x6b9855,
                pressedColor: 0x3d5e31,
                selectedColor: 0x547943,

                onClick: () => {
                    this.handleBuild();
                }
            }
        );

        this.slotContent.add(this.buyButton);

        this.buyButton.setEnabled(false);
    }

    createTowerButtons() {

        const towers = Object.values(towerTypes);

        const buttonWidth = this.width - 40;
        const buttonHeight = 34;
        const spacing = 38;
        const startY = 105;

        towers.forEach((tower, index) => {

            const button = new UIButton(
                this.scene,
                this.width / 2,
                startY + index * spacing,
                buttonWidth,
                buttonHeight,
                `${tower.name} ($${tower.cost})`,
                {
                    backgroundColor: 0x34414a,
                    hoverColor: 0x465660,
                    pressedColor: 0x26343b,
                    selectedColor: 0x547943,

                    fontSize: '15px',

                    onClick: () => {
                        this.selectTowerType(tower);
                    }
                }
            );

            this.towerTypeButtons.push({
                towerType: tower,
                button
            });

            this.slotContent.add(button);
        });
    }

    createTowerContent() {

        this.towerContent = this.scene.add.container(0, 0);

        this.towerDescription = this.scene.add.text(
            20,
            70,
            '',
            {
                fontSize: '18px',
                color: '#cccccc',
                wordWrap: {
                    width: this.width - 40
                }
            }
        );

        this.towerSellButton = new UIButton(
            this.scene,
            this.width / 2,
            this.height - 27,
            this.width - 40,
            42,
            'VENDER',
            {
                backgroundColor: 0xff4c4c,
                hoverColor: 0xff6969,
                pressedColor: 0xd12222,
                selectedColor: 0xff5c5c,

                onClick: () => {
                    this.handleSell();
                }
            }
        );

        this.towerContent.add([
            this.towerDescription,
            this.towerSellButton
        ]);
    }

    selectTowerType(towerType) {

        if (this.mode !== 'slot') return;

        this.selectedTowerType = towerType;

        this.towerTypeButtons.forEach(item => {

            item.button.setSelected(
                item.towerType === towerType
            );

        });

        this.buyButton.setEnabled(true);

        this.slotFeedback.setText(
            `${towerType.name} selecionada.\n` +
            `Dano: ${towerType.damage.min} - ${towerType.damage.max}\n` +
            `Alcance: ${towerType.range}`
        );
    }

    handleBuild() {

        if (
            this.mode !== 'slot' ||
            !this.selectedObject ||
            !this.selectedTowerType
        ) {
            return;
        }

        const { built, tower } = this.towerManager.buildTower(
            this.selectedObject,
            this.selectedTowerType
        );

        if (built) {

            this.hide();
            this.showTower(tower);
            
        } else {

            this.slotFeedback.setText(
                'Dinheiro insuficiente para comprar esta torre.'
            );
        }
    }

    handleSell() {

        if (
            this.mode !== 'tower' ||
            !this.selectedObject
        ) {
            return;
        }

        const { sold, slot } = this.towerManager.sellTower(
            this.selectedObject
        );

        if (sold) {

            this.hide();
            this.showSlot(slot);

        }
    }

    showSlot(slot) {

        if (
            this.mode === 'slot' &&
            this.selectedObject === slot
        ) {
            this.hide();
            return;
        }

        this.selectedObject = slot;
        this.mode = 'slot';

        this.resetTowerTypeSelection();

        this.slotFeedback.setText(
            'Selecione uma torre.'
        );

        this.title.setText('ESPAÇO');

        this.slotContent.setVisible(true);
        this.towerContent.setVisible(false);

        this.show();
    }

    showTower(tower) {

        this.selectedObject = tower;
        this.mode = 'tower';

        this.resetTowerTypeSelection();

        this.title.setText(tower.name);

        this.towerDescription.setText(
            `Dano: ${tower.damage.min} - ${tower.damage.max}\n` +
            `Alcance: ${tower.range}`
        );

        this.slotContent.setVisible(false);
        this.towerContent.setVisible(true);

        this.show();
    }

    resetTowerTypeSelection() {

        this.selectedTowerType = null;

        this.towerTypeButtons.forEach(item => {
            item.button.setSelected(false);
        });

        this.buyButton.setEnabled(false);
    }

    show() {

        this.panel.setVisible(true);

        this.slotContent.setVisible(
            this.mode === 'slot'
        );

        this.towerContent.setVisible(
            this.mode === 'tower'
        );
    }

    hide() {

        this.panel.setVisible(false);

        this.selectedObject = null;
        this.mode = null;

        this.resetTowerTypeSelection();
    }
}