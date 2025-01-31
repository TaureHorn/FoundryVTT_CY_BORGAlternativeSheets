import { zoomSheetPortrait } from "./_functions.js"

export function getCharSheet(parent) {

    class AltCYCharacterSheet extends parent {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                template: "modules/cy-borg-alternative-sheets/templates/actors/character-sheet.html"
            })
        }

        activateListeners(html) {
            super.activateListeners(html)

            //right click on portrait to zoom
            html.on('contextmenu', '[data-zoom]', () => {
                zoomSheetPortrait(this.object)
            })
        }

    }

    return AltCYCharacterSheet

}
