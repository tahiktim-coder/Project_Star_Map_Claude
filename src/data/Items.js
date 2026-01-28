const ITEMS = {
    // Biological
    RADIOTROPHIC_FUNGUS: {
        id: 'fungus', name: 'Radiotrophic Fungus', type: 'CONSUMABLE', value: 15,
        desc: 'Converts radiation to chemical energy.',
        onUse: (state) => { state.energy = Math.min(100, state.energy + 15); return "Energy restored by 15."; }
    },
    AMBER_SPECIMEN: {
        id: 'amber', name: 'Amber Specimen', type: 'ARTIFACT', value: 50,
        desc: 'Preserved biological sample from ancient era. A reminder that life persists.',
        onUse: (state) => {
            const stressed = state.crew.filter(c => c.status !== 'DEAD' && c.stress > 0);
            if (stressed.length === 0) return "The crew admires it, but no one needs comfort right now.";
            // Reduce stress for most stressed crew member
            const target = stressed.reduce((a, b) => (a.stress > b.stress) ? a : b);
            target.stress = Math.max(0, target.stress - 1);
            return `${target.name} holds the amber up to the light. Ancient life, frozen in time. Somehow comforting. Stress reduced.`;
        }
    },
    // Rocky/Barren
    GEODE_SAMPLE: {
        id: 'geode', name: 'Geode Sample', type: 'ARTIFACT', value: 40,
        desc: 'Crystalline formation hiding unexpected beauty within. Can be contemplated for stress relief.',
        onUse: (state) => {
            const stressed = state.crew.filter(c => c.status !== 'DEAD' && c.stress > 0);
            if (stressed.length === 0) return "The crystals catch the light beautifully, but no one needs the distraction.";
            const target = stressed.reduce((a, b) => (a.stress > b.stress) ? a : b);
            target.stress = Math.max(0, target.stress - 1);
            return `${target.name} turns the geode in their hands, watching light refract through crystal. Beauty in the void. Stress reduced.`;
        }
    },
    OBSIDIAN_MONOLITH: {
        id: 'monolith', name: 'Obsidian Monolith', type: 'ARTIFACT', value: 75,
        desc: 'Strange geometric stone carving. Staring into it brings unexpected peace.',
        onUse: (state) => {
            // More powerful - reduces stress for TWO crew members
            const stressed = state.crew.filter(c => c.status !== 'DEAD' && c.stress > 0);
            if (stressed.length === 0) return "The monolith's geometry is fascinating, but no one needs its calm right now.";
            // Sort by stress descending, take top 2
            stressed.sort((a, b) => b.stress - a.stress);
            const affected = stressed.slice(0, 2);
            affected.forEach(c => c.stress = Math.max(0, c.stress - 1));
            if (affected.length === 1) {
                return `${affected[0].name} stares into the monolith's depths. Something about its geometry... calming. Stress reduced.`;
            }
            return `${affected[0].name} and ${affected[1].name} gather around the monolith. Its impossible geometry somehow soothes them. Stress reduced for both.`;
        }
    },
    // Ruins/Tech
    SCRAP_PLATING: {
        id: 'scrap', name: 'Scrap Plating', type: 'RESOURCE', value: 10,
        desc: 'Salvageable alloy plating.',
        onUse: (state) => { state.metals += 15; return "Salvaged +15 Salvage."; }
    },
    TECH_FRAGMENT: {
        id: 'tech_frag', name: 'Tech Fragment', type: 'LORE', value: 100,
        desc: 'Data storage device from a lost civilization. May contain useful calibration data for A.U.R.A.',
        onUse: (state) => {
            // Reset A.U.R.A. ethics toward neutral if AuraSystem exists
            if (window.AuraSystem) {
                const oldTier = window.AuraSystem.getTier();
                window.AuraSystem.ethicsScore = Math.min(window.AuraSystem.ethicsScore + 3, 2);
                const newTier = window.AuraSystem.getTier();
                if (oldTier !== newTier) {
                    return `A.U.R.A.: "Processing recovered data... recalibrating ethical parameters." A.U.R.A. disposition improved to ${newTier}.`;
                }
                return `A.U.R.A.: "Interesting data recovered. Adjusting baseline parameters." Ethics improved.`;
            }
            // Fallback if no AuraSystem - just give some salvage
            state.metals += 20;
            return "Extracted useful schematics from the fragment. +20 Salvage.";
        }
    },

    // Condensed Resources (Found via Probe 5%)
    CONDENSED_SALVAGE: {
        id: 'condensed_salvage', name: 'Condensed Salvage', type: 'RESOURCE_PACK', value: 50,
        desc: 'Highly compressed refined ores.',
        onUse: (state) => { state.metals += 50; return "Processed +50 Salvage."; }
    },
    IONIZED_BATTERY: {
        id: 'ion_battery', name: 'Ionized Battery', type: 'RESOURCE_PACK', value: 30,
        desc: 'Unstable high-capacity energy cell.',
        onUse: (state) => { state.energy = Math.min(100, state.energy + 30); return "Drained +30 Energy."; }
    },
    // Fungus Culture (passive ration generator — NOT the consumable fungus above)
    FUNGUS_CULTURE: {
        id: 'FUNGUS_CULTURE', name: 'Radiotrophic Fungus Culture', type: 'LIVING', value: 80,
        desc: 'A contained colony of radiotrophic fungus. Feeds on background radiation, producing edible biomass. Passive: +1 Ration every 3 major actions.',
        onUse: null // Passive effect handled by GameState.consumeRation()
    },
    // Food Pack (ration recovery)
    FOOD_PACK: {
        id: 'food_pack', name: 'Sealed Food Pack', type: 'CONSUMABLE', value: 10,
        desc: 'Vacuum-sealed rations from a previous expedition. Still edible.',
        onUse: (state) => { state.rations = Math.min(state.maxRations, state.rations + 3); return "Rations restored by 3."; }
    },
    // Luxury Item (stress reducer)
    LUXURY_CHOCOLATE: {
        id: 'chocolate', name: 'Synth-Chocolate Ration', type: 'CONSUMABLE', value: 15,
        desc: 'Pre-war luxury. The taste of something that isn\'t recycled protein.',
        onUse: (state) => {
            const stressed = state.crew.filter(c => c.status !== 'DEAD' && c.stress > 0);
            if (stressed.length > 0) {
                const target = stressed.reduce((a, b) => (a.stress > b.stress) ? a : b);
                target.stress = Math.max(0, target.stress - 1);
                return `${target.name} savors the taste. Stress reduced.`;
            }
            return "No stressed crew to benefit.";
        }
    },
    MUSIC_HOLOTAPE: {
        id: 'holotape', name: 'Music Holotape', type: 'CONSUMABLE', value: 20,
        desc: 'A recording of Earth classical music. Brahms, apparently.',
        onUse: (state) => {
            let reduced = 0;
            state.crew.forEach(c => {
                if (c.status !== 'DEAD' && c.stress > 0) {
                    c.stress = Math.max(0, c.stress - 1);
                    reduced++;
                }
            });
            return reduced > 0 ? `${reduced} crew members relax as the music plays. Stress reduced for all.` : "No stressed crew to benefit.";
        }
    },
    // Dark Artifacts
    XENO_MYCELIUM: {
        id: 'xeno_mycelium', name: 'Xeno-Mycelium Spores', type: 'REVIVAL_BIO', value: 200,
        desc: 'Pulsing fungal matter that reacts to necrotic tissue. [Use on corpse]',
        onUse: null // Special handling in App
    },
    NEURAL_LINK: {
        id: 'neural_link', name: 'Ancient Neural Link', type: 'REVIVAL_TECH', value: 250,
        desc: 'Spider-like mesh that overrides nervous system decay. [Use on corpse]',
        onUse: null // Special handling
    }
};
