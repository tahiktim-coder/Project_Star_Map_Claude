# Silent Exodus - Master Design Document v4.0

**Date:** January 28, 2026
**Status:** Major Redesign - Addressing Core Gameplay Issues

---

## PART 1: WHAT WE'VE BUILT vs WHAT'S BROKEN

### Currently Implemented (Working)
- 5 Sector progression with unique hazards (S1-S5)
- 20 planet types with visual CSS rendering
- Crew system (5 fixed characters + random commander)
- Stress system with breakdown events
- A.U.R.A. ethics tracking (4 tiers)
- Ship deck damage/repair system
- Probe and EVA systems
- Exodus Derelict encounters (7 types)
- Failed Colony encounters (5 types)
- Bark system (crew reactive dialogue)
- 3-act procedural ending system
- Campfire events between sectors

### Currently Broken / Not Working
1. **Revival items** — Revived crew get status SYMBIOTE/CYBORG_HUSK which doesn't count as HEALTHY, making them unable to participate in EVAs
2. **Dead trophy items** — Amber Specimen, Geode Sample, Obsidian Monolith take cargo space but do nothing (no USE button, no trade)
3. **Exodus Log collection** — The 8 logs are defined but never distributed; `exodusLogsFound` stays empty; secret ending unwired
4. **Lore vs Resources false choice** — Players must choose story OR resources, punishing engagement with narrative
5. **Remote scan useless info** — Shows gravity/temp/atmosphere which don't affect gameplay decisions
6. **Energy death spiral** — Player can get stuck with 5 energy, unable to do anything
7. **Ending narrative mismatch** — Text says "47 colonists" but ship only has 5 crew

### Core Design Problems Identified
1. No clear goal communication to player
2. Colony knowledge invisible and mechanically irrelevant
3. Resources barely matter for ending (planet type + crew alive = 90% of outcome)
4. No compelling reason to reach Sector 5+ (secret ending broken)
5. Game can feel like RNG determines survival, not player skill

---

## PART 2: THE REDESIGNED GAME

### 2.1 Core Fantasy
You are the last hope of humanity, navigating through increasingly strange space. The journey IS the game — managing resources to push one sector further, discovering what happened to those who came before, and ultimately finding a place to call home (or discovering something greater).

### 2.2 Core Loop (Redesigned)
```
SECTOR MAP
  -> REMOTE SCAN (useful intel: resources, signals, points of interest)
  -> CHOOSE DESTINATION (planet, derelict, station, anomaly)
  -> TRAVEL (energy cost partially refunded by ambient collection)
  -> ARRIVE (narrative modal plays, lore automatic)
  -> ACTIONS (probe with targeting, EVA, investigate encounters)
  -> DECISION (stay and exploit, or move on?)
  -> SECTOR JUMP (push deeper for better rewards)
```

### 2.3 The Progression Promise
**Further = Better.** This must be clear to the player:

| Sector | Theme | Planet Quality | Unique Content |
|--------|-------|----------------|----------------|
| S1 Graveyard | Debris field | Barren, hostile (ROCKY, DESERT, ICE) | Exodus wreckage, basic salvage |
| S2 Dark Void | Isolation | Sparse, cold (ICE, ROGUE) | Stress mechanics, crew tension |
| S3 The Signal | Mystery | Mixed, ghost planets | First VITAL planets, failed colonies |
| S4 The Garden | False paradise | Many VITAL, OCEANIC, TERRAFORMED | Hidden PREDATORY danger, best colony sites |
| S5 Event Horizon | Reality breaks | Weird types (CRYSTALLINE, SINGING, MIRROR) | Guaranteed TERRAFORMED, anomalies |
| S6 The Threshold | Endgame | 1-2 planets + THE STRUCTURE | Unique endings, time loop revelation |

---

## PART 3: SYSTEM REDESIGNS

### 3.1 Remote Scan — Actually Useful

**OLD:** Shows gravity, temperature, atmosphere (irrelevant for decisions)

**NEW:** Shows what matters for gameplay:
- **Resource Level:** LOW / MODERATE / HIGH (for metals and energy separately)
- **Signals Detected:** BIOLOGICAL / TECHNOLOGICAL / WRECKAGE / COLONY RUINS / NONE
- **Estimated Travel Cost:** X Energy

