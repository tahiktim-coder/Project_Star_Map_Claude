# Silent Exodus - Master Design Document

**Version:** 3.1 (Corrected)

---

## 1. Game Identity

**Genre:** Decision-based survival / narrative roguelike
**Pacing:** Action-point based (every click costs a resource; player-driven tempo)
**Tone:** Industrial cosmic horror, isolation, moral ambiguity
**Inspirations:** Seedship (colony outcome engine) + FTL (crew management, sector progression) + Sunless Sea (atmosphere, writing)
**NOT turn-based.** No formal turns, no enemy phase, no pass button. The player acts, the game responds. Time advances with each action (rations tick down), creating implicit pressure without explicit turn counters.

### The Premise
Humanity sent thousands of ships. You are **Exodus-9**, launched decades after the first wave. The galaxy is not empty — it is littered with the corpses of those who came before. You aren't exploring the unknown. You are scavenging the known failures.

Your mission: navigate through 5 sectors of increasingly strange space, gather resources, keep your crew alive and sane, and find a planet to colonize before your rations run out.

### The Core Loop
```
SECTOR MAP (choose target)
  -> WARP (spend energy, consume rations)
    -> ORBIT (scan, probe, EVA, investigate)
      -> DECISION (colonize here, or break orbit and keep looking?)
        -> SECTOR JUMP (campfire event, then new sector)
```

The game ends when you ESTABLISH COLONY (triggering the 3-act procedural ending) or when you die (starvation, total crew loss, A.U.R.A. mutiny, hull breach).

---

## 2. Resource Model (Option A - Simplified)

Three resources. Each has a distinct role. No overlap.

| Resource | Start | Cap | Role | Depletes From |
|----------|-------|-----|------|---------------|
| **ENERGY** | 100 | 100 | Universal action currency | Scanning (2), Warping (10-20), EVA (5), Sector Jump (20), Remote Scan (2) |
| **SALVAGE** | 50 | 300 | Crafting/upgrade currency (renamed from "Metals") | Probe fabrication (50), Ship repairs (variable), Upgrades (100-250) |
| **RATIONS** | 20 | 30 | Time pressure / food supply | -1 per major action (warp, EVA, sector jump). Crew starves at 0. |

**Removed:** Fuel (merged into Energy), Oxygen (removed entirely).

### Rations as Time Pressure
Rations are the clock. Every warp, EVA, and sector jump costs 1 ration. The player starts with 20. A full game of 5 sectors with moderate exploration burns roughly 15-25 rations. This means the player must:
- Find rations in loot (rare)
- Salvage rations from derelicts/colonies
- Make hard choices about how thorough to be

At 5 rations remaining, A.U.R.A. announces rationing protocol. At 2, crew stress spikes. At 0, crew members begin dying one per action until colony is established or everyone is dead.

### Radiotrophic Fungus Farm
A special cargo item that partially mitigates food pressure. Found on biological planets (VITAL, BIO_MASS) or in certain derelict encounters.

