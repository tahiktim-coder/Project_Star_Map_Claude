
/**
 * BUNDLED APPLICATION FOR LOCAL EXECUTION
 * Merged to bypass ES Module CORS restrictions on file:// protocol.
 */

// --- 1. DATA & GENERATORS ---



// --- 2. GAME STATE ---

class GameState {
    static instance = null;

    constructor() {
        if (GameState.instance) return GameState.instance;
        GameState.instance = this;

        this.logs = [];
        this.maxLogs = 50;
    }

    static getInstance() {
        if (!GameState.instance) {
            GameState.instance = new GameState();
        }
        return GameState.instance;
    }

    init() {
        this.fuel = 100;
        this.oxygen = 100;
        this.energy = 100;
        this.metals = 0;
        this.probeIntegrity = 100;
        this.cargo = []; // Added Cargo

        this.currentSector = 1;
        this.currentSystem = null;
        this.lastVisitedSystem = null; // Added for 0-cost return logic

        this.crew = [
            { id: 1, name: 'Cmdr. Shepard', gender: 'M', status: 'HEALTHY', tags: ['LEADER'] },
            { id: 2, name: 'Eng. Isaac', gender: 'M', status: 'HEALTHY', tags: ['ENGINEER'] },
            { id: 3, name: 'Dr. Ripley', gender: 'F', status: 'HEALTHY', tags: ['MEDIC'] },
            { id: 4, name: 'Spc. Vance', gender: 'M', status: 'HEALTHY', tags: ['SECURITY'] },
            { id: 5, name: 'Bot TARS', gender: 'AI', status: 'HEALTHY', tags: ['AI'] }
        ];

        this.emitUpdates();
    }

    addLog(message) {
        this.logs.push(message);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        window.dispatchEvent(new CustomEvent('log-updated', {
            detail: { message }
        }));
    }

    consumeEnergy(amount) {
        if (this.energy >= amount) {
            this.energy -= amount;
            this.emitUpdates();
            return true;
        }
        this.addLog("WARNING: Insufficient Energy!");
        return false;
    }

    emitUpdates() {
        window.dispatchEvent(new Event('hud-updated'));
    }
}







// --- 4. MAIN APP ---

class App {
    constructor() {
        this.state = GameState.getInstance();
        this.navView = new NavView(this.state);
        this.orbitView = new OrbitView(this.state);

        this.init();
    }

    init() {
        console.log("Exodus-1 Systems Initializing...");

        window.addEventListener('log-updated', (e) => this.handleLogUpdate(e));

        window.addEventListener('hud-updated', () => this.updateHud());

        // Header Interactions
        document.getElementById('res-crew').parentElement.onclick = () => this.showCrewManifest();

        window.addEventListener('req-warp', (e) => this.handleWarp(e.detail));
        window.addEventListener('req-sector-jump', () => this.handleSectorJump());
        window.addEventListener('req-action-scan', () => this.handleScanAction());
        window.addEventListener('req-action-probe', () => this.handleProbeAction());
        window.addEventListener('req-action-eva', () => this.handleEvaAction());
        window.addEventListener('req-action-colony', () => this.handleColonyAction());
        window.addEventListener('req-break-orbit', () => {
            this.state.addLog("Breaking orbit. Systems disengaged.");
            this.renderNav();
        });
        window.addEventListener('req-remote-scan', (e) => this.handleRemoteScan(e.detail));

        this.state.init();
        this.state.sectorNodes = PlanetGenerator.generateSector(1);
        this.state.addLog("Sector 1 Map Generated.");
        this.renderNav();
        this.state.addLog("System Init Complete. Awaiting Navigation Input.");
    }

    handleWarp(planet) {
        // Free warp if returning to the last visited system (simulating orbit re-entry)
        let cost = planet.fuelCost;
        if (this.state.lastVisitedSystem && this.state.lastVisitedSystem.id === planet.id) {
            cost = 0;
            this.state.addLog("Orbit re-entry trajectory calculated. Fuel cost negligible.");
        }

        if (this.state.consumeEnergy(cost)) {
            this.state.addLog(`Warping to ${planet.name}...`);
            this.state.currentSystem = planet;
            this.state.lastVisitedSystem = planet; // Track last visited
            setTimeout(() => {
                this.state.addLog(`Orbit established. Systems Green.`);
                this.renderOrbit();
            }, 1000);
        }
    }

