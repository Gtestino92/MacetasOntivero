function parseDetallePedido(){
	var listaPedido = global.dataPedido.listadoMacetas;
	var totalCompra = global.dataPedido.total;
    for (var i=0;i<listaPedido.length;i++){
        var html = "<tr> <td> " + listaPedido[i].codigo + "</td><td>$";
        html += listaPedido[i].precio + "</td><td>" + listaPedido[i].largo;
        html += "</td><td>" +  listaPedido[i].ancho  + "</td><td>" 
            +  listaPedido[i].alto +  "</td><td>" ;
        html +=  listaPedido[i].cantSolicitada  + "</td><td> $"
            + listaPedido[i].precio*listaPedido[i].cantSolicitada + "</td></tr>";
        $('#tabla-detalle-pedido').append(html);
    }

    $('#total').html("<strong>Total: $"+totalCompra+"</strong>");

    $('#send-mail-button').click(parseInfoMail);
}

function parseInfoMail(){

    var nombrePedido = $('#nombre').val();
    var mailPedido = $('#mail').val();
    var msjPedido = $('#msj-mail').val();
    var celular = $('#celular').val();
    var total = global.dataPedido.total;
    
    if(!validateInfo(nombrePedido,mailPedido,msjPedido,celular))
        return;
    else {
    	jsonPedido = {}
	    jsonPedido.nombre = nombrePedido;
	    jsonPedido.mail = mailPedido;
	    jsonPedido.msjMail = msjPedido;
	    jsonPedido.celular = celular;
	    jsonPedido.total = total;
	    macetas = global.dataPedido.listadoMacetas;
	    for(var i=0; i<macetas.length; i++){
	    	jsonPedido["modeloCodNew" + i] = macetas[i].codigoNew;
	    	jsonPedido["modeloCod" + i] = macetas[i].codigo;
	    	jsonPedido["modeloCant" + i] = macetas[i].cantSolicitada;
	    }
	    jsonPedido.cantModelos = macetas.length;
	    $.redirectPost(global.context + "/catalogo/enviarPedido", jsonPedido);
    	  
      }
    	  //"${pageContext.request.contextPath}"
        
}

//function jsonPedido(global.dataPedido.listadoMacetas){
	
//}

$.extend(
    {
        redirectPost: function(location, args)
        {
            var form = $('<form></form>');
            form.attr("method", "post");
            form.attr("action", location);
    
            $.each( args, function( key, value ) {
                var field = $('<input></input>');
    
                field.attr("type", "hidden");
                field.attr("name", key);
                field.attr("value", value);
    
                form.append(field);
            });
            $(form).appendTo('body').submit();
        }
    });


function validateInfo(nombrePedido, mailPedido, msjPedido, celular){
	var emailRegEx = /^[\w!#$%&'*/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(((?:[a-zA-Z0-9-_]+\.)+([a-zA-Z]{2,3}\.)+([a-zA-Z0-9-]{2,3}))|((?:[a-zA-Z0-9-_]+\.)+([a-zA-Z]{2,3}))|(([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})))$/;
	var celularRegEx = /^[0-9]{7,15}$/;
	var isValid = true;
    
	if(nombrePedido==null || nombrePedido==""){
        $('#nombre').addClass('error-highlight');
        isValid = false;
    } else
        $('#nombre').removeClass('error-highlight');
    if(mailPedido==null || mailPedido==""){
        $('#mail').addClass('error-highlight');
        isValid = false;
    } else 
        $('#mail').removeClass('error-highlight');
    if(msjPedido==null || msjPedido==""){
        $('#msj-mail').addClass('error-highlight');
        isValid = false;
    } else 
        $('#msj-mail').removeClass('error-highlight');

    if(celular!=null && celular!=""){
    	if(!celularRegEx.test(celular)){
    		$('#celular').addClass('error-highlight');
            isValid = false;
        } else 
            $('#celular').removeClass('error-highlight');
    }
    
    if(!emailRegEx.test(mailPedido)){
        $('#mail').addClass('error-highlight');
        isValid = false;
    } else 
        $('#mail').removeClass('error-highlight');
    
    return isValid;
}
