import { Container } from 'pixi.js';
import { AnimConfig, ExplosionAnim } from './ExplosionAnim';
import { Constants } from '../constants';
export class WinAnimation extends Container {
    private mExplosions: ExplosionAnim[] = [];
    public static createWinAnimation(): WinAnimation {
        return new WinAnimation();
    }
    constructor() {
        super();
        this.sortableChildren = true;
        this.buildAnims();
    }

    private buildAnims(): void {
        const animConfigs = Constants.ANIM_CONFIG as AnimConfig[];

        animConfigs.forEach((config) => {
            let explodable = ExplosionAnim.createExplosionAim(config);
            this.addChild(explodable);
            this.mExplosions.push(explodable);
        });
    }

    public showExplosionAnimation(): void {
        this.mExplosions.forEach((anim) => {
            anim.fireStars();
        });
    }

    public stopAnimations(): void {
        this.mExplosions.forEach((anim) => {
            anim.stopAnimating();
        });
    }
}