    handleRemoteScan(planet) {
        if (this.state.consumeEnergy(2)) {
            const data = this.state.sectorNodes.find(p => p.id === planet.id);
            if (data) {
                data.remoteScanned = true;

                // Randomly reveal 1-2 stats if not already done
                if (!data.revealedStats || data.revealedStats.length === 0) {
                    const count = Math.random() > 0.7 ? 2 : 1;
                    const options = ['gravity', 'temperature', 'atmosphere'];
                    const shuffled = options.sort(() => 0.5 - Math.random());
                    data.revealedStats = shuffled.slice(0, count);
                }

                this.state.addLog(`Long-range sensors locked on ${planet.name}. Partial data retrieved.`);
                // Force re-render of right panel
                this.navView.handlePlanetSelect(data);
            }
        }
    }

    handleSectorJump() {
        if (this.state.consumeEnergy(20)) {
            this.state.addLog("Initiating Sector Jump...");
            this.state.sectorNodes = PlanetGenerator.generateSector(this.state.currentSector + 1);
            this.state.currentSector++;
            this.state.lastVisitedSystem = null; // Clear history
            this.renderNav();
            this.state.addLog(`Sector ${this.state.currentSector} Generated.`);
        }
    }

    handleScanAction() {
        if (this.state.consumeEnergy(2)) {
            this.state.addLog("Deep Scan initiated...");
            this.state.currentSystem.scanned = true;
            this.state.addLog("Detailed surface analysis complete. Resource data available.");
            this.orbitView.updateCommandDeck(this.state.currentSystem);
            // Also update the left panel data if possible, but for now just command deck prevents reset
            this.renderOrbit(); // ACTUALLY: We need to re-render to show the new "Environment Readings" on the left.
            // To fix the animation reset, we would need to separate the Planet Visual into its own component that doesn't re-render.
            // For now, let's fix the BUTTON functionality first. 
        }
    }

    handleProbeAction() {
        // 1. Fabricate if destroyed
        if (this.state.probeIntegrity <= 0) {
            if (this.state.metals >= 50) {
                this.state.metals -= 50;
                this.state.probeIntegrity = 100;
                this.state.addLog("Probe Fabricated. Systems Operational.");
                this.state.emitUpdates();
                // this.renderOrbit(); // CAUSES RESET
                this.orbitView.updateCommandDeck(this.state.currentSystem);
            } else {
                this.state.addLog("Insufficient Metals to fabricate Probe.");
            }
            return;
        }

        // 2. Launch Sequence
        const planet = this.state.currentSystem;
        this.state.addLog(`Probe launched to ${planet.name} surface...`);

        // Use new System for Logic
        const result = ProbeSystem.performProbe(planet, this.state.probeIntegrity);

        // Apply Results
        this.state.probeIntegrity = Math.max(0, this.state.probeIntegrity - result.integrityLoss);

        if (result.reward) {
            if (result.reward.type === 'ITEM') {
                const item = { ...result.reward.data, acquiredAt: planet.name };
                this.state.cargo.push(item);
            } else if (result.reward.type === 'RESOURCE') {
                if (result.reward.resource === 'metals') this.state.metals += result.reward.amount;
                if (result.reward.resource === 'energy') this.state.energy = Math.min(100, this.state.energy + result.reward.amount);
            }
        }

        this.state.addLog(result.message);
        this.state.emitUpdates();
        this.orbitView.updateCommandDeck(planet);
    }

    getProbeItem(planet) {
        let pool = [];

        // Logic for pool selection
        if (planet.type === 'VITAL' || (planet.tags && planet.tags.includes('VITAL_FLORA'))) {
            pool.push(ITEMS.RADIOTROPHIC_FUNGUS, ITEMS.AMBER_SPECIMEN);
        }
        if (['ROCKY', 'DESERT', 'VOLCANIC'].includes(planet.type)) {
            pool.push(ITEMS.GEODE_SAMPLE, ITEMS.OBSIDIAN_MONOLITH);
        }
        if (planet.tags && (planet.tags.includes('ANCIENT_RUINS') || planet.tags.includes('ALIEN_SIGNALS'))) {
            pool.push(ITEMS.SCRAP_PLATING, ITEMS.TECH_FRAGMENT);
        }

        // Fallback if no specific pool match or pool empty
        if (pool.length === 0) pool = Object.values(ITEMS);

        // Return random item from pool
        const template = pool[Math.floor(Math.random() * pool.length)];
        return { ...template, acquiredAt: planet.name };
    }

