$("document").ready(function () {
	modifyUI();
	setIP();
});

function setIP() {
	$("#playBtn").attr("disabled", "");
	$.ajax({
		type: "POST",
		url: "http://m.agar.io/",
		data: $("#region").val() + $("#gamemode").val(),
		success: function(data)
		{
			//console.log("Connecting to ws://" + data);
			$("#enterip").val(data);
			$('#playBtn').removeAttr('disabled');
		},
		error: function(data)
		{
			console.log("Cannot connect to ws://" + data)
		}
	});
}

function modifyUI() {
	
	$("#playBtn").attr("disabled", "");
	$("#region").attr("onchange", "(" + setIP + ")()");
	$("#gamemode").attr("onchange", "(" + setIP + ")()");
	
	var inputIP = $("<input id='enterip' class='form-control' placeholder='IP'/>");
	inputIP.attr("onchange", "connect('ws://' + $('#enterip').val());");
	$("#nick").parent().append("<br>");
	$("#nick").parent().append(inputIP);
	
	//$("#playBtn").attr("onclick", "connect('ws://' + $('#enterip').val());");
}