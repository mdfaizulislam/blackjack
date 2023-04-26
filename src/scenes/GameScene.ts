/**
 * Title: Particles - Awesome Fire Tool
 * Description: open challenge there. Particles - make a demo that shows an awesome fire effect. Please keep
 * number of images low (max 10 sprites on screen at once). Feel free to use existing libraries how you would
 *  use them in a real project.
 *
 * Author: Md Faizul Islam
 * Date: 08/01/2023
 *
 */

import { BalanceComponent } from '../components/BalanceComponent';
import { Button } from '../components/Button';
import { Gambler } from '../components/Gambler';
import { AppController } from '../controllers/AppController';
import { AScene } from '../generic/AScene';
import { Logger } from '../generic/Logger';
import { CardHolder } from '../components/CardHolder';
import { GameResultMessage } from '../components/GameResultMessage';
import { BetInfoComponent } from '../components/BetInfoComponent';
import { WinAnimation } from '../components/WinAnimation';
import { Dealer } from '../components/Dealer';

export class GameScene extends AScene {
    private mLogger: Logger;
    private mBalanceComponent: BalanceComponent;
    private mWinAnimation: WinAnimation;
    private mStandButton: Button;
    private mHitButton: Button;
    private mInfoButton: Button;
    private mBetInfoComponent: BetInfoComponent;
    private mGambler: Gambler;
    private mDealerCardHolder: CardHolder;
    private mGamblerCardHolder: CardHolder;
    private mGameResultMessage: GameResultMessage;
    public static createScene(): AScene {
        return new GameScene();
    }
    constructor() {
        super();
        this.mLogger = Logger.createLogger('GameScene', false);
        this.sceneName = 'GameScene';
        this.mBalanceComponent = BalanceComponent.createBalanceComponent();
        this.mGambler = Gambler.createGampler(
            AppController.getPersistantNode().getPlayer()
        );
        this.mWinAnimation = WinAnimation.createWinAnimation();
        this.mHitButton = Button.createButton(
            'sqaureButtonN',
            'sqaureButtonP',
            'sqaureButtonH',
            'sqaureButtonD'
        );
        this.mStandButton = Button.createButton(
            'sqaureButtonN',
            'sqaureButtonP',
            'sqaureButtonH',
            'sqaureButtonD'
        );
        this.mInfoButton = Button.createButton('buttonInfo');
        this.mBetInfoComponent = BetInfoComponent.createBetInfoComponent();

        this.mDealerCardHolder = CardHolder.createCardHolder();
        this.mGamblerCardHolder = CardHolder.createCardHolder();
        this.mGameResultMessage = GameResultMessage.createGameResultMessage();

        this.init();
    }

    private init() {
        // this.addBackButtonButton();
        // this.addSceneTitle();
        // this.showFPS();
        this.initBalanceComponent();
        this.initCardHolders();
        this.addDealer();
        this.initGameResultComponent();
        this.initWinAnimation();
        // this.addParticleExplotionHolder();
        this.initGambler();
        this.initHitButton();
        this.initStandButton();
        this.initInfoButton();
        this.initBetInfoComponent();
        this.setGamblerButtonInteractibility(false);
    }

    public onEnable(): void {
        this.mBalanceComponent.addBalanceEventListener();
        this.mBetInfoComponent.addBalanceEventListener();
        AppController.getPersistantNode()
            .getGameController()
            .setGameGameScene(this);

        AppController.getPersistantNode().getGameController().startGameplay();
    }

    onShow(): void {
        this.mLogger.Log('onShow');
    }

    private initBalanceComponent(): void {
        this.mBalanceComponent.x = AppController.width / 2;
        this.mBalanceComponent.y = this.mBalanceComponent.height / 2 + 5;
        this.mBalanceComponent.zIndex = 11;
        this.addChild(this.mBalanceComponent);
    }

    private initCardHolders(): void {
        this.mDealerCardHolder.x = AppController.width / 2;
        this.mDealerCardHolder.y = AppController.height / 3;
        this.mDealerCardHolder.zIndex = 1;
        this.addChild(this.mDealerCardHolder);

        this.mGamblerCardHolder.x = AppController.width / 2;
        this.mGamblerCardHolder.y = (2 * AppController.height) / 3;
        this.mGamblerCardHolder.zIndex = 2;
        this.addChild(this.mGamblerCardHolder);
    }

    private addDealer(): void {
        let dealer: Dealer = Dealer.createDealer();
        dealer.anchor.set(0.5, 0.5);
        dealer.x = this.mDealerCardHolder.x;
        dealer.y = this.mDealerCardHolder.y - dealer.height;
        dealer.zIndex = 0;
        this.addChild(dealer);
    }

