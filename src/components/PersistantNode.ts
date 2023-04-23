import { Container } from 'pixi.js';
import { Player } from '../models/Player';
import { Listener } from '../models/Listener';
import { GameController } from '../controllers/GameController';

export class PersistantNode {
    private mPlayer: Player;
    private mBalanceListeners: Listener;
    private mGameController: GameController;
    public static createPersistantNode(): PersistantNode {
        return new PersistantNode();
    }
    constructor() {
        this.mPlayer = Player.createPlayer();
        this.mBalanceListeners = Listener.createListener();
        this.mGameController = GameController.createGameController();
    }

    public getPlayer(): Player {
        return this.mPlayer;
    }

    public getGameController(): GameController {
        return this.mGameController;
    }

    public getBalanceListener(): Listener {
        return this.mBalanceListeners;
    }
}
