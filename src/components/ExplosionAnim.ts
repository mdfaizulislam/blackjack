import { Container, Sprite } from 'pixi.js';
import { AppController } from '../controllers/AppController';
import gsap from 'gsap';
import { Power0 } from 'gsap';
export class AnimConfig {
    scale: number;
    radius: number;
    duration: number;
    rotation: number;
    color: string;
    totalStars: number;

    constructor(
        scale: number,
        radius: number,
        rotation: number,
        duration: number,
        color: string,
        totalStars: number
    ) {
        this.scale = scale;
        this.radius = radius;
        this.rotation = rotation;
        this.duration = duration;
        this.color = color;
        this.totalStars = totalStars;
    }
}

export class ExplosionAnim extends Container {
    private mStars: Sprite[] = [];
    private mShowFrequency: number;
    private mConfig: AnimConfig;
    private mTimelines: gsap.core.Timeline[] = [];
    public static createExplosionAim(
        config: AnimConfig,
        showFrequency: number = 3
    ): ExplosionAnim {
        return new ExplosionAnim(config, showFrequency);
    }
    constructor(config: AnimConfig, showFrequency: number) {
        super();
        this.sortableChildren = true;
        this.mShowFrequency = showFrequency;
        this.mConfig = config;
        this.buildStars();
    }
    private buildStars(): void {
        for (let i = 0; i < this.mConfig.totalStars; i++) {
            let star: Sprite = Sprite.from('star');
            star.tint = this.mConfig.color;
            star.scale.set(this.mConfig.scale, this.mConfig.scale);
            star.anchor.set(0.5, 0.5);
            star.x = AppController.height;
            star.y = 0;
            star.zIndex = 100;
            this.addChild(star);
            this.mStars.push(star);
        }
    }

    public fireStars(): void {
        const movePosX =
            ((Math.random() < 0.5 ? -1 : 1) *
                Math.random() *
                AppController.width) /
            2;
        const movePosY =
            AppController.height / 2 +
            (Math.random() * AppController.height) / 3;
        for (let i = 0; i < this.mConfig.totalStars; i++) {
            let tl = gsap.timeline();
            this.mTimelines.push(tl);
            tl.set(this.mStars[i], {
                alpha: 1.0,
                x: movePosX,
                y: movePosY,
                rotation: 0
            });
            tl.to(this.mStars[i], {
                x: 0,
                y: 0,
                duration: 1
            });
            tl.to(this.mStars[i], {
                alpha: 0.0,
                x:
                    this.mConfig.radius *
                    Math.cos((2 * Math.PI * i) / this.mConfig.totalStars),
                y:
                    this.mConfig.radius *
                    Math.sin((2 * Math.PI * i) / this.mConfig.totalStars),
                rotation: this.mConfig.rotation,
                duration: this.mConfig.duration,
                ease: Power0.easeNone
            });
            tl.repeat(this.mShowFrequency);
            tl.repeatDelay(0.5);
        }
    }

    stopAnimating(): void {
        this.mTimelines.forEach((tl) => {
            if (tl) {
                tl.kill();
            }
        });
    }
}
