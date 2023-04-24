import { Card } from '../components/Card';
import { Gambler } from '../components/Gambler';
import { Constants } from '../constants';
import { Logger } from '../generic/Logger';
import { CardDeck } from '../models/CardDeck';
import { GameScene } from '../scenes/GameScene';
import { AppController } from './AppController';
import { SceneController } from './SceneController';

export class GameController {
    private mLogger: Logger;
    private mBetAmount: number = 0;
    private mGameScene: GameScene | null = null;
    private mDealerCards: Card[] = [];
    private mGamblerCards: Card[] = [];
    private mGamblerScore: number = 0;
    private mCardDeck: CardDeck;
    private mDistributedCardCount: number = 0;
    public static createGameController(): GameController {
        return new GameController();
    }

    constructor() {
        this.mLogger = Logger.createLogger('GameController', true);
        this.mCardDeck = CardDeck.createCardDeck();
    }

    setGameGameScene(gameScene: GameScene) {
        this.mGameScene = gameScene;
    }

    public setBetAmount(betAmount: number): void {
        this.mBetAmount = betAmount;
    }

    private getRewardAmount(rewardMultiplier: number): number {
        let reward = this.mBetAmount * rewardMultiplier;
        this.mLogger.Log(
            'reward: ' +
                reward +
                ' bet: ' +
                this.mBetAmount +
                ' multiplier: ' +
                rewardMultiplier
        );
        return reward;
    }

    public startGameplay(): void {
        this.mLogger.Log('startGameplay');

        // get new card deck with shuffle
        this.mCardDeck = CardDeck.createCardDeck();

        // reset all flags
        this.mDistributedCardCount = 0;
        this.mGamblerCards.length = 0;
        this.mDealerCards.length = 0;
        this.mGamblerScore = 0;

        // init game
        this.distributeInitialCards();
    }

    private distributeInitialCards(): void {
        this.mDistributedCardCount += 1;
        if (this.mDistributedCardCount < 5) {
            if (this.mDistributedCardCount & 1) {
                // send to gambler
                this.mGameScene?.sendCardToGambler(
                    this.mCardDeck.getNextCard(),
                    this.onCardSendToGamblerEnd.bind(this)
                );
            } else {
                // send to dealer
                let isLastInitialCard = this.mDistributedCardCount != 4;
                this.mGameScene?.sendCardToDealer(
                    this.mCardDeck.getNextCard(),
                    isLastInitialCard,
                    this.onCardSendToDealerEnd.bind(this)
                );
            }
        } else {
            // now process gambler cards
            this.processGamblerCards();
        }
    }

    private onCardSendToGamblerEnd(card: Card): void {
        this.mLogger.Log('onCardSendToGamblerEnd');

        this.mGamblerCards.push(card);

        this.distributeInitialCards();
    }

    private onCardSendToDealerEnd(card: Card): void {
        this.mLogger.Log('onCardSendToDealerEnd');

        this.mDealerCards.push(card);

        this.distributeInitialCards();
    }

    private setGamblerToInteractivity(allow: boolean): void {
        this.mGameScene?.setGamblerButtonInteractibility(allow);
    }

    public onHitButtonPress(): void {
        this.mLogger.Log('onHitButtonPress');

        this.setGamblerToInteractivity(false);

        this.mGameScene?.sendCardToGambler(
            this.mCardDeck.getNextCard(),
            this.onGamblerHitProcessEnd.bind(this)
        );
    }

    private onGamblerHitProcessEnd(card: Card): void {
        this.mGamblerCards.push(card);

        // now process gambler cards
        this.processGamblerCards();
    }

    private processGamblerCards(): void {
        this.mGamblerScore = this.getBestCardsScore(this.mGamblerCards);
        this.mLogger.Log('Gambler Score: ' + this.mGamblerScore);

        if (this.mGamblerScore == 21) {
            this.onGameWin(Constants.GAME.WinMultiplier.X2);
        } else if (this.mGamblerScore > 21) {
            this.onGameLose();
        } else {
            // now allow gambler to interact
            this.setGamblerToInteractivity(true);
        }
    }

    public onStandButtonPress(): void {
        this.mLogger.Log('onStandButtonPress');
        this.setGamblerToInteractivity(false);

        // reveal dealer's 2nd card
        this.mDealerCards[1].showCardFront();

        this.processDealerCards();
    }

    private processDealerCards(): void {
        let score = this.getBestCardsScore(this.mDealerCards);
        this.mLogger.Log(
            'Dealer Score: ' + score + ' Gambler Score: ' + this.mGamblerScore
        );

        if (score > 21) {
            // dealer loses the game, and gambler wins
            this.onGameWin(Constants.GAME.WinMultiplier.X2);
        } else {
            if (score <= this.mGamblerScore) {
                // hit on behalf of dealer
                this.mGameScene?.sendCardToDealer(
                    this.mCardDeck.getNextCard(),
                    true,
                    this.onDealerHittingProcessEnd.bind(this)
                );
            } else {
                // decide win/lose state
                if (this.mGamblerScore < score) {
                    // gambler loses, dealer wins
                    this.onGameLose();
                } else {
                    // gambler wins, dealer loses
                    this.onGameWin(Constants.GAME.WinMultiplier.X);
                }
            }
        }
    }

    private onDealerHittingProcessEnd(card: Card): void {
        this.mDealerCards.push(card);
        // now process dealer cards
        this.processDealerCards();
    }

    private getBestCardsScore(cards: Card[]): number {
        cards = cards.sort(
            (a: Card, b: Card) => a.getCardValue(false) - b.getCardValue(false)
        );

        let score: number = 0;
        for (let i = 0; i < cards.length; i += 1) {
            let card: Card = cards[i];

            if (card.isAce()) {
                let minV = card.getCardValue(true) + score;
                let maxV = card.getCardValue(false) + score;

                if (i + 1 == cards.length) {
                    if (maxV == 21) {
                        return maxV;
                    }

                    if (minV == 21) {
                        return minV;
                    }
                }

                score = minV;
            } else {
                score += card.getCardValue();
            }
        }

        return score;
    }

    private onGameWin(rewardMultiplier: number): void {
        this.mLogger.Log('onGameWin');
        AppController.getPersistantNode()
            .getPlayer()
            .addMoney(this.getRewardAmount(rewardMultiplier));

        // show particle and return to lobby
        this.mGameScene?.showParticle();
        this.openLobbyScene(7);
    }

    private onGameLose(): void {
        // return to lobby
        this.mLogger.Log('onGameLose');
        this.openLobbyScene(5);
    }

    private openLobbyScene(delay_seconds: number): void {
        setTimeout(() => {
            SceneController.loadLobbyScene();
        }, Constants.TIME_MS.SECOND * delay_seconds);
    }
}
