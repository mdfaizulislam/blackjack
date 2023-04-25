import { expect } from 'chai';
import { Player } from '../models/Player';

describe('Test Player', () => {
    let player: Player;
    before('instantiate Player', () => {
        player = Player.createPlayer();
    });

    after('Testing Player end....', () => {});

    describe('section1', () => {
        it('test init balance 1000', () => {
            expect(player.getCurrentMoney()).to.be.equal(1000);
        });

        it('test deduct money 100', () => {
            try {
                player.deductMoney(100);
            } catch (error) {
                expect(player.getCurrentMoney()).to.be.equal(900);
            }
        });

        it('test deposit money 200', () => {
            try {
                player.addMoney(200);
            } catch (error) {
                expect(player.getCurrentMoney()).to.be.equal(1100);
            }
        });

        it('test has enough money to deduct 100, should be true', () => {
            expect(player.hasEnoughMoney(100)).to.be.true;
        });

        it('test has enough money to deduct 2000, should be false', () => {
            expect(player.hasEnoughMoney(2000)).to.be.false;
        });

        it('test deduct money more than balance, should throw error and no change in balance', () => {
            try {
                player.deductMoney(1500);
            } catch (error) {
                expect(player.getCurrentMoney()).to.be.equal(1100);
            }
        });
    });
});
