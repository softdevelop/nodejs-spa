$(document).ready(function() {
    // $('#mapModal').on('show.bs.modal', function(event) {
    //     mymap.remove();
    // })

    $('#mapModal').on('shown.bs.modal', function(event) {

        //setView
        var button = $(event.relatedTarget) // Button that triggered the modal
        var title = button.data('title') // Extract info from data-* attributes
        var modal = $(this)
        modal.find('.modal-title').text(title)
        var lng = button.data('lng')
        var lat = button.data('lat')
        mymap = mapHandle(lat, lng);
        // mymap.setView(new L.LatLng(lat, lng), 13);
        //add marker
        L.marker([lat, lng]).addTo(mymap)
    })


    function mapHandle(lat, lng) {
        $('.modal-body').html("<div class='search-section-map'><div id='mapid' style='width: 100%; height: 100%;min-height: 400px; z-index: 1;'></div></div>");
        var mymap = L.map('mapid').setView([lat, lng], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mymap);
        return mymap;
    }


})