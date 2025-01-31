import { changeArmorTier, zoomSheetPortrait } from "./_functions.js"

export function getVehicleSheet(parent) {

    class AltCYVehicleSheet extends parent {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                classes: ['CYAltSheet', 'CYAltVehicleSheet'],
                height: 500,
                resizable: false,
                template: "modules/cy-borg-alternative-sheets/templates/actors/vehicle-sheet.html",
                tabs: [
                    {
                        navSelector: ".altSheetTabs",
                        contentSelector: ".altSheetBody",
                        initial: "info"
                    }
                ],
                width: 750
            })
        }

        activateListeners(html) {
            super.activateListeners(html)

            //right click on portrait to zoom
            html.on('contextmenu', '[data-zoom]', () => { zoomSheetPortrait(this.object) })
            html.find('.altTier').on('click', (event) => changeArmorTier(event, this.actor))
        }

    }

    return AltCYVehicleSheet

}
