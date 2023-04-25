import { expect } from 'chai';
import { Coin } from '../components/Coin';
import { Constants } from '../constants';
import { EventBoundary, FederatedPointerEvent } from 'pixi.js';
describe('Testing Coin Button', () => {
    Constants.COINS.forEach((value) => {
        let coinButton: Coin = Coin.createCoin(value);
        let isTriggered: boolean = false;
        it('create coin button with value ' + value, () => {
            expect(coinButton.getCoinValue()).to.be.equal(value);
        });

        it('coin button callback should be triggered on pointerup event', () => {
            let callback = () => {
                isTriggered = true;
            };

            coinButton.setCallback(callback);

            try {
                coinButton.emit(
                    'pointerup',
                    new FederatedPointerEvent(new EventBoundary())
                );
            } catch (error) {}

            expect(isTriggered).to.be.true;
        });
    });
});