    handleEvaAction() {
        const healthyCrew = this.state.crew.filter(c => c.status === 'HEALTHY');

        // 1. Check Requirements
        if (healthyCrew.length < 2) {
            this.state.addLog("MISSION ABORTED: Minimum 2 Healthy Crew required for EVA.");
            return;
        }

        if (this.state.consumeEnergy(5)) {
            const planet = this.state.currentSystem;

            // 2. Select Event
            // Prioritize specific events, fallback to generic
            let potentialEvents = EVENTS.filter(e => e.trigger(planet));
            if (potentialEvents.length === 0) potentialEvents = [EVENTS[EVENTS.length - 1]]; // Should not happen due to fallback, but safe

            // Bias towards first matches (more specific)
            const selectedEvent = potentialEvents[0];

            this.showEventModal(selectedEvent, planet);
            planet.hasEva = true; // Mark as done
            // this.renderOrbit(); // Removed to prevent reset
            this.orbitView.updateCommandDeck(planet); // Update buttons only
        }
    }

    showEventModal(event, planet) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.zIndex = '2000';

        const riskBase = (planet.dangerLevel || 0) * 5 + 5; // Base risk 5% to 30%

        modal.innerHTML = `
            <div class="modal-content" style="border-color: var(--color-accent);">
                <div class="modal-header" style="color: var(--color-accent);">/// EVA MISSION: ${event.title} ///</div>
                <div style="padding: 20px; text-align: center;">
                    <p style="margin-bottom: 20px; font-style: italic;">"${event.desc}"</p>
                    
                    <div style="display: flex; gap: 20px; justify-content: center;">
                        ${event.choices.map((choice, idx) => {
            const totalRisk = riskBase + choice.riskMod;
            let riskLabel = "UNKNOWN";
            let riskColor = "var(--color-text-dim)";

            if (totalRisk < 10) { riskLabel = "NEGLIGIBLE"; riskColor = "var(--color-primary)"; }
            else if (totalRisk < 30) { riskLabel = "MODERATE"; riskColor = "#FFFF00"; }
            else if (totalRisk < 60) { riskLabel = "HIGH"; riskColor = "#FFA500"; }
            else { riskLabel = "EXTREME"; riskColor = "#FF0000"; }

            return `
                            <button class="choice-btn" data-idx="${idx}" style="
                                padding: 15px; 
                                border: 1px solid var(--color-primary); 
                                background: rgba(0,0,0,0.8); 
                                color: var(--color-primary); 
                                cursor: pointer; 
                                flex: 1;
                                font-family: var(--font-mono);
                                transition: all 0.2s;
                            ">
                                <div>${choice.text}</div>
                                <div style="font-size: 0.8em; margin-top: 5px; color: ${riskColor}">RISK ASSESSMENT: ${riskLabel}</div>
                            </button>
                        `}).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const choice = event.choices[btn.dataset.idx];
                this.resolveEvaOutcome(choice, riskBase);
                modal.remove();
            });
        });

        // Hover effects
        modal.querySelectorAll('.choice-btn').forEach(btn => {
            btn.onmouseenter = () => { btn.style.background = 'var(--color-primary)'; btn.style.color = '#000'; };
            btn.onmouseleave = () => { btn.style.background = 'rgba(0,0,0,0.8)'; btn.style.color = 'var(--color-primary)'; };
        });
    }

    resolveEvaOutcome(choice, baseRisk) {
        const totalRisk = baseRisk + choice.riskMod;
        const roll = Math.random() * 100;
        let logMsg = "";

        // 1. Hazard Check
        if (roll < totalRisk) {
            // INJURY or DEATH
            const severity = Math.random() * 100;
            const targetCrew = this.state.crew.filter(c => c.status === 'HEALTHY')[0]; // Pick first available

            if (severity < 10 || totalRisk > 40) { // 10% chance of death on hit, or if risk was super high
                targetCrew.status = 'DEAD';
                logMsg = `CATASTROPHE: ${targetCrew.name} KIA during operation. `;
            } else {
                targetCrew.status = 'INJURED';
                logMsg = `INCIDENT: ${targetCrew.name} sustained heavy injuries. `;
            }
        } else {
            logMsg = "Operations Successful. Team returned safely. ";
        }

        // 2. Reward
        // Even on injury, you usually get the loot (unless dead? lets be generous for now)
        if (choice.reward.type === 'RESOURCE') {
            let amount = 0;
            if (choice.reward.val === 'METALS') amount = 40 + Math.floor(Math.random() * 40);
            else if (choice.reward.val === 'METALS_HIGH') amount = 60 + Math.floor(Math.random() * 60);
            else amount = 30 + Math.floor(Math.random() * 20); // Energy

            if (choice.reward.val.includes('METALS')) {
                this.state.metals += amount;
                logMsg += `Recovered ${amount} Metals.`;
            } else {
                this.state.energy = Math.min(100, this.state.energy + amount);
                logMsg += `Siphoned ${amount} Energy.`;
            }
        } else if (choice.reward.type === 'ITEM') {
            // Pick a random item
            const item = this.getProbeItem(this.state.currentSystem); // Reuse pool logic for now
            this.state.cargo.push(item);
            logMsg += `Secured Artifact: ${item.name}.`;
        }

        this.state.addLog(logMsg);
        this.state.emitUpdates();
    }

    handleLogUpdate(e) {
        const logContainer = document.getElementById('log-entries');
        if (!logContainer) return;
        const msg = e.detail?.message || "Log Updated";
        const entry = document.createElement('div');
        entry.className = 'log-entry new';
        entry.textContent = msg;
        logContainer.appendChild(entry);

        // Auto scroll force
        requestAnimationFrame(() => {
            logContainer.scrollTop = logContainer.scrollHeight;
        });
    }

    updateHud() {
        document.getElementById('res-energy').textContent = `${this.state.energy}%`;
        document.getElementById('res-oxygen').textContent = `${this.state.oxygen}%`;
        document.getElementById('res-metals').textContent = `${this.state.metals}`;
        document.getElementById('res-probe').textContent = `${this.state.probeIntegrity.toFixed(0)}%`;
        const crewCount = this.state.crew.filter(c => c.status !== 'DEAD').length;
        document.getElementById('res-crew').textContent = `${crewCount}/${this.state.crew.length}`;
        document.getElementById('game-date').textContent = `DATE: 2342.05.${12 + this.state.currentSector}`;

        // Add Cargo if not exists in DOM
        let cargoEl = document.getElementById('res-cargo');
        if (!cargoEl) {
            const cluster = document.querySelector('.resource-cluster');
            const div = document.createElement('div');
            div.className = 'res-item';
            div.innerHTML = `<label>CARGO</label><span id="res-cargo">0</span>`;
            cluster.appendChild(div);
            cargoEl = div.querySelector('#res-cargo');
        }

        // ALWAYS update the text content
        cargoEl.textContent = `${this.state.cargo.length}`;
        // Helper to make entire resource item clickable
        const cargoContainer = cargoEl.parentElement;
        cargoContainer.style.cursor = 'pointer';
        cargoContainer.style.border = '1px solid transparent';
        cargoContainer.onmouseover = () => { cargoContainer.style.borderBottom = '1px solid var(--color-primary)'; };
        cargoContainer.onmouseout = () => { cargoContainer.style.borderBottom = '1px solid transparent'; };
        cargoContainer.onclick = () => this.showCargoInventory();

        const crewContainer = document.getElementById('res-crew').parentElement;
        crewContainer.style.cursor = 'pointer';
        crewContainer.style.border = '1px solid transparent';
        crewContainer.onmouseover = () => { crewContainer.style.borderBottom = '1px solid var(--color-primary)'; };
        crewContainer.onmouseout = () => { crewContainer.style.borderBottom = '1px solid transparent'; };
        crewContainer.onclick = () => this.showCrewManifest();
    }

    showCrewManifest() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">/// CREW MANIFEST /// <span class="close-modal">[X]</span></div>
                <div class="crew-list">
                    ${this.state.crew.map(c => `
                        <div class="crew-card ${c.status === 'DEAD' ? 'status-dead' : ''}">
                            <div class="crew-icon">${c.gender === 'AI' ? '🤖' : '👤'}</div>
                            <div class="crew-details">
                                <div class="crew-name">${c.name}</div>
                                <div class="crew-meta">GENDER: ${c.gender} | STATUS: ${c.status}</div>
                                <div class="crew-tags">${c.tags.join(' ')}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-modal').onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    }

