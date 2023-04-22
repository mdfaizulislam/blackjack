import { Sprite, Texture } from 'pixi.js';
import { Helper } from '../generic/Helper';
import { Logger } from '../generic/Logger';

export class Card extends Sprite {
    private mLogger: Logger;
    private mValue: number;
    private mSpriteBack: Sprite;

    public static createCard(value: number) {
        let frontImage = 'card' + value.toString();
        let card = new Card(value, frontImage);
        return card;
    }

    constructor(value: number, front: string) {
        super();
        this.mLogger = Logger.createLogger('Card', true);
        this.mValue = value;
        this.texture = Helper.getTexture(front);
        this.width = this.texture.width;
        this.height = this.texture.height;
        this.anchor.set(0.5, 0.5);

        this.mSpriteBack = Sprite.from('joker');
        this.mSpriteBack.anchor.set(0.5, 0.5);
        this.mSpriteBack.zIndex = 3;
        this.addChild(this.mSpriteBack);
    }

    public hideCardFront(): void {
        this.mSpriteBack.visible = true;
    }

    public showCardFront(): void {
        this.mSpriteBack.visible = false;
    }

    public isAce(): boolean {
        return this.mValue % 13 == 0;
    }

    public getCardValue(): number {
        this.mLogger.Log('value: ' + this.mValue);
        let value = this.mValue % 13;
        if (value == 0) {
            // return 1 || 11
            return 11; //
        } else {
            return value < 9 ? value + 1 : 10;
        }
    }
}
