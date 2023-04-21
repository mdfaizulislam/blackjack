/**
 * Title: Interface Scene
 * Description: Interface Scene
 * Author: Md Faizul Islam
 * Date: 21/04/2023
 *
 */

import { DisplayObject } from 'pixi.js';

// Also, this could be in its own file...
export interface IScene extends DisplayObject {
    /** this method will be called by ticker */
    update(delta: number): void;

    /** this method will called*/
    onEnable(): void;
    onDisable(): void;

    onShow(): void;
    onHide(): void;
}
