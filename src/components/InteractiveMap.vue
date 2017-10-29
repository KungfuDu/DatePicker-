<style>

    #map {
        height: 600px;
        width: 600px;
    }


</style>

<template>
    <div id="interactivemap" @submit="submitForm($event)" >
        <div id="map">
        </div>
        <div id="form">
            <div>

            </div>
        </div>
    </div>
</template>

<script>
import L from 'leaflet'
import Point from './../modules/point'
import $ from 'jquery'

export default {
    props: {
        planurl: { type: String }
    },
    data () {
        return {
            map: false,
            current_point: false,
            form: {
                name: ''
            },
            points: []
        }
    },
    mounted () {
        let imageUrl = this.planurl
        let map = false
        let imageBounds = [[500.712216, -500.22655], [-40.773941, 500]]
        map = L.map('map', {
            center: [55, -20],
            zoom: 2
        })

        L.imageOverlay(imageUrl, imageBounds).addTo(map)
        map.on('click', (e) => { this.clickEvent(e) })
        this.map = map
        this.loadPoints()
    },
    computed: {
    },
    methods: {
        clickEvent (e) {
            let coords = e.latlng
            this.addNewPoint(coords.lat, coords.lng, '', '', true)
        },
        saveName (name) {
            this.current_point.setName(name)
        },
        saveType (type) {
            this.current_point.setType(type)
        },
        submitForm (e) {
            e.preventDefault()
            let $form = $(e.target)
            if ($form.hasClass('point-edit')) {
                let name = $form.find("input[name='name']").val()
                let type = $form.find("input[name='type']:checked").val()
                console.log(type)
                this.saveType(type)
                this.saveName(name)
                this.current_point.marker.closePopup()
            } else if ($form.hasClass('point-remove')) {
                this.removeMarker()
            }
        },
        selectMarker (e) {
            this.current_point = this.points[e.target.id]
        },
        removeMarker () {
            delete this.points[this.current_point.id]
            this.current_point.marker.remove()
        },
        addNewPoint (lat, lng, name, type, showpopup = false) {
            let point = new Point(lat, lng, name, type)
            point.marker.addTo(this.map).on('click', this.selectMarker)
            if (showpopup) {
                 point.marker.togglePopup()
            }
            this.points[point.id] = point
            this.current_point = point
        },
        loadPoints () {
            let data = [
                {
                    name: 'test',
                    lat: 22,
                    lgt: -5,
                    type: 'house'
                }
            ]
            for (let i = 0, len = data.length; i < len; i++) {
                this.addNewPoint(data[i].lat, data[i].lgt, data[i].name, data[i].type)
            }
        }
    }
}

</script>
