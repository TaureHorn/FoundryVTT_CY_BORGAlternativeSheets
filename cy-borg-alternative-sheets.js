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

    await loadTemplates(['modules/cy-borg-alternative-sheets/templates/equipment.html'])

    function zoomSheetPortrait(obj) {
        const zoom = new ImagePopout(obj.img, {
            title: obj.name,
            uuid: obj.uuid
        })
        zoom.render(true)
    }

    class AltCYNpcSheet extends cyborgSheets.CYNpcSheet {
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
                template: "modules/cy-borg-alternative-sheets/templates/npc-sheet.html",
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

    class AltCYCharacterSheet extends cyborgSheets.CYCharacterSheet {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                template: "modules/cy-borg-alternative-sheets/templates/character-sheet.html"
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

    class AltCYVehicleSheet extends cyborgSheets.CYVehicleSheet {
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                classes: ['CYAltSheet', 'CYAltVehicleSheet'],
                height: 500,
                resizable: false,
                template: "modules/cy-borg-alternative-sheets/templates/vehicle-sheet.html",
                tabs: [
                    {
                        navSelector: ".altSheetTabs",
                        contentSelector: ".altSheetBody",
                        // initial: "info"
                        initial: "inventory"
                    }
                ],
                width: 750
            })
        }

        activateListeners(html) {
            super.activateListeners(html)

            //right click on portrait to zoom
            html.on('contextmenu', '[data-zoom]', () => { zoomSheetPortrait(this.object) })
        }

    }

    class AltCYItemSheet extends cyborgSheets.CYItemSheet {

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

        setOpts() {
            // add item type to class list
            const itemClass = `CYAltItem-${this.item.type}`
            if (!this.options.classes.includes(itemClass)) {
                this.options.classes.push(itemClass)
            }

            // set window size for certain item types
            switch (this.item.type) {
                case 'class':
                    this.position.height = 765
                    this.position.width = 765
                    break;
                case 'weapon':
                    this.position.height = 540
                    this.position.width = 540
                    break;
                default:
                    this.position.height = this.options.height
                    this.position.width = this.options.width
            }

        }

        activateListeners(html) {
            super.activateListeners(html)

            // right click on character portrait
            html.on('contextmenu', '[data-zoom]', () => {
                zoomSheetPortrait(this.object)
            })
        }


        render(...args) {
            this.setOpts()
            return super.render(...args)
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
        label: 'Alt CY_BORG Item Sheet'
    })
})

