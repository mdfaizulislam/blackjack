/**
 * Title: Particles - Awesome Fire Tool
 * Description: open challenge there. Particles - make a demo that shows an awesome fire effect. Please keep
 * number of images low (max 10 sprites on screen at once). Feel free to use existing libraries how you would
 *  use them in a real project.
 *
 * Author: Md Faizul Islam
 * Date: 21/04/2023
 *
 */

import { Container, Point, Texture, Ticker } from 'pixi.js';
import { Particle } from '../components/Particle';
import { AppController } from '../controllers/AppController';
import { Helper } from '../generic/Helper';
import { Logger } from '../generic/Logger';
import { Constants } from '../constants';

export class ParticleExplotion extends Container {
    private mLogger: Logger;
    private mTextures: Texture[] = [];
    private mParticles: Particle[] = [];
    private mTextureCount: number;
    private mTimeout: NodeJS.Timeout | null = null;
    private mTimeoutStopUpdater: NodeJS.Timeout | null = null;
    private mTicker: Ticker | null = null;
    private mEmittingParticle: boolean = false;
    public static createParticleExplotion(): ParticleExplotion {
        return new ParticleExplotion();
    }

    constructor() {
        super();
        this.mLogger = new Logger('ExplotionParticle', true);
        this.name = 'ExplotionParticle';
        this.sortableChildren = true;
        this.mTextureCount = 0;
        this.init();
    }

    private init() {
        this.initTextures();
    }

    private initTextures(): void {
        for (let i = 1; i < 11; i++) {
            this.mTextures.push(Helper.getTexture('buttonBack'));
        }
    }

    public startEmitiingParticle(): void {
        if (this.mEmittingParticle) {
            return;
        }
        this.mEmittingParticle = true;
        if (this.mTimeoutStopUpdater) {
            clearTimeout(this.mTimeoutStopUpdater);
            this.mTimeoutStopUpdater = null;
        }
        if (!this.mTicker) {
            this.mTicker = AppController.getApp().ticker.add(
                this.updateExplotion,
                this
            );
        }

        this.doLunchParticle();
    }

    public stopEmittingParticle(forceStop: boolean = false): void {
        this.mEmittingParticle = false;

        if (this.mTimeout) {
            clearTimeout(this.mTimeout);
        }
        if (forceStop) {
            this.stopUpdateScheduler();
        } else {
            this.mTimeoutStopUpdater = setTimeout(
                this.stopUpdateScheduler.bind(this),
                Constants.TIME_MS.SECOND * 3
            );
        }
    }

    private stopUpdateScheduler(): void {
        AppController.getApp().ticker.remove(this.updateExplotion, this);
        this.mTicker = null;
        this.mTimeoutStopUpdater = null;
    }

    private doLunchParticle(): void {
        this.launchParticle();

        // now launch a new particle after some delay
        if (AppController.visible && this.mEmittingParticle) {
            this.mTimeout = setTimeout(
                this.doLunchParticle.bind(this),
                200 + Math.random() * 600
            );
        }
    }

    private getParticle(texture: Texture, scale: number): Particle {
        // get the first particle that has been used
        let particle: Particle | null = null;
        // check for a used particle (alpha <= 0)
        for (let i = 0, l = this.mParticles.length; i < l; i++) {
            if (this.mParticles[i].alpha <= 0) {
                particle = this.mParticles[i];
                break;
            }
        }
        // update characteristics of particle
        if (particle) {
            particle.reset(texture, scale);
            return particle;
        }

        // otherwise create a new particle
        particle = Particle.createParticle(texture);
        this.mParticles.push(particle);
        particle.setExplodeCallback(this.explode.bind(this));
        this.addChild(particle);
        return particle;
    }

    private explode(position: Point, texture: Texture, scale: number): void {
        const steps = 8 + Math.round(Math.random() * 6);
        const radius = 2 + Math.random() * 4;
        for (let i = 0; i < steps; i++) {
            // get velocity
            const x = radius * Math.cos((2 * Math.PI * i) / steps);
            const y = radius * Math.sin((2 * Math.PI * i) / steps);
            // add particle
            const particle = this.getParticle(texture, scale);
            particle.setFade(true);
            particle.setPosition(position);
            particle.setVelocity(new Point(x, y));
        }
    }

    private launchParticle(): void {
        this.mLogger.Log('launchParticle');
        const particle = this.getParticle(
            this.mTextures[this.mTextureCount],
            Math.random() * 0.5
        );

        // update current texture flag
        this.mTextureCount++;
        if (this.mTextureCount > 9) this.mTextureCount = 0;

        // set particle position
        particle.setPosition(
            new Point(Math.random() * AppController.width, AppController.height)
        );

        // set particle velocity
        const speed = AppController.height * 0.01;
        particle.setVelocity(
            new Point(
                -speed / 2 + Math.random() * speed,
                -speed + Math.random() * -1
            )
        );

        // update particle as explodable
        particle.setToExplode(true);
    }

    private updateExplotion(delta: number): void {
        this.mLogger.Log('updateExplotion');
        if (!AppController.visible) {
            return;
        }
        for (let i = 0, l = this.mParticles.length; i < l; i++) {
            this.mParticles[i].update();
        }
    }
}
