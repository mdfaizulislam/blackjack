/**
 * Title: Lobby Scene
 * Description: Lobby Scene
 * Author: Md Faizul Islam
 * Date: 21/04/2023
 *
 */

// depenedencies
import { BalanceComponent } from '../components/BalanceComponent';
import { Button } from '../components/Button';
import { Coin } from '../components/Coin';
import { Constants } from '../constants';
import { AppController } from '../controllers/AppController';
import { SceneController } from '../controllers/SceneController';
import { AScene } from '../generic/AScene';
import { Helper } from '../generic/Helper';
import { Logger } from '../generic/Logger';
import { Container, Text } from 'pixi.js';

export class LobbyScene extends AScene {
    private mLogger: Logger;
    private mLobbyButtons: Map<string, Button> = new Map<string, Button>();
    private mBalanceComponent: BalanceComponent;
    private mBetAmountText: Text;
    private mActionMessage: Text;
    private mChipsButtons: Coin[] = [];
    public static createScene(): AScene {
        return new LobbyScene();
    }
    constructor() {
        super();
        this.mLogger = Logger.createLogger('LobbyScene', false);
        this.sceneName = 'Lobby Scene';
        this.mBalanceComponent = BalanceComponent.createBalanceComponent();
        AppController.getPersistantNode().getGameController().setBetAmount(0);
        this.mBetAmountText = new Text(
            'Betting: ' +
                AppController.getPersistantNode()
                    .getGameController()
                    .getBettingAmount(),
            Helper.getBettingTextStyle()
        );
        this.mActionMessage = new Text(
            'Click on Chips to set and increase bet \namounts. Bet can be increased while \nplaying also from info button',
            Helper.getActionMessageTextStyle()
        );
        this.init();
    }

    public onEnable(): void {
        this.mLogger.Log('onEnable');
        this.mBalanceComponent.addBalanceEventListener();
        this.mChipsButtons.forEach((coinButton) => {
            coinButton.addBalanceEventListener();
            coinButton.onBalanceUpdate();
        });
    }

    private init() {
        // this.addSceneTitle();
        this.initBalanceComponent();
        this.initBetComponent();
        this.initActionMessageComponent();
        // this.showFPS();
        this.addChipsButtons();
        this.addPlayButtons();
        this.mLogger.Log(
            'Player Balance: ' +
                AppController.getPersistantNode().getPlayer().getCurrentMoney()
        );
    }

    private initBalanceComponent(): void {
        this.mBalanceComponent.x = AppController.width / 2;
        this.mBalanceComponent.y = this.mBalanceComponent.height / 2 + 5;
        this.mBalanceComponent.zIndex = 10;
        this.addChild(this.mBalanceComponent);
    }

    private initBetComponent(): void {
        this.mBetAmountText.x = AppController.width / 2;
        this.mBetAmountText.y = AppController.height / 3;
        this.mBetAmountText.anchor.set(0.5, 0.5);
        this.mBetAmountText.zIndex = 10;
        this.addChild(this.mBetAmountText);
    }

    public updateBetMessage(): void {
        this.mBetAmountText.text =
            'Betting: ' +
            AppController.getPersistantNode()
                .getGameController()
                .getBettingAmount();
    }

    private initActionMessageComponent(): void {
        this.mActionMessage.x = AppController.width / 2;
        this.mActionMessage.y =
            this.mBetAmountText.y -
            this.mBetAmountText.height -
            this.mActionMessage.height;
        this.mActionMessage.anchor.set(0.5, 0.5);
        this.mActionMessage.zIndex = 10;
        this.addChild(this.mActionMessage);
    }

    private increaseBetAmount(bet: number): void {
        AppController.getPersistantNode()
            .getGameController()
            .increaseBetAmount(bet);
        this.updateBetMessage();
        let enablePlayButton: boolean =
            AppController.getPersistantNode()
                .getGameController()
                .getBettingAmount() > 0;
        this.mLobbyButtons.get('gameid')?.setButtonStatus(!enablePlayButton);
    }

    private addChipsButtons(): void {
        let container: Container = new Container();
        let posX = 0;
        let offsetX = 5;

        Constants.COINS.forEach((coinValue) => {
            let coin: Coin = Coin.createCoin(coinValue);
            posX += coin.width / 2;
            coin.x = posX;
            posX += offsetX + coin.width / 2;
            let callback = () => {
                this.increaseBetAmount(coin.getCoinValue());
            };
            coin.setButtonText(coinValue + '');
            coin.setCallback(callback);
            container.addChild(coin);
            this.mChipsButtons.push(coin);
        });

        container.x = AppController.width / 2 - container.width / 2;
        container.y = AppController.height / 2;
        this.addChild(container);
    }

    private addPlayButtons(): void {
        let container: Container = new Container();
        let posX = 0;
        let offsetX = 5;
        Constants.GAME_IDS.forEach((gameid) => {
            this.mLogger.Log('Game id: ' + gameid);
            let button: Button = Button.createButton(
                'sqaureButtonN',
                'sqaureButtonP',
                'sqaureButtonH',
                'sqaureButtonD'
            );
            button.name = gameid;
            button.anchor.set(0.5, 0.5);

            posX += button.width / 2;
            button.x = posX;
            posX += offsetX + button.width / 2;

            button.setButtonText(gameid);
            button.setCallback(this.onGameButtonPress.bind(this));
            container.addChild(button);

            this.mLobbyButtons.set('gameid', button);
            button.setButtonStatus(true);
        });
        container.x = AppController.width / 2 - container.width / 2;
        container.y = AppController.height - container.height / 2 - 10;
        this.addChild(container);
    }

    public onGameButtonPress(gameId: string): void {
        this.mLogger.Log('onLobbyButtonPress: ' + gameId);
        if (gameId == Constants.GAME_IDS[0]) {
            this.playBlackJack();
        } else {
            this.mLogger.Error(
                'something went wrong on lobby game button press, gameId: ' +
                    gameId,
                2
            );
        }
    }

    private playBlackJack(): void {
        SceneController.loadGameScene();
    }

    public onShow(): void {
        this.mLogger.Log('onShow');
    }

    public onHide(): void {
        this.mLogger.Log('onHide');
    }

    public onDisable(): void {
        this.mLogger.Log('onDisable');
        AppController.getPersistantNode()
            .getBalanceListener()
            .clearAllListener();
        this.removeChild();
    }
}
