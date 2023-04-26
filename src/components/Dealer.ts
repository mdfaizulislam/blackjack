import { Sprite, Text } from 'pixi.js';
import { Helper } from './../generic/Helper';

export class Dealer extends Sprite {
    public static createDealer(): Dealer {
        return new Dealer();
    }

    constructor() {
        super(Helper.getTexture('gambler'));
        this.addDealerText();
    }
    private addDealerText(): void {
        let dealerText = new Text('Dealer', Helper.getSceneTitleTextStyle());
        dealerText.anchor.set(0.5, 0.5);
        dealerText.x = 0;
        dealerText.y = -this.height / 2 - dealerText.height / 2;
        dealerText.zIndex = 1;
        this.addChild(dealerText);
    }
}
