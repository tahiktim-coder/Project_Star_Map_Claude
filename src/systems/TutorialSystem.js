/**
 * TUTORIAL SYSTEM - Contextual hints for new players
 *
 * Shows one-time tips when players take actions for the first time.
 * Non-intrusive: appears in the log with a special format.
 */

const TUTORIAL_TIPS = {
    // First time warping to a planet
    FIRST_WARP: {
        id: 'first_warp',
        trigger: 'warp',
        message: "TIP: Warping costs energy. Check a planet's warp cost before traveling. Plan your route to avoid running dry.",
        condition: (state) => state.actionsTaken <= 3
    },

    // First scan
    FIRST_SCAN: {
        id: 'first_scan',
        trigger: 'scan',
        message: "TIP: Scanning reveals resources, danger level, and special signals like wrecks or anomalies. Scan before you land.",
        condition: (state) => !state._tutorialScanSeen
    },

    // First EVA
    FIRST_EVA: {
        id: 'first_eva',
        trigger: 'eva',
        message: "TIP: EVAs gather resources but risk crew lives. The danger level and planet type affect survival odds. Send your best.",
        condition: (state) => !state._tutorialEvaSeen
    },

    // First crew stress increase
    FIRST_STRESS: {
        id: 'first_stress',
        trigger: 'stress',
        message: "TIP: Crew stress builds from bad events. At stress 2, they develop problems. At stress 3, they break down. Rest at quarters or use items to reduce stress.",
        condition: (state) => !state._tutorialStressSeen
    },

    // First deck damage
    FIRST_DECK_DAMAGE: {
        id: 'first_deck_damage',
        trigger: 'deck_damage',
        message: "TIP: Damaged decks disable ship functions. Engineering damage makes repairs cost more. Bridge damage increases warp costs. Repair with salvage.",
        condition: (state) => !state._tutorialDeckSeen
    },

    // First low energy warning
    FIRST_LOW_ENERGY: {
        id: 'first_low_energy',
        trigger: 'low_energy',
        message: "TIP: Energy is your lifeline. If you can't warp and can't find resources, you're stuck. EVAs can harvest energy from some planets.",
        condition: (state) => state.energy <= 20 && !state._tutorialEnergySeen
    },

    // First low rations warning
    FIRST_LOW_RATIONS: {
        id: 'first_low_rations',
        trigger: 'low_rations',
        message: "TIP: Rations keep the crew alive. Major actions consume rations. Without food, crew will starve. Find food through EVAs or special events.",
        condition: (state) => state.rations <= 3 && !state._tutorialRationsSeen
    },

    // First special signal found
    FIRST_SIGNAL: {
        id: 'first_signal',
        trigger: 'signal_found',
        message: "TIP: Special signals mean encounters. Exodus wrecks, anomalies, derelicts - all have choices with different rewards and risks.",
        condition: (state) => !state._tutorialSignalSeen
    },

    // First sector jump available
    FIRST_SECTOR: {
        id: 'first_sector',
        trigger: 'sector_available',
        message: "TIP: Jumping to a new sector costs energy but advances your journey. Later sectors are more dangerous but have better rewards.",
        condition: (state) => state.actionsTaken >= 10 && !state._tutorialSectorSeen
    },

    // First crew injury
    FIRST_INJURY: {
        id: 'first_injury',
        trigger: 'injury',
        message: "TIP: Injured crew can't go on EVAs. They heal over time if Crew Quarters are working, or Dr. Aris can help faster.",
        condition: (state) => !state._tutorialInjurySeen
    },

    // First item found
    FIRST_ITEM: {
        id: 'first_item',
        trigger: 'item_found',
        message: "TIP: Items go to your cargo hold. Open the ship view to use them. Some items heal, some repair, some have unique effects.",
        condition: (state) => !state._tutorialItemSeen
    },

    // Reaching sector 3
    MID_GAME: {
        id: 'mid_game',
        trigger: 'sector_3',
        message: "TIP: You're halfway. Ship damage adds up. Crew stress builds. Start thinking about where you want to settle. Not every planet is worth colonizing.",
        condition: (state) => state.currentSector === 3 && !state._tutorialMidGameSeen
    }
};

/**
 * Tutorial System Manager
 */
const TutorialSystem = {
    /**
     * Check if a tutorial tip should show
     * @param {string} trigger - What triggered this check
     * @param {object} state - Game state
     * @returns {string|null} - Tip message or null
     */
    checkTip(trigger, state) {
        // Skip if tutorials disabled
        if (state._tutorialsDisabled) return null;

        for (const key in TUTORIAL_TIPS) {
            const tip = TUTORIAL_TIPS[key];
            if (tip.trigger === trigger && tip.condition(state)) {
                // Mark as seen
                state[`_tutorial${this._capitalize(tip.id)}Seen`] = true;
                return tip.message;
            }
        }
        return null;
    },

    /**
     * Show a tutorial tip in the log
     * @param {string} trigger - What triggered this
     * @param {object} state - Game state
     */
    showTip(trigger, state) {
        const message = this.checkTip(trigger, state);
        if (message) {
            state.addLog(`💡 ${message}`);
        }
    },

    /**
     * Disable all tutorials (for experienced players)
     */
    disable(state) {
        state._tutorialsDisabled = true;
        state.addLog("Tutorials disabled. You can re-enable them in settings.");
    },

    /**
     * Helper to capitalize first letter
     */
    _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, '');
    }
};

// Export
if (typeof window !== 'undefined') {
    window.TutorialSystem = TutorialSystem;
    window.TUTORIAL_TIPS = TUTORIAL_TIPS;
}
