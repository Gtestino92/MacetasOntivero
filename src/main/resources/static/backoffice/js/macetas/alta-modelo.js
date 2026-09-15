function getHtmlCombo(list){
	var i;
	var result = '';
	for(i=0;i<list.length;i++){
		result += '<option value="' + list[i].code + '">' + list[i].value + '</option>'; 
	}
	return result;
}

$('#reset-img-upload').click(function(){
	$('input[name="cantImagenes"]').val(0);
	$('input[name*="linkImagen"]').remove();
	global.cantImag = 0;
	$('.status').hide();
	$('.dropzone').removeClass('error-highlight');
});

$('#altaBtn').click(function(){
	var form = $('#form-alta-modelo');
	if(!validateFormAlta(form)) 
		return;
	else 
		form.submit();
});

function validateFormAlta(form){
	var formArray = form.serializeArray();
    var isValid = true;
    
    $.each(formArray, function(index, field){
        if(field.value==null || field.value=="" || field.value<=0) {
            $('#' + field.name).addClass('error-highlight');
            isValid = false;
        } else
        	 $('#' + field.name).removeClass('error-highlight');
    });
    
    var formatoSelected = $('#formato').val();
    if(formatoSelected==null || formatoSelected==""){
    	$('#formato').addClass('error-highlight');
        isValid = false;
    } else 
    	$('#formato').removeClass('error-highlight');
    
    var cantImg = $('input[name="cantImagenes"]').val();
    if(cantImg==null || cantImg=="" || cantImg==0){
    	$('.dropzone').addClass('error-highlight');
        isValid = false;
    } else 
    	$('.dropzone').removeClass('error-highlight');    
    
    var listados = global.data.listadoMacetas;
    var codigo = $('#codigo').val().toLowerCase();
    var codigoNew = $('#codigoNew').val();
    var codNewNumVec = codigoNew.match(/\d+/g);
    var codNewLetrVec =  codigoNew.match(/[a-zA-Z]+/g);
    
    for(var i=0; i<listados.length; i++){
    	var modelo = listados[i];
    	if(codigo == modelo.codigo.toLowerCase()){
    		$('#codigo').addClass('error-highlight');
    		isValid = false;
    	}

    	var isValidCodNew = validateCodNew(modelo,codNewNumVec,codNewLetrVec);
    	if(!isValidCodNew){
    		isValid = false;
    		break;
    	}
    }
    
    return isValid;
}

function validateCodNew(modelo,codNewNumVec,codNewLetrVec){
	var codNewModeloNumVec = modelo.codigoNew.match(/\d+/g);
    var codNewModeloLetrVec =  modelo.codigoNew.match(/[a-zA-Z]+/g);
    var isValidCodNew = true;
    
    if( ((codNewModeloNumVec == null ) && (codNewNumVec != null)) || ((codNewModeloNumVec != null ) && (codNewNumVec == null)))
    	return true;
    if( ((codNewModeloLetrVec == null ) && (codNewLetrVec != null)) || ((codNewModeloLetrVec != null ) && (codNewLetrVec == null)))
    	return true;
    
    var checkNum = true;
    var checkLetr = true;
    
    if((codNewModeloNumVec == null ) && (codNewNumVec == null))
    	checkNum = false;
    if((codNewModeloLetrVec == null ) && (codNewLetrVec == null))
    	checkLetr = false;
    	
    if(checkNum) {
    	if((codNewModeloNumVec.length != codNewNumVec.length) )
    		return true;
    	var isCodNewNumInvalid = true;
    	// Si todos resultan iguales en Number(), es invalido
    	for(var i=0;i<codNewNumVec.length;i++){
    		if(Number(codNewNumVec[i]) != Number(codNewModeloNumVec[i]))
    			isCodNewNumInvalid = false;
    	}
    	
    }
    
    if(checkLetr){
    	if((codNewModeloLetrVec.length != codNewLetrVec.length))
        	return;
    	var isCodNewLetrInvalid = true;
    	// Si todos resultan iguales en Number(), es invalido
    	for(var i=0;i<codNewLetrVec.length;i++){
    		if(codNewLetrVec[i].toLowerCase() != codNewModeloLetrVec[i].toLowerCase())
    			isCodNewNumInvalid = false;
    	}
    }
    
    if(checkNum && !checkLetr && isCodNewNumInvalid) {
    	$('#codigoNew').addClass('error-highlight');
		isValidCodNew = false;
    }
    if(checkLetr && !checkNum && isCodNewLetrInvalid) {
    	$('#codigoNew').addClass('error-highlight');
		isValidCodNew = false;
    }
    
	if(checkNum && checkLetr && isCodNewNumInvalid && isCodNewLetrInvalid){
		$('#codigoNew').addClass('error-highlight');
		isValidCodNew = false;
	}
		
	return isValidCodNew;
}


$(document).ready(function(){
    $('.num-input').on('change', function() {
        var cant = $(this).val();
        if(cant<0){
            $(this).val(0);
        }
    });
});