    private initGameResultComponent(): void {
        this.mGameResultMessage.x = AppController.width / 2;
        this.mGameResultMessage.y =
            this.mBalanceComponent.y +
            this.mBalanceComponent.height +
            this.mGameResultMessage.height;
        this.mGameResultMessage.zIndex = 6;
        this.addChild(this.mGameResultMessage);
    }

    private initWinAnimation(): void {
        this.mWinAnimation.x = AppController.width / 2;
        this.mWinAnimation.y = AppController.height / 2;
        this.mWinAnimation.zIndex = 100;
        this.addChild(this.mWinAnimation);
    }

    public showGameEndStatus(status: string): void {
        this.mGameResultMessage.setResultText(status);
    }

    public showParticle(): void {
        this.mWinAnimation.showExplosionAnimation();
    }

    private initHitButton(): void {
        this.mHitButton.name = 'Hit';
        this.mHitButton.anchor.set(0.5, 0.5);
        this.mHitButton.zIndex = 4;
        this.mHitButton.x =
            this.mGambler.x + this.mGambler.width / 2 + this.mHitButton.width;
        this.mHitButton.y = this.mGambler.y;
        this.mHitButton.setButtonText('Hit');
        this.mHitButton.setCallback(this.onHitButtonPress.bind(this));

        this.addChild(this.mHitButton);
    }

    private onHitButtonPress(): void {
        AppController.getPersistantNode()
            .getGameController()
            .onHitButtonPress();
    }

    private initStandButton(): void {
        this.mStandButton.name = 'Stand';
        this.mStandButton.anchor.set(0.5, 0.5);
        this.mStandButton.zIndex = 4;
        this.mStandButton.x =
            this.mGambler.x - this.mGambler.width / 2 - this.mStandButton.width;
        this.mStandButton.y = this.mGambler.y;
        this.mStandButton.setButtonText('Stand');
        this.mStandButton.setCallback(this.onStandButtonPress.bind(this));

        this.addChild(this.mStandButton);
    }

    private onStandButtonPress() {
        AppController.getPersistantNode()
            .getGameController()
            .onStandButtonPress();
    }

    private initInfoButton(): void {
        this.mInfoButton.name = 'Info';
        this.mInfoButton.anchor.set(0.5, 0.5);
        this.mInfoButton.scale.set(0.75, 0.75);
        this.mInfoButton.zIndex = 4;
        this.mInfoButton.x =
            AppController.width - this.mInfoButton.width / 2 - 5;
        this.mInfoButton.y = this.mInfoButton.height / 2 + 5;
        // this.mInfoButton.setButtonText('Stand');
        this.mInfoButton.setCallback(this.onInfoButtonPress.bind(this));

        this.addChild(this.mInfoButton);
    }

    public updateInfoButtonVisibility(): void {
        this.mInfoButton.visible = !this.mInfoButton.visible;
    }

    private onInfoButtonPress(): void {
        this.mLogger.Log('Info button pressed');
        this.mBetInfoComponent.updateComponentVisibility();
    }

    private initBetInfoComponent(): void {
        this.mBetInfoComponent.zIndex = 7;
        this.addChild(this.mBetInfoComponent);
    }

    public disableChipsButton(): void {
        this.mBetInfoComponent.disableAllChipsButtons();
    }

    public setGamblerButtonInteractibility(isPressable: boolean) {
        this.mHitButton.setButtonStatus(!isPressable);
        this.mStandButton.setButtonStatus(!isPressable);
        this.mGambler.onGamblerTurn(isPressable);
    }

    private initGambler(): void {
        this.mGambler.x = AppController.width / 2;
        this.mGambler.y = AppController.height - this.mGambler.height / 2 - 10;
        this.mGambler.zIndex = 3;
        this.addChild(this.mGambler);
    }

    public sendCardToGambler(cardValue: number, onCompleteCb: Function): void {
        this.mLogger.Log('sendCardToGambler: v ' + cardValue);
        this.mGamblerCardHolder.addCard(cardValue, true, onCompleteCb);
    }

    public sendCardToDealer(
        cardValue: number,
        shouldShowFront: boolean,
        onCompleteCb: Function
    ): void {
        this.mLogger.Log('sendCardToDealer: v ' + cardValue);
        this.mDealerCardHolder.addCard(
            cardValue,
            shouldShowFront,
            onCompleteCb
        );
    }

    override update(delta: number): void {
        // this.mLogger.Log('update');
        if (!AppController.visible) {
            return;
        }
        if (this.mTextFPS) {
            this.mTextFPS.text =
                'FPS: ' + AppController.getApp().ticker.FPS.toFixed(2);
        }
    }

    onHide(): void {
        this.mLogger.Log('onHide');
    }
    onDisable(): void {
        this.mLogger.Warn('onDisable');
        AppController.getPersistantNode()
            .getBalanceListener()
            .clearAllListener();
        this.mWinAnimation.stopAnimations();
        this.removeChild();
    }
}
