var mymap = L.map('mapid').setView([16.0795694, 108.1606642], 13);
var lng, lat = '';

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var theMarker = {};
let spas = [{
        name: 'Spa name 1',
        latitude: '16.0871909',
        longitude: '108.1467124'
    },
    {
        name: 'Spa name 2',
        latitude: '16.0788201',
        longitude: '108.1309624'
    },
    {
        name: 'Spa name 3',
        latitude: '16.0494575',
        longitude: '108.1368848'
    },
    {
        name: 'Spa name 4',
        latitude: '16.0525919',
        longitude: '108.1591149'
    },
    {
        name: 'Spa name 5',
        latitude: '16.0650054',
        longitude: '108.1969662'
    },

];
spas.forEach(spa => {
    L.marker([spa.latitude, spa.longitude]).bindTooltip(spa.name, {
        permanent: true,
        direction: 'right'
    }).addTo(mymap).on('click', function(e) {
        location.replace(`/admin/spas/${spa._id}`)
    });;
})



$(document).ready(function() {
    $(window).on('resize', function() {
        if ($(window).width() > 480)
            $('.search-section-map').css('height', `${$(window).height() - 50}px`)
            // console.log($(window).height())
    });
    // if ($(window).width() > 480)
    //     $('.search-section-map').css('height', `${$(window).height() - 50}px`)
    $(".map.home-search").click(function() {
        var lng = Number($(this).attr("data-lng"))
        var lat = Number($(this).attr("data-lat"))
        mymap.setView(new L.LatLng(lat, lng), 13);
        //set default color
        spas.forEach(spa => {
            L.marker([spa.latitude, spa.longitude]).bindTooltip(spa.name, {
                permanent: true,
                direction: 'right'
            }).addTo(mymap).on('click', function(e) {
                location.replace(`/admin/spas/${spa._id}`)
            });;
        })
        var redIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        L.marker([lat, lng], { icon: redIcon }).addTo(mymap);
        return false;
    })

})