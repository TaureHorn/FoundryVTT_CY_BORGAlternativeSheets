import { getCharSheet } from "./src/character-sheet.js"
import { getItemSheet } from "./src/item-sheet.js"
import { getNpcSheet } from "./src/npc-sheet.js"
import { getVehicleSheet } from "./src/vehicle-sheet.js"
import { getCyborgSheets } from "./src/_functions.js"

console.log('cy-borg-alternative-sheets >>> init')

Hooks.on('ready', async () => {

    await loadTemplates([
        'modules/cy-borg-alternative-sheets/templates/actors/equipment.html',
        'modules/cy-borg-alternative-sheets/templates/actors/combat.html',
    ])

    // cannot define new sheet classes until ready hook because base sheets not registered yet 
    // so define classes through functions called at the right time
    const baseSheets = getCyborgSheets()
    const sheets = {
        char: getCharSheet(baseSheets.CYCharacterSheet),
        item: getItemSheet(baseSheets.CYItemSheet),
        npc: getNpcSheet(baseSheets.CYNpcSheet),
        vehicle: getVehicleSheet(baseSheets.CYVehicleSheet)
    }

    Actors.registerSheet('cy-borg', sheets.char, {
        types: ['character'],
        makeDefault: false,
        label: 'Alt CY_BORG Character Sheet'
    })

    Actors.registerSheet('cy-borg', sheets.npc, {
        types: ['npc'],
        makeDefault: false,
        label: 'Alt CY_BORG NPC Sheet'
    })

    Items.registerSheet('cy-borg', sheets.item, {
        makeDefault: false,
        label: 'Alt CY_BORG Item Sheet'
    })

    Actors.registerSheet('cy-borg', sheets.vehicle, {
        types: ['vehicle'],
        makeDefault: false,
        label: 'Alt CY_BORG Vehicle Sheet'
    })
})

