function makeTables(){
	var listadosByFormato = global.data;
	var i = 0;
	var j;
	for (k = 0; k<listadosByFormato.length; k++){
    	
    	
		var listado = listadosByFormato[k];
		var formato = listado.formato;
		var macetas = listado.macetas;
		var titulo = get_table_header_html(formato);
		
		var html =	"<div class='tabla-macetas' id='tabla-macetas-"
			+ formato.toLowerCase()
			+ "' style='width:110%'><table class='table table-striped'>"
			+ "<tr class='tabla-title row-show'> <th colspan='4' class='tabla-title-text'>"
			+ titulo
			+ "</th> </tr>";
		
		if(macetas.length % 2 == 0){
			
			for(i=0; i<macetas.length; i+=2){
				j = i + 1;
				// Hacer 1 (i)
				var maceta = macetas[i];
	    	    var cod = maceta.codigo;
	    	    var codNew = maceta.codigoNew;
	    	    
	    	    var htmlMaceta = getHtmlMaceta(maceta);
	    	    html += "<tr><td class='row-show item-front-img' id='"  + codNew + "' >" + htmlMaceta + "</td>";
	    	    //html += "<td class='item-middle'></td>";
	    	    
	    	    // Hacer 2 (j)
	    	    var maceta = macetas[j];
	    	    var cod = maceta.codigo;
	    	    var codNew = maceta.codigoNew;
	    	    var htmlMaceta = getHtmlMaceta(maceta);
	    	    
	    	    html += "<td class='row-show item-front-img' id='" + codNew + "'>" + htmlMaceta + "</td>";
	    	    html += "</tr>";
	    	    
			}      
			
		} else {
	    	for(i=0; i<macetas.length; i+=2){
		    	j = i + 1;
		    	// Hacer 1 (i)
		    	var maceta = macetas[i];
	    	    var cod = maceta.codigo;
	    	    var codNew = maceta.codigoNew;
	    	    var htmlMaceta = getHtmlMaceta(maceta);
	    	    
	    	    html += "<td class='row-show item-front-img' id='"  + codNew + "'>" + htmlMaceta + "</td>";
	    	    //html += "<td class='item-middle'></td>";
	    	    	
		        if(j != macetas.length ) {
		        	// Hacer 2 (j)  
		        	var maceta = macetas[j];
		    	    var cod = maceta.codigo;
		    	    var codNew = maceta.codigoNew;
		    	    var htmlMaceta = getHtmlMaceta(maceta);
		    	    
		    	    html += "<td class='row-show item-front-img' id='" + codNew + "'>" + htmlMaceta + "</td>";	  
		    	    
		    	} else {
		    		html += "<td></td><td></td>"
		    	}
		        html += "</tr>";    
	    	}   
	    	
	    }       	
	
		html += "</table><br><br></div>";
		$('.col-listados').append(html);
	}
	
	$(document).find('.item-front-img').each(function(i, elem){
		var codNew = $(elem).attr('id');
		var maceta = getMacetaByCodNew(global.data, codNew);
        var listaImgs = getListaImgs(maceta.fotosStatic, maceta.fotosLink, maceta.cantImgStatic);
        var cod = maceta.codigo;
        
		if(listaImgs.length>1){
			$(elem).find('.right-img-btn').show();
			
			$(elem).find('.right-img-btn').click(function(){
				maceta.posImg += 1;
				linkNuevo = listaImgs[maceta.posImg];
            	$(this).parent().parent().parent().find('.foto-maceta').attr('src', linkNuevo);
            	if(maceta.posImg == listaImgs.length - 1){
            		$(this).hide();
            		$(this).parent().parent().find('.left-img-btn').show();
            	}
            });
			
			$(elem).find('.left-img-btn').click(function(){
            	maceta.posImg -= 1;
            	linkNuevo = listaImgs[maceta.posImg];
            	$(this).parent().parent().parent().find('.foto-maceta').attr('src', linkNuevo);
            	if(maceta.posImg == 0){
            		$(this).hide();
            		$(this).parent().parent().find('.right-img-btn').show();
            	}
            });
			
		}

	});
}

function getHtmlMaceta(maceta) {
	var codNew = maceta.codigoNew;
	var listaImgs = getListaImgs(maceta.fotosStatic, maceta.fotosLink, maceta.cantImgStatic);
    
	var output = "<div class='container' style='padding:0%;'><div class='row' style='padding-top:2%'><div class='col'>";
	output += "<img id='foto-maceta-" 
		+ codNew + "' class='img-catalogo borderimg foto-maceta' src='"+ listaImgs[maceta.posImg] + "'/>";
	
	output+= "</div></div><div class='row'><div class='col'>";
	output += "<a class='btn btn-primary left-img-btn' style='display:none;'>" 
		+ "<i class='fa fa-arrow-left arrow-scroll-img'></i></a></div><div class='col'><a class='btn btn-primary right-img-btn' style='display:none;'>" +
		"<i class='fa fa-arrow-right arrow-scroll-img'></i></a></div></div></div>";
	output+= "<div id='myModal' class='modal modal-" + codNew + 
	"'> <span class='close close-" + codNew + "'>&times;</span>";
	output+= "<img class='modal-content' id='img-maceta-full-" + codNew + "'>" +
		"<label class='label-modelo caption'></label></div>";
		
	output += "</td><td class='row-show item-front-info text-center item-"  + codNew 
		+ "' data-item='" + codNew + "'> <div class='container' style='padding:1%;'><div class='row' style='padding-top:5%'><div class='col'>";
	output +=  "<p>" + maceta.codigo + "</p><p class='no-break'><label class='lg'>" + maceta.largo 
	+ "</label> x <label class='an'>" + maceta.ancho + "</label> x <label class='al'>" + maceta.alto + "</label> cm </p><p>";
	output += "$" + maceta.precio + "</p></div></div><div class='row'><div class='col'>"
		+ " <a class='btn btn-primary btn-add-carrito' cod-add='"+ codNew +"' data-toggle='add-carrito' toggle='off' " +
		"title='Agregar al carrito'><i class='fa fa-plus fa-lg'></i></a> </div></div></div>";
	
	return output;
}

$(document).ready(function(){

		$('.img-catalogo').click(function() {
		var codNew = $(this).attr('id').split('-')[2];
		var maceta = getMacetaByCodNew(global.data, codNew);
		  
		var codigo = maceta.codigo;
		var img = $("#foto-maceta-" + codNew);
		var span =$(".close-" + codNew)[0];
		var modal = $(".modal-" + codNew);
		var modalImg = $("#img-maceta-full-" + codNew);
		var captionText = $(".caption");
		
		//img.click(function(){
		modal.css("display", "block");
		modalImg.attr('src', this.src);
	    captionText.html(codigo);
		//});
		
		span.onclick = function() { 
			modal.css("display", "none");
		};
		  
	});
});

function getMacetaByCodNew(listByFormato, codNew){
	for(var i=0; i<listByFormato.length; i++){
		var list = listByFormato[i].macetas;
		for(var j=0; j<list.length; j++){
			if(list[j].codigoNew == codNew)
				return list[j];
		}
	}
}

function getListaImgs(fotosStatic, fotosLink, cantImgStatic){
	var listaImgs = [];
	if(cantImgStatic!=0){
		for(var i=0; i<cantImgStatic; i++){
			listaImgs[i] = global.context  + "/images/macetas/" + fotosStatic[i];
		}
	}
	if(fotosLink!=null){
		for(var j=0; j<fotosLink.length; j++){
			listaImgs[j + cantImgStatic] = fotosLink[j];
		}
	}
	return listaImgs;
}