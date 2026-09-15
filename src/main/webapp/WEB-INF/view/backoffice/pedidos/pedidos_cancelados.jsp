<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<%@include file="../header_backoffice.jsp"%>

</head>

<%@include file="../navbar_backoffice.jsp" %>

<body style='background-color: darkseagreen;'>

<br><br><br><br><br>
<h1 style='text-decoration:underline;text-align:center'>Pedidos Cancelados</h1>

<br><br>

<br>
<div class='container'>
  <div class='row'>
    <div class='col-sm-8'>
    	<div id='col-listados'>
			<div id='noResultsFilterFecha' class="error-highlight" style="border-radius:7px;color: red;height:30px;display:none;">
				&nbsp; &nbsp; No se han encontrado resultados
			</div>
		</div>	
		<div class="row-container text-center">
			<input class="btn btn-primary" type="button" value="Ver más"
				id="morePedidosBtn" style="position:relative;right:5%;">
		</div>	
	</div>
    <div class='col-sm-4'>
      <div class='container'>
        <div class='filtros' style='position:relative;right:-200px;'>
         
            <div class='row'>
              <%@include file="filtro_fechas.jsp" %>
      			
            </div>
            <br><br>
            
        </div>
      </div>
    </div>
  </div>
</div>
<br><br><br><br>  

<script  src='${pageContext.request.contextPath}/backoffice/js/pedidos/listados-pedidos.js'></script>
<script src='${pageContext.request.contextPath}/backoffice/js/pedidos/filtro-fecha.js'></script>

<script type="text/javascript">
	
	var global = {};
	global.data = ${data};
	global.context = '${pageContext.request.contextPath}';
	global.estado = global.data.estadoPedido.code;
	global.jsonDatepicker = {uiLibrary : 'bootstrap4', maxDate: new Date(), format: 'dd/mm/yyyy'};
	loadFiltrosFecha(global.estado);
	if(global.data.noMorePedidosLeft)
		$('#morePedidosBtn').hide();
	makeListPedidos(global.data.pedidos, global.estado);
	
</script>

</body>


</html>