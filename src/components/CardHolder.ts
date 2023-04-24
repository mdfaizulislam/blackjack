import { Container } from 'pixi.js';
import { Card } from './Card';
import { AppController } from '../controllers/AppController';
import gsap from 'gsap';
import { Logger } from '../generic/Logger';

export class CardHolder extends Container {
    private mLogger: Logger;
    private mCards: Card[] = [];
    private mStartPosX: number = 0;
    private mOffsetX: number = 5;
    private mMoveDuration: number = 1;
    public static createCardHolder(): CardHolder {
        return new CardHolder();
    }
    constructor() {
        super();
        this.mLogger = Logger.createLogger('CardHolder', false);
        this.sortableChildren = true;
    }

    public addCard(
        cardValue: number,
        shouldShowFront: boolean,
        onCompleteCb: Function
    ): void {
        let card: Card = Card.createCard(cardValue);
        card.x = 0;
        card.y = -AppController.height / 2 - card.height;
        this.addChild(card);
        this.mCards.push(card);

        this.mStartPosX += card.width / 2;

        let tween = gsap.to(card, {
            x: this.mStartPosX,
            y: 0,
            duration: this.mMoveDuration
        });

        this.mStartPosX += card.width / 2 + this.mOffsetX;

        let callback = () => {
            if (shouldShowFront) {
                card.showCardFront();
            }
            this.mLogger.Log('Width: ' + this.width);
            onCompleteCb(card);
        };
        tween.eventCallback('onComplete', callback);

        let holderTween = gsap.to(this, {
            x:
                AppController.width / 2 -
                (this.mCards.length * card.width) / 2 -
                (this.mOffsetX * this.mCards.length) / 2,
            y: this.y,
            duration: this.mMoveDuration
        });

        let cb = () => {
            this.mLogger.Log('posX: ' + this.x);
        };
        holderTween.eventCallback('onComplete', cb);
    }
}
