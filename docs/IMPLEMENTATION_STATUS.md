# Silent Exodus - Implementation Status

**Last Updated:** Session 2024

---

## 1. CORE SYSTEMS STATUS

| System | Status | Notes |
|--------|--------|-------|
| Resource Model (Energy/Salvage/Rations) | ✅ DONE | 3-resource system working |
| Crew System (5 named crew) | ✅ DONE | Jaxon, Aris, Vance, Mira, Commander |
| Crew Stress (0-3 scale) | ✅ DONE | With breakdown events |
| Ship Deck Damage/Repair | ✅ DONE | 5 decks, damage effects |
| A.U.R.A. AI System | ✅ DONE | Ethics score, behavior tiers |
| Sector Progression (1-5) | ✅ DONE | With sector-specific rules |
| Planet Generation | ✅ DONE | 20+ planet types |
| EVA System | ✅ DONE | 2-crew teams, risk system |
| Probe System | ✅ DONE | Fabrication, deployment |
| Colony/Ending System | ✅ DONE | 3-act procedural endings |
| Modal Queue System | ✅ DONE | Prevents event stacking |

---

## 2. PLANET TYPES IMPLEMENTED

### Standard Types
- ROCKY, DESERT, ICE_WORLD, GAS_GIANT, VOLCANIC, OCEANIC, TOXIC

### Special Types
- VITAL (life-bearing)
- TERRAFORMED (human-modified)
- TIDALLY_LOCKED (thin habitable band)
- HOLLOW (interior civilization)
- SYMBIOTE_WORLD (helpful biosphere)
- MIRROR (psychological horror)
- GRAVEYARD (ship mass grave)
- SINGING (harmonic planet)
- MECHA (machine world)
- BIO_MASS (organic planet)
- CRYSTALLINE (crystal formations)
- SHATTERED (destroyed world)
- ROGUE (starless wanderer)
- EDEN (perfect paradise - rare)

---

## 3. EVA EVENTS (Events.js)

### Original Events (12)
| ID | Title | Trigger |
|----|-------|---------|
| DERELICT | DERELICT SIGNAL | ANCIENT_RUINS or ALIEN_SIGNALS tag |
| BIO_HORROR | BIOLOGICAL ANOMALY | VITAL type or VITAL_FLORA tag |
| MINERAL_VEIN | RICH VEIN DETECTED | ROCKY, DESERT, VOLCANIC |
| SOLAR_FLARE | SOLAR FLARE IMMINENT | temp > 100 |
| GHOST_SHIP | UNKNOWN VESSEL | 30% random chance |
| CRYSTAL_SPIRE | CRYSTALLINE SPIRE | ICE_WORLD, ROCKY |
| TIME_DILATION | TEMPORAL ANOMALY | gravity > 1.5 |
| MIRAGE_VISION | THE MIRAGE | DESERT, OCEANIC |
| TECTONIC_SHIFT | PLANETARY QUAKE | VOLCANIC, ROCKY + dangerLevel > 1 |
| HIVE_MIND | CHORUS OF SONGS | hasLife + VITAL |
| CRYOSLEEP_POD | ANCIENT POD | ICE_WORLD + hasTech |
| ROGUE_AI | ROGUE SATELLITE | ALIEN_SIGNALS tag |

### Planet-Type Specific Events (10)
| ID | Title | Trigger |
|----|-------|---------|
| TERMINATOR_WALK | THE THIN LINE | TIDALLY_LOCKED |
| INNER_WORLD | THE INTERIOR | HOLLOW |
| SYMBIOTE_EMBRACE | THE WELCOME | SYMBIOTE_WORLD |
| THE_REFLECTION | THE REFLECTION | MIRROR |
| SHIP_GRAVEYARD | THE BONE HEAP | GRAVEYARD |
| THE_FREQUENCY | THE FREQUENCY | SINGING |
| MECHA_SALVAGE | ANCIENT FACTORY | MECHA |
| BIO_SAMPLES | SPORE STORM | BIO_MASS |
| VOID_WHISPERS | VOID WHISPERS | SHATTERED, ROGUE |
| PRISM_SONG | CRYSTAL RESONANCE | CRYSTALLINE |

### Additional EVA Events (14) - Added Recently
| ID | Title | Trigger |
|----|-------|---------|
| FUNGAL_BLOOM | FUNGAL BLOOM | FUNGAL or hasLife + 30% |
| GRAVITY_WELL | GRAVITY SURGE | gravity > 1.2 |
| DUST_STORM | SILICA STORM | DESERT, ROCKY, TOXIC |
| MASS_BURIAL | THE GRAVES | TOMB_WORLD or 15% random |
| ACID_RAIN | CORROSIVE DOWNPOUR | TOXIC atmosphere/type |
| MAGNETIC_STORM | EM SURGE | GAS_GIANT, SHATTERED or 20% |
| CAVE_SYSTEM | UNDERGROUND NETWORK | ROCKY, ICE_WORLD, HOLLOW |
| FROZEN_LAKE | BENEATH THE ICE | ICE_WORLD, FROZEN_OCEAN |
| LIVING_METAL | ADAPTIVE METAL | MECHA, MACHINE_WORLD |
| OLD_COLONY | THE SETTLEMENT | FAILED_COLONY tag |
| RADIO_SILENCE | DEAD AIR | 20% random |
| PERFECT_SPHERE | THE SPHERE | 15% random |
| GAS_POCKET | TOXIC VENTING | VOLCANIC, SULFUR |
| FOOTPRINTS | WE WEREN'T FIRST | 10% random |
| DISTRESS_BEACON | DISTRESS BEACON | Fallback (always true) |

