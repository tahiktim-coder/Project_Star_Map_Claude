// LOOT POOLS: Groupings of items by theme
const LOOT_POOLS = {
    // 0. The Null Result (Dirt, Rocks, Nothing)
    // Weight will be the baseline against which other things compete
    // 0. The Null Result (Now gives Trace Elements)
    // Weight will be the baseline against which other things compete
    NULL_RESULT: [
        { type: 'RESOURCE', val: 'METALS', min: 1, max: 3, weight: 50, log: "Surface Scan: Minimal resources detected. (+2 Salvage)" },
        { type: 'RESOURCE', val: 'ENERGY', min: 1, max: 3, weight: 50, log: "Atmosphere: Trace ions harvested. (+2 Energy)" }
    ],

    // 1. Metals Tiers
    METALS_SCARCE: [
        { type: 'RESOURCE', val: 'METALS', min: 2, max: 5, weight: 20 }
    ],
    METALS_COMMON: [
        { type: 'RESOURCE', val: 'METALS', min: 5, max: 15, weight: 60 }
    ],
    METALS_RICH: [
        { type: 'RESOURCE', val: 'METALS', min: 15, max: 30, weight: 100 },
        { type: 'RESOURCE', val: 'METALS', min: 10, max: 20, weight: 20 } // Extra fallback
    ],

    // 2. Energy Tiers
    ENERGY_SCARCE: [
        { type: 'RESOURCE', val: 'ENERGY', min: 1, max: 5, weight: 20 }
    ],
    ENERGY_COMMON: [
        { type: 'RESOURCE', val: 'ENERGY', min: 10, max: 25, weight: 60 }
    ],
    ENERGY_RICH: [
        { type: 'RESOURCE', val: 'ENERGY', min: 40, max: 80, weight: 100 }
    ],

    // 3. Biological
    BIO_STANDARD: [
        { item: ITEMS.RADIOTROPHIC_FUNGUS, weight: 30 },
        { item: ITEMS.AMBER_SPECIMEN, weight: 10 },
        { item: ITEMS.FUNGUS_CULTURE, weight: 5 },  // Rare passive ration generator
        { item: ITEMS.XENO_MYCELIUM, weight: 2 } // ULTRA RARE
    ],

    // 4. Technology
    TECH_ANCIENT: [
        { item: ITEMS.SCRAP_PLATING, weight: 40 },
        { item: ITEMS.TECH_FRAGMENT, weight: 10 },
        { item: ITEMS.NEURAL_LINK, weight: 2 } // ULTRA RARE
    ],

    // 5. Geology
    GEO_RARE: [
        { item: ITEMS.GEODE_SAMPLE, weight: 20 },
        { item: ITEMS.CONDENSED_SALVAGE, weight: 15 },
        { item: ITEMS.OBSIDIAN_MONOLITH, weight: 3 }
    ],

    // 6. High Energy
    HIGH_ENERGY_ITEMS: [
        { item: ITEMS.IONIZED_BATTERY, weight: 25 }
    ],

    // 8. Exodus Derelict Supplies (ONLY from Exodus wreck encounters — not generic loot)
    EXODUS_SUPPLIES: [
        { item: ITEMS.FOOD_PACK, weight: 25 },
        { item: ITEMS.LUXURY_CHOCOLATE, weight: 15 },
        { item: ITEMS.MUSIC_HOLOTAPE, weight: 5 }, // Rare — affects all crew
        { item: ITEMS.IONIZED_BATTERY, weight: 15 }
    ],

    // 7a. Wreckage Salvage (scavenger-themed for WRECKAGE tag)
    WRECKAGE_SALVAGE: [
        { type: 'RESOURCE', val: 'METALS', min: 10, max: 25, weight: 40, log: "Stripped hull plating from an unidentified vessel." },
        { type: 'RESOURCE', val: 'METALS', min: 15, max: 35, weight: 25, log: "Drive components recovered from a shattered engine block." },
        { type: 'RESOURCE', val: 'ENERGY', min: 5, max: 15, weight: 20, log: "Emergency batteries recovered from wreckage debris." },
        { item: ITEMS.SCRAP_PLATING, weight: 15 },
        { item: ITEMS.CONDENSED_SALVAGE, weight: 10 },
        { item: ITEMS.IONIZED_BATTERY, weight: 5 },
        { type: 'LORE', text: "Wreckage ID: Unknown vessel. No transponder. Pre-Exodus design.", weight: 8 },
        { type: 'LORE', text: "Cargo manifest fragment: '...final shipment, colony supplies for...' — text corrupted.", weight: 5 }
    ],

    // 7b. Lore / Data
    LORE_ANCIENT: [
        { type: 'LORE', text: "Decrypted: '...the suns are darkening one by one...'", weight: 20 },
        { type: 'LORE', text: "Visual: Massive skeletal structures beneath the crust.", weight: 20 }
    ],
    LORE_SIGNAL: [
        { type: 'LORE', text: "Audio: Rhythmic tapping matching prime numbers.", weight: 20 },
        { type: 'LORE', text: "Signal Origin: Deep underground facility detected.", weight: 20 }
    ]
};

