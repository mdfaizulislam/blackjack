import { expect } from 'chai';
import { Card } from '../components/Card';
describe('Testing Card', () => {
    for (let i = 1; i < 53; i += 1) {
        let card = Card.createCard(i);
        if (i % 13 == 0) {
            // not spades
            it('card should be spade', () => {
                expect(card.isAce()).to.be.true;
            });

            it('card value should not be 13', () => {
                expect(card.getCardValue()).to.not.be.equal(13);
            });

            it('card value should be 1', () => {
                expect(card.getCardValue()).to.be.equal(1);
            });

            it('card value should be 11', () => {
                expect(card.getCardValue(false)).to.be.equal(11);
            });
        } else {
            it('card should not be spade', () => {
                expect(card.isAce()).to.be.false;
            });

            it('card value should be in between 2 an 12', () => {
                expect(card.getCardValue()).greaterThan(1).and.lessThan(13);
            });
        }
    }
});
