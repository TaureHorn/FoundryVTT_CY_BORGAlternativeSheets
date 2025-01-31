
export function getCyborgSheets() {
    const sheets = {}
    const actorSheetNames = ['CYCharacterSheet', 'CYNpcSheet', 'CYVehicleSheet']
    const itemSheetName = 'CYItemSheet'

    actorSheetNames.forEach(name => {
        sheets[name] = Actors.registeredSheets.find(sheet => sheet.name === name)
    })
    sheets[itemSheetName] = Items.registeredSheets.find(sheet => sheet.name === itemSheetName)

    return sheets
}

export function zoomSheetPortrait(obj) {
    const zoom = new ImagePopout(obj.img, {
        title: obj.name,
        uuid: obj.uuid
    })
    zoom.render(true)
}

export async function changeArmorTier(event, actor) {
    let newTier = parseInt($(event.currentTarget)[0].text)
    const item = actor.items.get($(event.currentTarget).parents('.item').data('itemId'))
    if (newTier > item.system.tier.max) {
        ui.notifications.warn('That is above the maximum armor tier for this item')
        newTier = item.system.tier.max
    }
    await item.update({ ['system.tier.value']: newTier })
}

