/**
 * ANOMALY ENCOUNTERS
 *
 * Reality-breaking phenomena found in deep space.
 * Lovecraftian, Warhammer Warp-like dimensional weirdness.
 * High risk, high reward, high narrative impact.
 *
 * Found in Sector 4+ with ANOMALY tag, or triggered by alien nav data.
 */

// Helper: Test-aware chance (bad outcomes in test mode)
function _anomalyTestChance(chance) {
    if (window.TEST_MODE) return chance > 0;
    return Math.random() < chance;
}

const ANOMALY_ENCOUNTERS = [
    // --- 1. THE FOLD: Spatial distortion ---
    {
        id: 'ANOMALY_FOLD',
        weight: 20,
        title: "THE FOLD",
        context: () => `Space here is wrong. The stars behind the anomaly are stretched, duplicated, inverted. Sensor readings show the same coordinates existing in multiple places simultaneously. Looking at it too long causes nosebleeds.`,
        dialogue: [
            { speaker: 'Tech Mira', text: "The mathematics don't work. This point exists in at least three locations at once." },
            { speaker: 'A.U.R.A.', text: "Warning: Spatial coherence at 34%. Recommend immediate withdrawal." },
            { speaker: 'Dr. Aris', text: "I'm getting readings of organic material inside the fold. Something is alive in there." }
        ],
        choices: [
            {
                text: "Send a probe into the fold",
                desc: "Probe lost. But it sends back... something. +30 Energy, all crew +1 Stress.",
                effect: (state) => {
                    state.probeIntegrity = 0; // Probe destroyed
                    state.energy = Math.min(100, state.energy + 30);
                    state.crew.forEach(c => {
                        if (c.status !== 'DEAD') c.stress = Math.min(3, (c.stress || 0) + 1);
                    });
                    state.addLog("PROBE TELEMETRY: The probe exists in multiple locations. Its cameras show our ship from outside, inside, and from a place that isn't anywhere. The energy readings are off the charts.");
                    state.addLog("The probe signal cuts out. Then returns. Then cuts out. It's still transmitting. From everywhere.");
                    return "Probe entered the fold and fragmented across spacetime. Energy harvested from spatial bleed. +30 Energy. Probe destroyed. All crew +1 Stress.";
                }
            },
            {
                text: "Attempt to navigate through",
                desc: "DANGEROUS. 40% warp to THE WRONG PLACE, 60% jump 1-2 sectors ahead.",
                effect: (state) => {
                    if (_anomalyTestChance(0.4)) {
                        // BAD OUTCOME - Warp to "Hell" - a disturbing wrong place
                        const team = state.crew.filter(c => c.status === 'HEALTHY' && !c.tags.includes('LEADER'));
                        if (team.length > 0) {
                            const victim = team[Math.floor(Math.random() * team.length)];
                            victim.status = 'INJURED';
                            victim.stress = 3;
                            state.addLog(`${victim.name} experienced temporal displacement. They remember things that haven't happened yet. None of them are good.`);
                        }

                        // Create THE WRONG PLACE as its own isolated "sector"
                        const hellPlanet = {
                            id: 'WRONG_PLACE_' + Date.now(),
                            name: 'THE WRONG PLACE',
                            type: 'WRONG_PLACE',
                            desc: 'This is not where we meant to go. The stars are wrong. Time moves strangely. We need to leave.',
                            gravity: '???',
                            atmosphere: 'IMPOSSIBLE',
                            temperature: 'NEGATIVE KELVIN',
                            fuelCost: 0,
                            scanned: true,
                            tags: ['WRONG_PLACE'],
                            resources: { metals: 0, energy: 0 },
                            metrics: { hasLife: true, hasTech: true },
                            mapData: { x: 50, y: 50 },
                            _isWrongPlace: true,
                            _returnSector: state.currentSector // Remember where we came from
                        };

                        // Replace sector with just this planet
                        state._previousSectorNodes = state.sectorNodes;
                        state._previousSector = state.currentSector;
                        state.sectorNodes = [hellPlanet];
                        state.currentSystem = hellPlanet;
                        state.lastVisitedSystem = hellPlanet;
                        state._inWrongPlace = true;

                        state.addLog("=== SPATIAL TRANSLATION ERROR ===");
                        state.addLog("We emerged... somewhere else. The stars don't match any chart.");
                        state.addLog("A.U.R.A. is silent. The instruments show readings that make no sense.");
                        state.addLog("There's a wreck here. It has our ship's transponder code.");
                        state.crew.forEach(c => {
                            if (c.status !== 'DEAD') c.stress = Math.min(3, (c.stress || 0) + 1);
                        });

                        // Trigger visual teleport effect and view refresh
                        window.dispatchEvent(new CustomEvent('anomaly-teleport', { detail: { destination: hellPlanet, type: 'WRONG_PLACE' } }));

                        return "The fold rejected us. We emerged... in THE WRONG PLACE. All crew +1 Stress.";
                    }

                    // GOOD OUTCOME - Jump 1-2 sectors ahead!
                    const currentSector = state.currentSector || 1;
                    const jump = Math.random() < 0.5 ? 1 : 2; // 50% chance of 1 or 2 sector jump
                    const targetSector = Math.min(6, currentSector + jump);

                    if (targetSector > currentSector) {
                        // Generate the new sector
                        if (typeof PlanetGenerator !== 'undefined') {
                            state.sectorNodes = PlanetGenerator.generateSector(targetSector);
                            state.currentSector = targetSector;

                            // Apply sector entry effects
                            const config = (typeof SECTOR_CONFIG !== 'undefined') ? SECTOR_CONFIG[targetSector] : null;
                            if (config && config.hazard && config.hazard.onSectorEnter) {
                                config.hazard.onSectorEnter(state, state.sectorNodes);
                            }

                            // Pick a random planet to arrive at
                            const arrival = state.sectorNodes[Math.floor(Math.random() * state.sectorNodes.length)];
                            state.currentSystem = arrival;
                            state.lastVisitedSystem = arrival;

                            state.addLog("=== SPATIAL TRANSLATION SUCCESS ===");
                            state.addLog(`The fold opened. Space itself bent around the Exodus-9.`);
                            state.addLog(`We traveled ${jump} sector${jump > 1 ? 's' : ''} in the space between heartbeats.`);
                            state.addLog(`Now entering: SECTOR ${targetSector}`);

                            // Trigger visual teleport effect
                            window.dispatchEvent(new CustomEvent('anomaly-teleport', { detail: { destination: arrival, type: 'FOLD_SUCCESS', sectorJump: jump } }));

                            return `The fold accepted us. Jumped ${jump} sector${jump > 1 ? 's' : ''} ahead to Sector ${targetSector}. Zero energy cost.`;
                        }
                    }

                    return "The fold collapsed before we could enter. We remain in place.";
                }
            },
            {
                text: "Observe and document only",
                desc: "+Colony knowledge. Safe but limited reward.",
                effect: (state) => {
                    state._colonyKnowledge = (state._colonyKnowledge || 0) + 1;
                    state.addLog("ANOMALY REPORT: 'Spatial fold documented. Coordinates logged. If we survive, this data will revolutionize physics. If anyone believes us.'");
                    return "Anomaly documented from safe distance. Scientific data preserved. Colony knowledge gained.";
                }
            }
        ]
    },

    // --- 2. THE WHISPER: Psychic phenomenon ---
    {
        id: 'ANOMALY_WHISPER',
        weight: 15,
        title: "THE WHISPER",
        context: () => `There is no visible anomaly. But every crew member can hear it — a sound below hearing, a voice without words. It knows your name. It knows things you've never told anyone. It wants to help.`,
        dialogue: [
            { speaker: 'Dr. Aris', text: "I can hear... my mother. She died before the launch. She's telling me to come closer." },
            { speaker: 'Spc. Vance', text: "It's not real. It CAN'T be real. But it knows about Kepler-7. It knows what I did there." },
            { speaker: 'Tech Mira', text: "The source is... everywhere? And nowhere? The signal has no origin point." }
        ],
        choices: [
            {
                text: "Let someone listen",
                desc: "One crew member communes with the Whisper. Random outcome.",
                effect: (state) => {
                    const candidates = state.crew.filter(c => c.status !== 'DEAD' && !c.tags.includes('LEADER'));
                    if (candidates.length === 0) return "No crew available to listen.";

                    const listener = candidates[Math.floor(Math.random() * candidates.length)];
                    // In test mode, force interesting outcomes
                    const roll = window.TEST_MODE ? 0.1 : Math.random();

                    if (roll < 0.3) {
                        // Bad: Madness
                        listener.stress = 3;
                        state.addLog(`${listener.name} listened too long. They won't stop smiling. They say the voice promised them something beautiful.`);
                        return `${listener.name} communed with the Whisper. Something changed in them. Stress maximized.`;
                    } else if (roll < 0.7) {
                        // Neutral: Knowledge
                        state._colonyKnowledge = (state._colonyKnowledge || 0) + 2;
                        listener.stress = Math.min(3, (listener.stress || 0) + 1);
                        state.addLog(`${listener.name}: "It showed me... everything. Every failed colony. Every mistake. It's trying to help us not repeat them."`);
                        return `${listener.name} received visions of the past. Colony knowledge greatly improved. +1 Stress.`;
                    } else {
                        // Good: Healing
                        listener.stress = 0;
                        if (listener.status === 'INJURED') listener.status = 'HEALTHY';
                        state.addLog(`${listener.name}: "It forgave me. For all of it. I feel... clean."`);
                        return `${listener.name} found peace in the Whisper. Fully healed and stress cleared.`;
                    }
                }
            },
            {
                text: "Broadcast a response",
                desc: "Attempt communication. Unpredictable results.",
                effect: (state) => {
                    const roll = window.TEST_MODE ? 0.1 : Math.random();
                    if (roll < 0.25) {
                        // The Whisper responds with a gift
                        state.energy = Math.min(100, state.energy + 50);
                        state.salvage = Math.min(state.maxSalvage, state.salvage + 30);
                        state.addLog("THE WHISPER: 'You spoke. You are the first in so long. Take this. Find home.'");
                        return "The Whisper responded with gratitude. Energy and matter materialized from nothing. +50 Energy, +30 Salvage.";
                    } else if (roll < 0.5) {
                        // The Whisper responds with knowledge
                        state.sectorNodes?.forEach(p => {
                            p.remoteScanned = true;
                            p._tagsRevealed = true;
                        });
                        state.addLog("THE WHISPER: 'I see all your destinations. Let me show you.'");
                        return "The Whisper revealed the entire sector. All planets scanned. All tags visible.";
                    } else if (roll < 0.75) {
                        // The Whisper ignores us
                        state.addLog("THE WHISPER: Silence. Then, softer: 'Not yet. Not ready.'");
                        return "The Whisper fell silent. It seems to be waiting for something.";
                    } else {
                        // The Whisper is angry
                        state.crew.forEach(c => {
                            if (c.status !== 'DEAD') c.stress = Math.min(3, (c.stress || 0) + 1);
                        });
                        state.addLog("THE WHISPER: A SCREAM. Not in sound — in MEANING. The concept of wrongness forced into every mind.");
                        return "The Whisper rejected our communication. Psychic backlash. All crew +1 Stress.";
                    }
                }
            },
            {
                text: "Block all external signals and leave",
                desc: "Safe withdrawal. -10 Energy (signal jamming), all crew -1 Stress.",
                effect: (state) => {
                    state.energy = Math.max(0, state.energy - 10);
                    state.crew.forEach(c => {
                        if (c.status !== 'DEAD' && c.stress > 0) c.stress = Math.max(0, c.stress - 1);
                    });
                    state.addLog("We flooded all frequencies with static. The Whisper faded. The silence is a relief.");
                    return "Signal jamming successful. The voice is gone. -10 Energy. All crew -1 Stress.";
                }
            }
        ]
    },

    // --- 3. THE MIRROR: Alternate reality bleed ---
    {
        id: 'ANOMALY_MIRROR',
        weight: 15,
        title: "THE MIRROR",
        context: () => `Another ship hangs in space before us. It's the Exodus-9. Same hull. Same markings. Same transponder code. Through the viewport, we can see... ourselves. Looking back. They look tired. They look afraid. They're pointing at something behind us.`,
        dialogue: [
            { speaker: 'A.U.R.A.', text: "Impossible. I am detecting my own signal originating from that vessel. We are looking at ourselves." },
            { speaker: 'Eng. Jaxon', text: "That's not a reflection. They're moving independently. And they look... worse than us." },
            { speaker: 'Dr. Aris', text: "Different choices. Different outcomes. That's us if we made different decisions." }
        ],
        choices: [
            {
                text: "Attempt contact with the other crew",
                desc: "Learn from your alternate selves. +Colony knowledge, resource insight.",
                effect: (state) => {
                    state._colonyKnowledge = (state._colonyKnowledge || 0) + 1;
                    // Reveal resource info for best planet
                    const best = state.sectorNodes?.reduce((a, b) =>
                        ((b.resources?.metals || 0) + (b.resources?.energy || 0)) >
                        ((a.resources?.metals || 0) + (a.resources?.energy || 0)) ? b : a
                    );
                    if (best) {
                        best.remoteScanned = true;
                        state.addLog(`MIRROR CREW: "Don't go to ${best.name} first. We did. We found... go there LAST. Trust us."`);
                    }
                    state.addLog("They showed us their journey. Every mistake highlighted. We won't repeat them.");
                    return "Your alternate selves shared their failures. Colony knowledge improved. Best planet revealed.";
                }
            },
            {
                text: "Trade resources across the boundary",
                desc: "Exchange: Give 20 Salvage, receive 30 Energy. Or vice versa.",
                effect: (state) => {
                    if (state.salvage >= 20) {
                        state.salvage -= 20;
                        state.energy = Math.min(100, state.energy + 30);
                        state.addLog("We passed crates through the shimmer. They sent power cells back. Both ships benefit.");
                        return "Cross-dimensional trade successful. -20 Salvage, +30 Energy.";
                    } else if (state.energy >= 30) {
                        state.energy -= 30;
                        state.salvage = Math.min(state.maxSalvage, state.salvage + 20);
                        state.addLog("They needed power more than materials. Fair trade across reality.");
                        return "Cross-dimensional trade successful. -30 Energy, +20 Salvage.";
                    }
                    return "Insufficient resources to trade. The other crew looks disappointed.";
                }
            },
            {
                text: "Ram the mirror boundary",
                desc: "DESPERATE. Merge realities. Unpredictable crew/resource changes.",
                effect: (state) => {
                    // Chaotic merge
                    state.addLog("REALITY MERGE IN PROGRESS");

                    // Random resource shuffle
                    state.energy = Math.min(100, Math.floor(state.energy * (0.5 + Math.random())));
                    state.salvage = Math.min(state.maxSalvage, Math.floor(state.salvage * (0.5 + Math.random())));
                    state.rations = Math.min(state.maxRations, Math.floor(state.rations * (0.5 + Math.random())));

                    // Heal one random crew, injure another
                    const healthy = state.crew.filter(c => c.status === 'HEALTHY' && !c.tags.includes('LEADER'));
                    const injured = state.crew.filter(c => c.status === 'INJURED');

                    if (injured.length > 0) {
                        injured[0].status = 'HEALTHY';
                        state.addLog(`${injured[0].name} emerged from the merge uninjured. They remember dying.`);
                    }
                    if (healthy.length > 0) {
                        const unlucky = healthy[Math.floor(Math.random() * healthy.length)];
                        unlucky.status = 'INJURED';
                        state.addLog(`${unlucky.name} came out wrong. They have scars from wounds they never received.`);
                    }

                    state.addLog("The mirror is gone. We are... mostly ourselves. Mostly.");
                    return "Reality merge complete. Resources scrambled. Crew states altered. We are changed.";
                }
            }
        ]
    },

    // --- 4. THE HUNGER: Void entity ---
    {
        id: 'ANOMALY_HUNGER',
        weight: 10,
        title: "THE HUNGER",
        context: () => `The darkness here is wrong. It's not an absence of light — it's a presence of VOID. Something vast is nearby. We can't see it, but we can feel it watching. Waiting. Hungry.`,
        dialogue: [
            { speaker: 'Spc. Vance', text: "Contact. I don't know how I know, but there's something out there. Something big." },
            { speaker: 'A.U.R.A.', text: "Sensors are returning null values. Not zero — NULL. As if the space itself is undefined." },
            { speaker: 'Tech Mira', text: "The math says there's mass out there. A lot of mass. But no light escapes it. It's not a black hole. It's... aware." }
        ],
        choices: [
            {
                text: "Offer it something",
                desc: "Sacrifice 30 Salvage to the void. Receive... favor?",
                effect: (state) => {
                    if (state.salvage < 30) return "Insufficient salvage to offer. The Hunger notices. It is displeased.";
                    state.salvage -= 30;

                    // The Hunger gives a strange gift
                    state._hungerFavor = true;
                    state.crew.forEach(c => {
                        if (c.status !== 'DEAD') c.stress = 0;
                    });
                    state.addLog("We ejected cargo into the void. It was consumed instantly. Then... peace. A sense of approval. Like a predator acknowledging we are not prey.");
                    return "The Hunger accepted our offering. All crew stress cleared. It will remember this kindness.";
                }
            },
            {
                text: "Attempt to study it",
                desc: "Risk: 50% probe loss. Reward: Massive energy harvest.",
                effect: (state) => {
                    if (state.probeIntegrity <= 0) {
                        return "No probe available. The Hunger seems amused by our helplessness.";
                    }

                    if (_anomalyTestChance(0.5)) {
                        // Probe lost
                        state.probeIntegrity = 0;
                        state.addLog("The probe... was eaten. Not destroyed. EATEN. Its signal didn't stop — it was SILENCED.");
                        return "Probe consumed by the Hunger. No data recovered. Probe destroyed.";
                    }

                    // Success
                    state.energy = Math.min(100, state.energy + 80);
                    state.probeIntegrity = Math.max(0, state.probeIntegrity - 50);
                    state.addLog("The probe skimmed the edge of the void and returned covered in frost that isn't water. The energy readings are impossible. We harvested what we could.");
                    return "Probe survived the approach. Void energy harvested. +80 Energy. Probe heavily damaged.";
                }
            },
            {
                text: "Flee at maximum burn",
                desc: "-20 Energy. Safe escape. The Hunger remembers those who run.",
                effect: (state) => {
                    if (!state.consumeEnergy(20)) {
                        return "Insufficient energy to flee. The Hunger draws closer.";
                    }
                    state.addLog("Full burn engaged. We put distance between us and the void. It didn't pursue. It didn't need to. It's patient.");
                    state._hungerFled = true;
                    return "Emergency escape successful. -20 Energy. The Hunger watches us go.";
                }
            }
        ]
    },

    // --- 5. THE GARDEN: Impossible life ---
    {
        id: 'ANOMALY_GARDEN',
        weight: 15,
        title: "THE GARDEN",
        context: () => `In the vacuum of space, something is growing. A structure of impossible biology — part plant, part coral, part architecture. It pulses with bioluminescence. It's beautiful. It shouldn't exist. But it does, and it's reaching toward the ship.`,
        dialogue: [
            { speaker: 'Dr. Aris', text: "It's alive. Not just alive — thriving. In hard vacuum. This defies everything we know about biology." },
            { speaker: 'Tech Mira', text: "The structure is growing. Visibly. It wasn't this big when we arrived." },
            { speaker: 'Eng. Jaxon', text: "It's beautiful. But beauty out here usually means danger." }
        ],
        choices: [
            {
                text: "Harvest biological samples",
                desc: "+Fungus Culture (passive rations), risk of contamination.",
                effect: (state) => {
                    if (_anomalyTestChance(0.2)) {
                        // Contamination
                        const team = state.crew.filter(c => c.status === 'HEALTHY' && !c.tags.includes('LEADER'));
                        if (team.length > 0) {
                            const victim = team[Math.floor(Math.random() * team.length)];
                            victim.status = 'INJURED';
                            victim.tags = victim.tags || [];
                            if (!victim.tags.includes('HIVE_MIND')) victim.tags.push('HIVE_MIND');
                            state.addLog(`${victim.name} touched the growth. Something passed between them. They say they can hear it singing.`);
                        }
                    }
                    if (typeof ITEMS !== 'undefined' && ITEMS.FUNGUS_CULTURE) {
                        state.cargo.push({ ...ITEMS.FUNGUS_CULTURE, acquiredAt: 'The Garden' });
                        return "Sample extracted. The growth... allowed it. +Fungus Culture (passive ration generation).";
                    }
                    return "Sample containers failed. The biology is too alien for our equipment.";
                }
            },
            {
                text: "Let it interface with the ship",
                desc: "Allow the growth to touch our hull. Unknown outcome.",
                effect: (state) => {
                    const roll = window.TEST_MODE ? 0.1 : Math.random();
                    if (roll < 0.33) {
                        // Repairs
                        state.probeIntegrity = 100;
                        const injured = state.crew.find(c => c.status === 'INJURED');
                        if (injured) injured.status = 'HEALTHY';
                        state.addLog("The growth spread across our hull, then retreated. Where it touched, damage is repaired. One crew member's wounds are closed.");
                        return "The Garden healed us. Probe restored. Injured crew healed.";
                    } else if (roll < 0.66) {
                        // Food
                        state.rations = Math.min(state.maxRations, state.rations + 10);
                        state.addLog("The growth left behind... fruit? Seeds? Something edible. It tastes like nothing. It nourishes like everything.");
                        return "The Garden fed us. +10 Rations.";
                    } else {
                        // Changed
                        const affected = state.crew.filter(c => c.status !== 'DEAD');
                        affected.forEach(c => {
                            c.stress = Math.max(0, (c.stress || 0) - 1);
                            c.tags = c.tags || [];
                            if (!c.tags.includes('GARDEN_TOUCHED')) c.tags.push('GARDEN_TOUCHED');
                        });
                        state.addLog("The growth touched each of us through the hull. We feel... connected. To it. To each other. To something larger.");
                        return "The Garden marked us. All crew stress reduced. We are... different now.";
                    }
                }
            },
            {
                text: "Burn it with thrusters",
                desc: "Destroy the anomaly. Safe but violent. +10 Energy from combustion.",
                effect: (state) => {
                    state.energy = Math.min(100, state.energy + 10);
                    state.crew.forEach(c => {
                        if (c.status !== 'DEAD') c.stress = Math.min(3, (c.stress || 0) + 1);
                    });
                    state.addLog("We burned it. It didn't scream. It just... looked at us. With something like sadness. Then it was gone.");
                    return "The Garden destroyed. +10 Energy from combustion. All crew +1 Stress (guilt).";
                }
            }
        ]
    },

    // --- 6. THE DOOR: Gateway to somewhere else ---
    {
        id: 'ANOMALY_DOOR',
        weight: 5,
        title: "THE DOOR",
        context: () => `It's a structure. Geometric. Perfect. Floating in space with no visible support or origin. It looks like a door — not metaphorically. An actual door. Ornate, ancient, made of material that doesn't exist. It's closed. For now.`,
        dialogue: [
            { speaker: 'Tech Mira', text: "The geometry is impossible. It exists in more dimensions than we can perceive. It's only SHOWING us a door." },
            { speaker: 'A.U.R.A.', text: "I have no frame of reference for this structure. My databases contain no matching architecture. This is genuinely unknown." },
            { speaker: 'Spc. Vance', text: "Doors lead somewhere. I don't want to know where this one goes." },
            { speaker: 'Dr. Aris', text: "What if it's the way home? Not to Earth — to whatever comes after." }
        ],
        choices: [
            {
                text: "Attempt to open the Door",
                desc: "UNKNOWN CONSEQUENCES. This is a point of no return decision.",
                effect: (state) => {
                    // The Door always has consequences
                    state._doorOpened = true;

                    const roll = window.TEST_MODE ? 0.1 : Math.random();
                    if (roll < 0.25) {
                        // The Door shows the ending
                        state.addLog("THE DOOR OPENED.");
                        state.addLog("Beyond it: a world. Green. Blue. Alive. A colony, thriving. Children playing in fields under a yellow sun.");
                        state.addLog("You see yourself there. Older. Happy. The journey complete.");
                        state.addLog("The Door closes. You remember what you saw. You know it's possible now.");
                        state.crew.forEach(c => {
                            if (c.status !== 'DEAD') c.stress = 0;
                        });
                        return "The Door showed you the future. Hope restored. All crew stress cleared.";
                    } else if (roll < 0.5) {
                        // The Door gives power
                        state.energy = 100;
                        state.salvage = state.maxSalvage;
                        state.rations = state.maxRations;
                        state.addLog("THE DOOR OPENED.");
                        state.addLog("Light poured through. Not sunlight. Something older. The ship's reserves filled in an instant.");
                        state.addLog("A voice: 'You are ready. Continue.'");
                        return "The Door blessed your journey. All resources maximized.";
                    } else if (roll < 0.75) {
                        // The Door takes something
                        const victim = state.crew.find(c => c.status !== 'DEAD' && !c.tags.includes('LEADER'));
                        if (victim) {
                            victim.status = 'DEAD';
                            state.addLog("THE DOOR OPENED.");
                            state.addLog(`${victim.name} walked toward it. Willingly. Smiling. They said: "I understand now."`);
                            state.addLog("The Door closed. They're gone. But the Door left something behind.");
                            state.energy = 100;
                            state._colonyKnowledge = (state._colonyKnowledge || 0) + 5;
                            return `The Door took ${victim.name}. In exchange: full power and immense knowledge.`;
                        }
                    }
                    // The Door refuses
                    state.addLog("THE DOOR OPENED. Nothing was on the other side. Just more void. But different void.");
                    state.addLog("A voice: 'Not yet. But soon.'");
                    return "The Door opened to nothing. The time isn't right. Yet.";
                }
            },
            {
                text: "Leave an offering and observe",
                desc: "Place cargo before the Door. See what happens.",
                effect: (state) => {
                    if (state.cargo.length === 0) {
                        return "No cargo to offer. The Door seems to pulse with impatience.";
                    }
                    const offering = state.cargo.pop();
                    state.addLog(`${offering.name} placed before the Door.`);
                    state.addLog("The offering dissolved into light. The Door hummed. Approving.");
                    state._doorOffering = true;
                    state.crew.forEach(c => {
                        if (c.status !== 'DEAD') c.stress = Math.max(0, (c.stress || 0) - 1);
                    });
                    return `${offering.name} offered to the Door. It was accepted. All crew -1 Stress.`;
                }
            },
            {
                text: "Document and retreat",
                desc: "Record everything. Leave. +Colony knowledge. Safe.",
                effect: (state) => {
                    state._colonyKnowledge = (state._colonyKnowledge || 0) + 2;
                    state.addLog("ANOMALY DOCUMENTED: 'The Door exists. Coordinates logged. We weren't ready. Maybe the next ship will be.'");
                    return "The Door documented. Colony knowledge greatly improved. We leave with our lives and our sanity.";
                }
            }
        ]
    }
];

// Export for use
if (typeof window !== 'undefined') {
    window.ANOMALY_ENCOUNTERS = ANOMALY_ENCOUNTERS;
}
