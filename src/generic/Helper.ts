/**
 * Title: Helper
 * Description: helper methods are added here to support in any other places
 * Author: Md Faizul Islam
 * Date: 08/01/2023
 *
 */

// dependencies
import { Sprite, TextStyle, Texture } from 'pixi.js';
import { Logger } from './Logger';

export class Helper {
    private static mLogger = Logger.createLogger('Helper', true);
    public static parseJSON(str: string): JSON {
        let jsonObject;
        try {
            jsonObject = JSON.parse(str);
        } catch (error) {
            Helper.mLogger.Error('Error on Parsing ' + str, 3);
        }
        return jsonObject;
    }

    public static getButtonTextStyle(): TextStyle {
        const buttonTextStyle: TextStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fontWeight: 'bold',
            // fill: 0xff1010,
            align: 'center'
        });
        return buttonTextStyle;
    }

    public static getSceneTitleTextStyle(): TextStyle {
        const sceneTitleTextStyle: TextStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            // fill: 0xff1010,
            align: 'center'
        });
        return sceneTitleTextStyle;
    }

    public static getCurrenyTextStyle(): TextStyle {
        const currencyTextStyle: TextStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fontWeight: 'bold',
            align: 'left'
        });
        return currencyTextStyle;
    }

    public static getBettingTextStyle(): TextStyle {
        const currencyTextStyle: TextStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fontWeight: 'bold',
            align: 'center'
        });
        return currencyTextStyle;
    }

    public static getTexture(spriteOrTexture: string | Texture): Texture {
        let texture;
        if (typeof spriteOrTexture === 'string' && spriteOrTexture.length > 0) {
            texture = Sprite.from(spriteOrTexture).texture;
        } else if (spriteOrTexture instanceof Texture) {
            texture = spriteOrTexture;
        } else {
            texture = Texture.EMPTY;
        }
        return texture;
    }

    public static getRandomString(length: number): string {
        let result = '';
        let characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i += 1) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    /**
     * Defining a custom function which returns a random number between min and max, including min and max
     * @param min
     * @param max
     * @returns number
     */
    public static getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * generates random number 0 to max-1,
     * @param max
     * @returns number
     */
    public static getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    public static getScreenWidth(): number {
        return Math.max(
            document.documentElement.clientWidth,
            window.innerWidth || 0
        );
    }

    public static getScreenHeight(): number {
        return Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
        );
    }
}
