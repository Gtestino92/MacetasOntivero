$(document).ready(function(){
	$('a.btn-delete').click(function(){
		var codigoNew = $(this).attr('cod-new-delete');
		var codigo = $(this).attr('cod-delete')
		$('#modal-eliminar').find('input[name="codigoNew"]').val(codigoNew);
		$('#modal-eliminar').find('.modal-title').html("Eliminar modelo " + codigo);
	});
});
