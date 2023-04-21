/**
 * Title: Assets Cofig
 * Description: Configs for all assets i.e. sprite, sound etc
 * Author: Md Faizul Islam
 * Date: 21/04/2023
 *
 */

import { AssetInitOptions, ResolverManifest } from 'pixi.js';

export class AssetsConfig implements AssetInitOptions {
    public static manifest: ResolverManifest = {
        bundles: [
            {
                name: 'sprites',
                assets: {
                    card: './sprites/card.png',
                    buttonBack: './sprites/buttons/buttonBack.png',
                    buttonGreenNormal:
                        './sprites/buttons/buttonGreenNormal.png',
                    buttonGreenHover: './sprites/buttons/buttonGreenHover.png',
                    buttonGreenPressed:
                        './sprites/buttons/buttonGreenPressed.png',
                    buttonGreenDisabled:
                        './sprites/buttons/buttonGreenDisabled.png'
                }
            }
        ]
    };
}
