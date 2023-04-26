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
                    star: './sprites/star.png',
                    coin_stack: './sprites/coin_stack.png',
                    gambler: './sprites/gambler.png',
                    GamblerBack: './sprites/GamblerBack.png',
                    gamblerFront: './sprites/gamblerFront.png',
                    bg: './sprites/bg.png',
                    buttonInfo: './sprites/buttons/buttonInfo.png',
                    buttonClose: './sprites/buttons/red_close.png',
                    coinEnabled: './sprites/buttons/coinEnabled.png',
                    coinDisabled: './sprites/buttons/coinDisabled.png',
                    sqaureButtonD: './sprites/buttons/sqaureButtonD.png',
                    sqaureButtonN: './sprites/buttons/sqaureButtonN.png',
                    sqaureButtonH: './sprites/buttons/sqaureButtonH.png',
                    sqaureButtonP: './sprites/buttons/sqaureButtonP.png',
                    buttonBack: './sprites/buttons/buttonBack.png',
                    card1: './sprites/cards/1.png',
                    card2: './sprites/cards/2.png',
                    card3: './sprites/cards/3.png',
                    card4: './sprites/cards/4.png',
                    card5: './sprites/cards/5.png',
                    card6: './sprites/cards/6.png',
                    card7: './sprites/cards/7.png',
                    card8: './sprites/cards/8.png',
                    card9: './sprites/cards/9.png',
                    card10: './sprites/cards/10.png',
                    card11: './sprites/cards/11.png',
                    card12: './sprites/cards/12.png',
                    card13: './sprites/cards/13.png',
                    card14: './sprites/cards/14.png',
                    card15: './sprites/cards/15.png',
                    card16: './sprites/cards/16.png',
                    card17: './sprites/cards/17.png',
                    card18: './sprites/cards/18.png',
                    card19: './sprites/cards/19.png',
                    card20: './sprites/cards/20.png',
                    card21: './sprites/cards/21.png',
                    card22: './sprites/cards/22.png',
                    card23: './sprites/cards/23.png',
                    card24: './sprites/cards/24.png',
                    card25: './sprites/cards/25.png',
                    card26: './sprites/cards/26.png',
                    card27: './sprites/cards/27.png',
                    card28: './sprites/cards/28.png',
                    card29: './sprites/cards/29.png',
                    card30: './sprites/cards/30.png',
                    card31: './sprites/cards/31.png',
                    card32: './sprites/cards/32.png',
                    card33: './sprites/cards/33.png',
                    card34: './sprites/cards/34.png',
                    card35: './sprites/cards/35.png',
                    card36: './sprites/cards/36.png',
                    card37: './sprites/cards/37.png',
                    card38: './sprites/cards/38.png',
                    card39: './sprites/cards/39.png',
                    card40: './sprites/cards/40.png',
                    card41: './sprites/cards/41.png',
                    card42: './sprites/cards/42.png',
                    card43: './sprites/cards/43.png',
                    card44: './sprites/cards/44.png',
                    card45: './sprites/cards/45.png',
                    card46: './sprites/cards/46.png',
                    card47: './sprites/cards/47.png',
                    card48: './sprites/cards/48.png',
                    card49: './sprites/cards/49.png',
                    card50: './sprites/cards/50.png',
                    card51: './sprites/cards/51.png',
                    card52: './sprites/cards/52.png',
                    joker: './sprites/cards/joker.png'
                }
            }
        ]
    };
}
