import { Container, Text, Ticker } from 'pixi.js';
import { Logger } from '../generic/Logger';
import { Helper } from '../generic/Helper';
import { AppController } from '../controllers/AppController';

export class GameResultMessage extends Container {
    private mLogger: Logger;
    private mResultText: Text;
    private mTicker: Ticker | null = null;
    private mDefaultScale: number = 1;

    public static createGameResultMessage(): GameResultMessage {
        return new GameResultMessage();
    }
    constructor() {
        super();
        this.mLogger = Logger.createLogger('GameResultMessage', false);
        this.name = 'GameResultMessage';
        this.sortableChildren = true;

        // setup text
        this.mResultText = new Text('', Helper.getResultTextStyle());
        this.initResultText();
    }

    private initResultText(): void {
        this.mResultText.anchor.set(0.5, 0.5);
        this.mResultText.x = 0;
        this.mResultText.y = 0;
        this.mResultText.zIndex = 4;
        this.addChild(this.mResultText);
    }

    setResultText(message: string): void {
        this.mLogger.Log(message);

        // set message
        this.mResultText.text = message;

        // update scale
        this.mDefaultScale = this.mResultText.scale.x;
        this.mResultText.scale.set(0, 0);

        // add callback to ticker
        if (!this.mTicker) {
            this.mTicker = AppController.getApp().ticker.add(
                this.updateScale,
                this
            );
        }
    }

    private onScaleComplete(): void {
        if (this.mTicker) {
            AppController.getApp().ticker.remove(this.updateScale, this);
            this.mTicker = null;
        }
    }

    private updateScale(delta: number): void {
        this.mLogger.Log('delta: ' + delta);
        this.mResultText.scale.x += 0.05;
        this.mResultText.scale.y += 0.05;
        if (this.mResultText.scale.x >= this.mDefaultScale) {
            this.mResultText.scale.x = this.mDefaultScale;
            this.mResultText.scale.y = this.mDefaultScale;
            this.onScaleComplete();
        }
    }
}
