import { AppController } from '../controllers/AppController';
import { Logger } from '../generic/Logger';

export class Player {
    private mBalance: number = 0;
    private mLogger: Logger;

    public static createPlayer(): Player {
        return new Player();
    }
    constructor() {
        this.mBalance = 60;
        this.mLogger = Logger.createLogger('Player', false);
    }

    getCurrentMoney(): number {
        return this.mBalance;
    }

    public addMoney(money: number): void {
        if (money < 0) {
            throw new Error("Can't add negative money to player balance");
        }
        this.mBalance += money;
        this.onBalanceUpdate();
    }

    public deductMoney(money: number): void {
        if (this.mBalance - money < 0) {
            this.mLogger.Error('Donot have enough money to deduct');
            throw new Error('Donot have enough money to deduct');
        }

        this.mBalance -= money;
        this.onBalanceUpdate();
    }

    public hasEnoughMoney(money: number): boolean {
        return this.mBalance - money >= 0;
    }

    private onBalanceUpdate(): void {
        this.mLogger.Log('Current Balance: ' + this.mBalance);
        AppController.getPersistantNode()
            .getBalanceListener()
            .getList()
            .forEach((callback) => {
                if (callback) {
                    callback();
                }
            });
    }
}
