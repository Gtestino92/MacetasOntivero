
var updateCantNotifications = function(cant) {
	if(cant > 0) {
		$('.notification .badge').html(cant);
		$('.notification .badge').show();
	} 		
}

function executeAjaxWithoutTimeout(action, dataFunction, obj, dataContent) {

	if (dataContent == undefined)
		dataContent = {};

	$.ajax({
		url : action,
		type : 'post',
		dataType : 'json',
		data : dataContent,
		timeout : 900000,
		success : function(result) {
			window[dataFunction].call(obj, result);
		}
	});
}