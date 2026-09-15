function makeListPedidosNotifications(listaNotifs){
	var i;
	if(listaNotifs==0) {
    	$('#noResultsNotifications').slideDown();
		return;
	}
    
	html = "";
	for(i=0;i<listaNotifs.length;i++){
		var notif = listaNotifs[i];
		html += '<div class="tabla-pedido tabla-new" style="display:none;"><div class="tabla-info-div"><table class="tabla-info table-striped">'
				+ '<tr class="tabla-title row-show">'
				+ '		<th colspan="' + ((!notif.isVista) ? 7 : 6 ) + '" class="tabla-title-text">Info</th> '
				+ '	</tr>'
				+ '	<tr>'
				+ '		<th class="text-center"> Nombre </th>'
				+ '		<th class="text-center"> Mail </th>'
				+ '		<th class="text-center"> Telefono </th>'
				+ '		<th class="text-center"> Fecha Solicitud</th>' 
				+ ((!notif.isVista) ? '<th class="text-center" colspan="1" style="width:15%;"> </th>' : '') 
				+ '	</tr>' + getHtmlInfoRow(notif) + '</table><br><br></div><div class="tabla-listado-div">'	
				+ '<table class="tabla-listado table-striped">	<tr class="tabla-title row-show">'
				+ '<th colspan="2" class="tabla-title-text">Lista macetas</th> </tr><tr>'
				+	'<th class="text-center"> Modelo </th><th class="text-center"> Cantidad </th>'
				+	'</tr>' + getHtmlListadoRows(notif.pedido.listadoMacetas) + '<tr> <td style="background-color: darkseagreen;"></td> <td class="text-center">'
				+ '<label>Total: $' + notif.pedido.total + '</label></td></tr></table>'
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

function getHtmlInfoRow(notif){
	var row = '<tr>	<td> ' + notif.pedido.nombre + '</td>	<td>' + notif.pedido.mail + '</td> <td>';
	row +=  notif.pedido.celular + '</td><td class="sol">' + notif.pedido.fechaSolicitud + '</td> ';
	
	if(!notif.isVista) {
		row += '<td><a class="btn btn-primary mark-read-btn" ';
		row += ' data-pedido="' + notif.pedido.idPedido + '" title="Marcar como leído"><i class="fa fa-check fa-lg"></i></a></td>';
	}
	row += '</tr>';
	return row;
}


$(document).ready(function(){
	$('a.mark-read-btn').click(function(){
		var idPedido = Number($(this).data('pedido'));
		
		var loadingModal = document.querySelector('.loading-modal');

	    if (!loadingModal) {
	        loading();
	    }
	    
	    document.body.classList.add('loading');

		$.ajax({
			  type: "POST",
			  url:  global.context + '/backoffice/markLeida',
			  data: { "idPedido" : idPedido },
			  success: goBackNotifications,
			  error: function(e) {
		            handlePedidoNotFound(e);
		        }
			});
	});
});

function handlePedidoNotFound(e){
	$('#callback-error-btn').trigger('click');
}


function goBackNotifications(idPedido){
	var cantNotif = Number($('.notification .badge').html());
	if(cantNotif > 1)
		$('.notification .badge').html(cantNotif-1);
	else
		$('.notification .badge').hide();
	$('a[data-pedido="' + idPedido + '"]').remove();
	document.body.classList.remove('loading');
}


function loading() {
    var div, table, img;

    div = createEls('div', {className: 'loading-modal'});
    table = createEls('table', {className: 'loading-table'});
    img = createEls('img', {className: 'loading-image', src: 'css/loading-spin.svg'});

    div.appendChild(table);
    table.appendChild(img);
    document.body.appendChild(div);
}

function createEls(name, props, text) {
    var el = document.createElement(name), p;
    for (p in props) {
        if (props.hasOwnProperty(p)) {
            el[p] = props[p];
        }
    }
    if (text) {
        el.appendChild(document.createTextNode(text));
    }
    return el;
}