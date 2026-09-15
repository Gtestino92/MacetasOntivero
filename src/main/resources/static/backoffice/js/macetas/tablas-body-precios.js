function makeListado(){
	var listado = global.data;
    var i = 0;
    var html = "";
    for (i = 0; i<listado.length; i++){
    	var maceta = listado[i];
    	var cod = maceta.codigo;
    	var cod_new = maceta.codigoNew;
		html += "<tr class='row-show row-maceta' id='row-" + cod_new + 
		"'><td>" + cod_new + "</td><td id='cod" + cod_new  + "'>" + cod + 
		"<input type='hidden' name='cod-new-" + i + "' value='" + cod_new + "'>" +
		"</td><td>" + maceta.formato + "</td><td> " + maceta.precioAnterior + "</td><td> " + maceta.precio + 
		"</td><td id='precio-" + cod_new + "'> </td><td id='precio-confirm-" + cod_new + "' style='vertical-align:middle'></td></tr>";
    }
    $('#table-modif-precios').append(html);
    
}
