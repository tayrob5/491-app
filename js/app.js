
 
/*$(document).on("pageshow", "index.html", function(e, ui) {
  $.mobile.loading("show");
 
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
				s += "<h3>Note " + results[i].createdAt + "</h3>";
				s += results[i].get("text");
				var pic = results[i].get("picture");
				if(pic) {
					s += "<br/><img src='" + pic.url() + "'>";
				}
				s += "</p>";
			}
			$("#result").html(s)
		},error:function(e) {
			
 
		}
	});
});*/

var imagedata = "";
var parseAPPID = "sqjjNOSioMoqfwC5aEw4OAoJsPCF1hbWeBLSKB59";
var parseJSID = "EQZJbB4ZeutL6IeyJP5NN2ZHXCgp0ml920CDilX9";
var NoteOb;
//$(document).on("pageshow", "upload.html", function(e, ui) {
 document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	console.log("onDeviceReady()");
	
	

 
		//Initialize Parse
		Parse.initialize(parseAPPID,parseJSID);
		
		NoteOb = Parse.Object.extend("photos");
}
	
 
	function pushPhoto(){
		
		
		 
		//var NoteOb = Parse.Object.extend("photos");
		 
		var caption = $("#caption").val();
 
		/*
		A bit complex - we have to handle an optional pic save
		*/
		if(imagedata != "") {
			var parseFile = new Parse.File("mypic.jpg", {base64:imagedata});
			console.log("This is the parseFile: " + parseFile);
				parseFile.save().then(function() {
					console.log("after save");
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
    navigator.camera.getPicture(gotPic,failHandler,{destinationType:0, quality:10 });
}   

function choosePhoto(){
        //alert("capture button working");
    navigator.camera.getPicture(gotPic,failHandler,{sourceType:0, destinationType:0, quality:10});
}  
 
	
	function gotPic(data) {
		console.log('got here');
		imagedata = data;
		pushPhoto();
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