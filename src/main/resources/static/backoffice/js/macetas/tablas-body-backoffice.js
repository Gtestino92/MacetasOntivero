function makeListados(){
	var listadosByFormato = global.listados;
    var i = 0;
    var j;
    for (j = 0; j<listadosByFormato.length; j++){
      
      var listado = listadosByFormato[j];
      var formato = listado.formato;
      var macetas = listado.macetas;
      var html = get_header_table(formato);
      for(i=0;i<macetas.length;i++){
    	var maceta = macetas[i];
        var cod = maceta.codigo;
        var cod_new = maceta.codigoNew;
        html += "<tr class='row-show row-maceta' id='row-" + cod_new + 
        "'><td id='cod" + cod_new  + "'>" + cod + "</td><td id='lg'>" 
        + maceta.largo + "</td><td id='an'>" + maceta.ancho + "</td><td id='al'>" 
        + maceta.alto + "</td><td id='precio'> " + maceta.precio + 
        "</td><td> <a class='btn btn-primary' title='Ver foto' data-toggle='under-list'" +
        " toggle='off' format='" + formato 
        + "' id='" + cod_new + "'><i class='fa fa-camera fa-lg'></i></a> </td></tr>";
        
      } 
      
      html += "  </table>  <div class='foto-" + formato + 
      "' img-actual='' style='display:none;'> </div> <br><br></div>";
      $('.col-listados').append(html);
      
    }
}
