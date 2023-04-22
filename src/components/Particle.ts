import { Point, Sprite, Texture } from 'pixi.js';
import { AppController } from '../controllers/AppController';
import { Helper } from '../generic/Helper';
import { Constants } from '../constants';

export class Particle extends Sprite {
    private mVelocity: Point;
    private mExplodeHeight: number;
    private mToExplode: boolean = false;
    private mExploded: boolean = false;
    private mFade: boolean = false;
    private mExplodeCallback: Function | null = null;

    public static createParticle(spriteOrTexture: string | Texture) {
        return new Particle(spriteOrTexture);
    }
    constructor(spriteOrTexture: string | Texture) {
        super();
        this.texture = Helper.getTexture(spriteOrTexture);
        this.mVelocity = new Point(0, 0);
        this.mExplodeHeight =
            Constants.PARTICLE.ExplodeHeight + Math.random() * 0.5;
    }

    reset(texture: Texture, scale: number) {
        this.alpha = 1;
        this.texture = texture;
        this.scale.set(scale, scale);
        this.mVelocity = new Point(0, 0);
        this.mToExplode = false;
        this.mExploded = false;
        this.mFade = false;
    }

    setFade(isFade: boolean) {
        this.mFade = isFade;
    }

    setPosition(pos: Point) {
        this.position.set(pos.x, pos.y);
    }

    setVelocity(velocity: Point) {
        this.mVelocity = velocity;
    }

    setToExplode(isToExplode: boolean) {
        this.mToExplode = isToExplode;
    }

    setExplodeCallback(callback: Function) {
        this.mExplodeCallback = callback;
    }

    update() {
        if (!AppController.visible) {
            return;
        }
        this.position.x += this.mVelocity.x;
        this.position.y += this.mVelocity.y;
        this.mVelocity.y += Constants.PARTICLE.Gravity;
        if (this.mToExplode && !this.mExploded) {
            // explode
            if (this.position.y < AppController.height * this.mExplodeHeight) {
                this.alpha = 0;
                this.mExploded = true;
                if (this.mExplodeCallback) {
                    this.mExplodeCallback(
                        new Point(this.position.x, this.position.y),
                        this.texture,
                        this.scale.x
                    );
                }
            }
        }

        if (this.mFade) {
            this.alpha -= 0.01;
        }
    }
}
