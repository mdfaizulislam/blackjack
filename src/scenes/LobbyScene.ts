/**
 * Title: Lobby Scene
 * Description: Lobby Scene
 * Author: Md Faizul Islam
 * Date: 21/04/2023
 *
 */

// depenedencies
import { Button } from '../components/Button';
import { Constants } from '../constants';
import { AppController } from '../controllers/AppController';
import { SceneController } from '../controllers/SceneController';
import { AScene } from '../generic/AScene';
import { Logger } from '../generic/Logger';

export class LobbyScene extends AScene {
    private mLogger: Logger;
    private mLobbyButtons: Button[] = [];

    public static createScene(): AScene {
        return new LobbyScene();
    }
    constructor() {
        super();
        this.mLogger = Logger.createLogger('LobbyScene', true);
        this.sceneName = 'Lobby Scene';
        this.init();
    }

    public onEnable(): void {
        this.mLogger.Log('onEnable');
    }

    private init() {
        this.addGameTitle();
        this.showFPS();
        this.addLobbyButtons();
    }

    private addLobbyButtons(): void {
        let totalGames: number = Object.keys(Constants.GAME_IDS).length;
        this.mLogger.Log('Total Games: ' + totalGames);
        for (let i = totalGames - 1; i > -1; i -= 1) {
            let gameid = Constants.GAME_IDS[totalGames - i - 1];
            this.mLogger.Log('Game id: ' + gameid);
            let button: Button = Button.createButton(
                'buttonGreenNormal',
                'buttonGreenPressed',
                'buttonGreenHover',
                'buttonGreenDisabled'
            );
            button.name = gameid;
            button.anchor.set(0.5, 0.5);
            button.x = AppController.width / 2;
            button.y = AppController.height - (i + 1) * (button.height + 50);
            button.setButtonText(gameid);
            button.setCallback(this.onGameButtonPress.bind(this));
            this.addChild(button);
            this.mLobbyButtons.push(button);
        }
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
    }
}