**Total EVA Events: 37**

---

## 4. SPACE STATIONS (SpaceStations.js)

Abandoned stations - NOT trading posts, just exploration/salvage.

| ID | Name | Theme |
|----|------|-------|
| STATION_MINING | Abandoned Mining Outpost | Resource extraction, hazards |
| STATION_RESEARCH | Derelict Research Station | Experiments, data recovery |
| STATION_REFUGEE | Refugee Processing Hub | Personal effects, moral weight |
| STATION_MILITARY | Military Installation | Weapons, security systems |
| STATION_TRADE | Defunct Trade Hub | Commerce ruins, variety |
| STATION_GHOST | Ghost Station | Horror, unknown fate |

Each has:
- Unique context paragraph
- 3 crew dialogue lines
- 3 choices with effects

---

## 5. ASTEROID FIELDS (AsteroidFields.js)

Mining/hazard encounters in space.

| ID | Name | Theme |
|----|------|-------|
| ASTEROID_RICH | Dense Mineral Field | High salvage opportunity |
| ASTEROID_UNSTABLE | Unstable Field | Risk vs reward |
| ASTEROID_WRECKAGE | Ship Graveyard | Destroyed vessels |
| ASTEROID_CRYSTAL | Crystalline Formation | Energy/artifact potential |
| ASTEROID_HOLLOW | Hollow Asteroid | Hidden interior |
| ASTEROID_ICE | Ice Field | Water/life potential |

Spawn rate: 25% per sector (max 1)

---

## 6. DISTRESS SIGNALS (DistressSignals.js)

OLD recordings - NOT living people. Narrative weight.

| ID | Name | Signal Age |
|----|------|------------|
| DISTRESS_BEACON | Automated Beacon | ANCIENT (decades) |
| DISTRESS_FRAGMENT | Fragmented Recording | OLD (years) |
| DISTRESS_BLACKBOX | Black Box Recording | RECENT (weeks) |
| DISTRESS_NAV | Navigation Buoy | ANCIENT (decades) |
| DISTRESS_LOOPING | Looping Message | MONTHS |
| DISTRESS_ALIEN | Non-Human Signal | UNKNOWN |

Trigger rates (reduced):
- On scan: 4%
- On warp: 2%
- On sector enter: 8%

---

## 7. CREW PERSONAL EVENTS (CrewEvents.js)

Character development moments triggered by conditions.

### Jaxon (Engineer, PESSIMIST)
| ID | Title | Trigger |
|----|-------|---------|
| JAXON_PHOTO | JAXON'S LOCKER | 10+ actions, not seen before |
| JAXON_REPAIR | JAXON'S HANDS | Damaged deck exists |

### Aris (Medic, HUMANIST)
| ID | Title | Trigger |
|----|-------|---------|
| ARIS_PATIENT | ARIS'S BURDEN | Injured crew member exists |
| ARIS_GARDEN | ARIS'S DREAM | Orbiting VITAL/EDEN/TERRAFORMED |

### Vance (Security, SURVIVOR)
| ID | Title | Trigger |
|----|-------|---------|
| VANCE_SCAR | VANCE'S SCARS | 15+ actions |
| VANCE_WATCH | NIGHT WATCH | Sector 3+ |

### Mira (Tech Specialist, CURIOUS)
| ID | Title | Trigger |
|----|-------|---------|
| MIRA_WONDER | MIRA'S WONDER | Orbiting SINGING/CRYSTALLINE/EDEN |
| MIRA_AURA | MIRA AND A.U.R.A. | 20+ actions |

### Commander
| ID | Title | Trigger |
|----|-------|---------|
| COMMANDER_DOUBT | THE WEIGHT OF COMMAND | Sector 3+, LEADER tag |

**Total: 10 crew events**

Crew event choices now show effect hints (e.g., "-1 Stress", "Heals injured")

---

## 8. SHIP MALFUNCTION EVENTS (ShipEvents.js)

Random malfunctions during gameplay.

| ID | Effect | Consequence |
|----|--------|-------------|
| POWER_SURGE | Deck damage | Random deck damaged |
| MICRO_FRACTURE | Hull stress | Warning, potential cascade |
| CARGO_SHIFT | Resource loss | Lose salvage OR rations |
| SENSOR_GHOST | False readings | Temporary sensor issues |
| COOLANT_LEAK | Energy drain | Lose energy over time |
| NAVIGATION_DRIFT | Course deviation | May affect warp |

---

## 9. BARK SYSTEM (BarkSystem.js)

