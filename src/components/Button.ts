/**
 * Title: Button class
 * Description: Button
 * Author: Md Faizul Islam
 * Date: 21/04/2023
 *
 */
import { FederatedPointerEvent, Sprite, Text, Texture } from 'pixi.js';
import { Helper } from '../generic/Helper';
import { Logger } from '../generic/Logger';

export class Button extends Sprite {
    public static createButton(
        normalImage: string | Texture,
        pressedImage?: string | Texture,
        hoverImage?: string | Texture,
        disabledImage?: string | Texture
    ): Button {
        const button: Button = new Button(
            normalImage,
            pressedImage,
            hoverImage,
            disabledImage
        );
        return button;
    }

    private mButtonNormalTexture: Texture;
    private mButtonPressedTexture: Texture;
    private mButtonDisabledTexture: Texture;
    private mButtonHoverTexture: Texture;

    private mButtonDisabled: boolean = false;
    private mIsDown: boolean = false;
    private mIsHover: boolean = false;
    private mIsHoverEnabled: boolean = true;
    protected mLogger: Logger;
    private mCallback: Function | null = null;
    private mbuttonText: Text | null = null;
    constructor(
        normalImage: string | Texture,
        pressedImage?: string | Texture,
        hoverImage?: string | Texture,
        disabledImage?: string | Texture
    ) {
        super();
        this.mLogger = Logger.createLogger('Button', false);

        pressedImage = pressedImage ? pressedImage : normalImage;
        hoverImage = hoverImage ? hoverImage : normalImage;
        disabledImage = disabledImage ? disabledImage : normalImage;

        this.mButtonNormalTexture = Helper.getTexture(normalImage);
        this.mButtonPressedTexture = Helper.getTexture(pressedImage);
        this.mButtonHoverTexture = Helper.getTexture(hoverImage);
        this.mButtonDisabledTexture = Helper.getTexture(disabledImage);

        this.onButtonDisablilityChange();
        this.init();
        this.anchor.set(0.5, 0.5);
    }

    public setButtonText(message: string): void {
        if (this.mbuttonText != null) {
            this.mbuttonText.text = message;
            return;
        }

        this.addLabel(message);
    }

    private addLabel(message: string): void {
        this.mbuttonText = new Text(message, Helper.getButtonTextStyle());
        this.mbuttonText.anchor.set(0.5, 0.5);
        this.mbuttonText.x = 0;
        this.mbuttonText.y = 0;
        this.addChild(this.mbuttonText);
    }

    public setCallback(callback: Function | null) {
        this.mCallback = callback;
    }

    private init(): void {
        this.width = this.mButtonNormalTexture.width;
        this.height = this.mButtonNormalTexture.height;
        this.addTouchEvents();
    }

    private onButtonDisablilityChange() {
        this.texture = this.mButtonDisabled
            ? this.mButtonDisabledTexture
            : this.mButtonNormalTexture;
    }

    public setButtonStatus(isDisabled: boolean) {
        this.mButtonDisabled = isDisabled;
        this.eventMode = isDisabled ? 'none' : 'static';
        this.onButtonDisablilityChange();
    }

    /**
     * .on(...): Adds an event listener.
     * .once(...): Adds an event listener that will remove itself after it gets called once.
     * .off(...): Removes an event listener. (Tricky to use if you use .bind!)
     * .emit(...): Emits an event, all listeners for that event will get called.
     * .removeAllListeners(): Removes all event listeners.
     */
    private addTouchEvents(): void {
        // events that begin with "pointer" are touch + mouse
        // this.on("pointertap", this.onTap, this);
        this.on('pointerover', this.onButtonHoverStart, this)
            .on('pointerout', this.onButtonHoverEnd, this)
            .on('pointerdown', this.onButtonDown, this)
            .on('pointerup', this.onButtonUp, this)
            .on('pointerupoutside', this.onButtonUp, this);

        this.eventMode = 'static';
        this.cursor = 'pointer';
    }

    //   private onTap(e: FederatedPointerEvent): void {
    //     console.log("You interacted with Button!");
    //     console.log("The data of your interaction is super interesting", e);
    //   }

    protected onButtonDown(e: FederatedPointerEvent): void {
        this.mLogger.Log('onButtonDown: ', e);
        if (this.mButtonDisabled) return;

        this.mIsDown = true;
        this.mIsHover = false;
        this.texture = this.mButtonPressedTexture;
        // this.alpha = 1;
    }

    protected onButtonUp(e: FederatedPointerEvent): void {
        this.mLogger.Log('onButtonUp: ', e);
        if (this.mButtonDisabled) return;

        this.mIsDown = false;
        if (this.mIsHover && this.mIsHoverEnabled) {
            // this.mLogger.Log("onButtonUp -> settingHover");
            // this.texture = this.mButtonHoverTexture;
            this.texture = this.mButtonNormalTexture;
        } else {
            this.texture = this.mButtonNormalTexture;
            if (this.mCallback) {
                // this.mLogger.Log("Pressing button");
                this.mCallback(this.name);
            } else {
                this.mLogger.Warn('callback is not set', 2);
            }
        }
    }

    protected onButtonHoverStart(e: FederatedPointerEvent): void {
        this.mLogger.Log('onButtonHoverStart: ', e);
        if (this.mButtonDisabled) return;

        if (this.mIsHoverEnabled) {
            if (this.mIsDown) {
                return;
            }
            this.mIsHover = true;
            this.texture = this.mButtonHoverTexture;
            this.mLogger.Log('onButtonHoverStart -> settingHover');
        }
    }

    protected onButtonHoverEnd(e: FederatedPointerEvent): void {
        this.mLogger.Log('onButtonHoverEnd', e);
        if (this.mButtonDisabled) return;
        if (this.mIsHoverEnabled) {
            if (this.mIsDown) {
                return;
            }
            this.mIsHover = false;
            this.texture = this.mButtonNormalTexture;
        }
    }

    removeTouchEvents(): void {
        // this.off("pointertap", this.onTap, this);
        this.off('pointerdown', this.onButtonDown, this)
            .off('pointerup', this.onButtonUp, this)
            .off('pointerupoutside', this.onButtonUp, this)
            .off('pointerover', this.onButtonHoverStart, this)
            .off('pointerout', this.onButtonHoverEnd, this);

        this.eventMode = 'none';
    }
}
