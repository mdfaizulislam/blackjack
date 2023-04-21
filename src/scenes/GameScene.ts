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

// import { Texture } from 'pixi.js';
import { AppController } from '../controllers/AppController';
import { AScene } from '../generic/AScene';
// import { Helper } from '../generic/Helper';
import { Logger } from '../generic/Logger';

export class GameScene extends AScene {
    private mLogger: Logger;

    public static createScene(): AScene {
        return new GameScene();
    }
    constructor() {
        super();
        this.mLogger = Logger.createLogger('GameScene', true);
        this.sceneName = 'GameScene';
        this.init();
    }

    public onEnable(): void {}

    onShow(): void {
        this.mLogger.Log('onShow');
    }

    private init() {
        this.addBackButtonButton();
        this.addGameTitle();
        this.showFPS();
    }
    override update(delta: number): void {
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
        this.removeAll();
    }

    public removeAll(): void {
        this.removeChild();
    }
}
