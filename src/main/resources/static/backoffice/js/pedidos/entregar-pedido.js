$(document).ready(function(){
	$('a.btn-entregar').click(function(){
		var idPedido = $(this).attr('data-id-entregar');
		$('#modal-entregar').find('input[name="idPedido"]').val(idPedido);
	});
});

$(document).ready(function(){
	$('button.btn-confirmar-entregar').click(function(){
		var idPedido = Number($(this).parent().find('input[name=idPedido]').val());
		
		$.ajax({
			  type: "POST",
			  url: global.context + "/backoffice/updatePedidoEntregado",
			  data: { "idPedido" : idPedido },
			  success: goPedidosPendientes,
			  error: function(e) {
		            handlePedidoNotFound(e);
		        }
			});
		
	});
});

function handlePedidoNotFound(e){
	$('#modal-entregar').find('.close').trigger('click');
	$('#callback-error-btn').trigger('click');
}

function goPedidosPendientes(){

	$('#modal-entregar').find('.close').trigger('click');
	$('#callback-btn').trigger('click');
	$(document).ready(function(){
		setTimeout(function(){
			location.reload(true);	
		},3000);
	});
}
