/**
 * Title: Abstract Scene
 * Description: Interface Scene
 * Author: Md Faizul Islam
 * Date: 21/04/2023
 *
 */

import { Container, Text } from 'pixi.js';
import { Button } from '../components/Button';
import { AppController } from '../controllers/AppController';
import { Helper } from './Helper';
import { IScene } from './IScene';

export abstract class AScene extends Container implements IScene {
    public mlabelTitle: Text | null = null;
    public mButton: Button | null = null;
    public mTextFPS: Text | null = null;

    public set sceneName(_sceneName: string) {
        this.name = _sceneName;
    }
    public get sceneName(): string {
        return this.name ? this.name : '';
    }

    constructor() {
        super();
        this.name = '';
        this.sortableChildren = true;
    }

    protected addGameTitle(): void {
        this.mlabelTitle = new Text(
            this.name ? this.name : '',
            Helper.getSceneTitleTextStyle()
        );
        this.mlabelTitle.anchor.set(0.5, 0.5);
        // let backButtonWidth: number = this.mButton ? this.mButton.width : 10;
        this.mlabelTitle.x = Helper.getScreenWidth() / 2; //this.mlabelTitle.width / 2 + backButtonWidth;
        this.mlabelTitle.y = this.mlabelTitle.height / 2;
        this.addChild(this.mlabelTitle);
        this.mlabelTitle.zIndex = 100;
    }

    protected addBackButtonButton(): void {
        this.mButton = Button.createButton('buttonBack');
        this.mButton.setCallback(this.onBackButtonPress.bind(this));
        this.mButton.anchor.set(0.5, 0.5);
        this.mButton.scale.set(0.65, 0.65);
        this.mButton.x = this.mButton.width / 2;
        this.mButton.y = this.mButton.height / 2;
        this.mButton.setButtonText('Back');
        this.addChild(this.mButton);
        this.mButton.zIndex = 100;
    }

    protected onBackButtonPress(): void {
        AppController.openLobbyScene();
    }

    public showFPS(): void {
        this.mTextFPS = new Text('FPS: ', Helper.getSceneTitleTextStyle());
        this.mTextFPS.anchor.set(0.5, 0.5);
        this.mTextFPS.x = AppController.width - this.mTextFPS.width - 5;
        this.mTextFPS.y = this.mTextFPS.height / 2;
        this.addChild(this.mTextFPS);
        this.mTextFPS.zIndex = 100;
    }

    update(delta: number): void {
        if (this.mTextFPS) {
            this.mTextFPS.text =
                'FPS: ' + AppController.getApp().ticker.FPS.toFixed(2);
        }
    }

    abstract onEnable(): void;
    abstract onDisable(): void;

    abstract onShow(): void;
    abstract onHide(): void;
}
