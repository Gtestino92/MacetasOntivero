// funcion para agregar maceta al detalle

function showRecomendaciones(){
			var objFotoRec = $('.foto-recom');
			
			var listFullMacetas = global.listFullMacetas;
			if(global.numRecomendacion==global.listRecomendaciones.length) {
				$('.div-recom').slideUp();
				$('.container-recom').css('min-height','0px');
			}
			
			objFotoRec.hide();
			objFotoRec.html("");
            var cod_new = global.listRecomendaciones[global.numRecomendacion];
            
            var maceta = getMacetaByCodNew(global.listFullMacetas, cod_new);
            var listaImgs = getListaImgs(maceta.fotosStatic, maceta.fotosLink, maceta.cantImgStatic);
 
            var cod = maceta.codigo;  
            var output = "<div><table><td style='width:15%'><a class='btn btn-primary left-img-btn' style='display:none;'>" +
            		"<i class='fa fa-arrow-left arrow-scroll-img'></i></a></td><td><img id='foto-maceta-recom-img'" +
            		" class='foto-maceta foto-maceta-recom borderimg' src='" + global.context + listaImgs[maceta.posImg] + "'/>";
            output+= "</td><td style='width:15%'><a class='btn btn-primary right-img-btn' style='display:none;'>" +
            		"<i class='fa fa-arrow-right arrow-scroll-img'></i></a></td></table></div></div><p class='centered' >";
            output+= "<label class='label-modelo'>Modelo: " + cod + "</label></p><p class='centered' >" +
            		"<a class='btn btn-primary btn-add-recom' data-cod-new='" + 
            				cod_new + "' data-toggle='modal' href='#modal-add-recom' style='width:40%'>" +
            				"Agregar</a> <a class='btn btn-primary btn-not-recom' data-cod-new='" +
            				cod_new + "' style='width:40%'>No me interesa</a></p>";
            output+= "<div id='myModal' class='modal modal-recom'>" +
            	"<span class='close close-recom'>&times;</span>";
            output+= "<img class='modal-content' id='img-maceta-full-recom'>" +
            		"<label class='label-modelo caption'></label>";

            //Muestro la flechas derecha segun cant //
            objFotoRec.append(output);
			if(listaImgs.length>1){
				objFotoRec.find('.right-img-btn').show();
				
				objFotoRec.find('.right-img-btn').click(function(){
					maceta.posImg += 1;
					linkNuevo = listaImgs[maceta.posImg];
                	$(this).parent().parent().find('.foto-maceta').attr('src', linkNuevo);
                	if(maceta.posImg == listaImgs.length - 1){
                		$(this).hide();
                		$(this).parent().parent().find('.left-img-btn').show();
                	}
                });
				
				objFotoRec.find('.left-img-btn').click(function(){
                	maceta.posImg -= 1;
                	linkNuevo = listaImgs[maceta.posImg];
                	$(this).parent().parent().find('.foto-maceta').attr('src', linkNuevo);
                	if(maceta.posImg == 0){
                		$(this).hide();
                		$(this).parent().parent().find('.right-img-btn').show();
                	}
                });
				
			}
			
			objFotoRec.attr('img-actual',cod_new);
            
            var img = $("#foto-maceta-recom-img");
            var span =$(".close-recom")[0];
            var modal = $(".modal-recom");
            var modalImg = $("#img-maceta-full-recom");
            var captionText = $(".caption");
            
            img.click(function(){
                modal.css("display", "block");
                modalImg.attr('src', this.src);
                captionText.html(cod);
              });

            span.onclick = function() { 
                modal.css("display", "none");
            }
            
            $('a.btn-add-recom').click(addCodNewToModalRecom);         
            $('a.btn-not-recom').click(showNextRecomendacion);
   
            objFotoRec.fadeIn("slow");
}

function getMacetaByCodNew(listMacetas, codNew){
	for(var i=0; i<listMacetas.length; i++){
		if(listMacetas[i].codigoNew == codNew)
			return listMacetas[i];
	}
}

function getListaImgs(fotosStatic, fotosLink, cantImgStatic){
	var listaImgs = [];
	if(cantImgStatic!=0){
		for(var i=0; i<cantImgStatic; i++){
			listaImgs[i] = "/images/macetas/" + fotosStatic[i];
		}
	}
	if(fotosLink!=null){
		for(var j=0; j<fotosLink.length; j++){
			listaImgs[j + cantImgStatic] = fotosLink[j];
		}
	}
	return listaImgs;
}

function addCodNewToModalRecom() {
	var codNew = $(this).data('cod-new');
	$('#modal-add-recom').find('#add-recom-cod-new').val(codNew);
	var maceta = getMacetaByCodNew(global.listFullMacetas, codNew);
	
	$('#add-recom-codigo').html(maceta.codigo);
	$('#add-recom-largo').html(maceta.largo);
	$('#add-recom-ancho').html(maceta.ancho);
	$('#add-recom-alto').html(maceta.alto);
	$('#add-recom-precio').html(maceta.precio);
}

$(document).ready(function(){
	$('#add-recom-confirmar').click(function(){
		if(!validCantSolicitada())
			return;
		else {
			var codNew = $('.modal-body').find('#add-recom-cod-new').val();
			var maceta = getMacetaByCodNew(global.listFullMacetas, codNew);
			var cantSolicitada = $('#add-recom-cant').val();
			maceta.cantSolicitada = Number(cantSolicitada);
			var output = "<tr> <td> " + maceta.codigo + "</td><td>$";
			output += maceta.precio + "</td><td>" + maceta.largo;
			output += "</td><td>" +  maceta.ancho  + "</td><td>" 
			    +  maceta.alto +  "</td><td>" ;
			output +=  cantSolicitada  + "</td><td> $"
			    + maceta.precio*cantSolicitada + "</td></tr>";
			$('#tabla-detalle-pedido').append(output);
		
			var totalOld = global.dataPedido.total;
			var totalNew = totalOld + maceta.precio*cantSolicitada;
			$('#total').html("<strong>Total: $"+totalNew+"</strong>");
			global.dataPedido.total = totalNew;
			global.dataPedido.listadoMacetas.push(maceta);
			$('#close-modal-add-recom').trigger('click');
			showNextRecomendacion();
		}
	});
});

function validCantSolicitada() {
	objCant = $('#add-recom-cant');
	var isValid = true;
	var cantSolicitada = objCant.val();
	if(cantSolicitada==null || cantSolicitada=="" || cantSolicitada <= 0){
		objCant.addClass('error-highlight');
        isValid = false;
    } else {
    	objCant.removeClass('error-highlight');
    }
	return isValid;
}

function showNextRecomendacion() {
	global.numRecomendacion +=1;
	showRecomendaciones();
	$('#add-recom-cant').val("");
}
