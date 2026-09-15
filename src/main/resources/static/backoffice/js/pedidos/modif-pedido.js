
function loadDataModif(){
	var total = global.data.total;
	var idPedido = global.data.idPedido;
	$('#total').val(total);
	$('#idPedido').val(idPedido);
	var listado = global.data.listadoPedido;
	var i;
	for(i=0;i<listado.length;i++){
		// Simular "mecanismo" de agregado de macetas
		var modeloPedido = listado[i];
		// Cargo datos en inicial
		$('#codigoNew' + i).val(modeloPedido.codigoNew);
		$('#cantSolicitada' + i).val(modeloPedido.cantSolicitada);
		
		// Cuando llego al ultimo modelo, no triggereo el add
		if(i<listado.length-1){
			// triggereo
			$('a[data-numbtn = ' + i + ']').trigger('click');
		}
	}
}

function funcionAppendFila(){
	var numModelo = Number($(this)[0].dataset.numbtn) + 1;
	appendFila(numModelo);
	$(this).hide();
	$(this).parent().parent().find('.btn-rem').hide();
	var cantFilas = Number($('input[name="cantModelos"]').val());
	$('input[name="cantModelos"]').val(cantFilas + 1)
	$('.add-modelo').unbind('click');
	$('.add-modelo').click(funcionAppendFila);
	$('.btn-rem').unbind('click')
	$('.btn-rem').click(removeFila)
}

function removeFila(){
	var numFila = Number($(this).attr('btn-rem')) - 1;
	$('a[data-numBtn="' + numFila + '"]').show();
	$('i[btn-rem="' + numFila + '"]').show();
	$(this).parent().parent().remove();
	var cantFilas = Number($('input[name="cantModelos"]').val());
	$('input[name="cantModelos"]').val(cantFilas - 1)
}

function appendFila(numModelo){
	$('#table-pedido')
		.append(
				'<tr> '
						+ '<td> <a title="Agregar modelo" data-numBtn='
						+ numModelo
						+ ' class="btn btn-primary add-modelo"><i class="fa fa-plus fa-lg"></i></a> </td>'
						+ '<td> <select class="form-control" id="codigoNew' + numModelo +'" name="codigoNew'
						+ numModelo
						+ '"></select> </td>'
						+ '<td> <input class="form-control num-input" name="cantSolicitada'
						+ numModelo + '" id="cantSolicitada' + numModelo 
						+ '" type="number" style="width:70px;position:relative;left:30px;"> </td>'
						+ '<td> <i btn-rem='
						+ numModelo
						+ ' class="btn btn-rem fa fa-remove fa-lg" title="Eliminar"></i> </td>'
						+ '</tr>');
	$('select[name = "codigoNew' + numModelo + '"]').html(
		'<option	disabled selected>Seleccione un modelo</option>'
				+ getHtmlCombo(global.data.macetas));
	$('.num-input').on('change', function() {
        var cant = $(this).val();
        if(cant<0){
            $(this).val(0);
        }
    });
}

function getHtmlCombo(list){
	var i;
	var result = '';
	for(i=0;i<list.length;i++){
		result += '<option value="' + list[i].code + '">' + list[i].value + '</option>'; 
	}
	return result;
}


$('#modifPedidoBtn').click(function(){
	var form = $('#form-modif-pedido');
	if(!validateFormModifPedido(form)) 
		return;
	else 
		form.submit();
});

$('#calcularTotal').click(function(){
	var cantModelos = Number($('input[name="cantModelos"]').val());
	var i;
	var total = 0;
    for(i=0;i<cantModelos;i++){
    	var codSelected = $('#codigoNew' + i).val();
        var cantSolicitada = $('#cantSolicitada' + i).val();
        if(cantSolicitada!=null && cantSolicitada>0)
        	total += findPrecioByCodNew(codSelected) * cantSolicitada;
    }
    $('#total').val(total);
});

function findPrecioByCodNew(codNew){
	var macetas = global.data.macetas;
	for(var i=0; i<macetas.length; i++){
		if(macetas[i].code == codNew)
			return macetas[i].precio;
	}
}


$('.num-input').on('change', function() {
    var cant = $(this).val();
    if(cant<0){
        $(this).val(0);
    }
});

function validateFormModifPedido(form){
	var formArray = form.serializeArray();
    var isValid = true;
    
    $.each(formArray, function(index, field){
        if(field.value==null || field.value=="" || field.value<=0) {
            $('#' + field.name).addClass('error-highlight');
            isValid = false;
        } else
        	 $('#' + field.name).removeClass('error-highlight');
    });
    

    // Valido que no haya selects de modelos vacios
    var cantModelos = Number($('input[name="cantModelos"]').val());
    for(i=0;i<cantModelos;i++){
    	var codSelected = $('#codigoNew' + i).val();
        if(codSelected==null || codSelected==""){
        	$('#codigoNew' + i).addClass('error-highlight');
            isValid = false;
        } else 
        	$('#codigoNew' + i).removeClass('error-highlight');
    }
    
    // Valido que no se repitan los modelos elegidos
    var i, j;
    var isRepeated = false;
    for(i=0;i<cantModelos;i++){
    	for(j=i + 1; j<cantModelos;j++){
    		var codNewObj1 = $('#codigoNew' + i);
    		var codNewObj2 = $('#codigoNew' + j);
    		if ((codNewObj1.val() == codNewObj2.val() ) && (codNewObj1.val()!=null)){
    			isRepeated = true;
    			break;
    		} 
    	}
    }
    
    if(isRepeated) {
    	$('#msjRepeated').slideDown();
    	$('#msjRepeatedDiv').slideDown();
    } else {
    	$('#msjRepeated').slideUp();
    	$('#msjRepeatedDiv').slideUp();
    }
    if(isValid && isRepeated) isValid = false;
        
    return isValid;
}