// LOOT RULES: Logic mapping Planet Criteria -> Pools
const LOOT_RULES = [
    // --- BASELINE ---
    // Always include the chance of failure/dirt
    {
        id: 'base_null',
        criteria: () => true,
        pool: 'NULL_RESULT',
        msg_context: 'Dirt analysis'
    },

    // --- METALS LOGIC ---
    {
        id: 'metals_scarce',
        criteria: (p) => p.resources.metals < 30,
        pool: 'METALS_SCARCE',
        msg_context: 'Trace metal scanning'
    },
    {
        id: 'metals_avg',
        criteria: (p) => p.resources.metals >= 30 && p.resources.metals < 70,
        pool: 'METALS_COMMON',
        msg_context: 'Standard mining'
    },
    {
        id: 'metals_rich',
        criteria: (p) => p.resources.metals >= 70,
        pool: 'METALS_RICH',
        msg_context: 'Deep vein extraction'
    },

    // --- ENERGY LOGIC ---
    {
        id: 'energy_scarce',
        criteria: (p) => p.resources.energy < 30,
        pool: 'ENERGY_SCARCE',
        msg_context: 'Background radiation check'
    },
    {
        id: 'energy_avg',
        criteria: (p) => p.resources.energy >= 30 && p.resources.energy < 70,
        pool: 'ENERGY_COMMON',
        msg_context: 'Energy siphoning'
    },
    {
        id: 'energy_rich',
        criteria: (p) => p.resources.energy >= 70,
        pool: 'ENERGY_RICH',
        msg_context: 'High-yield harvesting'
    },

    // --- SPECIALS ---
    {
        id: 'vital_world',
        criteria: (p) => p.type === 'VITAL' || (p.metrics && p.metrics.hasLife),
        pool: 'BIO_STANDARD',
        msg_context: 'Biosphere sampling'
    },
    {
        id: 'rocky_geo',
        criteria: (p) => p.type === 'ROCKY',
        pool: 'GEO_RARE',
        msg_context: 'Geological excavation'
    },
    {
        id: 'tech_ruins',
        criteria: (p) => p.metrics && p.metrics.hasTech,
        pool: 'TECH_ANCIENT',
        msg_context: 'Artifact recovery'
    },
    {
        id: 'high_energy_items',
        criteria: (p) => ['GAS_GIANT', 'VOLCANIC'].includes(p.type),
        pool: 'HIGH_ENERGY_ITEMS',
        msg_context: 'Plasma collection'
    },

    // --- WRECKAGE ---
    {
        id: 'wreckage_salvage',
        criteria: (p) => p.tags && p.tags.includes('WRECKAGE'),
        pool: 'WRECKAGE_SALVAGE',
        msg_context: 'Debris field scavenging'
    },

    // --- LORE TAGS ---
    {
        id: 'tag_ruins_lore',
        criteria: (p) => p.tags && p.tags.includes('ANCIENT_RUINS'),
        pool: 'LORE_ANCIENT',
        msg_context: 'Archaeological scan'
    },
    {
        id: 'tag_signals_lore',
        criteria: (p) => p.tags && p.tags.includes('ALIEN_SIGNALS'),
        pool: 'LORE_SIGNAL',
        msg_context: 'Signal triangulation'
    }
];
