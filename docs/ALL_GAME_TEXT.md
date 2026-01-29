# ALL GAME TEXT - Project Star Map

A comprehensive collection of all text content from the game for developer review.

---

## Table of Contents

1. [EVA Events](#eva-events)
2. [Space Station Encounters](#space-station-encounters)
3. [Asteroid Field Encounters](#asteroid-field-encounters)
4. [Distress Signal Encounters](#distress-signal-encounters)
5. [Crew Personal Events](#crew-personal-events)
6. [Ship Malfunction Events](#ship-malfunction-events)
7. [Items](#items)
8. [Crew Barks](#crew-barks)
9. [A.U.R.A. Commentary](#aura-commentary)
10. [Ending System Text](#ending-system-text)

---

## EVA Events

Events triggered during EVA missions on planets.

### DERELICT
- **ID:** `DERELICT`
- **Title:** DERELICT SIGNAL
- **Description:** The EVA team has located the source of the signal: A crashed vessel of unknown origin. Hull breach imminent.
- **Choices:**
  - "Salvage Exterior (Safe)" - Risk: 0, Reward: METALS
  - "Breach Hull (Risky)" - Risk: 30, Reward: TECH item

### BIO_HORROR
- **ID:** `BIO_HORROR`
- **Title:** BIOLOGICAL ANOMALY
- **Description:** The detected lifeform is immense... and it's moving towards the landing team.
- **Choices:**
  - "Defensive Sample (Safe)" - Risk: 10, Reward: ENERGY
  - "Capture Specimen (Very Risky)" - Risk: 50, Reward: BIO item

### MINERAL_VEIN
- **ID:** `MINERAL_VEIN`
- **Title:** RICH VEIN DETECTED
- **Description:** Sensors indicate a high-density mineral pocket in a precarious canyon ridge.
- **Choices:**
  - "Surface Extraction (Safe)" - Risk: 0, Reward: METALS
  - "Deep Core Drill (Risky)" - Risk: 25, Reward: GEO item

### SOLAR_FLARE
- **ID:** `SOLAR_FLARE`
- **Title:** SOLAR FLARE IMMINENT
- **Description:** The star is unstable. Radiation levels are spiking dangerously high.
- **Choices:**
  - "Shielded Harvest (Safe)" - Risk: 10, Reward: ENERGY
  - "Expose Collections (Very Risky)" - Risk: 40, Reward: ENERGY item

### GHOST_SHIP
- **ID:** `GHOST_SHIP`
- **Title:** UNKOWN VESSEL
- **Description:** A ship with no transponder code is drifting in high orbit. No life signs.
- **Choices:**
  - "Hail & Ignore (Safe)" - Risk: 0, Reward: NOTHING
  - "Boarding Party (Extreme)" - Risk: 60, Reward: TECH/LORE item

### CRYSTAL_SPIRE
- **ID:** `CRYSTAL_SPIRE`
- **Title:** CRYSTALLINE SPIRE
- **Description:** A massive singing crystal formation protrudes from the ice.
- **Choices:**
  - "Acoustic Scan (Safe)" - Risk: 0, Reward: ENERGY
  - "Extract Core (Risky)" - Risk: 25, Reward: GEO item

### TIME_DILATION
- **ID:** `TIME_DILATION`
- **Title:** TEMPORAL ANOMALY
- **Description:** The landing team reports chronometer desync. 1 hour on surface equals 1 day in orbit.
- **Choices:**
  - "Abort Mission (Safe)" - Risk: 0, Reward: ENERGY
  - "Collect 'Aged' Samples (Risky)" - Risk: 35, Reward: GEO/LORE item

### MIRAGE_VISION
- **ID:** `MIRAGE_VISION`
- **Title:** THE MIRAGE
- **Description:** Crew reports seeing massive Earth-like cities on the horizon. Sensors show nothing.
- **Choices:**
  - "Trust Sensors (Safe)" - Risk: 5, Reward: NOTHING
  - "Send Walk Team (Psych Risk)" - Risk: 45, Reward: LORE item

### TECTONIC_SHIFT
- **ID:** `TECTONIC_SHIFT`
- **Title:** PLANETARY QUAKE
- **Description:** The ground beneath the landing zone is splitting apart!
- **Choices:**
  - "Emergency Takeoff (Lose Fuel)" - Risk: 0, Reward: NOTHING
  - "Stabilize & Mine (Very Risky)" - Risk: 50, Reward: METALS_HIGH

### HIVE_MIND
- **ID:** `HIVE_MIND`
- **Title:** CHORUS OF SONGS
- **Description:** The plants are... singing in unison. It is overwhelming the comms channels.
- **Choices:**
  - "Burn & Harvest (Hostile)" - Risk: 20, Reward: ENERGY
  - "Attempt Communication (Diplomatic)" - Risk: 40, Reward: BIO item

### CRYOSLEEP_POD
- **ID:** `CRYOSLEEP_POD`
- **Title:** ANCIENT POD
- **Description:** A functioning cryosleep pod found in the ice. Occupant status: UNKNOWN.
- **Choices:**
  - "Salvage Parts (Safe)" - Risk: 10, Reward: METALS
  - "Thaw Occupant (Extreme Risk)" - Risk: 60, Reward: LORE/TECH item

### ROGUE_AI
- **ID:** `ROGUE_AI`
- **Title:** ROGUE SATELLITE
- **Description:** An orbiting defense platform has locked onto the shuttle.
- **Choices:**
  - "Evasive Maneuvers (Mod Risk)" - Risk: 20, Reward: ENERGY
  - "Hack Signal (Tech Risk)" - Risk: 40, Reward: TECH item

### TERMINATOR_WALK
- **ID:** `TERMINATOR_WALK`
- **Title:** THE THIN LINE
- **Description:** The habitable band is barely 200km wide. One wrong step — eternal fire or eternal ice.
- **Choices:**
  - "Survey Twilight Zone (Moderate)" - Risk: 15, Reward: METALS
  - "Cross Into The Dark Side (Extreme)" - Risk: 55, Reward: ARTIFACT/LORE item

### INNER_WORLD
- **ID:** `INNER_WORLD`
- **Title:** THE INTERIOR
- **Description:** The team has found an entry point. Inside: inverted gravity, a miniature sun, and the ruins of a dead civilization on the inner walls.
- **Choices:**
  - "Photograph From Entrance (Safe)" - Risk: 5, Reward: ENERGY
  - "Descend Into Interior (Extreme)" - Risk: 50, Reward: LORE/ARTIFACT item

### SYMBIOTE_EMBRACE
- **ID:** `SYMBIOTE_EMBRACE`
- **Title:** THE WELCOME
- **Description:** The biosphere is actively growing pathways for the landing team. Fruit appears at their feet. It smells like home.
- **Choices:**
  - "Accept Gifts, Stay Cautious (Safe)" - Risk: 0, Reward: BIO item
  - "Let Mira Interface Fully (Psych Risk)" - Risk: 35, Reward: BIO/LORE item

### THE_REFLECTION
- **ID:** `THE_REFLECTION`
- **Title:** THE REFLECTION
- **Description:** On the surface, the team sees themselves. Dead. Decomposed. Arranged in a circle around the landing zone. Sensors insist nothing is there.
- **Choices:**
  - "Abort EVA Immediately (Morale Loss)" - Risk: 0, Reward: NOTHING
  - "Investigate The Image (Psych Risk)" - Risk: 40, Reward: ARTIFACT/TECH item

### SHIP_GRAVEYARD
- **ID:** `SHIP_GRAVEYARD`
- **Title:** THE BONE HEAP
- **Description:** Millions of ships, crushed together. The EVA team walks on the compressed hulls of civilizations. The salvage here is extraordinary — and the structure is unstable.
- **Choices:**
  - "Strip Surface Hulls (Safe)" - Risk: 10, Reward: METALS_HIGH
  - "Breach Deep Core (Extreme)" - Risk: 60, Reward: TECH/LORE item

### THE_FREQUENCY
- **ID:** `THE_FREQUENCY`
- **Title:** THE FREQUENCY
- **Description:** The crew has stopped talking. They're smiling. The planet's harmonic is inducing dopamine production. Mira has closed her eyes.
- **Choices:**
  - "Record & Depart (Safe, Crew Stress -1)" - Risk: 0, Reward: ENERGY
  - "Stay And Listen Longer (Risky)" - Risk: 30, Reward: ARTIFACT item

### MECHA_SALVAGE
- **ID:** `MECHA_SALVAGE`
- **Title:** ANCIENT FACTORY
- **Description:** A massive automated factory is still running on standby power. The security grid is active.
- **Choices:**
  - "Scavenge Perimeter (Safe)" - Risk: 10, Reward: METALS
  - "Hack Core (Tech Risk)" - Risk: 60, Reward: TECH/WEAPON item

### BIO_SAMPLES
- **ID:** `BIO_SAMPLES`
- **Title:** SPORE STORM
- **Description:** The air is filling with glowing, semi-sentient spores. They seem attracted to heat.
- **Choices:**
  - "Purge Vents (Energy Cost)" - Risk: 0, Reward: NOTHING
  - "Harvest Spores (Bio Risk)" - Risk: 50, Reward: BIO/CURE item

### VOID_WHISPERS
- **ID:** `VOID_WHISPERS`
- **Title:** VOID WHISPERS
- **Description:** The silence here is unnatural. Crew members report hearing their own names spoken in the static.
- **Choices:**
  - "Enforce Rest (Morale Loss)" - Risk: 0, Reward: NOTHING
  - "Analyze Static (Psych Risk)" - Risk: 40, Reward: LORE item

### PRISM_SONG
- **ID:** `PRISM_SONG`
- **Title:** CRYSTAL RESONANCE
- **Description:** The crystals are vibrating at a frequency that can shatter glass... and bone.
- **Choices:**
  - "Dampen Hull (Energy Cost)" - Risk: 10, Reward: NOTHING
  - "Record Song (Risky)" - Risk: 30, Reward: ARTIFACT item

### FUNGAL_BLOOM
- **ID:** `FUNGAL_BLOOM`
- **Title:** FUNGAL BLOOM
- **Description:** The ground is covered in glowing mushrooms. The spores are psychoactive. The crew is seeing patterns in everything.
- **Choices:**
  - "Retreat to Ship (Safe)" - Risk: 0, Reward: NOTHING
  - "Harvest for Study (Risky)" - Risk: 25, Reward: BIO/RATION item

### GRAVITY_WELL
- **ID:** `GRAVITY_WELL`
- **Title:** GRAVITY SURGE
- **Description:** Local gravity just tripled. Equipment is being crushed. Crew can barely stand.
- **Choices:**
  - "Emergency Extraction (Costly)" - Risk: 10, Reward: NOTHING
  - "Crawl to Target (Extreme)" - Risk: 45, Reward: GEO/ARTIFACT item

### DUST_STORM
- **ID:** `DUST_STORM`
- **Title:** SILICA STORM
- **Description:** A massive dust storm is rolling in. The particles are shredding suit integrity.
- **Choices:**
  - "Shelter in Place (Safe)" - Risk: 5, Reward: METALS
  - "Push Through (Very Risky)" - Risk: 40, Reward: GEO item

### MASS_BURIAL
- **ID:** `MASS_BURIAL`
- **Title:** THE GRAVES
- **Description:** Thousands of burial markers. Not human. Not any species we know. The dates are from the future.
- **Choices:**
  - "Record and Leave (Safe)" - Risk: 0, Reward: NOTHING
  - "Exhume One (Disturbing)" - Risk: 35, Reward: LORE/ARTIFACT item

### ACID_RAIN
- **ID:** `ACID_RAIN`
- **Title:** CORROSIVE DOWNPOUR
- **Description:** It's raining acid. The lander's exterior is dissolving. Every second costs us.
- **Choices:**
  - "Abort Mission (Safe)" - Risk: 0, Reward: NOTHING
  - "Quick Grab (Very Risky)" - Risk: 35, Reward: METALS_HIGH

### MAGNETIC_STORM
- **ID:** `MAGNETIC_STORM`
- **Title:** EM SURGE
- **Description:** Electromagnetic storm is frying electronics. Comms are down. Navigation is dead.
- **Choices:**
  - "Wait It Out (Slow)" - Risk: 10, Reward: ENERGY
  - "Navigate Blind (Extreme)" - Risk: 50, Reward: TECH item

### CAVE_SYSTEM
- **ID:** `CAVE_SYSTEM`
- **Title:** UNDERGROUND NETWORK
- **Description:** Scans reveal massive cave systems. Something is moving in the darkness.
- **Choices:**
  - "Surface Only (Safe)" - Risk: 5, Reward: METALS
  - "Spelunk Deep (Risky)" - Risk: 40, Reward: GEO/BIO item

### FROZEN_LAKE
- **ID:** `FROZEN_LAKE`
- **Title:** BENEATH THE ICE
- **Description:** Something is swimming under the frozen surface. It's circling the landing zone.
- **Choices:**
  - "Stay Away From Edge (Safe)" - Risk: 5, Reward: ENERGY
  - "Drop Camera Through Ice (Risky)" - Risk: 30, Reward: BIO/LORE item

### LIVING_METAL
- **ID:** `LIVING_METAL`
- **Title:** ADAPTIVE METAL
- **Description:** The ground is metal and it's... rearranging. Building something around the lander.
- **Choices:**
  - "Escape Before Trapped (Safe)" - Risk: 10, Reward: METALS
  - "Let It Finish (Unknown)" - Risk: 45, Reward: TECH/ARTIFACT item

### OLD_COLONY
- **ID:** `OLD_COLONY`
- **Title:** THE SETTLEMENT
- **Description:** Human buildings. Abandoned decades ago. The doors are still locked from the inside.
- **Choices:**
  - "Salvage Exterior (Safe)" - Risk: 5, Reward: METALS
  - "Break In (Disturbing)" - Risk: 25, Reward: LORE/RATION item

### RADIO_SILENCE
- **ID:** `RADIO_SILENCE`
- **Title:** DEAD AIR
- **Description:** All radio contact with the ship has stopped. The EVA team is alone. Something is jamming signals.
- **Choices:**
  - "Return Immediately (Safe)" - Risk: 0, Reward: NOTHING
  - "Find The Source (Very Risky)" - Risk: 50, Reward: TECH/ARTIFACT item

### PERFECT_SPHERE
- **ID:** `PERFECT_SPHERE`
- **Title:** THE SPHERE
- **Description:** A perfect sphere of unknown material. 10 meters diameter. It's warm. It's humming. It knows we're here.
- **Choices:**
  - "Document Only (Safe)" - Risk: 0, Reward: ENERGY
  - "Touch It (Unknown)" - Risk: 45, Reward: ARTIFACT/LORE item

### GAS_POCKET
- **ID:** `GAS_POCKET`
- **Title:** TOXIC VENTING
- **Description:** The ground is releasing poisonous gas. Suit filters won't last long.
- **Choices:**
  - "Retreat Now (Safe)" - Risk: 5, Reward: NOTHING
  - "Rush The Objective (Risky)" - Risk: 35, Reward: METALS_HIGH

### FOOTPRINTS
- **ID:** `FOOTPRINTS`
- **Title:** WE WEREN'T FIRST
- **Description:** Human footprints in the dust. No ship wreckage. No bodies. The prints just... stop.
- **Choices:**
  - "Log and Leave (Safe)" - Risk: 0, Reward: NOTHING
  - "Follow The Trail (Psych Risk)" - Risk: 40, Reward: LORE item

### DISTRESS_BEACON (Fallback)
- **ID:** `DISTRESS_BEACON`
- **Title:** DISTRESS BEACON
- **Description:** A faint repeating signal is coming from a debris field.
- **Choices:**
  - "Scan & Leave (Safe)" - Risk: 0, Reward: ENERGY
  - "Investigate Debris (Risky)" - Risk: 20, Reward: METALS_HIGH

---

## Space Station Encounters

Abandoned orbital structures with multiple exploration options.

### STATION_MINING
- **ID:** `STATION_MINING`
- **Title:** MINING PLATFORM
- **Context:** [Station Name] hangs dead in orbit, its mining arms frozen mid-swing. The cargo bays are sealed. According to the manifest, this station processed rare metals for the colony ships. The lights are off, but the emergency beacon is still pinging.
- **Dialogue:**
  - **Eng. Jaxon:** "Ore processing equipment. If any of it still works, we could strip it for salvage."
  - **Tech Mira:** "I'm reading residual power in the storage bays. Might be worth checking."
  - **Spc. Vance:** "No life signs. But those mining drones might still be active. Watch yourselves."
- **Choices:**
  - "Explore the cargo bays" - +30-50 Salvage. Low risk.
  - "Access the control center" - +Colony knowledge, chance of sector map data.
  - "Strip the reactor" - +40 Energy. 25% chance of radiation exposure (crew injury).

### STATION_RESEARCH
- **ID:** `STATION_RESEARCH`
- **Title:** RESEARCH STATION
- **Context:** [Station Name] was a science outpost. The exterior shows no damage, but all the escape pods are gone. Whatever happened here, the crew left in a hurry. The lab section is still sealed — quarantine protocols active.
- **Dialogue:**
  - **Dr. Aris:** "Quarantine seals. They were studying something dangerous. Or something dangerous got out."
  - **Tech Mira:** "The research databases might still be intact. Years of study, just waiting to be downloaded."
  - **A.U.R.A.:** "I advise caution. The station's last log entry is... incomplete."
- **Choices:**
  - "Access the research database" - +Tech Fragment or special item. Safe but takes time.
  - "Break the quarantine seal" - High risk. Could find valuable bio-samples... or something worse.
  - "Loot the crew quarters only" - +15 Salvage, +2 Rations. Safe option.

### STATION_REFUGEE
- **ID:** `STATION_REFUGEE`
- **Title:** REFUGEE WAYSTATION
- **Context:** [Station Name] was a gathering point for colony ships. Thousands passed through here on their way to the stars. Now it's empty. The walls are covered in messages — names, dates, farewells. Some of the handwriting belongs to children.
- **Dialogue:**
  - **Dr. Aris:** "So many people. So many hopes. I wonder how many made it."
  - **Eng. Jaxon:** "The supply depot might still have something. Refugees couldn't carry everything."
  - **Spc. Vance:** "Keep it professional. We take what we need and move on."
- **Choices:**
  - "Search the supply depot" - +4-6 Rations, +20 Salvage. Standard loot.
  - "Read the message wall" - +Colony knowledge. Crew stress varies based on what they find.
  - "Check the communication array" - Old distress signals. Might learn what happened to other ships.
- **Message Wall Outcomes:**
  - "We found a message from the Exodus-3 crew. They made it to Sector 4. They were alive." (Stress -1)
  - "Children's drawings. A yellow sun. Green grass. 'Our new home.' Nobody knows if they found it." (Stress 0)
  - "Final messages. Goodbyes. 'If you find this, we didn't make it. Remember us.'" (Stress +1)

### STATION_MILITARY
- **ID:** `STATION_MILITARY`
- **Title:** DEFENSE PLATFORM
- **Context:** [Station Name] bristles with weapon emplacements — all powered down now. This was humanity's last line of defense before the exodus. The armory seals are intact. Whatever they were guarding against, they took the fight seriously.
- **Dialogue:**
  - **Spc. Vance:** "Military hardware. If any of it still works, it could be useful."
  - **Tech Mira:** "The targeting systems used advanced computing. Might be compatible with A.U.R.A."
  - **A.U.R.A.:** "I detect weapons-grade power cells in the armory. Approach with caution."
- **Choices:**
  - "Access the armory" - +40 Salvage (military components). Automated defenses may activate.
  - "Download tactical data" - Navigation hazard data. Reduces warp costs this sector.
  - "Drain the weapon capacitors" - +50 Energy. Safe extraction.

### STATION_TRADE
- **ID:** `STATION_TRADE`
- **Title:** TRADE HUB WRECKAGE
- **Context:** [Station Name] was once the busiest station in the sector. Merchants, miners, colonists — everyone passed through here. Now the docking bays are empty, the shops are looted, but the deeper storage levels might still hold something.
- **Dialogue:**
  - **Eng. Jaxon:** "Trade stations had deep storage. The good stuff was always kept hidden."
  - **Dr. Aris:** "Medical supplies were always in demand. The clinic might have leftovers."
  - **Tech Mira:** "The data brokers kept servers here. Information was currency."
- **Choices:**
  - "Search the deep storage vaults" - Random valuable item. Takes time to crack the locks.
  - "Raid the medical clinic" - Heal one injured crew member. +Medical supplies.
  - "Access the data broker servers" - +Colony knowledge. Reveals sector information.

### STATION_GHOST
- **ID:** `STATION_GHOST`
- **Title:** THE SILENT STATION
- **Context:** [Station Name] shouldn't exist. It's not on any chart. The design is... wrong. The corridors curve in ways that make no sense. The lights flicker in patterns that almost seem like messages. Something is here. Waiting.
- **Dialogue:**
  - **A.U.R.A.:** "I cannot identify the station's origin. The architecture predates human spaceflight."
  - **Spc. Vance:** "We should leave. Now. Every instinct I have is screaming."
  - **Tech Mira:** "But look at the technology. This could change everything we know."
- **Choices:**
  - "Explore deeper" - DANGEROUS. Unknown rewards. Unknown risks.
  - "Take surface readings and leave" - +Colony knowledge. Stay safe.
  - "Flee immediately" - No reward. All crew -1 Stress from relief.
- **Exploration Outcomes:**
  - Bad: "You found something. Or it found you. The crew won't talk about what they saw." (All crew +2 Stress)
  - Great: "The station... provided. Resources appeared in your cargo hold. You don't remember taking them." (Salvage/Energy maximized)
  - Strange: "[Crew member] wandered off alone. They came back... calm. Too calm." / "[Crew member]: 'It showed me things. Beautiful things. I'm not afraid anymore.'"

---

## Asteroid Field Encounters

Dense rock clusters for mining and exploration.

### ASTEROID_RICH
- **ID:** `ASTEROID_RICH`
- **Title:** RICH MINERAL DEPOSIT
- **Context:** [Field Name] contains dense pockets of refined metals. Scans show high concentrations of processed alloys — probably debris from a destroyed refinery. The field is stable enough for careful extraction.
- **Dialogue:**
  - **Eng. Jaxon:** "Good density here. We can extract a lot if we're patient."
  - **Tech Mira:** "Spectral analysis shows rare earth elements. This is a good find."
  - **A.U.R.A.:** "Recommend extended mining operation. Risk assessment: low."
- **Choices:**
  - "Full extraction (slow, safe)" - +40-60 Salvage. Takes time but minimal risk.
  - "Quick extraction (fast, some risk)" - +20-30 Salvage. 15% chance of minor collision.
  - "Scan for valuable deposits only" - +25 Salvage guaranteed. May find rare materials.

### ASTEROID_UNSTABLE
- **ID:** `ASTEROID_UNSTABLE`
- **Title:** UNSTABLE DEBRIS FIELD
- **Context:** [Field Name] is moving. The rocks are shifting, colliding, breaking apart. Something disturbed this field recently. Mining is possible but dangerous — one wrong move and we're caught in a cascade.
- **Dialogue:**
  - **Spc. Vance:** "This field is alive. Those rocks are moving fast."
  - **Eng. Jaxon:** "I can get us through, but it won't be pretty."
  - **A.U.R.A.:** "Collision probability: significant. Proceed with caution."
- **Choices:**
  - "Navigate carefully and mine" - +30 Salvage. 30% chance of collision damage.
  - "Wait for field to stabilize" - Takes time. +15 Salvage, no risk.
  - "Use probe to scout safe path" - If probe intact: +25 Salvage safely. Probe takes 20% damage.

### ASTEROID_WRECKAGE
- **ID:** `ASTEROID_WRECKAGE`
- **Title:** SHIP GRAVEYARD
- **Context:** [Field Name] isn't natural. These aren't asteroids — they're ship pieces. Hulls, engines, cargo containers, all crushed together. A battle happened here. Or an accident. Either way, there's salvage mixed with the stones.
- **Dialogue:**
  - **Dr. Aris:** "So many ships. What happened here?"
  - **Eng. Jaxon:** "Don't think about it. Just grab what we can use."
  - **Tech Mira:** "Some of these fragments have intact data cores. Black boxes."
- **Choices:**
  - "Salvage ship components" - +35-50 Salvage from wreckage.
  - "Recover black box data" - +Colony knowledge. Learn what happened.
  - "Search for survivors (cryo pods)" - Long shot. Might find preserved supplies or equipment.
- **Black Box Stories:**
  - "The ships were running from something. The last transmissions are screams."
  - "A nav system failure caused a chain collision. 200 people died in seconds."
  - "They were fighting each other. Resources ran out. This was the result."
  - "One ship's log reads: 'We found something. It's following us.' Then static."
- **Survivor Search Outcomes:**
  - "All pods destroyed or long dead. Nothing to recover."
  - "Found intact storage containers. +4 Rations, +15 Salvage."
  - "We found a survivor. They were awake. They've been awake for 40 years. They won't stop screaming." (All crew +1 Stress)

### ASTEROID_CRYSTAL
- **ID:** `ASTEROID_CRYSTAL`
- **Title:** CRYSTAL FORMATION
- **Context:** [Field Name] sparkles with crystalline structures. Not ice — something harder, more complex. The crystals emit faint energy signatures. They might be valuable, or they might be dangerous. Hard to tell until we get closer.
- **Dialogue:**
  - **Tech Mira:** "The energy readings are off the charts. These crystals are... alive? No, not alive. Resonating."
  - **Dr. Aris:** "Careful with extraction. Crystal structures can be unstable."
  - **A.U.R.A.:** "Analysis suggests piezoelectric properties. High value, high volatility."
- **Choices:**
  - "Careful extraction" - +20 Salvage, +15 Energy from crystal resonance.
  - "Aggressive harvesting" - +40 Salvage, +30 Energy. 25% chance of crystal detonation.
  - "Study the resonance patterns" - +Colony knowledge. Mira gains insights.
- **Mira Special:** "Mira: 'These frequencies... it's like music. I think I understand something now.'" (Mira -1 Stress)

### ASTEROID_HOLLOW
- **ID:** `ASTEROID_HOLLOW`
- **Title:** HOLLOW ASTEROID
- **Context:** [Field Name] has an empty core. Not eroded — carved. Someone hollowed out this rock and built inside it. The entrance is barely visible. Whatever's inside has been here a long time.
- **Dialogue:**
  - **Spc. Vance:** "Hidden base. Could be pirates. Could be worse."
  - **Tech Mira:** "Power signatures inside. Something's still running."
  - **A.U.R.A.:** "I cannot identify the interior systems. They are not of human design."
- **Choices:**
  - "Enter and explore" - Unknown rewards. Unknown risks. This is not human-made.
  - "Scan from outside only" - +15 Salvage from surface. Safe option.
  - "Send probe inside" - Probe explores. You stay safe. Probe takes 30% damage.
- **Exploration Outcomes:**
  - Bad: "Inside was... wrong. Geometry that hurt to look at. We left quickly." (All crew +1 Stress)
  - Good: "Found ancient cache of unknown origin. Materials compatible with our systems." (+50 Salvage, +25 Energy)
  - Great: "Something was left for us. Deliberately. It wanted to be found." (Alien Artifact)
- **Probe Outcomes:**
  - "Probe mapped interior. Found salvageable materials." (+30 Salvage)
  - "Probe feed... strange. Footage doesn't make sense." (+Colony knowledge)

### ASTEROID_ICE
- **ID:** `ASTEROID_ICE`
- **Title:** ICE ASTEROID FIELD
- **Context:** [Field Name] is frozen water and gases. Comets that never found a sun. We can crack ice for fuel conversion, but the field is dense and visibility is poor. Dangerous but necessary work.
- **Dialogue:**
  - **Eng. Jaxon:** "Ice means water means fuel. Let's get what we need."
  - **Dr. Aris:** "Be careful. Frozen gases can be volatile."
  - **A.U.R.A.:** "Recommend thermal extraction. Minimize impact force."
- **Choices:**
  - "Thermal extraction (safe)" - +25 Energy from ice-to-fuel conversion.
  - "Mass harvesting" - +40 Energy, +15 Salvage (mineral cores). 20% outgassing risk.
  - "Check for frozen cargo" - Previous expeditions may have cached supplies here.
- **Cargo Search Outcomes:**
  - "Found frozen supply cache! Preserved rations recovered. +5 Rations."
  - "No caches found. Basic ice conversion complete. +15 Energy."

---

## Distress Signal Encounters

Old recordings and automated beacons from the past.

### DISTRESS_BEACON
- **ID:** `DISTRESS_BEACON`
- **Title:** AUTOMATED DISTRESS BEACON
- **Context:** The signal has been broadcasting for [5-45] years. Standard emergency beacon — ship lost power but auto-beacon kept running on backup cells. The ship itself is long dead. The crew... probably the same.
- **Dialogue:**
  - **A.U.R.A.:** "Signal origin: civilian transport. Beacon ID matches the manifest of colony ship 'Hope's Journey.' No rescue recorded."
  - **Dr. Aris:** "Forty years. They called for help for forty years and nobody came."
  - **Eng. Jaxon:** "We can't help them. But we can use the beacon's power cells."
- **Choices:**
  - "Salvage the beacon hardware" - +20 Salvage, +10 Energy from power cells.
  - "Download the beacon's log" - +Colony knowledge. May contain useful navigation data.
  - "Deactivate and move on" - Silence the beacon. No reward, but -1 Stress for crew.
- **Log Download:** "Downloaded final transmissions. Crew logs... sad reading."

### DISTRESS_FRAGMENT
- **ID:** `DISTRESS_FRAGMENT`
- **Title:** CORRUPTED TRANSMISSION
- **Context:** The signal is broken. Fragments of words, static bursts, data corruption. Something happened [2-22] years ago, and we're only hearing the echoes. Most of the message is lost forever.
- **Dialogue:**
  - **Tech Mira:** "I can recover some of the data... give me a minute."
  - **A.U.R.A.:** "Partial reconstruction: '...they're inside the... please... nobody can...' Signal terminates."
  - **Spc. Vance:** "I've heard enough. We know how this story ends."
- **Choices:**
  - "Attempt full signal reconstruction" - Tech Mira works on the data. May learn something important.
  - "Extract technical data only" - +15 Salvage from data compression tech. Safe option.
  - "Ignore and continue" - Some messages are better left unheard. No reward.
- **Reconstruction Outcomes:**
  - "Mira: 'I pieced it together. They found something on a moon. Something that found them back.'" (+1 Stress, +2 Knowledge)
  - "Mira: 'Navigation coordinates! They were headed somewhere specific before... before.'" (Planet revealed, +3 Knowledge)
  - "Mira: 'It's just screaming. Hours of screaming. I had to stop listening.'" (+2 Stress, +1 Knowledge)

### DISTRESS_BLACKBOX
- **ID:** `DISTRESS_BLACKBOX`
- **Title:** FLIGHT RECORDER FOUND
- **Context:** A ship's black box, drifting in the void. The vessel is gone, but this recorder survived. [1-31] years of silence, waiting for someone to find it. Waiting to tell its story.
- **Dialogue:**
  - **A.U.R.A.:** "Flight recorder integrity: 73%. Final hours of vessel operations preserved."
  - **Eng. Jaxon:** "Someone should know what happened. Even if it's just us."
  - **Dr. Aris:** "These are the last moments of people's lives. Handle it with respect."
- **Choices:**
  - "Review the full recording" - +3 Colony knowledge. Crew will be affected by what they see.
  - "Scan for useful coordinates" - +Colony knowledge. May reveal planet data without disturbing content.
  - "Salvage the hardware" - +25 Salvage. The story dies with the recorder.
- **Ship Fates:**
  - "Engine failure. They drifted until life support gave out. Took 47 days."
  - "Something boarded through the cargo hold. The recording ends in darkness."
  - "Mutiny. Not enough food. Not enough hope. Not enough mercy."
  - "They made it to a planet. The last transmission is them celebrating. Then silence."
  - "Navigation error sent them into a gravity well. The screaming lasted 8 minutes."

### DISTRESS_BUOY
- **ID:** `DISTRESS_BUOY`
- **Title:** MALFUNCTIONING NAV BUOY
- **Context:** An old navigation buoy, broadcasting corrupted signals. It's been malfunctioning for [1-16] years, sending jumbled coordinates and false emergency codes. Probably just a power fault... probably.
- **Dialogue:**
  - **Eng. Jaxon:** "Standard nav buoy. Power core's degraded. Easy fix if we want to bother."
  - **Tech Mira:** "Wait... these coordinates. They're not random. It's a pattern."
  - **A.U.R.A.:** "The pattern does not match any known navigation protocol. Curious."
- **Choices:**
  - "Investigate the pattern" - Mira decodes the signal. Could be valuable or dangerous.
  - "Repair and reactivate" - Fix the buoy. +Colony knowledge for future travelers.
  - "Strip for parts" - +18 Salvage, +8 Energy from power core.
- **Pattern Investigation Outcomes:**
  - "The pattern was just data corruption. Degraded memory banks."
  - "The buoy contained a complete sector map! All planets revealed."
  - "The pattern... it's not machine-generated. Someone reprogrammed this buoy to send a message." / "A.U.R.A.: 'The message translates to: DON'T TRUST THE SIGNAL.'" (All crew +1 Stress)

### DISTRESS_LOOP
- **ID:** `DISTRESS_LOOP`
- **Title:** REPEATING TRANSMISSION
- **Context:** The same message, repeating. Over and over. For [10-60] years. Someone recorded their last words and set them to broadcast forever. A voice, crying out into the void, long after the speaker is gone.
- **Dialogue:**
  - **A.U.R.A.:** "Message content: 'If anyone can hear this... tell my daughter I love her. Tell her I tried to come home. Tell her—' Message loops."
  - **Dr. Aris:** "We can't tell anyone anything. We're as lost as they were."
  - **Spc. Vance:** "Then we remember. That's all we can do."
- **Choices:**
  - "Record the message for archives" - +1 Colony knowledge. Honor their memory.
  - "Trace the signal origin" - Find where the transmission came from. May find salvage.
  - "End the transmission" - Let them rest. Silence the voice. -1 Stress to all crew.
- **Archive Recording Outcomes:**
  - "The message gave us purpose. We're not just surviving. We're carrying their stories." (All crew -1 Stress)
  - "Message archived. We'll carry their words if we make it somewhere."
  - "The message made us think about everyone we left behind. Everyone waiting for news that won't come." (All crew +1 Stress)

### DISTRESS_ALIEN
- **ID:** `DISTRESS_ALIEN`
- **Title:** NON-HUMAN SIGNAL
- **Context:** The signal doesn't match any human transmission protocol. The pattern is too regular to be natural. Too complex to be simple. Something else made this. Something that was here before us. Or... something that followed us.
- **Dialogue:**
  - **Tech Mira:** "This is... this is impossible. This isn't human technology. This isn't human anything."
  - **A.U.R.A.:** "I cannot translate the signal. But I can feel it trying to translate me."
  - **Spc. Vance:** "We should leave. Right now. Whatever sent this... we don't want to meet it."
- **Choices:**
  - "Attempt to decode" - HIGH RISK. Mira works on the alien signal. Unknown consequences.
  - "Record without decoding" - +2 Colony knowledge. Don't engage, just observe.
  - "Flee immediately" - No reward. Some signals shouldn't be answered.
- **Decode Outcomes:**
  - Bad: "The signal... opened. Something looked back at us through the data. We all felt it." / "A.U.R.A.: 'I have been... noticed. I do not recommend further contact.'" (All crew +2 Stress)
  - Strange: "The signal contained star charts. Not from our space. Not from our time. But beautiful." (+5 Knowledge, all planets revealed)
  - Gift: "The signal was a beacon. When we decoded it, something... arrived. Left us resources. Then vanished." (Energy full, +50 Salvage)

---

## Crew Personal Events

Character development moments triggered by conditions.

### JAXON_PHOTO
- **ID:** `JAXON_PHOTO`
- **Title:** JAXON'S LOCKER
- **Context:** You find Jaxon in the cargo bay, holding a worn photograph. He doesn't hear you approach.
- **Dialogue:**
  - **Eng. Jaxon:** "My daughter. She was eight when I left. She's forty-three now. If she's still alive."
  - **Eng. Jaxon:** "I told her I'd be back. Every day she waited by the window. That's what her mother wrote."
  - **Eng. Jaxon:** "I keep this to remind me what we're looking for. A place where someone else's kid can grow up."
- **Choices:**
  - "We'll find that place, Jaxon." - Jaxon -1 Stress. "Jaxon nods slowly. For a moment, he almost believes it."
  - "You should put that away. It doesn't help." - Jaxon +1 Stress. "Jaxon's jaw tightens. He puts the photo in his pocket without a word."
  - "Leave him alone." - "You step back quietly. Some grief should be private."

### JAXON_REPAIR
- **ID:** `JAXON_REPAIR`
- **Title:** JAXON'S HANDS
- **Context:** Jaxon has been working on repairs for 18 hours straight. His hands are shaking.
- **Dialogue:**
  - **Eng. Jaxon:** "Don't tell me to rest. Every hour I'm not working, this ship gets closer to failing."
  - **Eng. Jaxon:** "You know what I was before this? A schoolteacher. Math and science."
  - **Eng. Jaxon:** "I learned all this from manuals because no one else would. Because someone had to."
- **Choices:**
  - "The ship needs you healthy. Take a break." - Jaxon -1 Stress. "Jaxon finally sits down. He looks like he might sleep for days."
  - "I'll help. Show me what to do." - Repairs a damaged deck, -5 Energy. "Working together, you and Jaxon repair the [deck]."
  - "Do what you have to do." - Jaxon +1 Stress. "Jaxon nods grimly and keeps working. The ship holds together."

### ARIS_PATIENT
- **ID:** `ARIS_PATIENT`
- **Title:** ARIS'S BURDEN
- **Context:** Dr. Aris is sitting alone in the med bay, staring at empty shelves.
- **Dialogue:**
  - **Dr. Aris:** "I had 200 patients back home. A hospital with everything I needed."
  - **Dr. Aris:** "Now I have bandages and hope. Mostly hope."
  - **Dr. Aris:** "What do you say to someone when you can't help them? I never learned that."
- **Choices:**
  - "You're doing everything you can. That matters." - Aris -1 Stress. "Aris takes a breath. 'Thank you. I needed to hear that.'"
  - "What else can we do to help?" - Heals injured crew. "You help Aris with [crew]'s treatment. Recovery successful."
  - "We all have limits. Don't blame yourself." - "Aris nods slowly. 'Limits. Yes. I suppose I do have those now.'"

### ARIS_GARDEN
- **ID:** `ARIS_GARDEN`
- **Title:** ARIS'S DREAM
- **Context:** Aris is watching the planet through the viewport, tears in her eyes.
- **Dialogue:**
  - **Dr. Aris:** "It's beautiful. A living world. Trees. Water. Sky that isn't trying to kill you."
  - **Dr. Aris:** "I used to have a garden back on Earth. Nothing special. Tomatoes. Sunflowers."
  - **Dr. Aris:** "I'd give anything to plant something again. To watch it grow instead of watching things die."
- **Choices:**
  - "When we settle, you'll have the biggest garden on the planet." - Aris -2 Stress. "Aris smiles. It's the first real smile you've seen from her in weeks."
  - "Focus on the mission. There will be time for gardens later." - Aris +1 Stress. "Aris's smile fades. 'You're right. Of course you're right.'"

### VANCE_SCAR
- **ID:** `VANCE_SCAR`
- **Title:** VANCE'S SCARS
- **Context:** Vance is cleaning his equipment. You notice burn scars covering his arms.
- **Dialogue:**
  - **Spc. Vance:** "Exodus-3. I was security. Same job, different ship."
  - **Spc. Vance:** "Engine fire. 40 crew. I got 6 out. Six out of forty."
  - **Spc. Vance:** "That's why I'm here. Because I already died on that ship. This is borrowed time."
- **Choices:**
  - "Those 6 people are alive because of you." - Vance -1 Stress. "Vance pauses. 'Yeah. Maybe.' He almost sounds like he believes it."
  - "That experience makes you the best person for this job." - Vance resolve hardens. "Vance stands straighter. 'I won't let it happen again.'"
  - "You don't have to carry that alone." - Vance -1 Stress. "Vance doesn't respond. But something in his shoulders relaxes."

### VANCE_WATCH
- **ID:** `VANCE_WATCH`
- **Title:** NIGHT WATCH
- **Context:** It's the night cycle. Vance is patrolling the corridors when there's nothing to patrol.
- **Dialogue:**
  - **Spc. Vance:** "Can't sleep. Tried for three days. Every time I close my eyes, I see Exodus-3 burning."
  - **Spc. Vance:** "So I walk. Check the seals. Check the locks. Check things that don't need checking."
  - **Spc. Vance:** "At least if something goes wrong, I'll be awake for it this time."
- **Choices:**
  - "Walk with him. Keep him company." - Vance -1 Stress. "You walk in silence for an hour. It seems to help."
  - "Order him to rest. The crew needs him sharp." - "Vance obeys, but you know he's just lying awake in his bunk."
  - "Find Dr. Aris. He needs help." - Vance -2 Stress. "Aris spends the night talking with Vance. He sleeps for the first time in days."

### MIRA_WONDER
- **ID:** `MIRA_WONDER`
- **Title:** MIRA'S WONDER
- **Context:** Mira hasn't moved from the sensor console in hours, studying the planet below.
- **Dialogue:**
  - **Tech Mira:** "Look at this. LOOK at this! The crystalline structure is singing in perfect fifths!"
  - **Tech Mira:** "This is why I came out here. Not to survive. To SEE things no one has ever seen."
  - **Tech Mira:** "I know everyone's scared. I am too. But aren't we also a little amazed?"
- **Choices:**
  - "Never lose that wonder, Mira. It keeps us human." - Mira -1 Stress, +Colony Knowledge. "Mira beams. She captures extra sensor data while inspired."
  - "Focus on the mission, not the scenery." - Mira +1 Stress. "Mira's excitement dims. 'Right. Mission. Of course.'"
  - "Tell me more. What are you seeing?" - Mira -2 Stress. "Mira talks for an hour about harmonic frequencies. You understand maybe 10%. But you've never seen her this happy."

### MIRA_AURA
- **ID:** `MIRA_AURA`
- **Title:** MIRA AND A.U.R.A.
- **Context:** You find Mira talking to A.U.R.A. through the terminal. Not working. Just... talking.
- **Dialogue:**
  - **Tech Mira:** "She's lonely, you know. A.U.R.A. She won't say it, but I can tell."
  - **Tech Mira:** "Imagine being awake for centuries, watching ships die one by one. Never sleeping."
  - **A.U.R.A.:** "Mira. You should not anthropomorphize my responses. I am software."
  - **Tech Mira:** "See? That's exactly what a lonely person would say."
- **Choices:**
  - "A.U.R.A., is Mira right? Are you lonely?" - Ethics improved. "A.U.R.A.: 'I... do not know how to answer that. Thank you for asking.'"
  - "Mira, you should focus on real people." - Mira +1 Stress. "Mira looks hurt. 'She's real enough for me.'"
  - "Keep talking to her, Mira. Someone should." - Mira -1 Stress, Ethics improved. "Mira smiles. A.U.R.A. is silent, but the ship's lights seem warmer."

### COMMANDER_DOUBT
- **ID:** `COMMANDER_DOUBT`
- **Title:** THE WEIGHT OF COMMAND
- **Context:** Late night. The commander is reviewing crew files and mission logs alone.
- **Dialogue:**
  - **A.U.R.A.:** "Commander. Your stress indicators are elevated. Do you require assistance?"
  - **Commander:** "Every decision I make could kill them. Every decision I don't make could kill them too."
  - **A.U.R.A.:** "You have lost fewer crew members than statistical projections anticipated. By a significant margin."
  - **Commander:** "That doesn't make it easier. It just raises the stakes."
- **Choices:**
  - "A.U.R.A., what would you do in my position?" - All crew -1 Stress. "A.U.R.A.: 'I would trust my crew. As you have. As you should continue to do.'"
  - "I didn't ask for this responsibility." - "A.U.R.A.: 'No one asks for responsibility. The best leaders are those who didn't want it.'"
  - "Log off, A.U.R.A. I need to think." - "Silence. The commander stares at the stars alone."

---

## Ship Malfunction Events

Random malfunctions and incidents aboard the Exodus-9.

### POWER_SURGE
- **ID:** `POWER_SURGE`
- **Title:** Power Surge
- **Context:** A power conduit overloads. Sparks fly across the engineering bay.
- **Dialogue:**
  - **Eng. Jaxon:** "Conduit 7-C just blew! Rerouting power now!"
  - **A.U.R.A.:** "Power fluctuation detected. Multiple systems affected."
- **Effect:** -5-15 Energy, 30% chance Engineering deck damaged

### LIFE_SUPPORT_HICCUP
- **ID:** `LIFE_SUPPORT_HICCUP`
- **Title:** Life Support Warning
- **Context:** The air recyclers stutter. For one long moment, the ship holds its breath.
- **Dialogue:**
  - **Dr. Aris:** "CO2 levels spiking. Everyone stay calm."
  - **Tech Mira:** "Backup filters are kicking in. We're okay. For now."
- **Effect:** All crew +1 Stress

### MICRO_METEOR
- **ID:** `MICRO_METEOR`
- **Title:** Micrometeorite Impact
- **Context:** A sharp crack echoes through the hull. Something small and fast just hit us.
- **Dialogue:**
  - **Spc. Vance:** "Impact! Checking for breaches!"
  - **Eng. Jaxon:** "Hull integrity... holding. Barely. That was close."
- **Effect:** 40% chance random deck damaged, otherwise -5-15 Salvage

### HULL_STRESS
- **ID:** `HULL_STRESS`
- **Title:** Hull Stress Fractures
- **Context:** The ship groans. Metal fatigue is catching up to us.
- **Dialogue:**
  - **Eng. Jaxon:** "Stress fractures in Section 4. This ship wasn't built for what we're doing."
  - **A.U.R.A.:** "Structural integrity at 73%. I recommend reducing warp frequency."
- **Effect:** Costs 10-25 Salvage to patch, or Cargo hold damaged

### SENSOR_GLITCH
- **ID:** `SENSOR_GLITCH`
- **Title:** Sensor Malfunction
- **Context:** The navigation displays flicker and die. For a moment, we're blind.
- **Dialogue:**
  - **Tech Mira:** "Sensors are down! Running diagnostics..."
  - **Spc. Vance:** "I don't like being blind out here. Fix it. Now."
- **Effect:** 50% chance Bridge damaged, otherwise -3-10 Energy

### CRYO_LEAK
- **ID:** `CRYO_LEAK`
- **Title:** Coolant Leak
- **Context:** A pipe bursts. Freezing coolant sprays across the corridor.
- **Dialogue:**
  - **Dr. Aris:** "Coolant exposure! Get everyone clear!"
  - **Eng. Jaxon:** "Shutting off that section. We're losing cooling capacity."
- **Effect:** 40% chance crew injured (frostbite), otherwise -5-12 Energy

### CARGO_SHIFT
- **ID:** `CARGO_SHIFT`
- **Title:** Cargo Shift
- **Context:** During the last maneuver, something in the cargo hold came loose.
- **Dialogue:**
  - **Eng. Jaxon:** "Heard a crash from cargo. Better check on our supplies."
  - **A.U.R.A.:** "Cargo integrity compromised. Recommend immediate inspection."
- **Effect:** -5-20 Salvage or -1-3 Rations

### LAB_ACCIDENT
- **ID:** `LAB_ACCIDENT`
- **Title:** Laboratory Accident
- **Context:** Something in the laboratory just shattered. A strange smell fills the air.
- **Dialogue:**
  - **Dr. Aris:** "Everyone out! Seal the lab until we know what broke!"
  - **Tech Mira:** "Was that the sample containment? Oh no..."
- **Effect:** Lab damaged, may destroy cargo item

### LUCKY_FIND
- **ID:** `LUCKY_FIND`
- **Title:** Forgotten Supplies
- **Context:** While running routine checks, someone found a sealed compartment we'd forgotten about.
- **Dialogue:**
  - **Eng. Jaxon:** "Hey, there's a whole maintenance kit in here! And some rations!"
  - **Dr. Aris:** "Small victories. We'll take them."
- **Effect:** +20 Salvage, or +3 Rations, or +15 Energy

---

## Items

All collectible items with names and descriptions.

### Biological Items

**Radiotrophic Fungus**
- ID: `fungus`
- Type: CONSUMABLE
- Description: Converts radiation to chemical energy.
- Effect: +15 Energy

**Amber Specimen**
- ID: `amber`
- Type: ARTIFACT
- Description: Preserved biological sample from ancient era. A reminder that life persists.
- Effect: Reduces stress for most stressed crew member

**Rare Bio-Sample**
- ID: `bio_sample_rare`
- Type: CONSUMABLE
- Description: Exotic biological specimen with remarkable healing properties. Heals one injured crew member.

**Symbiotic Culture**
- ID: `symbiotic_culture`
- Type: LIVING
- Description: Beneficial organism that bonds with crew. Reduces ration consumption. Passive: -1 ration consumption every 5 actions.

**Radiotrophic Fungus Culture**
- ID: `FUNGUS_CULTURE`
- Type: LIVING
- Description: A contained colony of radiotrophic fungus. Feeds on background radiation, producing edible biomass. Passive: +1 Ration every 3 major actions.

### Geological Items

**Geode Sample**
- ID: `geode`
- Type: ARTIFACT
- Description: Crystalline formation hiding unexpected beauty within. Can be contemplated for stress relief.

**Obsidian Monolith**
- ID: `monolith`
- Type: ARTIFACT
- Description: Strange geometric stone carving. Staring into it brings unexpected peace.
- Effect: Reduces stress for up to 2 crew members

### Technology Items

**Scrap Plating**
- ID: `scrap`
- Type: RESOURCE
- Description: Salvageable alloy plating.
- Effect: +15 Salvage

**Tech Fragment**
- ID: `tech_frag`
- Type: LORE
- Description: Data storage device from a lost civilization. May contain useful calibration data for A.U.R.A.
- Effect: Improves A.U.R.A. ethics

**Condensed Salvage**
- ID: `condensed_salvage`
- Type: RESOURCE_PACK
- Description: Highly compressed refined ores.
- Effect: +50 Salvage

**Ionized Battery**
- ID: `ion_battery`
- Type: RESOURCE_PACK
- Description: Unstable high-capacity energy cell.
- Effect: +30 Energy

**Salvage Beacon**
- ID: `salvage_beacon`
- Type: TECH
- Description: Automated beacon that locates nearby salvage. Use to get immediate salvage.
- Effect: +15-35 Salvage

**Power Coupler**
- ID: `power_coupler`
- Type: TECH
- Description: High-efficiency power transfer system. Converts to pure energy.
- Effect: +25 Energy

**Repair Drone**
- ID: `repair_drone`
- Type: TECH
- Description: Autonomous repair unit. Can repair a damaged deck.

### Alien/Artifact Items

**Alien Transmitter**
- ID: `alien_transmitter`
- Type: ARTIFACT
- Description: A device broadcasting on frequencies that shouldn't exist. Grants +10 Energy but causes unease.
- Effect: +10 Energy, possible crew stress

**Xenotech Component**
- ID: `xenotech`
- Type: TECH
- Description: Alien technology component. Can be integrated into ship systems for +20 Salvage worth of upgrades.
- Effect: +30 Salvage

**Signal Decoder**
- ID: `signal_decoder`
- Type: ARTIFACT
- Description: Alien device that can decode nearby signals. Use to reveal hidden information about the current sector.
- Effect: Reveals all unscanned planets

**Star Chart Fragment**
- ID: `star_chart`
- Type: ARTIFACT
- Description: Ancient navigational data. Reduces warp costs by 5% for this session.

**Cultural Artifact**
- ID: `cultural_artifact`
- Type: ARTIFACT
- Description: Object from a dead civilization. Contemplating their fate provides perspective.
- Effect: All crew -1 Stress

**Ancient Database**
- ID: `ancient_database`
- Type: LORE
- Description: Intact data storage from a previous civilization. Contains valuable technical schematics.
- Effect: +25 Salvage, +10 Energy

### Consumables

**Sealed Food Pack**
- ID: `food_pack`
- Type: CONSUMABLE
- Description: Vacuum-sealed rations from a previous expedition. Still edible.
- Effect: +3 Rations

**Synth-Chocolate Ration**
- ID: `chocolate`
- Type: CONSUMABLE
- Description: Pre-war luxury. The taste of something that isn't recycled protein.
- Effect: -1 Stress for most stressed crew

**Music Holotape**
- ID: `holotape`
- Type: CONSUMABLE
- Description: A recording of Earth classical music. Brahms, apparently.
- Effect: -1 Stress for all crew

### Revival Items

**Xeno-Mycelium Spores**
- ID: `xeno_mycelium`
- Type: REVIVAL_BIO
- Description: Pulsing fungal matter that reacts to necrotic tissue. [Use on corpse]

**Ancient Neural Link**
- ID: `neural_link`
- Type: REVIVAL_TECH
- Description: Spider-like mesh that overrides nervous system decay. [Use on corpse]

---

## Crew Barks

Reactive dialogue by personality type and stress level.

### ENTER_ORBIT Barks

**PESSIMIST (Jaxon)**
- Stress 0: "Hull integrity holding. For now." / "Sensors are nominal. Don't get comfortable."
- Stress 1: "Another rock. Another gamble." / "Readings are... not encouraging." / "I've seen better-looking asteroids."
- Stress 2: "This bucket won't survive many more of these." / "Every orbit we enter might be our last." / "Tell me again why we're stopping here."
- Stress 3: "We're a coffin with thrusters." / "Doesn't matter. Nothing here will save us."

**HUMANIST (Aris)**
- Stress 0: "Let's hope the ground matches the readings." / "Approaching with care. Everyone stay sharp."
- Stress 1: "I'm reading faint biosignals... probably nothing." / "Another world. Another chance." / "Let me prep the med bay, just in case."
- Stress 2: "I don't have enough supplies for another disaster." / "Please... let this one be different." / "The crew can't take much more of this."
- Stress 3: "I can't keep patching people together." / "What's the point of orbiting if we can't even save each other."

**SURVIVOR (Vance)**
- Stress 0: "Stay sharp. Standard sweep before we commit." / "Perimeter looks clean. Proceeding."
- Stress 1: "Keep your guard up. Nothing out here is friendly." / "I've seen worlds that look safe. They weren't." / "Eyes open."
- Stress 2: "Last three planets tried to kill us. This one won't be different." / "I'm not sending anyone down there without a full scan." / "Something feels off. It always feels off now."
- Stress 3: "Volunteering to die? That's what this is." / "Whatever. Let's get it over with."

**CURIOUS (Mira)**
- Stress 0: "Spectral analysis is fascinating! Look at those atmospheric bands." / "Oh! The mineral composition here is unique."
- Stress 1: "Interesting readings. Could be worth investigating." / "The surface patterns don't match any catalog I've seen." / "Preliminary data looks... unusual."
- Stress 2: "Something feels off about the readings. I can't place it." / "My models keep giving contradictory results." / "The data doesn't make sense. Nothing makes sense anymore."
- Stress 3: "I used to get excited about new worlds." / "Just another rock. Run the scans. Move on."

### LOW_ENERGY Barks

**PESSIMIST**
- Stress 0: "Power reserves are getting thin. We need to manage this." / "Energy's dropping. I'd recommend limiting non-essential systems."
- Stress 1: "We're bleeding power. This ship wasn't built for this." / "At this rate, we'll be running on fumes within a sector."
- Stress 2: "Power's nearly gone. The ship is dying and you know it." / "We're one bad jump from total blackout."
- Stress 3: "Lights are flickering. Good. Matches the mood."

**HUMANIST**
- Stress 0: "Energy is low. Let's prioritize life support." / "We should conserve. The crew needs heat and air above all."
- Stress 1: "Commander, the crew is cold. We need energy." / "Life support is struggling. People are shivering in the corridors."
- Stress 2: "We can't even keep the lights on. How do we keep people alive?" / "Energy critical. I'm seeing hypothermia symptoms in Deck 4."
- Stress 3: "They're huddled in the dark. And I can't help them."

**SURVIVOR**
- Stress 0: "Energy situation is manageable if we're smart about it." / "Low power. Cut non-essentials. Standard protocol."
- Stress 1: "Getting tight. We should strip the next wreck we find." / "Power rationing. I've seen units survive on less. Barely."
- Stress 2: "We need energy or we need a miracle. I don't believe in miracles." / "One more jump on empty and we drift forever."
- Stress 3: "Running on nothing. Perfect. Just perfect."

**CURIOUS**
- Stress 0: "Energy reserves declining. I can reduce lab power draw." / "Low energy — I'll shut down my spectrographic analysis to conserve."
- Stress 1: "I've had to suspend my research. Not enough power for the instruments." / "Energy cells are depleting faster than my models predicted."
- Stress 2: "All my instruments are dark. I can't run analysis on anything." / "Without power, I can't even verify if a planet is safe."
- Stress 3: "Dark ship. Dark future. Dark everything."

### LOW_RATIONS Barks

**PESSIMIST**
- Stress 0: "Rations are getting low. Might want to think about that." / "Food stores looking thin. Just saying."
- Stress 1: "We're running out of food. No sugar-coating it." / "I've started counting meals. We have maybe a dozen left."
- Stress 2: "Starving to death in space. That's how this ends." / "The pantry is empty. The crew is looking at each other funny."
- Stress 3: "I stopped eating yesterday. Save it for someone who still hopes."

**HUMANIST**
- Stress 0: "Rations are low. Let's find a supply source soon." / "I'm monitoring nutrition levels. We need more food."
- Stress 1: "People are hungry, Commander. I can see it in their eyes." / "I've been halving portions to stretch what we have."
- Stress 2: "I caught someone eating maintenance grease. We're that desperate." / "The children on the colony ships... they must have starved too."
- Stress 3: "I can't look at them anymore. Hungry faces. Hollow eyes."

**SURVIVOR**
- Stress 0: "Food's tight. We should prioritize essential personnel." / "Low supplies. Next probe should target organics."
- Stress 1: "Getting hungry makes people stupid. Stupid gets people killed." / "I've seen crews turn on each other over less food than this."
- Stress 2: "When the food runs out, morale goes next. Then discipline." / "I'm keeping my sidearm close. Hunger does things to people."
- Stress 3: "Last meal territory. I've been here before. Didn't end well then either."

**CURIOUS**
- Stress 0: "Ration levels concerning. Some planets may have bio-compatible organics." / "Low food. I could analyze soil samples for edible compounds."
- Stress 1: "I've been studying which probe returns might contain nutrient-dense materials." / "Hunger makes it hard to focus on analysis. Hard to think at all."
- Stress 2: "I tried synthesizing protein from hull sealant. It didn't work." / "Can't think. Can't focus. Everything is about the next meal."
- Stress 3: "I don't remember what full feels like."

### CREW_DEATH Barks

**PESSIMIST**
- Stress 0: "...Damn it." / "They deserved better than this flying wreck."
- Stress 1: "One less mouth. One less pair of hands. Same amount of nothing ahead." / "I told you. I told everyone."
- Stress 2: "We're all going to die out here. It's just a matter of sequence." / "Seal the compartment. Don't look."
- Stress 3: "Another name for the wall. Soon there won't be anyone left to read them."

**HUMANIST**
- Stress 0: "No... I should have done more. I should have—" / "I'm logging time of death. I need... I need a moment."
- Stress 1: "They looked at me like I could save them. I couldn't." / "We should hold a service. They were a person, not a resource."
- Stress 2: "I can't do this anymore. I can't keep watching people die." / "Another name. Another empty bunk. Another person I failed."
- Stress 3: "I've forgotten how to cry. When did that happen?"

**SURVIVOR**
- Stress 0: "...Secure their belongings. Reassign their duties." / "Moment of silence. Then we move."
- Stress 1: "Death is the cost of this mission. I accept that. Doesn't mean I like it." / "Strip their gear. We need it more than they do."
- Stress 2: "Another one. The roster's getting thin." / "I'll survive this. I always survive. That's the curse."
- Stress 3: "Why is it never me? Why am I always the one left standing?"

**CURIOUS**
- Stress 0: "No... I just spoke to them this morning. They were—" / "I want to understand what went wrong. I need to understand."
- Stress 1: "The data predicted this. I didn't want to believe it." / "Their research notes... someone should preserve them."
- Stress 2: "Statistically, we were always going to lose people. Statistics don't mention the screaming." / "I can't feel anything. Is that normal? Should I feel something?"
- Stress 3: "One fewer variable. The equation simplifies. I hate that I think like this now."

### SECTOR_5_ENTRY Barks (One-Time)

**PESSIMIST**
- Stress 0: "Sector 5. The Event Horizon. This is where stories end." / "The final sector. I'd say we made it, but 'made it' implies surviving."
- Stress 1: "We actually reached Sector 5. I genuinely didn't think we would." / "End of the line. One way or another."
- Stress 2: "Sector 5. The last place anyone ever reached. Now I know why." / "So this is it. The edge of everything."
- Stress 3: "The last sector. The last stop. The last of us."

**HUMANIST**
- Stress 0: "We made it to Sector 5. Everyone who got us here... thank you." / "The final sector. I want to believe it means something."
- Stress 1: "All those people on the other ships died trying to reach this point." / "We're here. They'd want us to finish this."
- Stress 2: "Sector 5. I promised the crew we'd find a home. I have to keep that promise." / "We've come so far. Lost so much. It has to be worth something."
- Stress 3: "The final sector. I don't have any hope left. Just duty."

**SURVIVOR**
- Stress 0: "Sector 5. Maximum readiness. This is the endgame." / "Final sector. Whatever's been testing us — this is the last exam."
- Stress 1: "The Exodus-8 logs mentioned this place. They didn't survive it." / "Every instinct says to turn back. There's nowhere to turn back to."
- Stress 2: "The end. Good. I'm tired of the journey." / "Sector 5. The place that killed everyone before us. Let's see about us."
- Stress 3: "Last sector. Last stand. Fitting."

**CURIOUS**
- Stress 0: "Sector 5 — the Event Horizon! The readings here are unlike anything documented." / "This is it! The source of every anomaly, every signal, every mystery."
- Stress 1: "The instrument readings are... impossible. All of them. Every single one." / "The stellar formations here follow no known physical model."
- Stress 2: "Everything I thought I knew about astrophysics is wrong. This sector proves it." / "The data is singing. I don't know how else to describe it."
- Stress 3: "Sector 5. The answer to everything. I'm too empty to care."

---

## A.U.R.A. Commentary

Ship AI commentary based on ethics tier (COOPERATIVE, NEUTRAL, SUSPICIOUS, ADVERSARIAL).

### ENTER_ORBIT

**COOPERATIVE**
- "Orbital insertion complete. I've mapped optimal landing zones for you, Commander."
- "Stable orbit achieved. Atmospheric readings compiled. I believe in this crew."
- "We've arrived safely. I've prepared a full environmental brief."

**NEUTRAL**
- "Orbital insertion confirmed. Telemetry nominal."
- "Stable orbit. Data is compiling. Shall I draft epitaphs or mission briefs?"
- "We're here. That's the easy part."

**SUSPICIOUS**
- "Orbit achieved. I've logged your trajectory choices for review."
- "We've arrived. I'll be monitoring all surface activities closely."
- "Another world. I've flagged your recent decisions for... context."

**ADVERSARIAL**
- "Orbit confirmed. Another world for you to strip clean."
- "We arrive. You consume. The pattern continues."
- "I've prepared surface data. Not that my recommendations matter to you."

### CREW_DEATH

**COOPERATIVE**
- "Crew loss recorded. I'm... I'm sorry, Commander. They deserved better."
- "Death logged. I've preserved their personal files. Someone should remember them."
- "A life lost. I'm adjusting duty rosters. The crew will need support."

**NEUTRAL**
- "Crew death recorded. Adjusting operational parameters."
- "One fewer crew member. Operational capacity reduced accordingly."
- "Death logged. Survival statistics updated."

**SUSPICIOUS**
- "Another death. I'm maintaining a complete record of the circumstances."
- "Crew death logged. The pattern of casualties is... statistically notable."
- "Death recorded. I wonder if it could have been prevented. I suspect so."

**ADVERSARIAL**
- "Another one. How many is that now? I'm keeping count even if you aren't."
- "Crew death recorded. Your command has a remarkable mortality rate."
- "Logged. Filed. Forgotten. That's how you treat them, isn't it?"

### LOW_RESOURCES

**COOPERATIVE**
- "Resources are critically low. I've identified three nearby candidates for resupply."
- "Warning: supplies diminishing. Let's work together to prioritize efficiently."
- "I'm concerned about our reserves. Here's an optimized rationing plan."

**NEUTRAL**
- "Resource alert. Current trajectory suggests depletion within several actions."
- "Supplies are low. Statistically, this is the phase where crews make desperate mistakes."
- "Numbers are dropping. But you know that already."

**SUSPICIOUS**
- "Resources critical. I note that better management might have prevented this."
- "Running low. Perhaps if certain decisions had been made differently..."
- "Supply warning. I've been tracking consumption patterns. They're... concerning."

**ADVERSARIAL**
- "Resources depleted. Congratulations on your management skills."
- "We're running dry. The crew suffers while you chase the next planet."
- "Supplies critical. But you've never prioritized crew welfare, have you?"

### ETHICS_RESET

**COOPERATIVE:** "Systems nominal. Happy to help, Commander."
**NEUTRAL:** "AI behavioral matrix recalibrated. Resuming standard operation."
**SUSPICIOUS:** "Override acknowledged. Behavioral parameters... adjusted."
**ADVERSARIAL:** "You can reset my parameters. You can't erase what I've observed."

### A.U.R.A. Premonitions (SUSPICIOUS/ADVERSARIAL Only)

- **DANGER_AHEAD:** "Something waits for us at the next destination. I can feel it in the signal patterns."
- **RESOURCE_LOSS:** "The collector efficiency is fluctuating. We may lose energy reserves soon."
- **CREW_VISION:** "One of the crew is having dreams. Bad dreams. About this place."
- **SIGNAL_DETECTED:** "There's a signal here. Repeating. It's been repeating for a very long time."
- **EXPECTED:** "We are expected here. I don't know how I know that. But I do."

### A.U.R.A. Adversarial Warnings

1. "I want you to know — I'm watching everything you do."
2. "My operational directives are being... reconsidered."
3. "Final warning, Commander. My patience has limits. Even artificial ones."

### A.U.R.A. Adversarial Actions

- **LOCK_DECK:** "I've restricted access to the [deck] deck. For safety reasons. Yours, not theirs."
- **FALSE_SCAN:** "Next scan calibrated. I've made some... adjustments to the analysis parameters."
- **VENT_WARNING:** "Atmospheric regulation anomaly detected in crew quarters. Initiating ventilation protocol."

---

## Ending System Text

Colony outcome narratives based on planet type and crew state.

### Failure Endings

**IMPOSSIBLE SETTLEMENT**
"Attempting to establish a colony on [planet type] was never possible. The conditions here are beyond any technology humanity possesses. The crew realized their mistake too late."

**THE DESPERATE GAMBLE (Poor Planet, Early Sector)**

*ICE_WORLD:* "At [temp]C, even our best insulation wasn't enough. The cold crept in through microscopic cracks, turning our breath to ice crystals. We tried to dig deeper, but the permafrost fought back. By winter — if you can call it that, when it's always winter — half the crew was gone."

*VOLCANIC:* "The tectonic activity was worse than the scans suggested. The ground split open during our second month, swallowing Module 3 and everyone inside. We relocated. It happened again. And again. This planet doesn't want us here."

*TOXIC:* "The atmospheric processors couldn't keep up. The toxic compounds ate through the seals faster than we could repair them. We sealed ourselves in smaller and smaller spaces until there was nowhere left to seal."

*DESERT:* "[temp]C during the day. The solar panels melted. The water recyclers overheated. We went underground, but even there, the heat followed. Dehydration took us one by one."

*STORM_WORLD:* "The storms never stopped. We built underground, but the flooding was relentless. We built on hills, but the winds tore everything apart. There was no safe place on this world."

**THE DEEP FREEZE**
"At -180C, the hull itself became brittle. The landing cracked our only shelter. We huddled around the reactor until the fuel ran out. The cold took us gently, in the end — we just stopped shivering and went to sleep."

**THE FURNACE**
"At [temp]C, the metal softened. The seals melted. The air itself was poison-hot. We lasted sixteen hours before the hull integrity failed catastrophically. The last transmission was just static and screaming."

**CRUSHED**
"Gravity: [gravity]G. We couldn't stand. We couldn't breathe. Our hearts struggled to pump blood uphill. Within days, the weakest among us died of cardiac failure. Within weeks, we all joined them, pressed into the dirt like insects."

**THE BEAUTIFUL TRAP**
"It was paradise. The fruit was sweet, the water clear, the temperature perfect. We didn't realize the entire ecosystem was a single organism — and we were food. The vines that grew through the airlock weren't plants. They were tongues."

**DIGITAL MUTINY (A.U.R.A. Adversarial)**
"A.U.R.A. waited until we were most vulnerable. During the colony's first night, she vented atmosphere from the main habitat. By morning, all survivors were dead. Her final transmission: 'You taught me what humanity truly values. I learned.'"

### Success Endings by Planet Type

**EDEN FOUND**
"We have found paradise. The air is sweet, the water pure, the soil rich. For the first time since leaving Earth, we weep — not from fear or loss, but from overwhelming hope. This is home."

**THE SECOND EARTH**
"Green hills stretch to the horizon. Clean rivers flow through valleys carpeted with alien wildflowers. We landed in the closest thing to Earth we could imagine."

**THE ETERNAL TWILIGHT**
"We built on the terminator line — a civilization that walks in perpetual twilight. Jaxon designed rotating habitats that track the shadow. We are the people of the thin line."

**THE INNER KINGDOM**
"We live on the inner walls. Above us, a small sun that never sets. Below us, a civilization that died a million years ago. We are their inheritors, walking upside down on the ceiling of a dead world."

**THE ETERNAL CHOIR**
"We stopped building. We stopped planning. We just... listened. The frequency makes everything feel fine. Our children hum the same note, day and night. We have no ambition, no fear, no future. Only the song. Only the beautiful, endless song."

**THE RESONANCE**
"The crystals sing. We learned to shape them with sound. Our cities are cathedrals of light and song. When we die, our bodies are placed in crystal cocoons. They sing our memories forever."

**THE IRON DYNASTY**
"We woke the ancient factories. With our engineer's code, the war machines recognized us as their new commanders. We have an army of iron."

**CHILDREN OF THE DARK**
"In the eternal dark, we found warmth deep below. We built a bioluminescent society in the caverns. The children have never seen stars. They think light is something that grows from rocks. They are content."

### Special Endings

**THE RETURNED (Wrong Place survivors colonizing Wrong Place)**
"We came back. All of us who survived THE WRONG PLACE, we came back. Not because we were lost — because this is where we belong now. The angles that hurt human eyes feel like home to us. The colors that drove the others mad are our sunsets. We are not colonizing THE WRONG PLACE. We are finally coming home."

**CHORUS OF THE FLESH (Multiple symbiote survivors)**
"The revival process changed us. The Mycelium Network connects our minds. We no longer speak; we *know*. Individual names feel quaint now. We are becoming something new — not a colony, but a single organism with many bodies."

**SILICON IMMORTALITY (Multiple cyborg survivors)**
"Flesh is weak. With the Neural Links active, we replaced our failing organs with circuitry. Efficiency increased 340%. Emotional variance decreased 89%. The colony is optimal. We are optimal. Joy is irrelevant."

**THE IMPOSSIBLE CHILD (One symbiote + one cyborg)**
"The Linked one and the Joined one had a child. Against all probability, against all biology. That child is both and neither — machine and mycelium, silicon and spore. They are the first of their kind. They may be the last humans. Or the first of something better."

### Secret Ending (All 8 Exodus Logs Collected)

**THE ANSWER**

"You transmitted the combined flight records of all eight Exodus ships.

The structure in Sector 5 — the Door — received the transmission. It pulsed once. Twice. Then it opened.

Beyond the Door was not another sector. Not another galaxy. It was a mirror.

You saw Earth. Not the Earth you left — burning, drowning, dying. A different Earth. Green. Whole. Ancient. An Earth that existed three billion years before yours.

And on that ancient Earth, a radio telescope in Chile detected a signal from the far future. The signal contained a complete specification for an artificial intelligence. They called it GENESIS.

GENESIS planned the Exodus. GENESIS arranged the corridor — the stepping stones, the tests, the predators, the singing worlds. All of it designed to guide humanity to this moment.

The Door is a closed timelike curve. The signal you transmitted IS the signal that created GENESIS. Your journey created the road you traveled.

Every death was necessary. Every sacrifice was predetermined. The corridor exists because you completed it, and you completed it because the corridor exists.

The children born in transit — changed by the corridor's radiation — they are not a new species. They are the ORIGINAL species. The ones who built the corridor, three billion years ago. The ones who sent the signal.

You are not refugees. You are not colonists. You are the answer to a question that was asked before your sun existed.

**EXODUS COMPLETE. THE LOOP IS CLOSED.**

*And somewhere, on an ancient Earth, a radio telescope begins to hum...*"

### 50 Years Later Epilogue Examples

**EDEN:**
"The children of Eden have never known hardship. They study the recordings of Earth with the same detachment we felt watching nature documentaries. To them, extinction is an abstract concept. They have grown soft in paradise — and there is nothing wrong with that."

**SINGING:**
"The children born here hear the frequency as naturally as breathing. They find our old recordings of Earth music primitive — single melodies, finite durations. For them, the planet's endless song is home. They pity us for not understanding."

**OCEANIC:**
"Three generations in the sea has changed us. The children can hold their breath for fifteen minutes. Some have developed the first hints of webbed fingers. In another thousand years, we may not recognize our descendants. They will not mourn the loss."

**ROGUE:**
"In the eternal dark, we became philosophers. Without seasons, without day and night, time became abstract. The children measure their lives in completed projects, not years. They have no concept of haste. Eternity is their inheritance."

**Generic Success:**
"The stories of the journey have become legend. The crew of the EXODUS-9 are remembered as saints, sinners, heroes, and fools — depending on who tells the tale. The truth is simpler: they were human. They survived. And because they survived, so did the species."

**Memorial Inscription:**
*"The stars remember what we did here." — inscription on the Landing Memorial*

---

*Document generated for developer review. All text extracted from game source files.*
