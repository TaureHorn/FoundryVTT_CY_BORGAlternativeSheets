console.log('cy-borg-compact-sheets >>> init')

const cyborgSheets = {}

function getCyborgSheets() {
    const actorSheetNames = ['CYCharacterSheet', 'CYNpcSheet', 'CYVehicleSheet']
    const itemSheetName = 'CYItemSheet'

    actorSheetNames.forEach(name => {
        cyborgSheets[name] = Actors.registeredSheets.find(sheet => sheet.name === name)
    })
    cyborgSheets[itemSheetName] = Items.registeredSheets.find(sheet => sheet.name === itemSheetName)
}

Hooks.once('ready', async () => {
    getCyborgSheets()
    console.log('Hooks.once ready', cyborgSheets)

    class CompactCYNpcSheet extends cyborgSheets.CYNpcSheet {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                classes: ['CYCompactSheet'],
                height: 400,
                resizable: false,
                tabs: [
                    {
                        navSelector: ".compactSheetTabs",
                        contentSelector: ".compactSheetBody",
                        initial: "data",
                    },
                ],
                template: "modules/cy-borg-compact-sheets/templates/npc-sheet.html",
                width: 600
            })
        }
    }

    class CompactCYCharacterSheet extends cyborgSheets.CYCharacterSheet {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                template: "modules/cy-borg-compact-sheets/templates/character-sheet.html"
            })
        }
    }

    class CompactCYVehicleSheet extends cyborgSheets.CYVehicleSheet {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                template: "modules/cy-borg-compact-sheets/templates/vehicle-sheet.html"
            })
        }
    }

    class CompactCYItemSheet extends cyborgSheets.CYItemSheet {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                template: "modules/cy-borg-compact-sheets/templates/item-sheet.html"
            })
        }
    }

    Actors.registerSheet('cy-borg', CompactCYNpcSheet, {
        types: ['npc'],
        makeDefault: false,
        label: 'Compact CY_BORG NPC Sheet'
    })

    Actors.registerSheet('cy-borg', CompactCYCharacterSheet, {
        types: ['character'],
        makeDefault: false,
        label: 'Compact CY_BORG Character Sheet'
    })

    Actors.registerSheet('cy-borg', CompactCYVehicleSheet, {
        types: ['vehicle'],
        makeDefault: false,
        label: 'Compact CY_BORG Vehicle Sheet'
    })

    Items.registerSheet('cy-borg', CompactCYItemSheet, {
        makeDefault: false,
        label: 'Compact CY_BORG NPC Sheet'
    })
})

