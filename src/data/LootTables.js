// LOOT POOLS: Groupings of items by theme
const LOOT_POOLS = {
    // 1. Fallback / Universal
    COMMON_RES: [
        { type: 'RESOURCE', val: 'METALS', min: 10, max: 30, weight: 50 },
        { type: 'RESOURCE', val: 'ENERGY', min: 10, max: 30, weight: 40 }
    ],
    RICH_RES: [
        { type: 'RESOURCE', val: 'METALS', min: 40, max: 80, weight: 50 },
        { type: 'RESOURCE', val: 'ENERGY', min: 40, max: 80, weight: 40 }
    ],

    // 2. Biological
    BIO_STANDARD: [
        { item: ITEMS.RADIOTROPHIC_FUNGUS, weight: 20 },
        { item: ITEMS.AMBER_SPECIMEN, weight: 5 }
    ],

    // 3. Technology / Ruins
    TECH_ANCIENT: [
        { item: ITEMS.SCRAP_PLATING, weight: 25 },
        { item: ITEMS.TECH_FRAGMENT, weight: 5 }
    ],

    // 4. Geology / Minerals
    GEO_RARE: [
        { item: ITEMS.GEODE_SAMPLE, weight: 15 },
        { item: ITEMS.CONDENSED_METALS, weight: 10 },
        { item: ITEMS.OBSIDIAN_MONOLITH, weight: 2 }
    ],

    // 5. High Energy
    HIGH_ENERGY: [
        { item: ITEMS.IONIZED_BATTERY, weight: 20 }
    ]
};

// LOOT RULES: Logic mapping Planet Criteria -> Pools
// This allows infinite scalability. Just add a new rule.
const LOOT_RULES = [
    // --- BASELINE ---
    {
        id: 'base_resources',
        criteria: () => true, // Always valid
        pool: 'COMMON_RES',
        msg_context: 'Surface survey'
    },

    // --- PLANET TYPES ---
    {
        id: 'vital_world',
        criteria: (p) => p.type === 'VITAL',
        pool: 'BIO_STANDARD',
        msg_context: 'Biosphere sampling'
    },
    {
        id: 'rocky_rich',
        criteria: (p) => p.type === 'ROCKY',
        pool: 'GEO_RARE',
        msg_context: 'Geological excavation'
    },
    {
        id: 'high_energy_world',
        criteria: (p) => ['GAS_GIANT', 'VOLCANIC'].includes(p.type),
        pool: 'HIGH_ENERGY',
        msg_context: 'Energy siphon'
    },

    // --- METRICS (Dynamic Stats) ---
    {
        id: 'high_metals',
        criteria: (p) => p.resources && p.resources.metals > 60,
        pool: 'GEO_RARE', // Adds MORE chance for geo items if metals are high
        msg_context: 'Dense ore processing'
    },
    {
        id: 'has_life_metric',
        criteria: (p) => p.metrics && p.metrics.hasLife,
        pool: 'BIO_STANDARD',
        msg_context: 'Biological analysis'
    },
    {
        id: 'has_tech_metric',
        criteria: (p) => p.metrics && p.metrics.hasTech,
        pool: 'TECH_ANCIENT',
        msg_context: 'Artifact recovery'
    },

    // --- TAGS (The most scalable part) ---
    {
        id: 'tag_ruins',
        criteria: (p) => p.tags && p.tags.includes('ANCIENT_RUINS'),
        pool: 'TECH_ANCIENT',
        msg_context: 'Ruin excavation'
    },
    {
        id: 'tag_signals',
        criteria: (p) => p.tags && p.tags.includes('ALIEN_SIGNALS'),
        pool: 'TECH_ANCIENT',
        msg_context: 'Signal source triangulation'
    }
];
