
 
function loadContent(){
  
  var parseAPPID = "sqjjNOSioMoqfwC5aEw4OAoJsPCF1hbWeBLSKB59";
	var parseJSID = "EQZJbB4ZeutL6IeyJP5NN2ZHXCgp0ml920CDilX9";
 
//Initialize Parse
Parse.initialize(parseAPPID,parseJSID);
 
var NoteOb = Parse.Object.extend("photos");
 
	var query = new Parse.Query(NoteOb);
	query.limit(10);
	query.descending("createdAt");
 
	query.find({
		success:function(results) {
			$.mobile.loading("hide");
			var s = "";
			for(var i=0; i<results.length; i++) {
				//Lame - should be using a template
				s += "<p>";
				s += "<h3>Picture " + results[i].createdAt + "</h3>";
				s += results[i].get("text");
				var pic = results[i].get("picture");
				if(pic) {
					s += "<br/><img src='" + pic.url() + "'>";
				}
				s += "</p>";
			}
			$("index.html div[data-role=content]").html(s);
		},error:function(e) {
			$.mobile.loading("hide");
 
		}
	});
}

 
//$(document).on("pageshow", "upload.html", function(e, ui) {
 document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	console.log("onDeviceReady()");
	var imagedata = "";
}
	
 
	function submitBtn(){
		
		var parseAPPID = "sqjjNOSioMoqfwC5aEw4OAoJsPCF1hbWeBLSKB59";
		var parseJSID = "EQZJbB4ZeutL6IeyJP5NN2ZHXCgp0ml920CDilX9";
 
		//Initialize Parse
		Parse.initialize(parseAPPID,parseJSID);
		 
		var NoteOb = Parse.Object.extend("photos");
		 
		var caption = $("#caption").val();
 
		/*
		A bit complex - we have to handle an optional pic save
		*/
		if(imagedata != "") {
			var parseFile = new Parse.File("mypic.jpg", {base64:imagedata});
			console.log(parseFile);
				parseFile.save().then(function() {
					var note = new NoteOb();
					note.set("text",caption);
					note.set("picture",parseFile);
					note.save(null, {
						success:function(ob) {
							$.mobile.changePage("index.html");
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
    navigator.camera.getPicture(gotPic,failHandler,{quality:50, destinationType:0,  
	sourceType : Camera.PictureSourceType.CAMERA,
  	allowEdit : true,
  	encodingType: Camera.EncodingType.JPEG,
  	popoverOptions: CameraPopoverOptions,
  	saveToPhotoAlbum: true  });
}   

function choosePhoto(){
        //alert("capture button working");
    navigator.camera.getPicture(gotPic,failHandler,{sourceType:0, destinationType:0, quality:50});
}  
 
	
	function gotPic(data) {
		console.log('got here');
		imagedata = data;
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