This tells the player: "That planet has HIGH energy readings and BIOLOGICAL signals — worth visiting if I need energy or bio-items."

**Implementation:**
```javascript
// Remote scan reveals:
planet.remoteScanData = {
    resourceLevel: { metals: 'HIGH', energy: 'MODERATE' },
    signals: ['BIOLOGICAL', 'WRECKAGE'],
    travelCost: planet.fuelCost
};
```

### 3.2 Energy Economy — No Death Spirals

**Problem:** Player warps to planet (15 energy), finds nothing useful, now stuck.

**Solution: Ambient Energy Collection**

When you arrive at ANY point of interest, your ship's collectors absorb local radiation/solar wind. You get back a percentage of your travel cost based on the location type:

| Location Type | Energy Return | Rationale |
|---------------|---------------|-----------|
| Planet (any) | 40-60% of warp cost | Solar radiation, magnetic fields |
| Gas Giant | 70-80% of warp cost | Massive energy output |
| Derelict | 20-30% of warp cost | Minimal ambient energy |
| Station | 50-60% of warp cost | Residual power systems |
| Anomaly | 0-100% (random) | Unpredictable |

**Example:** Warp costs 15 energy. Arrive at rocky planet. Get 6-9 energy back automatically. Net cost: 6-9 energy. Probe/EVA is where you make profit.

This prevents death spirals while keeping energy meaningful.

### 3.3 Probe System — Targeted Scanning

**OLD:** Click probe → random loot from weighted pool

**NEW:** Choose what you're scanning for:

```
┌─────────────────────────────────────────────────┐
│  PROBE DEPLOYMENT - ${planet.name}              │
│  ───────────────────────────────────────────────│
│                                                 │
│  Select scan target:                            │
│                                                 │
│  [1] MINERAL DEPOSITS                           │
│      Chance: HIGH | Yield: 20-50 Salvage        │
│                                                 │
│  [2] ENERGY SOURCES                             │
│      Chance: MODERATE | Yield: 15-40 Energy     │
│                                                 │
│  [3] BIOLOGICAL SIGNATURES                      │
│      Chance: LOW | Yield: Bio-items, rare finds │
│                                                 │
│  [4] TECHNOLOGICAL SIGNALS                      │
│      Chance: LOW | Yield: Tech items, upgrades  │
│                                                 │
│  ─────────────────────────────────────────────  │
│  Probe Integrity: 67% | Deploy Cost: 0 Energy   │
└─────────────────────────────────────────────────┘
```

**Planet type affects chances:**
- ROCKY planet: Mineral chance HIGH, Bio chance VERY LOW
- VITAL planet: Bio chance HIGH, Tech chance LOW
- MECHA planet: Tech chance HIGH, Bio chance NONE
- Etc.

**Why this is better:**
- Player makes meaningful choices
- Planet type matters for strategy
- No more "spam click probe"
- Information from remote scan informs probe choice

### 3.4 Narrative Modal System — Disco Elysium Style

**OLD:** Everything dumps into scrolling text log, easy to miss

**NEW:** Important moments get cinematic treatment:

