/**
 * Title: Loading Scene
 * Description: Loading Scene
 * Author: Md Faizul Islam
 * Date: 08/01/2023
 *
 */

// depenedencies
import { Container, Graphics } from 'pixi.js';
import { AppController } from '../controllers/AppController';
import { AssetsController } from '../controllers/AssetsController';
import { SceneController } from '../controllers/SceneController';
import { AScene } from '../generic/AScene';
import { Logger } from '../generic/Logger';

export class LoadingScene extends AScene {
    private mLogger: Logger;
    private loaderBar: Container;
    private loaderBarBoder: Graphics;
    private loaderBarFill: Graphics;

    public static createScene(): AScene {
        return new LoadingScene();
    }

    constructor() {
        super();
        this.mLogger = Logger.createLogger('LoadingScene', true);
        this.sceneName = 'LoadingScene';

        // console.log(this.screenWidth, this.screenHeight);
        const loaderBarWidth = AppController.width * 0.8; // just an auxiliar variable
        // the fill of the bar.
        this.loaderBarFill = new Graphics();
        this.loaderBarFill.beginFill(0x008800, 1);
        this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
        this.loaderBarFill.endFill();
        this.loaderBarFill.scale.x = 0; // we draw the filled bar and with scale we set the %

        // The border of the bar.
        this.loaderBarBoder = new Graphics();
        this.loaderBarBoder.lineStyle(10, 0x0, 1);
        this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50);

        // Now we keep the border and the fill in a container so we can move them together.
        this.loaderBar = new Container();
        this.loaderBar.addChild(this.loaderBarFill);
        this.loaderBar.addChild(this.loaderBarBoder);
        //Looks complex but this just centers the bar on screen.
        this.loaderBar.position.x =
            (AppController.width - this.loaderBar.width) / 2;
        this.loaderBar.position.y =
            (AppController.height - this.loaderBar.height) / 2;
        this.addChild(this.loaderBar);

        AssetsController.getInstance().loadAppAssets(
            this.onAppLoadingComplete.bind(this),
            this.onAppLoadingProgress.bind(this)
        );
    }

    private onAppLoadingProgress(progressRatio: number): void {
        // progressRatio goes from 0 to 1, so set it to scale
        this.mLogger.Log(
            'onAppLoadingProgress: ' + Math.floor(progressRatio * 100)
        );
        this.loaderBarFill.scale.x = progressRatio;
    }

    private onAppLoadingComplete(): void {
        this.mLogger.Log('App Loading Complete');
        SceneController.loadLobbyScene();
    }

    onHide(): void {
        this.mLogger.Log('onHide');
    }

    onShow(): void {
        this.mLogger.Log('onShow');
    }
    public onEnable(): void {}

    public onDisable(): void {
        this.removeAll();
    }

    public removeAll(): void {
        this.loaderBar.removeFromParent();
        this.removeChild();
        this.children.forEach((child) => {
            if (child) {
                child.removeFromParent();
            }
        });
    }
}
