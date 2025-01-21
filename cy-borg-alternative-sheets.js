console.log('cy-borg-alternative-sheets >>> init')

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

    class AltCYNpcSheet extends cyborgSheets.CYNpcSheet {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                classes: ['CYAltSheet'],
                height: 400,
                resizable: false,
                tabs: [
                    {
                        navSelector: ".altSheetTabs",
                        contentSelector: ".altSheetBody",
                        initial: "data",
                    },
                ],
                template: "modules/cy-borg-alternative-sheets/templates/npc-sheet.html",
                width: 600
            })
        }
    }

    class AltCYCharacterSheet extends cyborgSheets.CYCharacterSheet {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                template: "modules/cy-borg-alternative-sheets/templates/character-sheet.html"
            })
        }
    }

    class AltCYVehicleSheet extends cyborgSheets.CYVehicleSheet {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                template: "modules/cy-borg-alternative-sheets/templates/vehicle-sheet.html"
            })
        }
    }

    class AltCYItemSheet extends cyborgSheets.CYItemSheet {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                template: "modules/cy-borg-alternative-sheets/templates/item-sheet.html"
            })
        }
    }

    Actors.registerSheet('cy-borg', AltCYNpcSheet, {
        types: ['npc'],
        makeDefault: false,
        label: 'Alt CY_BORG NPC Sheet'
    })

    Actors.registerSheet('cy-borg', AltCYCharacterSheet, {
        types: ['character'],
        makeDefault: false,
        label: 'Alt CY_BORG Character Sheet'
    })

    Actors.registerSheet('cy-borg', AltCYVehicleSheet, {
        types: ['vehicle'],
        makeDefault: false,
        label: 'Alt CY_BORG Vehicle Sheet'
    })

    Items.registerSheet('cy-borg', AltCYItemSheet, {
        makeDefault: false,
        label: 'Alt CY_BORG NPC Sheet'
    })
})