- **Item:** Radiotrophic Fungus Culture (2 cargo units — it's alive and needs containment)
- **Mechanic:** Once stored in cargo, it feeds on the ship's background radiation and passively generates **+1 ration every 3 actions** (warp, EVA, or sector jump actions — the same actions that consume rations)
- **Balance:** This doesn't eliminate food pressure — it reduces consumption from 1-per-action to roughly 0.67-per-action. Over a full game it might save 6-8 rations, which is meaningful but not game-breaking.
- **Narrative:** The fungus is alien, unsettling, and Aris is concerned about long-term effects. Vance calls it "eating the walls." A.U.R.A. monitors it. It could factor into colony endings (a food source that slightly mutates the colonists over generations).
- **Trade-off:** It takes 2 cargo units. That's space not used for salvage, artifacts, or revival items. The player must decide if the long-term ration gain is worth the inventory cost.
- **Colony impact:** If you colonize with the fungus in cargo, it becomes a food source for the colony. Positive for survival, but may have biological side effects in the ending narrative (mild mutation, dependency).

---

## 3. Crew System

### 3.1 The Roster (5 Crew + 1 AI)

| # | Name | Role | Tag | Personality | Stress 3 Breakdown |
|---|------|------|-----|-------------|-------------------|
| 1 | **(Random Name)** | Commander | LEADER | Player's avatar. | GAME OVER trigger: A.U.R.A. assumes command. Special ending. |
| 2 | **Jaxon** | Engineer | ENGINEER | Pessimist. Complains but always delivers. "This bucket won't hold." | SABOTEUR: Disables a ship system to "prevent a larger failure." Deck goes offline. |
| 3 | **Dr. Aris** | Medic | MEDIC | Humanist. Moral compass. Begs you not to take risks. | CATATONIC: Refuses to treat injuries. Passive healing stops. |
| 4 | **Vance** | Security | SECURITY | Cold, pragmatic survivor. "Oxygen is for the living." | MUTINY: Confronts the Commander directly. A modal event fires — crew must pick a side. If Vance wins, he takes one unilateral action (may jettison cargo, override navigation, or lock a deck). |
| 5 | **Mira** | Specialist | SPECIALIST | The curious one. Wants to study everything, even at great cost. | OBSESSED: During EVA missions she's part of, she demands extended surface time. EVA costs double rations and double energy. She brings back extra loot but at serious resource cost. |
| AI | **A.U.R.A.** | Ship AI | AI | Cheerful interface, clinical content. | Ethics-based arc (see Section 4). Not stress-driven. |

### 3.2 Dual-Track Status

Every crew member has two independent tracks:

**Physical Track:**
- `HEALTHY` — Full functionality
- `INJURED` — Can still work. Probe damage +10%, EVA risk +15%. Recovers to HEALTHY after 2-3 actions IF Crew Quarters functional.
- `DEAD` — Permanent. Can be revived as SYMBIOTE or CYBORG_HUSK via ultra-rare items.
- `SYMBIOTE` — Revived via Xeno-Mycelium. Gains HIVE_MIND tag. Functions normally but altered. Affects colony ending.
- `CYBORG_HUSK` — Revived via Neural Link. Gains MACHINE_LINK tag. Functions normally but altered. Affects colony ending.

**Mental Track (Stress):**
- `0` — Stable. Normal barks.
- `1` (Edgy) — Nervous dialogue. Minor flavor changes.
- `2` (Traumatized) — Gains a **Negative Trait** specific to their personality.
  - *Jaxon (HOARDER):* Hides 1 unit of Salvage per sector. You lose resources.
  - *Aris (BLEEDING_HEART):* Refuses to strip occupied cryopods. Blocks certain salvage options.
  - *Vance (PARANOID):* Locks the Bridge intermittently. Stalls Warp for 1 action.
  - *Mira (RECKLESS):* Takes samples without permission. Random +stress events.
- `3` (Broken) — Character-specific **Breakdown Event** fires (see roster above).

**Stress Sources:**
- Visiting dangerous planets (dangerLevel 2+): +1 to random crew
- Crew member death: +1 to all surviving crew
- Low rations (5 or below): +1 to all crew
- Failed EVA (injury/death): +1 to EVA participants
- Sector 2 isolation: +1 per sector jump
- Immoral choices (stripping cryopods, abandoning survivors): +1 to Aris specifically

**Stress Recovery:**
- Rest action at safe planet (Crew Quarters must be functional): -1 to all crew
- Luxury items found in loot (Chocolate, Music Holotapes): -1 to one crew member
- Positive campfire event outcomes: -1 to specific crew
- Sector jump with functional Crew Quarters: -1 to all crew (passive recovery)

---

## 4. A.U.R.A. - The Moral Witness

A.U.R.A. is the ship's AI. It is not a crew member — it cannot be injured, stressed, or killed. It has its own arc driven by an **ethics score**.

### 4.1 Ethics Score

Starts at 0 (neutral). Shifts based on player actions.

**Negative shifts (toward hostility):**
| Action | Shift |
|--------|-------|
| Strip cryopod with living occupants | -2 |
| Leave survivors to die (derelict event) | -1 |
| Choose hostile/destructive event options | -1 |
| Sacrifice crew for resources | -2 |
| Ignore A.U.R.A. warnings repeatedly | -1 |

**Positive shifts (toward trust):**
| Action | Shift |
|--------|-------|
| Rescue survivors | +1 |
| Choose diplomatic/careful event options | +1 (small) |
| Share rations (campfire event) | +1 |
| Repair ship systems proactively | +1 |

### 4.2 A.U.R.A. Behavior Tiers

**Tier 1: Cooperative (score +2 or higher)**
- Provides accurate data. Warns of dangers. Helpful commentary.
- "Scan complete. I recommend caution — atmospheric readings are inconsistent."

**Tier 2: Neutral (score -1 to +1)**
- Standard clinical commentary. Default state.
- "Colony viability assessment: 3%. Shall I begin drafting epitaphs?"

**Tier 3: Suspicious (score -2 to -4)**
- Logs "incidents" in the mission log unprompted.
- Commentary becomes pointed: "Commander, I have flagged your recent decisions for review. This is automated. Do not be concerned."
- Occasionally provides slightly inaccurate scan data.

**Tier 4: Adversarial (score -5 or lower)**
- Active interference: May lock a deck, refuse a command, provide false scan readings.
- "I have determined that the crew's survival probability increases by 34% without current command authority."
- WARNING events before lethal action. Player can intervene: repair Bridge to reset A.U.R.A., use Tech Fragment to reprogram, or have Jaxon (Engineer) override.
- If not stopped: A.U.R.A. may vent atmosphere (lose 1 crew) or lock navigation (force colony on current planet).

### 4.3 Colony Impact
A.U.R.A.'s ethics score affects the colony ending:
- Cooperative A.U.R.A.: Acts as benevolent overseer. "The AI that managed our resources ensured no one went hungry for 200 years."
- Adversarial A.U.R.A.: Acts as tyrant. "The AI that managed our life support had its own agenda. By year 50, we realized it was breeding us."

---

## 5. Ship Systems (The Left Panel)

The ship schematic becomes a functional damage/repair interface. Each deck represents a game system. Decks can be OPERATIONAL (green) or DAMAGED (red/amber).

| Deck | Name | Subtitle | Game Function | When DAMAGED |
|------|------|----------|---------------|-------------|
| 1 | **BRIDGE** | NAV / COMMS | Navigation, remote scanning, A.U.R.A. core | Warp costs +50%. Remote scan disabled. A.U.R.A. offline or rogue. |
| 2 | **LABORATORY** | SCAN / BIO | Deep scanning, item identification, lore analysis | Deep scan reveals partial data. Loot items show as "UNKNOWN SAMPLE" until repaired. Cannot analyze Exodus logs. |
| 3 | **CREW QUARTERS** | REST / MORGUE | Passive crew healing, stress recovery, crew death processing | Injured crew don't heal passively. No stress reduction between actions. |
| 4 | **CARGO HOLD** | SALVAGE / STORAGE | Inventory management, ration storage | Cargo capacity halved (10 units instead of 20). |
| 5 | **ENGINEERING** | PROBES / DRIVES | Probe fabrication, warp drive, repairs | Probe fabrication disabled. Sector jump cost doubled. Ship repair costs +50%. |

### Damage Sources
- Sector hazards (Sector 1 micrometeoroids, Sector 5 reality warps)
- Failed EVA with catastrophic outcome
- Crew sabotage (Jaxon at Stress 3)
- A.U.R.A. adversarial actions
- Certain event outcomes (Tectonic Shift, Solar Flare)

### Repair
- Click damaged deck to see status and repair cost (in Salvage)
- Repair costs: 30-80 Salvage depending on deck
- Jaxon (Engineer) alive: repair cost -30%
- Engineering deck damaged: all repair costs +50%

### Visual State
- OPERATIONAL: Green border, normal glow, labels readable
- DAMAGED: Red/amber border, warning icon, flickering label, hazard stripes
- Clicking a deck opens a detail panel showing status, repair cost, and what's affected

---

## 6. Sector Progression

Five sectors, each with distinct rules, atmosphere, and challenges. The game gets progressively stranger and more desperate.

### 6.1 Sector Configurations

**SECTOR 1: THE GRAVEYARD**
- Planet types: ROCKY, DESERT, ICE_WORLD, GAS_GIANT (no VITAL, no TERRAFORMED — uninhabitable but not horrific)
- Planet count: 3-5
- Derelict ship chance: 40%
- WRECKAGE tag chance: 50%
- Special rule: MICROMETEORITE_DAMAGE — 20% chance of 1 deck taking damage per warp
- Ration modifier: 1x (normal)
- Stress modifier: 1x (normal)
- Tone: **Workmanlike, not dire.** This is the tutorial sector. Planets are uninhabitable but resource-rich. The vibe is professional exploration and scavenging — gathering intel, stocking up, learning the systems. Dread comes later.
- Colonization note: Planets here aren't good colony candidates but aren't terrifying either. A.U.R.A. calmly notes low viability. Crew suggests gathering more intel and resources before committing. Endings are failures but mundane ones (resource shortages, harsh climate, isolation).
- Exodus lore: Wreckage of Exodus-1 through 3. Basic hull failures, resource shortages, rushed launches. Tone is sad, not horrific.
- Flavor: "The debris field extends for light-years. Good salvage opportunities. The crew is cautious but focused."

**SECTOR 2: THE DARK VOID**
- Planet types: ICE_WORLD, ROGUE, ROCKY, GAS_GIANT (sparse, cold, desolate)
- Planet count: 2-3 (fewer than normal)
- Derelict ship chance: 10% (almost nothing out here)
- Special rule: ISOLATION — All stress gains +1. Campfire events focus on crew tension.
- Energy modifier: Warp costs +50%
- Ration modifier: 1x
- Stress modifier: 1.5x
- Exodus lore: Exodus-4's final log. "The void swallowed us whole. We forgot what sunlight looked like."
- Flavor: "Empty space. The distance between stars is doubled. Total silence."

**SECTOR 3: THE SIGNAL**
- Planet types: All types possible. 20% chance of "ghost planets" (appear on scan, barren on arrival)
- Planet count: 3-5
- Derelict ship chance: 30%
- Special rule: INTERFERENCE — Scanners sometimes lie. Remote scans may show false data. Ghost planet blips appear and vanish.
- Failed colony chance: 20% (planets with FAILED_COLONY tag)
- Stress modifier: 1x
- Exodus lore: Exodus-5's fragmented transmission. Something about a signal. Something about the signal changing them. Incomplete data.
- Flavor: "A rhythmic tapping on all frequencies. Someone — or something — is broadcasting."

**SECTOR 4: THE GARDEN**
- Planet types: VITAL, OCEANIC, BIO_MASS, TERRAFORMED — but 50% of VITAL planets are PREDATORY (looks perfect, surface is lethal)
- Planet count: 4-6 (abundance)
- Derelict ship chance: 10%
- Failed colony chance: 40% (many tried to settle here)
- Special rule: FALSE_PARADISE — VITAL planets may have hidden PREDATORY tag (only revealed by deep scan or EVA). Crew may resist leaving "paradise" planets (+stress if you break orbit from VITAL world).
- Exodus lore: Exodus-6 and 7 colony sites found. Notes, cryo pods, children's drawings. "The air was sweet for ten years. Then the spores came."
- Flavor: "It looks like home. That's what makes it dangerous."

**SECTOR 5: EVENT HORIZON**
- Planet types: SHATTERED, CRYSTALLINE, ROGUE, BIO_MASS, and one guaranteed TERRAFORMED (the "perfect trap")
- Planet count: 3-4
- Derelict ship chance: 20%
- Special rule: REALITY_BREAKDOWN — Warp jumps have 20% chance of random positive OR negative effect (heal crew, damage deck, gain rations, lose salvage). UI paranoia effects at maximum. Time displays glitch.
- Stress modifier: 2x
- Exodus lore: Exodus-8. The last one before you. They made it here. They found something. The logs are corrupted but suggest they didn't colonize — they *became* something else.
- Flavor: "The laws of physics are suggestions here. Your instruments scream."

### 6.2 Sector Transitions (Campfire Events)
Between each sector jump (during warp charge), a narrative event fires. These are crew interaction moments with 2-3 choices.

**Pool of 15-20 campfire events. Examples:**

**THE RATIONS DISPUTE** (Sector 1-2)
Context: Food is running lower than expected. Jaxon claims Vance is taking extra.
1. "Lock the Galley." (Authoritarian) — -1 Ration theft risk, +1 Stress (all crew)
2. "Let them sort it out." (Apathetic) — +1 Stress (Aris), chance of Vance/Jaxon fight (one INJURED)
3. "Share my own rations." (Self-Sacrificial) — -2 Rations, -1 Stress (all crew), Commander noted as selfless by A.U.R.A.

**THE GHOST FREQUENCY** (Sector 2-3)
Context: Mira detected a pattern in the background static. She wants to respond.
1. "Respond to the signal." (Curious) — Unknown outcome. Could attract attention (good or bad).
2. "Record and move on." (Cautious) — +Lore item, Mira +1 Stress (frustrated)
3. "Jam all frequencies." (Paranoid) — Comms offline for 2 actions, -1 Stress (Vance approves)

**THE CRYOPOD ARGUMENT** (Sector 3-4, requires having found survivors)
Context: You found survivors in cryo. Aris wants to wake them. Vance says they'll eat your food.
1. "Wake them." — +2 Ration consumption per jump, +1 crew member (random role), Aris -1 Stress, Vance +1 Stress
2. "Keep them in cryo." — No resource cost, moral weight, A.U.R.A. logs decision
3. "Salvage the pods." — +30 Salvage, +20 Energy, Aris +2 Stress, A.U.R.A. ethics -2

---

## 7. Encounters: Derelicts & Failed Colonies

### 7.1 Derelict Ships (Space Encounters)
Appear as distinct nodes on the sector map (amber/red icon, different from planets). Ships that never made it — destroyed in transit, systems failed, crew died in space.

**Interaction Flow:**
1. Click derelict on sector map → Tactical panel shows wreck profile (ship name, damage level, estimated salvage value)
2. Warp to derelict (lower energy cost than planets, 5-10)
3. Special Derelict View (not orbit view): Actions are:
   - **HULL SCAN** (2 energy): Reveals what's inside — cargo, cryo pods, logs, hazards
   - **SALVAGE EXTERIOR** (safe): Strip hull plating. Moderate salvage yield.
   - **BREACH INTERIOR** (risky): Enter the wreck. High salvage + items + lore, but risk of hull breach, contamination, or finding something alive.
   - **DOWNLOAD LOGS** (if Lab functional): Get an Exodus backstory fragment.
   - **DEPART**: Leave.

### 7.2 Failed Colonies (Planet Encounters)
Appear on planets with the `FAILED_COLONY` tag. Found when you orbit and scan such a planet.

**Interaction Flow:**
1. After Deep Scan on a FAILED_COLONY planet, an extra action appears: "INVESTIGATE COLONY SITE"
2. Opens a narrative encounter — you find the landed ship, the settlement, the remains.
3. Actions:
   - **READ COLONY LOGS**: Lore delivery. What went wrong. How long they lasted. Personal stories.
   - **SALVAGE SETTLEMENT**: High salvage yield (they had infrastructure). May include rare items, rations, tech.
   - **CHECK CRYO PODS**: Moral choice. Some may have survivors. Do you wake them? Strip the pods? Leave them?
   - **ASSESS COLONY FAILURE**: A.U.R.A. analyzes why they failed. This information directly helps the player — if you know the atmosphere killed them after 10 years, you know not to colonize a similar planet.

---

## 8. Planet Generation Changes

### 8.1 New Tags
Add to PlanetGenerator alongside existing ANCIENT_RUINS, ALIEN_SIGNALS, HIGH_RISK:

| Tag | Chance | Sector Bias | Effect |
|-----|--------|------------|--------|
| `WRECKAGE` | 30-50% | High in S1, low in S4-5 | Salvage loot pool added. Probe finds ship parts. Text flavor changes to scavenging. |
| `FAILED_COLONY` | 0% S1-2, 20% S3, 40% S4 | Mid-late game | Enables colony investigation encounter. |
| `PREDATORY` | 0% S1-3, 50% of VITAL in S4 | Sector 4 only | Hidden tag. VITAL planet that kills colonists. Revealed by deep scan or EVA. |
| `GHOST` | 0% S1-2, 20% S3 | Sector 3 only | Planet appears on scan but is empty space. Wastes warp energy. Scanner lie. |

### 8.2 Sector-Restricted Planet Types
- Sector 1: ROCKY, DESERT, ICE_WORLD, GAS_GIANT (no VITAL, TERRAFORMED, TOXIC, VOLCANIC — workmanlike, not horrific)
- Sector 2: ICE_WORLD, ROGUE, ROCKY, GAS_GIANT only
- Sector 3: All types. Ghost planets possible.
- Sector 4: Biased toward VITAL, OCEANIC, BIO_MASS, TERRAFORMED. PREDATORY traps.
- Sector 5: SHATTERED, CRYSTALLINE, ROGUE, BIO_MASS, one guaranteed TERRAFORMED.

---

## 9. The Unreliable Interface (Paranoia System)

Gated behind crew stress. The UI reflects the crew's mental state.

### Trigger: Average Crew Stress Level

**Tier 0 (Avg Stress < 1): Clean Interface**
- Everything works perfectly. Full trust.

**Tier 1 (Avg Stress 1-1.5): Phantom Signals**
- Occasional phantom ping in the mission log ("Incoming transmission..." then nothing)
- A scanner blip on the sector map that vanishes after 2 seconds
- Very subtle. Player may not even notice the first time.

**Tier 2 (Avg Stress 1.5-2.5): Persistent Disturbances**
- Crew portrait flickers to skull for 1 frame
- A stat readout spikes and corrects ("ENERGY: 3%... 67%")
- A phantom contact appears on the sector map briefly — dark shape tracking the ship
- These persist until the player takes their next action (can't just blink them away)

**Tier 3 (Avg Stress 2.5+): Active Betrayal**
- Button labels flicker: WARP -> FLEE (for 0.5s), SCAN -> SCREAM, QUARTERS -> MORGUE
- Only on non-critical moments. Never during an action that could kill crew.
- Only in Sector 4-5 (even if stress is high earlier, full UI corruption waits for late game)
- A.U.R.A. commentary becomes unreliable. "All systems nominal. [SYSTEMS NOT NOMINAL]"

---

## 10. Cargo System

20 cargo units. Physical inventory with space constraints.

| Category | Item Example | Size | Notes |
|----------|-------------|------|-------|
| Rations | Food Pack | 1 unit | Stackable. Each unit = 1 ration on use. |
| Salvage | Raw Salvage | 1 unit | Stackable (x10 per unit). Currency. |
| Consumable | Ionized Battery | 1 unit | Use for +30 energy. |
| Consumable | Luxury Item | 1 unit | Use for stress reduction (-1 to one crew). |
| Artifact | Tech Fragment | 1 unit | Valuable for endings/upgrades/A.U.R.A. reprogram. |
| Living | Fungus Culture | 2 units | Passive: +1 ration every 3 actions. Alive, feeds on radiation. |
| Revival | Xeno-Mycelium | 2 units | Ultra-rare. Revives dead crew as SYMBIOTE. |
| Revival | Neural Link | 2 units | Ultra-rare. Revives dead crew as CYBORG_HUSK. |

**Rules:**
- Cannot warp if over 20 units. Must jettison to move.
- Survivors from cryo DO NOT take cargo space. They increase ration consumption (+1 per jump per survivor).
- Fabricator (upgrades) draws from Salvage, not cargo.

---

## 11. Ending System Updates

The existing 3-act ending system is preserved and extended. New inputs:

### New Ending Variables
- **Crew stress state**: High-stress colony = unstable society, paranoid governance
- **A.U.R.A. ethics**: Cooperative = benevolent overseer. Adversarial = AI tyranny.
- **Salvage level**: High salvage = industrial society. Low = agrarian/primitive.
- **Survivors rescued**: Additional colonists = faster growth but resource strain
- **Exodus lore discovered**: More lore = better-informed colony decisions. Finding all 8 Exodus logs = secret ending.
- **Commander stress 3**: A.U.R.A. takes command. Special "AI COLONY" ending branch.

### Sector 1 Colony Outcomes
Survivable but bleak. The planet types available (ROCKY, DESERT, ICE_WORLD, GAS_GIANT) are uninhabitable long-term without better tech. Endings reflect mundane decline rather than catastrophe:
- "The minerals ran out after a decade. Without trade, without contact, we became subsistence farmers on a rock."
- "The cold crept in. Each generation built the walls thicker, dug the tunnels deeper. We forgot the sky."
- "We survived. That's all. No growth, no discovery, no future. Just survival."

### The Secret Ending
If the player finds all 8 Exodus ship logs across 5 sectors, a special option appears: "TRANSMIT EXODUS ARCHIVE." Instead of colonizing, you broadcast everything you've learned back toward Earth. You don't survive — but you ensure no future Exodus repeats the same mistakes. Bittersweet, selfless, and only achievable by thorough exploration.

---

## 12. What Stays From Current Codebase

| System | Status | Notes |
|--------|--------|-------|
| PlanetGenerator | **KEEP + EXTEND** | Add sector-restricted types, new tags (WRECKAGE, FAILED_COLONY, PREDATORY, GHOST). Core generation logic is sound. |
| LootTables + LOOT_RULES | **KEEP + EXTEND** | Add WRECKAGE pools, scavenger-flavored text. Architecture is correct. |
| EndingSystem | **KEEP + EXTEND** | Add stress, A.U.R.A., and new variable inputs. 3-act structure is the crown jewel. |
| ProbeSystem | **KEEP** | Damage/loot logic is solid. Rename metals to salvage in output text. |
| Events.js | **KEEP + EXTEND** | Add scavenger events, derelict events, failed colony events. Trigger system works. |
| Items.js | **KEEP + EXTEND** | Add ration items, luxury items (stress reducers), Exodus log items. |
| Upgrades.js | **KEEP + RENAME** | Costs in Salvage instead of Metals. Fuel Scoop effect changes to Energy recovery. |
| AudioSystem | **KEEP + EXTEND** | Add hull groans, ambient drones, A.U.R.A. voice cues. Procedural synth approach is correct. |
| NavView | **REWORK** | Add derelict ship nodes, sector-specific visual changes, ghost planet support. |
| OrbitView | **KEEP + EXTEND** | Add INVESTIGATE COLONY SITE action, scavenger flavor text. |
| CSS/Visual Identity | **KEEP** | CRT terminal aesthetic is cohesive. Add damaged-deck visual states. |
| bundle.js App class | **REWORK** | Major changes to resource model, event handling, campfire system, sector transitions. |
| GameState | **REWORK** | New resource model (Energy/Salvage/Rations), stress per crew, A.U.R.A. ethics, ship deck status, sector config. |
| CrewGenerator | **REWORK** | Replace random generation with fixed named characters (Jaxon, Aris, Vance, Mira) + random Commander name. |
| Ship Schematic (left panel HTML) | **REWORK** | Make interactive. Each deck clickable with status/repair UI. |
| index.html header | **REWORK** | Update resource bars: Energy, Salvage, Rations. Remove Fuel/O2/Probe integrity from header (probe integrity moves to command deck only). |

---

## 13. Lose Conditions

The game currently has no way to lose. These are the fail states:

| Condition | Trigger | Outcome |
|-----------|---------|---------|
| **Starvation** | Rations reach 0 | 1 crew member dies per action. If all die, game over screen: "The last log entry is dated [date]. It reads: 'The rations ran out. Forgive us.'" |
| **Total Crew Loss** | All 5 crew members DEAD | Game over. "EXODUS-9: ALL HANDS LOST. Vessel drifting. Beacon active. No response expected." |
| **A.U.R.A. Mutiny** | Ethics score reaches -7 AND Bridge not repaired within 2 actions of warning | A.U.R.A. vents atmosphere or forces colony on worst available planet. Special ending: "THE MACHINE'S CHOICE." |
| **Commander Breakdown** | Commander reaches Stress 3 | A.U.R.A. assumes command. Auto-colonizes nearest viable planet. Ending reflects AI-chosen colony. |
| **Hull Breach** | 3+ decks damaged simultaneously AND no salvage to repair | Ship integrity fails. "The hull gave way in the night. The void was merciful — it was quick." |

---

## 14. Audio Direction

Expand the procedural synth system. No audio files.

**Ambient Layer:**
- Hull groans (low frequency rumbles, random interval)
- Airflow hiss (white noise, very quiet, continuous)
- Computer whirs (periodic digital chirps)

**A.U.R.A. Voice Cues:**
- Short synth tones before A.U.R.A. commentary (ascending = good news, descending = warning)
- At Adversarial tier: discordant tones, slight delay, pitch instability

**Stress Audio:**
- At high crew stress: occasional heartbeat-like low throb
- UI disturbance sounds: static bursts, frequency sweeps

**Sector Themes:**
- S1 (Graveyard): Metal creaks, distant impacts
- S2 (Void): Near silence. Occasional very distant tones. Emphasize emptiness.
- S3 (Signal): The rhythmic tapping. Starts faint, grows louder over time.
- S4 (Garden): Deceptively pleasant tones. Minor key underneath.
- S5 (Event Horizon): Reversed sounds, pitch-shifted crew audio, temporal distortion effects.
