$(document).ready(function(){
	$('a.btn-delete').click(function(){
		var idPedido = $(this).attr('data-id-delete');
		$('#modal-cancelar').find('input[name="idPedido"]').val(idPedido);
	});
});
