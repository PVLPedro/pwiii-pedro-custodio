import { enemyTypes } from './enemies';

export const waves = [

    {
        groups: [

            {
                type: enemyTypes.goblin,
                count: 3,
                interval: 1
            },
        ],

        groupInterval: 5,
        repeats: 1,
        nextWaveDelay: 15
    },

    // {
    //     groups: [

    //         {
    //             type: enemyTypes.goblin,
    //             count: 5,
    //             interval: .8
    //         },
    //     ],

    //     groupInterval: 3,
    //     repeats: 3,
    //     nextWaveDelay: 15,
    //     // earlyStartReward: 50
    // },

    // {
    //     groups: [

    //         {
    //             type: enemyTypes.goblin,
    //             count: 3,
    //             interval: 1
    //         },

    //         {
    //             type: enemyTypes.orc,
    //             count: 2,
    //             interval: 1.5
    //         }

    //     ],

    //     groupInterval: 3,
    //     repeats: 2,
    //     nextWaveDelay: 15
    // },

    // {
    //     groups: [

    //         {
    //             type: enemyTypes.goblin,
    //             count: 10,
    //             interval: .5
    //         },

    //         {
    //             type: enemyTypes.orc,
    //             count: 3,
    //             interval: 1
    //         }

    //     ],

    //     groupInterval: 2.5,
    //     repeats: 2,
    //     nextWaveDelay: 15,
    //     earlyStartReward: 30
    // },
    // {
    //     groups: [

    //         {
    //             type: enemyTypes.wolf,
    //             count: 6,
    //             interval: 1
    //         },

    //         {
    //             type: enemyTypes.goblin,
    //             count: 6,
    //             interval: 1
    //         }

    //     ],

    //     groupInterval: 1,
    //     repeats: 4,
    //     nextWaveDelay: 10
    // },

    // {
    //     groups: [

    //         {
    //             type: enemyTypes.goblin,
    //             count: 5,
    //             interval: .5
    //         },

    //         {
    //             type: enemyTypes.orc,
    //             count: 3,
    //             interval: 1
    //         },

    //         {
    //             type: enemyTypes.wolf,
    //             count: 5,
    //             interval: .5
    //         },

    //         {
    //             type: enemyTypes.orc,
    //             count: 3,
    //             interval: 1
    //         },

    //     ],

    //     groupInterval: 1.5,
    //     repeats: 3,
    //     nextWaveDelay: 10,
    //     earlyStartReward: 50
    // },
    // {
    //     groups: [

    //         {
    //             type: enemyTypes.orc,
    //             count: 10,
    //             interval: 1.5
    //         },

    //         {
    //             type: enemyTypes.orc,
    //             count: 15,
    //             interval: 1.5
    //         }

    //     ],

    //     groupInterval: 2.5,
    //     repeats: 1,
    //     nextWaveDelay: 10
    // },

    // {
    //     groups: [

    //         {
    //             type: enemyTypes.goblin,
    //             count: 12,
    //             interval: .5
    //         },

    //         {
    //             type: enemyTypes.orc,
    //             count: 8,
    //             interval: .8
    //         },

    //         {
    //             type: enemyTypes.wolf,
    //             count: 20,
    //             interval: .8
    //         },

    //         {
    //             type: enemyTypes.ogre,
    //             count: 1,
    //             interval: 1
    //         },

    //     ],

    //     groupInterval: 2,
    //     repeats: 2,
    //     nextWaveDelay: 10,
    //     earlyStartReward: 50
    // },
]