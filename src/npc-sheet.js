import { zoomSheetPortrait } from "./_functions.js"

export function getNpcSheet(parent) {

    class AltCYNpcSheet extends parent {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                classes: ['CYAltSheet', 'CYAltNpcSheet'],
                height: 400,
                resizable: false,
                tabs: [
                    {
                        navSelector: ".altSheetTabs",
                        contentSelector: ".altSheetBody",
                        initial: "data",
                    },
                ],
                template: "modules/cy-borg-alternative-sheets/templates/actors/npc-sheet.html",
                width: 600
            })
        }

        activateListeners(html) {
            super.activateListeners(html)

            // right click on character portrait
            html.on('contextmenu', '[data-zoom]', () => {
                zoomSheetPortrait(this.object)
            })
        }

    }

    return AltCYNpcSheet

}
