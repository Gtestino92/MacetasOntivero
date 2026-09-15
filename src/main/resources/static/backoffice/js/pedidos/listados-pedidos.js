function makeListPedidos(listaPedidos, estado, isNotFilt){
	var i;
	if(!isNotFilt) {
		$('#col-listados').find('.tabla-pedido').remove();
		$('#morePedidosBtn').hide();
	}
	if(global.data.pedidos.length==0) {
    	$('#noResultsFilterFecha').slideDown();
    	$('#morePedidosBtn').hide();
		return;
	}
    else 
    	$('#noResultsFilterFecha').hide();
	
	html = "";
	for(i=0;i<listaPedidos.length;i++){
		var pedido = listaPedidos[i];
		html += '<div class="tabla-pedido tabla-new" style="display:none;"><div class="tabla-info-div"><table class="tabla-info table-striped">'
				+ '<tr class="tabla-title row-show">'
				+ '		<th colspan="' + ((estado!="CAN") ? 7 : 6 ) + '" class="tabla-title-text">Info</th> '
				+ '	</tr>'
				+ '	<tr>'
				+ '		<th class="text-center"> Nombre </th>'
				+ '		<th class="text-center"> Mail </th>'
				+ '		<th class="text-center"> Telefono </th>'
				+ '		<th class="text-center"> Fecha Solicitud</th>' 
				+ ((estado=="PEN") ? '<th class="text-center" colspan="3"> Acciones </th>' : ( (estado=="ENT") ? '<th class="text-center"> Fecha Entrega</th>' : "" ))
				+ '	</tr>' + getHtmlInfoRow(pedido, estado) + '</table><br><br></div><div class="tabla-listado-div">'	
				+ '<table class="tabla-listado table-striped">	<tr class="tabla-title row-show">'
				+ '<th colspan="2" class="tabla-title-text">Lista macetas</th> </tr><tr>'
				+	'<th class="text-center"> Modelo </th><th class="text-center"> Cantidad </th>'
				+	'</tr>' + getHtmlListadoRows(pedido.listadoMacetas) + '<tr> <td style="background-color: darkseagreen;"></td> <td class="text-center">'
				+ '<label>Total: $' + pedido.total + '</label></td></tr></table>'
				+ '</div> <br>'
				+ '<div class="modif-listado-btn-div" style="text-align:center;display:none;">'
				+ '<input class="btn btn-primary modifListadoBtn" type="button" value="Confirmar">'
				+ '</div><br><br><br></div>';
	}
	
	$('#col-listados').append(html);
	$('.tabla-new').slideDown();
	$('#col-listados').find('.tabla-new').removeClass('.tabla-new');

}

function getHtmlListadoRows(lista){
	var rows = '';
	for(var i=0;i<lista.length;i++){
		rows += '<tr><td>' + lista[i].codigo + '</td><td>' + lista[i].cantSolicitada + '</td></tr>';
	}
	return rows;
}

function getHtmlInfoRow(pedido, estado){
	var row = '<tr>	<td> ' + pedido.nombre + '</td>	<td>' + pedido.mail + '</td> <td>';
	row +=  pedido.celular + '</td><td class="sol">' + pedido.fechaSolicitud + '</td> ';
	if(estado == "ENT"){
		row +=  '<td class="ent">' + pedido.fechaEntrega + '</td><td>';
	}
	
	else if(estado == "PEN"){
		row += '<td><a class="btn btn-primary modif-pedido-btn" href=' + global.context + '/backoffice/goModifListadoPedido?idPedido=' 
			+ pedido.idPedido + '&total=' + pedido.total + '&estado=' + pedido.estadoPedido.code +
			' title="Modificar"><i class="fa fa-edit fa-lg"></i></a></td>';
		row += '<td><a class="btn btn-primary btn-entregar" title="Marcar como entregado" data-toggle="modal" '
			+ 'href="#modal-entregar" data-id-entregar=' + pedido.idPedido + '>'
			+ '<i class="fa fa-check fa-lg"></i></a></td>'; 
		row += '<td><a class="btn btn-primary btn-delete" data-toggle="modal" href="#modal-cancelar"'
			+ 'title="Cancelar Pedido" data-id-delete=' + pedido.idPedido + '><i class="fa fa-trash fa-lg"></i></a> </td>';
	} 
	row += '</tr>';
	return row;
}

$('#morePedidosBtn').click(function() {
	var dataReq = {};
    dataReq.estado = global.estado;
    dataReq.countFrom = global.data.pedidos.length;
    dataReq.isNotFilt = true;
    var loadingModal = document.querySelector('.loading-modal');

    if (!loadingModal) {
        loading();
    }
    
    document.body.classList.add('loading');
	
    $.ajax({
		  type: "POST",
		  url: global.context + "/backoffice/getPedidosFilt",
		  data: dataReq,
		  success: addPedidosToList
		});
    
})

function addPedidosToList(data) {
	if(data.pedidos.length>0)
		for(var i=0;i<data.pedidos.length;i++)
			global.data.pedidos.push(data.pedidos[i]);
	if(data.noMorePedidosLeft)
		$('#morePedidosBtn').hide();
	global.estado = data.estadoPedido.code;
	document.body.classList.remove('loading');
	console.log(data);
	makeListPedidos(data.pedidos, global.estado, true);
}