    showCargoInventory() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">/// CARGO HOLD /// <span class="close-modal">[X]</span></div>
                <div class="inventory-grid">
                    ${this.state.cargo.length === 0
                ? '<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-dim); padding: 50px;">CARGO HOLD EMPTY</div>'
                : this.state.cargo.map((item, idx) => `
                            <div class="inv-item" style="display: flex; flex-direction: column; gap: 5px;">
                                <div class="item-name" style="font-weight: bold;">${item.name}</div>
                                <div class="item-desc" style="font-size: 0.7em; color: #888; font-style: italic;">${item.desc}</div>
                                <div style="margin-top: auto; display: flex; gap: 5px;">
                                    ${item.onUse ? `<button class="action-btn" data-idx="${idx}" style="font-size: 0.7em; padding: 2px 5px; cursor: pointer; background: var(--color-primary); border: none; font-weight: bold;">USE</button>` : ''}
                                    <div class="item-type" style="font-size: 0.7em; opacity: 0.5; margin-left: auto;">${item.type}</div>
                                </div>
                            </div>
                        `).join('')}
                </div>
                <div style="margin-top: 20px; text-align: right; font-size: 0.8em; color: var(--color-primary-dim);">
                    CAPACITY: ${this.state.cargo.length}/20 UNITS
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Use Handlers
        modal.querySelectorAll('.action-btn').forEach(btn => {
            btn.onclick = (e) => {
                const idx = parseInt(e.target.dataset.idx);
                this.handleItemUse(idx);
                modal.remove(); // Close to refresh/prevent double click
                this.showCargoInventory(); // Re-open updated
            };
        });