```
┌─────────────────────────────────────────────────┐
│  [PORTRAIT]                                     │
│   Jaxon        ─────────────────────────────    │
│                                                 │
│   "The hull plating here... it's from the      │
│    Pioneer. First ship out of Earth."          │
│                                                 │
│                        [CLICK TO CONTINUE]      │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│   The black box is wedged in the debris.       │
│   Its beacon still pulses, 200 years later.    │
│                                                 │
│                        [CLICK TO CONTINUE]      │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│   A.U.R.A.: "Flight recorder detected.         │
│   Shall I begin data extraction?"              │
│                                                 │
│  ───────────────────────────────────────────── │
│                                                 │
│  [1] Extract full recording (-5 Energy)         │
│      +Lore, +Colony Knowledge                   │
│                                                 │
│  [2] Quick data pull (free)                     │
│      +Partial Lore                              │
│                                                 │
│  [3] Strip the hardware (+20 Salvage)           │
│      Beacon components are valuable             │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Key Features:**
- Character portrait displayed
- Text appears line by line (typewriter effect, ~30ms per character)
- Click or wait to advance
- Dialogue vs narration visually distinct (quotes vs plain text)
- Choices appear AFTER story plays out
- Lore is ALWAYS delivered — choices are about resources, not story access

**Triggers for Narrative Modal:**
- Arriving at Exodus wreck
- Arriving at failed colony
- Arriving at derelict ship
- Arriving at station
- Entering anomaly
- Important crew moments (breakdowns, deaths, revivals)
- Sector transitions (campfire events)
- Colony establishment (ending)

### 3.5 Points of Interest — Beyond Planets

**NEW POI TYPES:**

| Type | Visual | Warp Cost | Content |
|------|--------|-----------|---------|
| **Planet** | Sphere | 10-20 | Land, explore, probe, EVA, colonize |
| **Derelict** | Angular wreck icon | 5-10 | Board, salvage, lore, danger |
| **Station** | Hexagonal | 8-12 | Rest, repair, story, items |
| **Anomaly** | Swirling portal | 10-15 | High risk/reward, weird effects |
| **Beacon** | Blinking dot | 3-5 | Information only, navigation data |
| **The Structure** | Unique (S6 only) | 20 | Endgame content |

**Sector Distribution:**

| Sector | Planets | Derelicts | Stations | Anomalies | Special |
|--------|---------|-----------|----------|-----------|---------|
| S1 | 3-4 | 2-3 | 0 | 0 | — |
| S2 | 2-3 | 1-2 | 1 | 0 | — |
| S3 | 3-4 | 1 | 1 | 0-1 | Ghost POIs |
| S4 | 4-5 | 0-1 | 1 | 1 | Hidden predators |
| S5 | 3-4 | 1 | 0 | 2 | Reality glitches |
| S6 | 1-2 | 0 | 0 | 1 | THE STRUCTURE |

### 3.6 Derelict Ships

Floating wrecks you can board. More dangerous than planets, but guaranteed rewards.

**Derelict Interaction Flow:**
1. Warp to derelict (lower cost than planets)
2. Narrative modal plays (crew reacts, A.U.R.A. scans)
3. Actions available:
   - **HULL SCAN** (2 energy): Reveals interior status, hazards
   - **EXTERIOR SALVAGE** (safe): Moderate salvage, no risk
   - **BREACH INTERIOR** (risky): High rewards, chance of hull breach/contamination/hostiles
   - **DOWNLOAD LOGS** (if Lab functional): Get Exodus backstory
   - **DEPART**: Leave

**Derelict Types:**
- EXODUS_WRECK: Named Exodus ships with story content
- CARGO_HAULER: High salvage, low story
- MILITARY_HULK: Weapons/tech, high danger
- GENERATION_SHIP: Massive, multiple encounters within

### 3.7 Stations

Abandoned outposts. Safe harbors in the void.

**Station Benefits:**
- **REST**: Crew can rest here. -1 Stress all crew (costs 2 rations for the stay)
- **REPAIR**: Ship repairs cost 50% less salvage at stations
- **SEARCH**: Find items, logs, personal effects (narrative content)
- **RESUPPLY**: Some stations have emergency caches (random chance of rations/items)

**Station Types:**
- RESEARCH_OUTPOST: Lab equipment, bio samples, data logs
- WAYSTATION: Traveler supplies, navigation data
- MILITARY_POST: Weapons, security logs, sometimes operational defenses
- COLONY_HUB: Larger, more content, failed settlement story

### 3.8 Anomalies

Weird space phenomena. Appear after S3. High risk, unique rewards.

**Anomaly Types:**

| Name | Effect | Risk | Reward |
|------|--------|------|--------|
| **Gravity Well** | Ship stressed, possible damage | Deck damage | Rare minerals, ancient debris |
| **Temporal Rift** | Time distortion, random effects | Crew confusion (+stress) | Glimpses of future/past (lore) |
| **Energy Vortex** | Massive radiation | Crew injury | Huge energy gain (50-80) |
| **The Warp Tear** | Portal to strange dimension | Unknown | Unique items, disturbing lore |
| **Singing Void** | Harmonic frequency | Crew entranced | Permanent stress reduction, strange changes |

**The Warp Tear (Special — appears S5+):**
A portal to somewhere else. Entering takes you to a small "pocket dimension" with completely alien content:
- Different rules
- Strange entities (not hostile, but unsettling)
- Items that don't exist elsewhere
- Lore about what lies beyond the normal universe

Think: Warhammer 40k Warp, but more mysterious than demonic.

### 3.9 Sector 6: The Threshold

The endgame sector. Only reachable if you've survived S1-S5.

**Contents:**
- 1-2 strange planets (MIRROR, SINGING, or unique type)
- 1 Anomaly (The Final Rift)
- THE STRUCTURE

**THE STRUCTURE:**
The Door from the Exodus logs. Ancient beyond measure. Waiting.

**What It Is (Narrative):**
A massive construct at the edge of known space. The 8 Exodus ships all headed here. Some made it. None returned. It's not a planet — it's something built. By whom? For what?

**Interaction:**
If you have collected Exodus lore throughout the journey (through derelicts, encounters, etc.), you can piece together what this is. The more you know, the more options you have:

**Ending Options at The Structure:**

1. **THE ANSWER** (requires significant Exodus lore)
   - Transmit all collected data
   - The Structure opens
   - Time loop revelation: You created the road you traveled
   - Humanity's journey was always meant to end here
   - Bittersweet transcendence

2. **THE SETTLERS** (low lore, good crew/resources)
   - The Structure is beyond understanding
   - You colonize a nearby planet instead
   - Standard colony ending, but with the Structure looming in the sky
   - Future generations will study it

3. **THE COMMUNION** (requires Warp Tear visit + specific items)
   - You understand what's beyond
   - You enter willingly
   - Your crew becomes something else
   - Not death, not life — transformation

4. **THE HEAVEN SHIP** (unique ending)
   - The Structure welcomes you
   - Inside: a perfect environment, impossible beauty
   - Like religious descriptions of paradise
   - Your crew "ascends" — interpretation left ambiguous
   - Was this death? Reward? Simulation?
   - Peace, finally

---

## PART 4: ENCOUNTER REDESIGN

### 4.1 Core Principle: Lore is Automatic, Resources are Choices

**Every encounter:**
1. Narrative plays automatically (typewriter modal)
2. Player learns the story regardless of choice
3. Choices determine resource trade-offs, not story access

### 4.2 Exodus Derelict Encounters (Redesigned)

**BURNED HULL (Exodus wreck destroyed in atmosphere)**
```
[NARRATIVE - Always plays]
The ship is barely recognizable. Slag, carbon scoring.
Jaxon: "Entry angle miscalculated. Three degrees off and... this."
A.U.R.A. automatically extracts partial flight data.
> COLONY KNOWLEDGE +1

