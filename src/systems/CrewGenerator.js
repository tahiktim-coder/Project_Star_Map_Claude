/**
 * CREW GENERATOR
 *
 * Fixed canonical crew for Silent Exodus.
 * Each crew member has a set identity, portrait, and personality.
 */

class CrewGenerator {

    /**
     * The canonical crew of the Exodus-9.
     * Fixed names, portraits, and backgrounds.
     */
    static CANONICAL_CREW = [
        {
            id: 'commander_reyes',
            name: 'Cmdr. Reyes',
            realName: 'Elena Reyes',
            gender: 'F',
            age: 38,
            portraitId: 'F_1',  // Blonde woman - the leader
            status: 'HEALTHY',
            stress: 0,
            tags: ['LEADER'],
            background: 'Former military captain. Lost her previous crew to a navigation error. Carries that weight.',
            voice: 'Calm, authoritative, occasionally haunted.'
        },
        {
            id: 'engineer_jaxon',
            name: 'Eng. Jaxon',
            realName: 'Marcus Jaxon',
            gender: 'M',
            age: 42,
            portraitId: 'M_2',  // Older man with gray hair
            status: 'HEALTHY',
            stress: 0,
            tags: ['ENGINEER'],
            background: 'Ship systems expert. Keeps the Exodus-9 running with wire and prayer. Pessimist by experience.',
            voice: 'Gruff, practical, worried about the machinery.'
        },
        {
            id: 'medic_aris',
            name: 'Dr. Aris',
            realName: 'Yuki Aris',
            gender: 'F',
            age: 35,
            portraitId: 'F_3',  // Asian woman
            status: 'HEALTHY',
            stress: 0,
            tags: ['MEDIC'],
            background: 'Xenobiologist and ship medic. Fascinated by alien life. Perhaps too fascinated.',
            voice: 'Curious, compassionate, scientifically detached when stressed.'
        },
        {
            id: 'security_vance',
            name: 'Spc. Vance',
            realName: 'Kael Vance',
            gender: 'M',
            age: 45,
            portraitId: 'M_4',  // Scarred, hardened man
            status: 'HEALTHY',
            stress: 0,
            tags: ['SECURITY', 'SURVIVOR'],
            background: 'Former colony security. Survived the Kepler-7 massacre. Trusts no one fully.',
            voice: 'Cold, pragmatic, volatile under stress.'
        },
        {
            id: 'specialist_mira',
            name: 'Tech Mira',
            realName: 'Mira Chen',
            gender: 'F',
            age: 29,
            portraitId: 'F_5',  // Young woman with colorful hair
            status: 'HEALTHY',
            stress: 0,
            tags: ['SPECIALIST'],
            background: 'Communications and data specialist. Youngest crew member. Sees patterns others miss.',
            voice: 'Quick, nervous, occasionally eerily insightful.'
        }
    ];

    /**
     * Generate the canonical crew roster.
     * Returns cloned objects to prevent mutation.
     */
    static generateCrew() {
        return this.CANONICAL_CREW.map(member => ({
            ...member,
            id: member.id + '_' + Date.now(), // Unique instance ID
            stress: 0,
            status: 'HEALTHY',
            healCounter: 0,
            breakdownFired: false,
            trait: null
        }));
    }

    /**
     * Get a crew member template by role tag.
     */
    static getByTag(tag) {
        return this.CANONICAL_CREW.find(c => c.tags.includes(tag));
    }

    /**
     * Get portrait path for a crew member.
     */
    static getPortraitPath(member) {
        if (member.portraitId) {
            return `assets/crew/${member.portraitId}.png`;
        }
        // Fallback based on gender
        return `assets/crew/${member.gender}_1.png`;
    }
}

// Make available globally (non-module environment)
if (typeof window !== 'undefined') {
    window.CrewGenerator = CrewGenerator;
}
