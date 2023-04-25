/**
 * Title: AppController
 * Description: It will server as a persistant node for the entire game so that we can have accessibility of controllers from each game scene easily
 * Author: Md Faizul Islam
 * Date: 21/04/2023
 *
 */

import { Application } from 'pixi.js';
import { AScene } from '../generic/AScene';
import { Logger } from '../generic/Logger';
import { Helper } from '../generic/Helper';
import { PersistantNode } from '../components/PersistantNode';
// import { LobbyScene } from "../scenes/LobbyScene";

export class AppController {
    // Safely store variables for our game
    private static app: Application;
    private static currentScene: AScene;
    public static visible: boolean;

    // Width and Height are read-only after creation (for now)
    private static _width: number;
    private static _height: number;
    private static _persistantNode: PersistantNode;

    // With getters but not setters, these variables become read-only
    public static get width(): number {
        return AppController._width;
    }
    public static get height(): number {
        return AppController._height;
    }

    public static getApp(): Application {
        return AppController.app;
    }

    public static getPersistantNode(): PersistantNode {
        return AppController._persistantNode;
    }

    private static mLogger = Logger.createLogger('AppController', false);

    // Use this function ONCE to start the entire machiner
    public static initialize(
        width: number,
        height: number,
        background: number
    ): void {
        // store our width and height
        AppController._width = width;
        AppController._height = height;

        // Create our pixi app
        AppController.app = new Application({
            view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        AppController.visible = true;
        // Add the ticker
        AppController.app.ticker.add(AppController.update);
        // AppController.app.ticker.

        // listen for the browser telling us that the screen size changed
        window.addEventListener('resize', AppController.resize);
        document.addEventListener('visibilitychange', this.onVisibilityChange);

        // call it manually once so we are sure we are the correct size after starting
        AppController.resize();
        AppController._persistantNode = PersistantNode.createPersistantNode();
    }

    private static onVisibilityChange(): void {
        const isVisible = !document.hidden;
        AppController.mLogger.Log(
            'AppVisibility: ' + (isVisible ? 'visible' : 'not visible')
        );
        AppController.visible = isVisible;

        if (AppController.currentScene) {
            if (AppController.visible) {
                AppController.currentScene.onShow();
            } else {
                AppController.currentScene.onHide();
            }
        }
    }

    public static resize(): void {
        AppController.mLogger.Log('Resizing window....');

        // uniform scale for our game
        const scale = Math.min(
            Helper.getScreenWidth() / AppController.width,
            Helper.getScreenHeight() / AppController.height
        );

        // the "uniformly englarged" size for our game
        const enlargedWidth = Math.floor(scale * AppController.width);
        const enlargedHeight = Math.floor(scale * AppController.height);

        // now we use css trickery to set the sizes and margins
        if (AppController.app.view.style) {
            AppController.app.view.style.width = `${enlargedWidth}px`;
            AppController.app.view.style.height = `${enlargedHeight}px`;
        }
    }

    // Call this function when you want to go to a new scene
    public static changeScene(newScene: AScene): void {
        // Remove and destroy old scene... if we had one..
        if (AppController.currentScene) {
            AppController.app.stage.removeChild(AppController.currentScene);
            AppController.currentScene.onDisable();
            AppController.currentScene.destroy({ children: true });
        }

        // Add the new one
        AppController.currentScene = newScene;
        AppController.app.stage.addChild(AppController.currentScene);
        AppController.mLogger.Log(newScene.sceneName);
        AppController.currentScene.onEnable();
    }

    public static getCurrentScene(): AScene {
        return AppController.currentScene;
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    private static update(delta: number): void {
        if (AppController.currentScene) {
            AppController.currentScene.update(delta);
        }
    }
}
