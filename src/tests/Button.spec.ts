import { expect } from 'chai';
import { Button } from '../components/Button';
import { EventBoundary, FederatedPointerEvent } from 'pixi.js';
describe('Test Button', () => {
    let button: Button;
    let isTriggered: boolean = false;
    before('instantiate Player', () => {
        button = Button.createButton('');
    });

    it('button callback should be triggered on pointerup event', () => {
        let callback = () => {
            isTriggered = true;
        };
        button.setCallback(callback);
        button.emit(
            'pointerup',
            new FederatedPointerEvent(new EventBoundary())
        );

        expect(isTriggered).to.be.true;
    });
});
