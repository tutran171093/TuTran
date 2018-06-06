lefPos = 0;
topPos = 0;
$(document).keydown(function(e){
e.preventDefault();
if (e.keyCode == 37){ //left
	if(lefPos - $(document).width() * 0.1 >= 0) {
		lefPos -= $(document).width() * 0.1;
		setNewCoordinate(lefPos, "left");
	}
}
else if (e.keyCode == 38){ //up
	if(topPos - $("#box-wrap").height() * 0.1 >= 0) {
		topPos -= $("#box-wrap").height() * 0.1;
		setNewCoordinate(topPos, "up");
	}
}
else if (e.keyCode == 39) { //right
	if(lefPos + maxWidth * 0.1 < maxWidth) {
		lefPos += maxWidth * 0.1;
		setNewCoordinate(lefPos, "left");
	}
}
else if (e.keyCode == 40) { //down
	if(topPos + $("#box-wrap").height() * 0.1 < $("#box-wrap").height()) {
		topPos += $("#box-wrap").height() * 0.1;
		setNewCoordinate(topPos, "down");
	}
}
});

$(document).ready(function (e) {
	$(document).resize();
});

$(window).resize(function(e) {
	maxWidth = $("#box-wrap").width();
	lefPos = 0;
	topPos = 0;
	setNewCoordinate(topPos, "left");
	setNewCoordinate(topPos, "top");
});

function setNewCoordinate(coordinate, direction) {
	if(direction == "right" || direction == "left")
		$("#box").css({ left: coordinate + "px"});
	else
		$("#box").css({ top: coordinate + "px"});
}