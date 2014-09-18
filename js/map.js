function onError(error){
	console.log("onError()");
	alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function generateMap(position){
	console.log("generateMap()");
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);
	var currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.logitude);
	
	var mapOptions = {
		center: currentLatLng,
		zoom: 8
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
	var marker = new google.maps.Marker({
		position: currentLatLng,
		map: map,
		title: 'Current Location'
		
	});
}

/*var position ={
	coords:{latitude:-34.397, longitude:150.644}
}
console.log(position.coords.latitude);

google.maps.event.addDomListener(window, 'load',generateMap(position));
*/