import { zoomSheetPortrait } from "./_functions.js"

export function getItemSheet(parent) {

    class AltCYItemSheet extends parent {

        static get defaultOptions() {
            const parentOpts = super.defaultOptions
            return foundry.utils.mergeObject(parentOpts, {
                classes: ['CYAltSheet CYAltItemSheet'],
                height: 400,
                resizable: false,
                width: 400
            })
        }

        get template() {
            return `modules/cy-borg-alternative-sheets/templates/items/${this.item.type}-sheet.html`
        }

        getData() {
            // add item type to class list
            const itemClass = `CYAltItem-${this.item.type}`
            if (!this.options.classes.includes(itemClass)) {
                this.options.classes.push(itemClass)
            }

            // set window size for certain item types
            switch (this.item.type) {
                case 'class':
                    this.position.height = 745
                    this.position.width = 745
                    break;
                case 'weapon':
                    this.position.height = 540
                    this.position.width = 540
                    break;
                default:
                    this.position.height = this.options.height
                    this.position.width = this.options.width
            }

            return super.getData()

        }

        activateListeners(html) {
            super.activateListeners(html)

            // right click on character portrait
            html.on('contextmenu', '[data-zoom]', () => {
                zoomSheetPortrait(this.object)
            })
        }

    }

    return AltCYItemSheet

}
