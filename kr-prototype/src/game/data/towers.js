export const towerTypes = {

    archer: {
        name: 'Torre Arqueira',
        icon: 'nature',

        cost: 70,
        damage: {
            min: 4,
            max: 6,
        },
        range: 150,
        attackCooldown: 800,

        projectileType: 'basic',
        projectileSpeed: 500,

        size: 40,
        color: 0x39B54A
    },

    mage: {
        name: 'Torre Maga',
        icon: 'magic',

        cost: 100,
        damage: {
            min: 9,
            max: 17,
        },
        range: 150,
        attackCooldown: 1500,

        projectileType: 'basic',
        projectileSpeed: 400,

        size: 35,
        color: 0x0071BC
    },

    bomb: {
        name: 'Torre Bomba',
        icon: 'industrial',

        cost: 125,
        damage: {
            min: 8,
            max: 16,
        },
        range: 180,
        attackCooldown: 2000,

        projectileType: 'bomb',
        projectileSpeed: 300,
        explosionRadius: 50,
        
        size: 50,
        color: 0xF7931E
    }
};