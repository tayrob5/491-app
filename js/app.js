function capturePhoto(){

navigator.camera.getPicture(uploadPhoto, null, { sourceType:1,quality: 50});

}
function uploadPhoto(Data) {
    cameraPic.src = data;
	
	navigator.notification.alert(
	'Your photo has been uploaded',
	okay,
	'Photo uploaded',
	'OK'
	);
	
}

function okay(message) {
    
}
