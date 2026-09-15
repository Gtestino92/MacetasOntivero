$(document).ready(function(){
        $("[data-toggle='under-list']").on('click', function() {
            var cod_new = $(this).attr("id");
            var format_new = $(this).attr('format');
            var objNew = $('.foto-' + format_new);
            var cod_old = objNew.attr('img-actual');
            var format_old="";
            if(cod_old!="")
                format_old = $('#'+cod_old).attr('format');
            if($(this).attr('toggle')=='off'){
                
                if (format_old==format_new){
                    $('#'+cod_old).attr('toggle','off');
                    var macetaOld = getMacetaByCodNew(global.listados, cod_old);
                    macetaOld.posImg = 0;
                } 
                $(this).attr('toggle','on');

                var maceta = getMacetaByCodNew(global.listados, cod_new);
                var listaImgs = getListaImgs(maceta.fotosStatic, maceta.fotosLink, maceta.cantImgStatic);
                
                var cod = $(document).find('#cod'+cod_new).html();  
                var output = "<div><table><td style='width:15%'><a class='btn btn-primary left-img-btn' style='display:none;'>" +
                		"<i class='fa fa-arrow-left arrow-scroll-img' style='position:relative;bottom:1px'></i></a></td><td><img id='foto-maceta-" 
                	+ format_new + "' class='foto-maceta borderimg' src='" + listaImgs[maceta.posImg] + "'/>";
                output+= "</td><td style='width:15%'><a class='btn btn-primary right-img-btn' style='display:none;'>" +
                		"<i class='fa fa-arrow-right arrow-scroll-img' style='position:relative;bottom:1px'>" +
                		"</i></a></td></table></div><p style='text-align:center;'>";
                output+= "<label class='label-modelo'>Modelo: " + cod + "</label></p>";
                output+= "<div id='myModal' class='modal modal-" + format_new + 
                	"'> <span class='close close-" + format_new + "'>&times;</span>";
                output+= "<img class='modal-content' id='img-maceta-full-" + format_new + "'>" +
                		"<label class='label-modelo caption'></label></div>";
                
 
                //Muestro la flechas derecha segun cant //
                objNew.html(output);
				if(listaImgs.length>1){
					objNew.find('.right-img-btn').show();
					
					objNew.find('.right-img-btn').click(function(){
						maceta.posImg += 1;
						linkNuevo = listaImgs[maceta.posImg];
	                	$(this).parent().parent().find('.foto-maceta').attr('src', linkNuevo);
	                	if(maceta.posImg > 0){
	                		$(this).parent().parent().find('.left-img-btn').show();
	                	}
	                	if(maceta.posImg == listaImgs.length - 1){
	                		$(this).hide();
	                	}
	                });
					
	                objNew.find('.left-img-btn').click(function(){
	                	maceta.posImg -= 1;
	                	linkNuevo = listaImgs[maceta.posImg];
	                	$(this).parent().parent().find('.foto-maceta').attr('src', linkNuevo);
	                	if(maceta.posImg < listaImgs.length - 1){
	                		$(this).parent().parent().find('.right-img-btn').show();
	                	}
	                	if(maceta.posImg == 0){
	                		$(this).hide();
	                	}
	                });
					
				}
				
                objNew.attr('img-actual',cod_new);
                objNew.slideDown();
                
                var img = $("#foto-maceta-"+format_new);
                var span =$(".close-"+format_new)[0];
                var modal = $(".modal-"+format_new);
                var modalImg = $("#img-maceta-full-"+format_new);
                var captionText = $(".caption");
                
                img.click(function(){
                    modal.css("display", "block");
                    modalImg.attr('src', this.src);
                    captionText.html(cod);
                  });

                span.onclick = function() { 
                    modal.css("display", "none");
                }
                
                                   
            } else {
                
                $(this).attr('toggle','off');
                var maceta = getMacetaByCodNew(global.listados, cod_new);
                maceta.posImg = 0;
                objNew.slideUp(); 
            }
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
