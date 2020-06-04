
google.maps.event.addDomListener(window, 'load', init);

function init() {
	var mapOptions = {
		zoom: 14,
		center: new google.maps.LatLng(-37.815207, 144.963937), // New York
		styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#232f3d"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#232f3d"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#232f3d"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#232f3d"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#232f3d"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#232f3d"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#232f3d"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#232f3d"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#232f3d"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#232f3d"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#232f3d"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#232f3d"},{"lightness":17}]}]
	};

	var mapElement = document.getElementById('map');

	var map = new google.maps.Map(mapElement, mapOptions);

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(-37.815207, 144.963937),
		map: map,
		icon: './images/map-marker.png',
		title: 'Themetrading !'
	});
}