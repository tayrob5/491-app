var lat;
var long;
var myLocation;
var page;

 
function displayContent(){
	
	
	var parseAPPID = "sqjjNOSioMoqfwC5aEw4OAoJsPCF1hbWeBLSKB59";
	var parseJSID = "EQZJbB4ZeutL6IeyJP5NN2ZHXCgp0ml920CDilX9";
 
	//Initialize Parse
	Parse.initialize(parseAPPID,parseJSID);
	 
	var NoteOb = Parse.Object.extend("photos");
	
	
	var query = new Parse.Query(NoteOb);
	
	query.withinMiles("geopoint", myLocation, 10);
	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate()-1);
	query.greaterThan("createdAt", yesterday);
	query.descending("createdAt");
	query.limit(10);
 
	query.find({
		success:function(results) {
			var s = "";
			for(var i=0; i<results.length; i++) {
				//Lame - should be using a template
				s += "<div class='row'>  ";
				var pic = results[i].get("picture");
				if(pic) {
					s += "<br/><img src='" + pic.url() + "' style='width: 100%;'>";
				}
				s += "</div> "
				
				s += "<p>"
				
				s += results[i].get("text");
				
				s += "</p>"
				
				
				
				
			}
			$("#content").html(s);
		},error:function(e) {
			
 
		}
	});
}

function updateContent(distance){
	
	
	var parseAPPID = "sqjjNOSioMoqfwC5aEw4OAoJsPCF1hbWeBLSKB59";
	var parseJSID = "EQZJbB4ZeutL6IeyJP5NN2ZHXCgp0ml920CDilX9";
 
	//Initialize Parse
	Parse.initialize(parseAPPID,parseJSID);
	 
	var NoteOb = Parse.Object.extend("photos");
	
	
	var query = new Parse.Query(NoteOb);
	
	console.log("updating content for " + distance);
	
	query.withinMiles("geopoint", myLocation, distance);
	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate()-1);
	query.greaterThan("createdAt", yesterday);
	query.descending("createdAt");
	query.limit(10);
 
	query.find({
		success:function(results) {
			var s = "";
			for(var i=0; i<results.length; i++) {
				//Lame - should be using a template
				s += "<div class='row'>  ";
				var pic = results[i].get("picture");
				if(pic) {
					s += "<br/><img src='" + pic.url() + "' style='width: 100%;'>";
				}
				
				s += "</div> "
				
				s += "<p>"
				
				s += results[i].get("text");
				
				s += "</p>"
				
				
				
				
			}
			$("#content").html(s);
		},error:function(e) {
			
 
		}
	});
}

/*function loadMore(){
	
	console.log(page);
	
	var displayLimit=10;

	
	var NoteOb = Parse.Object.extend("photos");
	
	
	var query = new Parse.Query(NoteOb);
	
	query.withinMiles("geopoint", myLocation, 10);
	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate()-1);
	query.greaterThan("createdAt", yesterday);
	query.descending("createdAt");
	query.limit(displayLimit);
	query.skip(page * displayLimit);
 
	query.find({
		success:function(results) {
			var s = "";
			for(var i=0; i<results.length; i++) {
				//Lame - should be using a template
				s += "<div class='row'>  ";
				var pic = results[i].get("picture");
				if(pic) {
					s += "<br/><img src='" + pic.url() + "' style='width: 100%;'>";
				}
				s += "</div> "
				
				s += "<p>"
				
				s += results[i].get("text");
				
				s += "</p>"
				
				
				
				
			}
			console.log(page);
			console.log(s);
			$("#content").append(s);
			page++;
		},error:function(e) {
			
 
		}
	});
	
	
	
}*/


function onDeviceReady() {
	console.log("onDeviceReady()");
	var imagedata = "";
	page=1;
	navigator.geolocation.getCurrentPosition(gotGeo, errorGeo,{enableHighAccuracy: true, maximumAge: 5000, timeout: 5000 });
	
	
}

function gotGeo(position){
	
	lat=position.coords.latitude;
	long=position.coords.longitude;
	
	console.log(lat);
	console.log(long);
	
	myLocation = new Parse.GeoPoint({latitude: lat, longitude: long});
	displayContent();
	
}

function errorGeo(error){
	   alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
	
	
	
}
	
 
	function submitBtn(){
		
		$('#spinner').show();
		
		var parseAPPID = "sqjjNOSioMoqfwC5aEw4OAoJsPCF1hbWeBLSKB59";
		var parseJSID = "EQZJbB4ZeutL6IeyJP5NN2ZHXCgp0ml920CDilX9";
	 
		//Initialize Parse
		Parse.initialize(parseAPPID,parseJSID);
				 
		var NoteOb = Parse.Object.extend("photos");    
		 
		var caption = $("#caption").val();
 
		/*
		Take care of saving the image
		*/
		if(imagedata != "") {
			var parseFile = new Parse.File("mypic.jpg", {base64:imagedata});
			var point = new Parse.GeoPoint(lat, long);
			console.log(parseFile);
				parseFile.save().then(function() {
					var note = new NoteOb();
					note.set("text",caption);
					note.set("picture",parseFile);
					note.set("geopoint", point);
					note.save(null, {
						success:function(ob) {
							$('#spinner').hide();
							window.location.href = "index.html";
						}, error:function(e) {
							console.log("Oh crap", e);
						}
					});
					cleanUp();
				}, function(error) {
					console.log("Error");
					console.log(error);
				});
 
		} else {
			var note = new NoteOb();
			note.set("text",caption);
			note.save(null, {
				success:function(ob) {
					$.mobile.changePage("index.html");
				}, error:function(e) {
					console.log("Oh crap", e);
				}
			});
			cleanUp();
 
		}
	}
	
	function capturePhoto(){
        //alert("capture button working");
    navigator.camera.getPicture(gotPic,failHandler,{quality:10, destinationType:0 });
}   

function choosePhoto(){
        //alert("capture button working");
    navigator.camera.getPicture(gotPic,failHandler,{sourceType:0, destinationType:0, quality:10});
}  
 
	
	function gotPic(data) {
		console.log('got here');
		imagedata = data;
		cameraPic.src = "data:image/jpeg;base64," + data;
		//$("#takePicBtn").text("Picture Taken!").button("refresh");
	}
	
	function failHandler(e) {
		alert("ErrorFromC");
		alert(e);
		console.log(e.toString());
	}
 
	function cleanUp() {
		imagedata = "";
		//$("#submitBtn").removeAttr("disabled").button("refresh");
		$("#caption").val("");
		//$("#takePicBtn").text("Add Pic").button("refresh");
	}
 
//});

 


function okay(message) {
    
}