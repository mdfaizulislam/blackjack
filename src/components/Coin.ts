import { Sprite, Text } from 'pixi.js';
import { Helper } from '../generic/Helper';
import { Logger } from '../generic/Logger';
import { Button } from './Button';
import { AppController } from '../controllers/AppController';

export class Coin extends Button {
    private mValue: number;

    public static createCoin(value: number) {
        let card = new Coin(value);
        return card;
    }

    constructor(value: number) {
        super('coinEnabled', 'coinEnabled', 'coinEnabled', 'coinDisabled');
        this.mValue = value;
        this.setButtonText(value + '');
    }

    public addBalanceEventListener(): void {
        AppController.getPersistantNode()
            .getBalanceListener()
            .addCallbackListener(this.onBalanceUpdate.bind(this));
    }

    public onBalanceUpdate(): void {
        let isPurchasable = AppController.getPersistantNode()
            .getPlayer()
            .hasEnoughMoney(this.mValue);
        this.setButtonStatus(!isPurchasable);
    }

    public getCoinValue(): number {
        this.mLogger.Log('value: ' + this.mValue);
        return this.mValue;
    }
}
