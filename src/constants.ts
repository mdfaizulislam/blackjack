/**
 * Title: Constants
 * Description: Define all constants here
 * Author: Md Faizul Islam
 * Date: 08/01/2023
 *
 */

export const Constants = {
    PLAYER: {
        InitialBalance: 1000
    },
    GAME: {
        WinMultiplier: {
            X: 1,
            X2: 2
        }
    },

    PARTICLE: {
        Gravity: 0.03,
        ExplodeHeight: 0.4
    },

    TIME_MS: {
        SECOND: 1000,
        MINUTE: 60000,
        HOUR: 3600000,
        DAY: 86400000
    },

    COINS: [1, 2, 5, 10, 20],

    GAME_IDS: ['Play'],
    ANIM_CONFIG: [
        {
            scale: 0.2,
            radius: 80,
            rotation: 6,
            duration: 2,
            color: '#ff0000',
            totalStars: 7
        },
        {
            scale: 0.3,
            radius: 120,
            rotation: 7,
            duration: 2.5,
            color: '#ff7f00',
            totalStars: 8
        },
        {
            scale: 0.4,
            radius: 140,
            rotation: 8,
            duration: 2.5,
            color: '#80ff00',
            totalStars: 9
        },
        {
            scale: 0.5,
            radius: 150,
            rotation: 9,
            duration: 2.5,
            color: '#00ff80',
            totalStars: 10
        },
        {
            scale: 0.6,
            radius: 160,
            rotation: 10,
            duration: 2.5,
            color: '#00ffff',
            totalStars: 11
        },
        {
            scale: 0.24,
            radius: 170,
            rotation: 11,
            duration: 2.5,
            color: '#0080ff',
            totalStars: 12
        },
        {
            scale: 0.35,
            radius: 180,
            rotation: 12,
            duration: 2.5,
            color: '#0000ff',
            totalStars: 13
        },
        {
            scale: 0.45,
            radius: 190,
            rotation: 13,
            duration: 2.5,
            color: '#8000ff',
            totalStars: 14
        },
        {
            scale: 0.55,
            radius: 200,
            rotation: 14,
            duration: 2.5,
            color: '#ff00ff',
            totalStars: 15
        },
        {
            scale: 0.65,
            radius: 210,
            rotation: 15,
            duration: 2.5,
            color: '#fe007f',
            totalStars: 16
        }
    ]
};