Contextual crew comments triggered by game events.

Categories:
- LOW_FUEL / LOW_RATIONS / LOW_SALVAGE
- CREW_DEATH / CREW_INJURY
- SECTOR_JUMP
- EVA_START / EVA_SUCCESS / EVA_FAILURE
- WARP_START
- SCAN_COMPLETE
- HIGH_STRESS

Each category has multiple lines per crew member.

---

## 10. A.U.R.A. SYSTEM (AuraSystem.js)

AI commentary based on ethics score.

Tiers:
- COOPERATIVE (+2 or higher): Helpful, warns of dangers
- NEUTRAL (-1 to +1): Clinical, default
- SUSPICIOUS (-2 to -4): Logs incidents, pointed comments
- ADVERSARIAL (-5 or lower): Active interference

---

## 11. ENDING SYSTEM FEATURES

### Colony Viability
- Sector 1: 5% base (harsh, but possible)
- Sector 2: 15% base
- Sector 3: 30% base
- Sector 4: 50% base
- Sector 5: 70% base

Modifiers: Planet type, crew alive, resources, tech found

### 3-Act Structure
1. **Arrival (Year 1-10)**: Survival challenges
2. **Adaptation (Year 10-100)**: Cultural evolution
3. **Legacy (Year 100-500)**: Final fate

### Epilogue System (50 Years Later)
- Shows colony population
- Shows what children call Earth
- Procedural based on success level

---

## 12. UI/UX FEATURES

### Implemented
- CRT terminal aesthetic
- Modal system with queue
- Ship schematic (left panel)
- Crew portraits with stress indicators
- Sector map with nodes
- Orbit view with actions
- Mission log

### Planet-Aware EVA Outcomes
EVA success/failure messages now vary by planet type:
- VOLCANIC: "lava surge", "pyroclastic blast"
- ICE_WORLD: "crevasse collapse", "flash freeze"
- TOXIC: "chemical burn", "contamination"
- etc. (15+ planet types)

---

## 13. NOT YET IMPLEMENTED

| Feature | Priority | Effort |
|---------|----------|--------|
| Music/Audio | HIGH | Low (use CC0) |
| Share ending screen | HIGH | Medium |
| Unlockable content | MEDIUM | Medium |
| Run statistics | MEDIUM | Low |
| Responsive layout | HIGH | Medium |
| Items that help colony | MEDIUM | Medium |
| Exodus logs collection | LOW | High |
| Secret ending | LOW | High |
| Difficulty modes | LOW | Low |

---

## 14. RECENT FIXES (This Session)

### Session 1 Fixes
1. ✅ Stations can no longer be colonized
2. ✅ Modal queue prevents event stacking
3. ✅ Distress signal rate reduced (4%/2%/8%)
4. ✅ Asteroid field spawn rate reduced (25%)
5. ✅ EVA outcomes now planet-type aware
6. ✅ Crew event choices show effect hints
7. ✅ Cargo shift effect now guarantees loss with clear messaging

### Session 2 Fixes
8. ✅ Symbiote world no longer shows as CRITICAL/HOSTILE (safe worlds capped at MODERATE)
9. ✅ Ship malfunction percentage now dynamic (based on actual deck damage)
10. ✅ Stress no longer affects colony outcomes (removed stress-based colony failure)
11. ✅ A.U.R.A. commander event fixed (no longer mentions "stress elevated" when no stress)
12. ✅ Confined/sedated crew can't have breakdowns (prevents game over loop)
13. ✅ Crew death causes now tracked (`_deathCause`, `_deathSector`, `_deathPlanet`)
14. ✅ Dead crew properly filtered from all events (crew events already filtered)

### Session 3 Fixes
15. ✅ Investigate buttons now grey out immediately (station, asteroid, exodus, derelict, anomaly, POIs)
16. ✅ Crew event modals now show crew portraits (consistent with other modals)
17. ✅ THE STRUCTURE description no longer duplicates name in tooltip
18. ✅ Repair Drone item now works correctly (fixed `state.decks` → `state.shipDecks`, `operational` → `status`)

### Session 4 Fixes
19. ✅ Commander stress capped at 2 (prevents unexpected game over from random stress events)
20. ✅ THE WRONG PLACE visual CSS added (red/black glitchy horror planet)
21. ✅ AI-sounding text reviewed and fixed ("fascinating" → "amazing/incredible", "significantly" → simpler words, "approximately" → "about/over")
22. ✅ Tutorial system added (contextual tips on first warp, EVA, stress, deck damage)

---

## 15. DEATH TRACKING SYSTEM

Crew now store death information for the share ending screen:

| Field | Description | Example |
|-------|-------------|---------|
| `_deathCause` | How they died | "starvation", "lava surge", "predatory organisms", "The Door" |
| `_deathSector` | Which sector | 1-5 |
| `_deathPlanet` | Where they died | "Kepler-7b", "the Structure", "unknown world" |

This enables narratively cohesive endings:
- Living crew: "Founded the colony's first hospital"
- Dead crew: "Lost to lava surge on Kepler-7b in Sector 3"
