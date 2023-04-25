import { Container, Sprite, Text } from 'pixi.js';
import { AppController } from '../controllers/AppController';
import { Coin } from './Coin';
import { Constants } from '../constants';
import { Button } from './Button';
import { Helper } from '../generic/Helper';
import { GameController } from '../controllers/GameController';
import { GameScene } from '../scenes/GameScene';

export class BetInfoComponent extends Container {
    private mBg: Sprite;
    private mButtonCross: Button;
    private mChipsButtons: Coin[] = [];
    private mBetAmountText: Text;
    private mGameController: GameController;

    public static createBetInfoComponent(): BetInfoComponent {
        return new BetInfoComponent();
    }
    constructor() {
        super();
        this.mGameController =
            AppController.getPersistantNode().getGameController();
        this.mBetAmountText = new Text(
            'Currently Betting: ' + this.mGameController.getBettingAmount(),
            Helper.getBettingTextStyle()
        );
        this.mBg = Sprite.from(Helper.getTexture('bg'));
        this.mButtonCross = Button.createButton('buttonClose');
        this.initBG();
        this.addChipsButtons();
        this.initCloseButton();
        this.initBettingAmountText();
        this.visible = false;
    }

    private initBG(): void {
        this.mBg.anchor.set(0.5, 0.5);
        this.mBg.width = AppController.width * 0.75;
        this.mBg.height = AppController.height * 0.5;
        this.mBg.x = AppController.width / 2;
        this.mBg.y = AppController.height / 2;
        this.addChild(this.mBg);
    }

    private initCloseButton(): void {
        this.mButtonCross.zIndex = 3;
        this.mButtonCross.x =
            this.mBg.x + this.mBg.width / 2 - this.mButtonCross.width / 2;
        this.mButtonCross.y =
            this.mBg.y - this.mBg.height / 2 + this.mButtonCross.height / 2;
        this.addChild(this.mButtonCross);
        this.mButtonCross.setCallback(this.onCrossButtonPress.bind(this));
    }

    private initBettingAmountText(): void {
        this.mBetAmountText.x = this.mBg.x;
        this.mBetAmountText.y =
            this.mBg.y - this.mBg.height / 2 + this.mBetAmountText.height + 10;
        this.mBetAmountText.anchor.set(0.5, 0.5);
        this.mBetAmountText.zIndex = 10;
        this.addChild(this.mBetAmountText);
    }

    private updateBettingText(): void {
        this.mBetAmountText.text =
            'Currently Betting: ' + this.mGameController.getBettingAmount();
    }

    public updateComponentVisibility(): void {
        this.visible = !this.visible;
        let scene = AppController.getCurrentScene();
        if (scene instanceof GameScene) {
            scene.updateInfoButtonVisibility();
        }
    }

    private onCrossButtonPress(): void {
        this.updateComponentVisibility();
    }

    public addBalanceEventListener(): void {
        this.mChipsButtons.forEach((coinButton) => {
            coinButton.addBalanceEventListener();
            coinButton.onBalanceUpdate();
        });
    }

    private addChipsButtons(): void {
        let posX = AppController.width / 4;
        let offsetX = 5;
        Constants.COINS.forEach((coinValue) => {
            let coin: Coin = Coin.createCoin(coinValue);
            posX += coin.width / 2;
            coin.x = posX;
            coin.y = AppController.height / 2;
            posX += offsetX + coin.width / 2;
            let callback = () => {
                this.updateBetAmount(coin.getCoinValue());
            };
            coin.setButtonText(coinValue + '');
            coin.setCallback(callback);
            coin.zIndex = 2;
            this.addChild(coin);
            this.mChipsButtons.push(coin);
        });
    }

    public disableAllChipsButtons(): void {
        this.mChipsButtons.forEach((button) => {
            button.setButtonStatus(true);
        });
    }

    private updateBetAmount(addedAmount: number): void {
        console.warn('updateBetAmount: ' + addedAmount);
        this.mGameController.increaseBetAmount(addedAmount);
        this.updateBettingText();
    }
}
