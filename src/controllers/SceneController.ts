/**
 * Title: Scene Controller
 * Description: Scene Controller is being used to load scenes with the help of AppController
 * Author: Md Faizul Islam
 * Date: 21/04/2023
 *
 */

import { GameScene } from '../scenes/GameScene';
import { LoadingScene } from '../scenes/LoadingScene';
import { LobbyScene } from '../scenes/LobbyScene';
import { AppController } from './AppController';

export class SceneController {
    public static loadLoadingScene(): void {
        AppController.changeScene(LoadingScene.createScene());
    }

    /**
     * loadLobbyScene
     */
    public static loadLobbyScene() {
        AppController.changeScene(LobbyScene.createScene());
    }

    /**
     * loadGameScene
     */
    public static loadGameScene() {
        AppController.changeScene(GameScene.createScene());
    }
}
