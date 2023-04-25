import { Sprite } from 'pixi.js';
import { Helper } from '../generic/Helper';

export class Card extends Sprite {
    private mValue: number;
    private mSpriteBack: Sprite;

    public static createCard(value: number) {
        let frontImage = 'card' + value.toString();
        let card = new Card(value, frontImage);
        return card;
    }

    constructor(value: number, front: string) {
        super();
        this.mValue = value % 13;
        this.texture = Helper.getTexture(front);
        this.width = this.texture.width;
        this.height = this.texture.height;
        this.anchor.set(0.5, 0.5);

        this.mSpriteBack = Sprite.from('joker');
        this.mSpriteBack.anchor.set(0.5, 0.5);
        this.mSpriteBack.zIndex = 3;
        this.addChild(this.mSpriteBack);
    }

    public showCardFront(): void {
        this.mSpriteBack.visible = false;
    }

    public isAce(): boolean {
        return this.mValue == 0;
    }

    public getCardValue(minValue: boolean = true): number {
        if (this.isAce()) {
            return minValue ? 1 : 11;
        } else {
            return this.mValue < 9 ? this.mValue + 1 : 10;
        }
    }
}
