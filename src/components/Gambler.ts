import { Container, Sprite, Ticker } from 'pixi.js';
import { Player } from '../models/Player';
import { AppController } from '../controllers/AppController';
import { Logger } from '../generic/Logger';
enum Gambler_State {
    zoom_in = 1,
    zoom_out = 2
}
export class Gambler extends Container {
    private mLogger: Logger;
    private mPlayer: Player;
    private mProfilePhoto: Sprite;
    private mFrontImg: Sprite;
    private mBackImg: Sprite;
    private mScaleState: Gambler_State = Gambler_State.zoom_out;
    private mMaxScale: number = 1.25;
    private mTicker: Ticker | null = null;
    // private mScore: number = 0;
    // private mCards: Card[] = [];
    public static createGampler(player: Player): Gambler {
        return new Gambler(player);
    }
    constructor(player: Player) {
        super();
        this.mLogger = Logger.createLogger('Gambler', false);
        this.sortableChildren = true;
        this.mPlayer = player;
        this.mProfilePhoto = Sprite.from('gambler');
        this.mFrontImg = Sprite.from('gamblerFront');
        this.mBackImg = Sprite.from('GamblerBack');
        this.mBackImg.width = this.mFrontImg.width;
        this.mBackImg.height = this.mFrontImg.height;

        this.initGamblerFront();
        this.initGamblerBack();
        this.initGamblerProfilePhoto();
    }

    private initGamblerProfilePhoto(): void {
        this.mProfilePhoto.anchor.set(0.5, 0.5);
        this.mProfilePhoto.zIndex = 5;
        this.mProfilePhoto.scale.set(0.8, 0.8);
        this.addChild(this.mProfilePhoto);
        this.mProfilePhoto.x = 0;
        this.mProfilePhoto.y = 0;
    }

    private initGamblerFront(): void {
        this.mFrontImg.anchor.set(0.5, 0.5);
        this.mFrontImg.zIndex = 3;
        this.addChild(this.mFrontImg);
        this.mFrontImg.x = 0;
        this.mFrontImg.y = 0;
    }

    private initGamblerBack(): void {
        this.mBackImg.anchor.set(0.5, 0.5);
        this.mBackImg.zIndex = 1;
        this.addChild(this.mBackImg);
        this.mBackImg.x = 0;
        this.mBackImg.y = 0;
    }

    public onGamblerTurn(isActive: boolean) {
        this.mScaleState = isActive
            ? Gambler_State.zoom_in
            : Gambler_State.zoom_out;
        if (!this.mTicker) {
            this.mTicker = AppController.getApp().ticker.add(
                this.updateBackImage,
                this
            );
        }
    }

    private onGamblerTickerActionComplete(): void {
        if (this.mTicker) {
            AppController.getApp().ticker.remove(this.updateBackImage, this);
            this.mTicker = null;
        }
    }

    public getUser(): Player {
        return this.mPlayer;
    }

    private updateBackImage(delta: number): void {
        this.mLogger.Log('delta: ' + delta);
        if (this.mScaleState == Gambler_State.zoom_in) {
            this.mBackImg.scale.x += 0.05;
            this.mBackImg.scale.y += 0.05;
            if (this.mBackImg.scale.x >= this.mMaxScale) {
                this.mBackImg.scale.x = this.mMaxScale;
                this.mBackImg.scale.y = this.mMaxScale;
                this.onGamblerTickerActionComplete();
            }
        } else {
            this.mBackImg.scale.x -= 0.05;
            this.mBackImg.scale.y -= 0.05;
            if (this.mBackImg.scale.x <= 1) {
                this.mBackImg.scale.x = 1;
                this.mBackImg.scale.y = 1;
                this.onGamblerTickerActionComplete();
            }
        }
    }

    // public setScore(score: number): void {
    //     this.mScore = score;
    // }

    // public getScore(): number {
    //     return this.mScore;
    // }

    // public addCard(card: Card): void {
    //     this.mCards.push(card);
    // }

    // public getCards(): Card[] {
    //     return this.mCards;
    // }
}