[CHOICES - Resource trade-offs]
1. "Full data extraction" (-5 Energy) → +Extended lore, +1 Colony Knowledge
2. "Salvage hull components" (free) → +25 Salvage
3. "Strip everything" (-5 Energy) → +40 Salvage, A.U.R.A. ethics -1
```

**THE SLEEPERS (Cryo pods with living occupants)**
```
[NARRATIVE]
Green lights pulse. Life signs confirmed. They're alive.
Aris: "They're in deep cryo. Stable. We could wake them."
Vance: "And feed them with what? Our own rations?"

[CHOICES]
1. "Wake them" → +1 Crew member (random role), +2 Ration consumption per jump
2. "Leave them sleeping" → No cost, crew stress -1 (mercy without burden)
3. "Salvage the pods" → +30 Salvage, +15 Energy, Aris +2 Stress, A.U.R.A. -2
```

**THE STOCKPILE (Supply cache)**
```
[NARRATIVE]
Sealed cargo bay. Supplies stacked to the ceiling.
Mira: "Rations. Medical supplies. Tools. They prepared for everything."
A.U.R.A.: "Except what happened."

[CHOICES]
1. "Take what we need" → +1 Food Pack, +15 Salvage, crew stress -1
2. "Take everything" → +2 Food Packs, +30 Salvage, Luxury item
3. "Distribute to crew" → +3 Food Packs, all crew -1 Stress, A.U.R.A. +1
```

### 4.3 Failed Colony Encounters (Redesigned)

Same principle: narrative automatic, choices about resources.

**THE DOME (Environmental failure)**
```
[NARRATIVE - Types out line by line]
Colony Log: "Day 1: We landed! Children playing in real grass."
Colony Log: "Day 342: Water table dropping. Soil changing."
Colony Log: "Day 891: Can't grow wheat. Local flora winning."
Colony Log: "Day 1,204: Last entry. The soil doesn't want us."
> COLONY KNOWLEDGE +1 (automatic)

