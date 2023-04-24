import { Container, Sprite, Text } from 'pixi.js';
import { Logger } from '../generic/Logger';
import { Helper } from '../generic/Helper';
import { AppController } from '../controllers/AppController';

export class BalanceComponent extends Container {
    private mLogger: Logger;
    private mBalanceText: Text;
    private mCoinStack: Sprite;
    private mWidth: number;

    public static createBalanceComponent(): BalanceComponent {
        return new BalanceComponent();
    }
    constructor() {
        super();
        this.mLogger = Logger.createLogger('BalanceComponent', true);
        this.name = 'BalanceComponent';
        this.sortableChildren = true;
        this.mWidth = 120;

        // setup coin stack
        this.mCoinStack = Sprite.from('coin_stack');
        this.initCoinStack();

        // setup text
        this.mBalanceText = new Text('', Helper.getCurrenyTextStyle());
        this.initBalanceText();
    }

    private initCoinStack(): void {
        this.mCoinStack.anchor.set(0.5, 0.5);
        this.mCoinStack.scale.set(0.2, 0.2);
        this.mCoinStack.x = -this.mWidth / 2;
        this.mCoinStack.y = 0;
        this.zIndex = 3;
        this.addChild(this.mCoinStack);
    }

    private initBalanceText(): void {
        this.mBalanceText.anchor.set(0, 0.5);
        this.mBalanceText.x = this.mCoinStack.x + 30;
        this.mBalanceText.y = 0;
        this.mBalanceText.zIndex = 4;
        this.addChild(this.mBalanceText);

        this.updateBalanceText();
    }

    public addBalanceEventListener(): void {
        let callback = () => {
            this.updateBalanceText();
        };
        AppController.getPersistantNode()
            .getBalanceListener()
            .addCallbackListener(callback);
    }

    updateBalanceText(): void {
        let strBalance =
            '€' +
            AppController.getPersistantNode().getPlayer().getCurrentMoney();
        this.mLogger.Log('CurrentBalance: ' + strBalance);
        this.mBalanceText.text = strBalance;
    }
}
