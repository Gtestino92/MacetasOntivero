$('#btn-aplicar-aumento').click(function(){
	var listado = global.data;
	var redondeo = Number($('#redondeo').val());
	var pctAumento = Number($('#pct-aumento').val());
	if(pctAumento==0) {
		cleanPrecios();
		return;
	}
	var factor = 1 + pctAumento/100;
	var i;
	for(i=0;i<listado.length;i++){
		var precioNuevo = roundPrecio(listado[i].precio,factor,redondeo);
		var codNew = listado[i].codigoNew;
		$('#precio-' + codNew).html('<input name="precio-nuevo-' + codNew + '" class="form-control num-input" type="number"'
				+ ' id="precio-nuevo-' + codNew + '" value=' + precioNuevo + ' style="width: 90px; position:relative;left:5%;">');
		var chkConfirm = $('#precio-confirm-' + codNew);
		chkConfirm.html('<input class="pointer checkbox chk-precio" type="checkbox" name="precio-chk-' 
				+ codNew +'" id="precio-chk-' + codNew + '" value="N">');
		chkConfirm.find('input').click(switchChkPrecio);
	}
	$('#modifPreciosBtn').show();
	$('#allChkConfirm').show();
	if($('#allChkConfirm').val()=="N")
	    $('#allChkConfirm').trigger('click');
	
    $('.chk-precio').each(function() {
    	if($(this).val()=="N")
    	    $(this).trigger('click');
    });
	
})

function cleanPrecios() {
	var listado = global.data;
	for(i=0;i<listado.length;i++){
		var codNew = listado[i].codigoNew;
		$('#precio-' + codNew).html('');
		$('#precio-confirm-' + codNew).html('');
	}
	$('#modifPreciosBtn').hide();
	$('#allChkConfirm').hide();
	if($('#allChkConfirm').val()=="S")
		$('#allChkConfirm').trigger('click');
	$('#msjNotChecked').slideUp();
	$('#msjNotCheckedDiv').slideUp();
}

function roundPrecio(precio, factor, redondeo) {
	var mod = (precio * factor) % redondeo;
	if(mod>=5)
		return precio*factor + (redondeo - mod);
	else
		return precio*factor - mod;
}


$('#btn-clean-precios').click(cleanPrecios);

$('#allChkConfirm').click(function() {
	var value = $(this).val();
    if(value=="S") {
    	$(this).attr("value","N");
    	$('.chk-precio').each(function(){
    		$(this).trigger('click');
        });
    }
    else {
    	$(this).attr("value","S");
    	$('.chk-precio').each(function(){
        	$(this).trigger('click');
        });
    }
    
});

function switchChkPrecio() {
	var value = $(this).val();
    if(value=="S") 
    	$(this).attr("value","N");
    else 
    	$(this).attr("value","S");
}

$('#modifPreciosBtn').click(function(){
	var form = $('#form-modif-precios');
	if(!validateFormModifPrecios(form)) 
		return;
	else 
		form.submit();
});

function validateFormModifPrecios(form) {
	var formArray = form.serializeArray();
    var isValid = true;

    $.each(formArray, function(index, field){
        if(field.value==null || field.value=="" || field.value<=0) {
            $('#' + field.name).addClass('error-highlight');
            isValid = false;
        } else
        	 $('#' + field.name).removeClass('error-highlight');
    });    
        
    var isAnyChecked = false;
    
    $('.chk-precio').each(function(){
    	if($(this).val() == "S") {
    		isAnyChecked = true;
    		return;
    	}
    })
    
    if(!isAnyChecked) {
    	$('#msjNotChecked').slideDown();
		$('#msjNotCheckedDiv').slideDown();
	} else {
		$('#msjNotChecked').slideUp();
		$('#msjNotCheckedDiv').slideUp();
	}
    
    return isValid && isAnyChecked;	
}

function chkPrecioOptions() {
    var value = $(this).val();
    if(value=="S")
    	$(this).attr("value","N");
    else 
    	$(this).attr("value","S");
}

$('#btn-prev-precios').click(function(){
	var listado = global.data;
	for(i=0;i<listado.length;i++){
		
		var codNew = listado[i].codigoNew;
		var precioNuevo = listado[i].precioAnterior;
		$('#precio-' + codNew).html('<input name="precio-nuevo-' + codNew + '" class="form-control num-input" type="number"'
				+ ' id="precio-nuevo-' + codNew + '" value=' + precioNuevo + ' style="width: 90px; position:relative;left:15%;">');
		var chkConfirm = $('#precio-confirm-' + codNew);
		chkConfirm.html('<input class="pointer checkbox chk-precio" type="checkbox" name="precio-chk-' 
				+ codNew +'" id="precio-chk-' + codNew + '" value="N">');
		chkConfirm.find('input').click(switchChkPrecio);
	}
	$('#modifPreciosBtn').show();
	$('#allChkConfirm').show();
	if($('#allChkConfirm').val()=="N")
	    $('#allChkConfirm').trigger('click');
	
    $('.chk-precio').each(function() {
    	if($(this).val()=="N")
    	    $(this).trigger('click');
    });
});