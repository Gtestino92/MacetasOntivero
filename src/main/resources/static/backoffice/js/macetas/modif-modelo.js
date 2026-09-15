
$('#reset-img-upload').click(function(){
	var i;
	$('input[name="cantLinksNew"]').val(0);
	$('#upload-img-new').find('input[name*="linkImagenNew"]').remove();
	global.cantLinksNew = 0;
	$('.status').hide();
	$('.dropzone').removeClass('error-highlight');
});

$('#modifBtn').click(function(){
	var form = $('#form-modif-modelo');
	if(!validateFormModif(form)) 
		return;
	else 
		form.submit();
});

function loadCamposModif(){
	var maceta = global.data;
	$("#codigo").html(maceta.codigo);
	$("#codigoNew").html(maceta.codigoNew);
	$("input[name='codigoNew']").val(maceta.codigoNew);
	$("#formato").html(maceta.formatoValue); 
	$("#largo").val(maceta.largo);
	$("#ancho").val(maceta.ancho);
	$("#alto").val(maceta.alto);
	$("#precio").val(maceta.precio);
	$("#capacidad").val(maceta.capacidad);
	$("#cantImgStatic").val(maceta.cantImgStatic);
	$("#cantLinksOld").val(global.cantLinksOld);
	
	if(global.cantLinksOld>0){
		for(var i=0; i<maceta.fotosLink.length; i++){
			$('#form-modif-modelo').append(
					'<input name="linkImagenOld' + i + '" value="'
							+ maceta.fotosLink[i] + '" type="hidden"/>');	
		}
	}
	var listaImgs = getListaImgs(maceta.fotosStatic, maceta.fotosLink, maceta.cantImgStatic);
    
    var output = "<div><table><td style='width:15%'><a class='btn btn-primary left-img-btn' style='display:none;'>" +
		"<i class='fa fa-arrow-left arrow-scroll-img'></i></a></td>" +
		"<td><img class='foto-maceta-modif borderimg' src='" + listaImgs[maceta.posImg] + "'/>";
	output+= "</td><td style='width:15%'><a class='btn btn-primary right-img-btn' style='display:none;'>" +
		"<i class='fa fa-arrow-right arrow-scroll-img' style='position:relative;bottom:1px'></i></a></td>";
	output += "<tr><td></td> <td> <p id='delete-icon' style='text-align:center;display:none;'>" +
			"<a class='btn btn-primary delete-img-btn' delete-num=" + maceta.posImg + " style='width:60px;height:55px;'>" +
			"<i class='fa fa-trash' style='font-size: 2.5em;'></i></a></p> </td> <td></td> </tr>";
	
	output += "</table>";
	objFotos = $("#fotos");
	objFotos.html(output);
	
	if(listaImgs.length == 0){
		$("#fotos").hide();
	}
	if(maceta.cantImgStatic==0){
		$("#delete-icon").show();
	}
	
	if(listaImgs.length>1){
		objFotos.find('.right-img-btn').show();
		
		objFotos.find('.right-img-btn').click(function(){
			maceta.posImg += 1;
			if(maceta.posImg>=maceta.cantImgStatic){
				$("#delete-icon").show();
			} else {
        		$("#delete-icon").hide();
        	}
			linkNuevo = listaImgs[maceta.posImg];
        	$(this).parent().parent().find('.foto-maceta-modif').attr('src', linkNuevo);
        	$(this).parent().parent().parent().find('.delete-img-btn').attr("delete-num", maceta.posImg);
        	if(maceta.posImg > 0){
        		$(this).parent().parent().find('.left-img-btn').show();
        	}
        	if(maceta.posImg == listaImgs.length - 1){
        		$(this).hide();
        	}
        });
		
        objFotos.find('.left-img-btn').click(function(){
        	maceta.posImg -= 1;
        	if(maceta.posImg>=maceta.cantImgStatic){
        		$("#delete-icon").show();
        	} else {
        		$("#delete-icon").hide();
        	}
        	linkNuevo = listaImgs[maceta.posImg];
        	$(this).parent().parent().find('.foto-maceta-modif').attr('src', linkNuevo);
        	$(this).parent().parent().parent().find('.delete-img-btn').attr("delete-num", maceta.posImg);
        	if(maceta.posImg < listaImgs.length - 1){
        		$(this).parent().parent().find('.right-img-btn').show();
        	}
        	if(maceta.posImg == 0){
        		$(this).hide();
        	}
        });
		
	}
	
	$('.delete-img-btn').click(function(){
		var pos = $(this).attr('delete-num');
		var linkImgDelete = listaImgs[pos];
		var listaImgsFilter = listaImgs.filter(function(elem){
		    return elem!=linkImgDelete;
		});
		
		listaImgs = listaImgsFilter;
		var posImgOld = pos - maceta.cantImgStatic;
		$('input[name="linkImagenOld' + posImgOld + '"]').remove();
		global.cantLinksOld = global.cantLinksOld - 1;
		$('input[name="cantLinksOld"]').val(global.cantLinksOld);
		
		// Hago el switcheo de imagen
		// Voy para abajo; si es la primera (pos = 0) borro la fila de la tabla
		
		if(pos == 0){
			$("#fotos").remove();
		} 
		
		// Ocultar botones que correspondan
		
		$('.left-img-btn').trigger('click');
	}); 
}



function getListaImgs(fotosStatic, fotosLink, cantImgStatic){
	var listaImgs = [];
	if(cantImgStatic!=0){
		for(var i=0; i<cantImgStatic; i++){
			listaImgs[i] = global.context + "/images/macetas/" + fotosStatic[i];
		}
	}
	if(fotosLink!=null){
		for(var j=0; j<fotosLink.length; j++){
			listaImgs[j + cantImgStatic] = fotosLink[j];
		}
	}
	return listaImgs;
}

$(document).ready(function(){
    $('.num-input').on('change', function() {
        var cant = $(this).val();
        if(cant<0){
            $(this).val(0);
        }
    });
});

function validateFormModif(form){
	var formArray = form.serializeArray();
    var isValid = true;
    
    $.each(formArray, function(index, field){
        if(field.value==null || field.value=="") {
        	if(field.name!="cantLinksOld" && field.name!="cantLinksNew"){
	            $('#' + field.name).addClass('error-highlight');
	            isValid = false;
        	}
        } else
        	 $('#' + field.name).removeClass('error-highlight');
    });
    
    
    return isValid;
}