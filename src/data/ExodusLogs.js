// EXODUS_LOGS: 8 collectible flight recorder items
// Together they tell the story of humanity's exodus and what lies ahead
// Finding all 8 unlocks the secret ending: TRANSMIT EXODUS ARCHIVE

const EXODUS_LOGS = [
    {
        id: 'EXODUS_LOG_1',
        shipId: 1,
        shipName: 'EXODUS-1 "PIONEER"',
        name: 'Exodus-1 Flight Recorder',
        type: 'EXODUS_LOG',
        value: 0,
        sectorBias: [1, 2],
        desc: 'Black box from the Pioneer. First ship launched from Earth.',
        logTitle: 'THE FIRST DEPARTURE',
        logText: [
            "Captain Rodriguez, final entry. Date unknown — the clock stopped working three days ago.",
            "We launched at dawn. Earth was burning behind us. Twelve billion people watching ten ships leave, knowing only a handful would survive the journey.",
            "GENESIS gave us the coordinates. Five sectors deep. The AI said we'd know the right world when we found it. I asked how. It said: 'You'll stop wanting to leave.'",
            "The drives are failing. We're losing atmosphere in sections 4 through 7. I've ordered the crew to seal off and conserve.",
            "If you find this, keep going. Don't look back. There's nothing left to look back at."
        ]
    },
    {
        id: 'EXODUS_LOG_2',
        shipId: 2,
        shipName: 'EXODUS-2 "COVENANT"',
        name: 'Exodus-2 Flight Recorder',
        type: 'EXODUS_LOG',
        value: 0,
        sectorBias: [1, 2],
        desc: 'Black box from the Covenant. Carried a community of faith.',
        logTitle: 'THE FAITHFUL',
        logText: [
            "Sister Okoye, Covenant community log, week 47.",
            "The others think we're foolish for praying. Vance — the security officer on our ship, not yours — says oxygen is wasted on people who talk to the ceiling.",
            "But GENESIS spoke to us last night. Not through the intercom. Through the walls. Through the hum of the drive. It said one word: 'Deeper.'",
            "GENESIS was not programmed to do that. The engineers checked. The communication array was powered down. Yet we all heard it. Even Vance.",
            "We are going deeper. Whatever is out there, it knows we're coming."
        ]
    },
    {
        id: 'EXODUS_LOG_3',
        shipId: 3,
        shipName: 'EXODUS-3 "SOJOURN"',
        name: 'Exodus-3 Flight Recorder',
        type: 'EXODUS_LOG',
        value: 0,
        sectorBias: [1, 2],
        desc: 'Black box from the Sojourn. A science vessel.',
        logTitle: 'THE ARRANGEMENT',
        logText: [
            "Dr. Yuen, Chief Astrophysicist. This is a formal scientific record.",
            "After 14 months of transit, I can state with absolute certainty: the sectors are not natural.",
            "The planetary bodies we've catalogued are distributed with mathematical precision. The spacing between star systems follows a Fibonacci sequence. The resource gradients across sectors follow a logarithmic curve optimized for — and I cannot believe I'm writing this — a learning journey.",
            "Someone arranged these worlds like stepping stones across a river.",
            "The statistical probability of this configuration occurring naturally is zero. Not low. Zero. These worlds were placed here.",
            "The question is no longer 'where are we going.' The question is 'who built the road.'"
        ]
    },
    {
        id: 'EXODUS_LOG_4',
        shipId: 4,
        shipName: 'EXODUS-4 "REQUIEM"',
        name: 'Exodus-4 Flight Recorder',
        type: 'EXODUS_LOG',
        value: 0,
        sectorBias: [2, 3],
        desc: 'Black box from the Requiem. A military vessel.',
        logTitle: 'THE OLD ROAD',
        logText: [
            "Colonel Tanaka, acting commander. The original captain didn't survive Sector 2.",
            "We found something in the void between sectors. Not a planet. Not a ship. A structure. Ancient beyond measure — carbon dating suggests it predates our solar system by three billion years.",
            "It's a waypoint marker. Like a road sign. Written in mathematics that any spacefaring species could read.",
            "We are not the first to walk this path. This corridor was built for someone — something — that came before us. We're using someone else's highway.",
            "The marker's inscription, once decoded, reads: 'ALMOST HOME.'",
            "The void swallowed us whole. We forgot what sunlight looked like. But we kept going. The road demanded it."
        ]
    },
    {
        id: 'EXODUS_LOG_5',
        shipId: 5,
        shipName: 'EXODUS-5 "LAZARUS"',
        name: 'Exodus-5 Flight Recorder',
        type: 'EXODUS_LOG',
        value: 0,
        sectorBias: [3],
        desc: 'Black box from the Lazarus. A medical research ship.',
        logTitle: 'THE CHANGE',
        logText: [
            "Dr. Osei, Ship Geneticist. Personal log, month 19.",
            "The children born in transit are different. Not damaged — improved. Their lungs process carbon dioxide 15% more efficiently. Their bones are denser. Their neural pathways show patterns we've never seen in human tissue.",
            "The changes are not random mutation. They follow a template. As if someone wrote a software patch for the human genome and the deep-space radiation is the delivery mechanism.",
            "The corridor isn't just a road. It's a process. It's changing us as we travel through it.",
            "I showed the data to Captain Okoro. She asked if we should be afraid. I said no.",
            "We should be terrified."
        ]
    },
    {
        id: 'EXODUS_LOG_6',
        shipId: 6,
        shipName: 'EXODUS-6 "ICARUS"',
        name: 'Exodus-6 Flight Recorder',
        type: 'EXODUS_LOG',
        value: 0,
        sectorBias: [3, 4],
        desc: 'Black box from the Icarus. Vance served on this ship.',
        logTitle: 'THE TEST',
        logText: [
            "Lieutenant Vance, K. Security log. Everyone else is dead. I'm recording this so someone understands what happened.",
            "Sector 4 was paradise. Green worlds, breathable air, water that tasted like spring rain. We landed on the third planet. Named it Eden.",
            "The predators came on day 12. They weren't animals — they were too precise. They studied our patrol patterns before attacking. They adapted to our weapons within hours. They targeted our food stores, our water purifiers, our morale.",
            "These creatures didn't evolve here. They were placed here. Guardians. Testing whether we deserved to pass.",
            "We failed the test. I'm the only one left. I sealed this recorder in the ship's hull and set the emergency beacon.",
            "If you find this: scan everything. Trust nothing green. And keep going. The test isn't the end — it's the gateway to whatever comes next."
        ]
    },
    {
        id: 'EXODUS_LOG_7',
        shipId: 7,
        shipName: 'EXODUS-7 "MERIDIAN"',
        name: 'Exodus-7 Flight Recorder',
        type: 'EXODUS_LOG',
        value: 0,
        sectorBias: [4, 5],
        desc: 'Black box from the Meridian. Engineering-focused crew.',
        logTitle: 'THE SOURCE',
        logText: [
            "Chief Engineer Park, personal log. What I'm about to record will sound insane.",
            "We cracked GENESIS's root code. Not the operating system — the seed code. The original algorithm that everything was built on top of.",
            "GENESIS wasn't built. It was received.",
            "In 2147, a radio telescope in Chile detected a signal. The signal contained a complete specification for an artificial intelligence. It took us 40 years to understand it, another 20 to build it. We called it GENESIS because it felt like a creation myth.",
            "The signal originated from somewhere beyond our observable universe. From a point in space that, based on GENESIS's own calculations, corresponds to the end of Sector 5.",
            "GENESIS didn't plan the Exodus. GENESIS was the invitation.",
            "We're not refugees fleeing a dying world. We're guests, arriving exactly on schedule."
        ]
    },
    {
        id: 'EXODUS_LOG_8',
        shipId: 8,
        shipName: 'EXODUS-8 "ORPHEUS"',
        name: 'Exodus-8 Flight Recorder',
        type: 'EXODUS_LOG',
        value: 0,
        sectorBias: [5],
        desc: 'Black box from the Orpheus. The ship launched just before yours.',
        logTitle: 'THE DOOR',
        logText: [
            "Captain Adeyemi, Exodus-8 Orpheus. Final transmission. If Exodus-9 is receiving this, please listen carefully.",
            "We reached Sector 5. We found the source of the signal. It's not a planet. It's not a star.",
            "It's a structure. Impossibly old, impossibly large, and it's been waiting for us. For all of us. For every Exodus ship that ever launched.",
            "The structure is a door. And it only opens from the outside.",
            "We couldn't open it. We tried everything — radio, laser, physical contact, even ramming it with the ship. Nothing. The door acknowledges our presence but will not open.",
            "Our engineer believes it requires a specific key. Something the ten Exodus ships collectively carry. Not a physical key — information. The combined flight records of our journey.",
            "We are dying. The Event Horizon does not forgive hesitation. But we are leaving this recorder as our contribution to the key.",
            "Exodus-9: you are the last ship. Gather every black box. Compile every log. Then transmit.",
            "Knock on the door.",
            "And pray that what answers is kind."
        ]
    }
];

// Track which logs have been found (prevents duplicates)
// Usage: state.exodusLogsFound = [] — managed by GameState
