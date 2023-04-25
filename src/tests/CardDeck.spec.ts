import { expect } from 'chai';
import { CardDeck } from '../models/CardDeck';
describe('Test CardDeck', () => {
    let deck1: CardDeck;
    let deck2: CardDeck;
    before('instantiate card decks', () => {
        deck1 = CardDeck.createCardDeck();
        deck2 = CardDeck.createCardDeck();
    });

    it('card order should not be same of two decks', () => {
        expect(deck1.getDeckAsString()).to.not.be.equal(
            deck2.getDeckAsString()
        );
    });
});
