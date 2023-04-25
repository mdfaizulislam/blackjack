import { expect } from 'chai';
import { Listener } from '../models/Listener';
describe('Test Listener', () => {
    let listener: Listener;
    before('instantiate Listener', () => {
        listener = Listener.createListener();
    });

    it('Add callback to listener', () => {
        listener.addCallbackListener(() => {});
        listener.addCallbackListener(() => {});
        expect(listener.getList().length).to.be.equal(2);
    });

    it('clear all callback from listener', () => {
        listener.clearAllListener();
        expect(listener.getList().length).to.be.equal(0);
    });
});