        modal.querySelector('.close-modal').onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    }

    handleItemUse(index) {
        const item = this.state.cargo[index];
        if (item && item.onUse) {
            const msg = item.onUse(this.state);
            this.state.cargo.splice(index, 1); // Remove from inventory
            this.state.addLog(`Used ${item.name}: ${msg}`);
            this.state.emitUpdates();
        }
    }


    handleColonyAction() {
        // Generate Outcome based on Planet Metrics
        const planet = this.state.currentSystem;
        const outcome = EndingSystem.getColonyOutcome(planet);

        // Color code valid vs failed colonies
        const color = outcome.success ? '#00ff00' : '#ff4444';

        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = '#000';
        overlay.style.color = color;
        overlay.style.zIndex = '10000';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.textAlign = 'center';

        overlay.innerHTML = `
            <h1 style="font-size: 3em; border-bottom: 2px solid ${color}; padding-bottom: 20px; margin-bottom: 40px;">/// SIMULATION CONCLUDED ///</h1>
            
            <div style="font-size: 1.2em; max-width: 800px; line-height: 1.6; text-align: left; background: rgba(20,20,20,0.8); padding: 40px; border: 1px solid ${color};">
                <div style="margin-bottom: 20px; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 10px;">
                    TARGET: ${planet.name} <br>
                    TYPE: ${planet.type}
                </div>
                
                <p>${outcome.text}</p>
                
                <div style="margin-top: 30px; font-style: italic; color: #fff; font-weight: bold;">
                    RESULT: ${outcome.title}
                </div>
            </div>

            <button onclick="location.reload()" style="margin-top: 60px; padding: 20px 40px; background: transparent; border: 2px solid ${color}; color: ${color}; font-size: 1.2em; cursor: pointer; font-family: 'Courier New', monospace;">
                REBOOT SIMULATION
            </button>
        `;

        document.body.appendChild(overlay);
    }

    renderNav() {
        const mainView = document.getElementById('main-view');
        mainView.innerHTML = '';
        mainView.appendChild(this.navView.render(this.state.sectorNodes));
        const rightPanel = document.getElementById('tactical-display');
        if (rightPanel) rightPanel.innerHTML = '<div class="placeholder-grid">NO TARGET SELECTED</div>';
    }

    renderOrbit() {
        const mainView = document.getElementById('main-view');
        mainView.innerHTML = '';
        mainView.appendChild(this.orbitView.render());
    }
}

// Start App when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
