import L from 'leaflet'
var houseIcon = require('../assets/img/house.svg')
var buildingIcon = require('../assets/img/buildings.svg')

export default class Point {
    constructor (lat, lgt, name = '', type = '') {
        let id = '' + lat + lgt
        this.id = id
        this.lat = lat
        this.lgt = lgt
        this.type = type
        this.name = name
        let marker = L.marker([this.lat, this.lgt])
        this.marker = marker
        this.marker.id = id
        this.setIcon()
        let popup = L.popup().setContent(this.setPopupContent())
        this.marker.bindPopup(popup)
        if (this.name !== '') {
            this.marker.bindTooltip(this.name).openTooltip()
        }
    }
    setName (name) {
        this.name = name
        if (this.name === '') {
            this.marker.unbindTooltip()
        } else {
            this.marker.bindTooltip(name).openTooltip()
        }
        this.marker.setPopupContent(this.setPopupContent())
    }
    setType (type) {
        this.type = type
        this.setIcon()
    }
    setPopupContent () {
        return `
                <form class="point-edit">
                <label>House
                    <input type="radio" name="type" value="house" ` + (this.type !== 'group' ? 'checked' : '') + ` />
                </label>
                <br>
                <label>Group
                    <input type="radio" name="type" value="group"` + (this.type === 'group' ? 'checked' : '') + ` />
                </label>
                <br>
                <label>House Name</label>
                <input type="text" name="name" value="` + this.name + `" />
                <button type="submit"> Save </button>
                </form>
                <br>
                <form class="point-remove">
                <button type="submit"> Delete </button>
                </form>
                `
    }
    setIcon () {
        let icon = false
        if (this.type === 'house') {
            icon = L.icon({
                iconUrl: houseIcon,
                iconSize: [30, 30],
                iconAnchor: [15, 15],
                popupAnchor: [0, -15]
            })
        } else if (this.type === 'group') {
            icon = L.icon({
                iconUrl: buildingIcon,
                iconSize: [30, 30],
                iconAnchor: [15, 15],
                popupAnchor: [0, -15]
            })
        }
        if (this.type) {
            this.marker.setIcon(icon)
        }
    }
}