[CHOICES]
1. "Salvage the settlement" → +35 Salvage, +1 Food Pack
2. "Search for survivors" (risky) → 30% find survivor, 20% crew injury
3. "Full environmental analysis" (-5 Energy) → +2 Colony Knowledge
```

---

## PART 5: ITEM SYSTEM FIXES

### 5.1 Dead Items — Give Them Purpose

**Amber Specimen, Geode Sample, Obsidian Monolith:**

Option A: **Stress Relief** (like luxury items)
- "The crew finds comfort in small beauties from the void"
- USE: -1 Stress to random crew member

Option B: **Salvage Conversion**
- "Break down for raw materials"
- USE: Convert to 10-20 Salvage

Option C: **Remove entirely**
- Don't drop them anymore
- Replace with actually useful items in loot pools

**Recommendation:** Option A — makes thematic sense, gives player choice

### 5.2 Revival Items — Actually Work

**Current Bug:** Revived crew get status SYMBIOTE/CYBORG_HUSK, not recognized as HEALTHY.

**Fix:**
```javascript
// When reviving:
crewMember.status = 'HEALTHY';  // NOT SYMBIOTE/CYBORG_HUSK
crewMember.tags.push('HIVE_MIND');  // or 'MACHINE_LINK'
crewMember.wasRevived = true;  // Track for endings
```

**Gameplay Effect:** Revived crew function normally. The tag affects ending narrative only.

**Narrative Touch:** Revived crew have different barks. More distant, changed.
- Hive Mind crew: "I hear them... the others who joined. They're still there."
- Machine Link crew: "Efficiency. That's all that matters now. Strange how clear it is."

### 5.3 Tech Fragment — Clearer Use

Currently only useful if A.U.R.A. goes adversarial (rare).

**Additional Uses:**
- UPGRADE COMPONENT: Tech Fragment can be used in place of 50 Salvage for any upgrade
- PROBE ENHANCEMENT: Use to give probe +20% to find rare items (one-time boost)
- SELL TO STATION: If at a station, convert to 30 Salvage + 10 Energy

---

## PART 6: IMPLEMENTATION PHASES

### PHASE A: Core Fixes (Make It Playable)
**Priority: HIGH | Effort: MEDIUM**

1. **Remote scan shows useful info**
   - Replace gravity/temp/atmosphere with resource levels + signals
   - Files: `NavView.js`, `bundle.js (handleRemoteScan)`

2. **Ambient energy collection on arrival**
   - Warp gives back 40-80% of cost based on destination type
   - Files: `bundle.js (handleWarp)`

3. **Fix revival items**
   - Revived crew = HEALTHY + special tag
   - Files: `bundle.js (handleRevivalAction)`

4. **Fix dead items**
   - Give Amber/Geode/Monolith stress relief USE function
   - Files: `LootTables.js`, `bundle.js (handleItemUse)`

5. **Fix ending narrative**
   - Change "47 colonists" to match actual crew size
   - Files: `EndingSystem.js`

### PHASE B: Narrative Modal System
**Priority: HIGH | Effort: HIGH**

1. **Create NarrativeModal component**
   - Typewriter text effect
   - Portrait display
   - Line-by-line advancement
   - Choice presentation after narrative
   - Files: New `src/components/NarrativeModal.js`

2. **Refactor Exodus encounters to use modal**
   - Lore plays automatically
   - Choices appear after
   - Files: `ExodusDerelicts.js`, `bundle.js`

3. **Refactor Colony encounters to use modal**
   - Same treatment
   - Files: `FailedColonyEncounters.js`, `bundle.js`

4. **Add modal to campfire events**
   - Sector transitions feel cinematic
   - Files: `CampfireEvents.js`, `bundle.js`

### PHASE C: Probe Targeting System
**Priority: MEDIUM | Effort: MEDIUM**

1. **Create probe targeting UI**
   - 4 options: Minerals, Energy, Bio, Tech
   - Chances based on planet type
   - Files: `ProbeSystem.js`, `OrbitView.js`

2. **Rebalance probe loot pools**
   - Each target type has dedicated pool
   - Planet type modifies chances
   - Files: `LootTables.js`

### PHASE D: New POI Types
**Priority: MEDIUM | Effort: HIGH**

1. **Derelict ships**
   - New POI type in sector generation
   - Derelict encounter system
   - Boarding actions
   - Files: `PlanetGenerator.js`, `NavView.js`, new `DerelictSystem.js`

2. **Stations**
   - New POI type
   - Rest/repair/search actions
   - Files: `PlanetGenerator.js`, `NavView.js`, new `StationSystem.js`

3. **Anomalies**
   - New POI type (S3+)
   - Unique effects and rewards
   - Files: `PlanetGenerator.js`, `NavView.js`, new `AnomalySystem.js`

4. **Update sector configs**
   - POI distribution per sector
   - Files: `SectorConfig.js`

### PHASE E: Sector 6 & Endgame
**Priority: MEDIUM | Effort: HIGH**

1. **Sector 6 generation**
   - The Threshold
   - THE STRUCTURE as unique POI
   - Files: `SectorConfig.js`, `PlanetGenerator.js`

2. **Structure interaction**
   - Unique encounter type
   - Multiple ending paths
   - Files: New `StructureSystem.js`

3. **New endings**
   - THE ANSWER (time loop)
   - THE HEAVEN SHIP (transcendence)
   - THE COMMUNION (transformation)
   - Files: `EndingSystem.js`

4. **Wire up Exodus log collection**
   - Track found logs
   - Affect Structure options
   - Files: `bundle.js`, `ExodusLogs.js`

### PHASE F: Polish
**Priority: LOW | Effort: MEDIUM**

1. **Balance pass**
   - Energy economy
   - Ration economy
   - Sector difficulty curve

2. **Audio expansion**
   - POI-specific sounds
   - Narrative modal sound effects
   - Sector themes

3. **Visual polish**
   - POI icons on nav map
   - Narrative modal styling
   - Structure visual

---

## PART 7: WHAT WE'RE NOT CHANGING

These systems work well, keep them:

- Crew personality/stress system
- A.U.R.A. ethics tracking
- Ship deck damage/repair
- 3-act ending structure (extend, don't replace)
- EVA risk/reward system
- Campfire event structure
- CSS visual style
- Procedural audio system

---

## APPENDIX: EARLIER IDEAS WE'RE KEEPING

From previous design docs that remain valid:

1. **Fungus Culture** — Passive +1 ration per 3 actions. Keep as-is.
2. **Paranoia UI effects** — Stress-based glitches. Keep, activate in later sectors.
3. **A.U.R.A. adversarial actions** — Keep the warning/vent system.
4. **Sector hazards** — Micrometeorites, isolation, interference, false paradise, reality breakdown. Keep.
5. **Stress breakdown events** — Per-character breakdowns at stress 3. Keep.
6. **Colony warnings in S1-S2** — Crew advises against early colonization. Keep.

---

## QUICK REFERENCE: The New Game Feel

**Before (Current):**
- Remote scan tells me temperature (useless)
- I warp to a planet, find nothing, now I'm stuck with no energy
- I find an Exodus wreck, have to choose: story OR loot
- I click probe, get random stuff
- I never find revival items
- I don't know why I should go further

**After (Redesigned):**
- Remote scan tells me "HIGH energy, BIOLOGICAL signals" (useful!)
- I warp to a planet, get some energy back automatically, can always act
- I find an Exodus wreck, the story plays, THEN I choose how much to take
- I choose what to probe for, my choice matters
- Revival items work, and I might actually find them
- Each sector is clearly better, THE STRUCTURE awaits if I push far enough

---

*Document ends. Ready for implementation.*
