<!DOCTYPE html>
<html>

<head>
	<%@include file="header.jsp" %>
</head>

<%@include file="navbar.jsp" %>
<%@include file="modal_add_recom.jsp" %>

<br><br><br><br>
<h1 style="text-decoration:underline;text-align:center">Detalle</h1>
<br>

<body style='background-color: darkseagreen;'>

<div class='container'>
	<div class='container container-tabla'>    
		<%@include file="detalle_pedido_tabla.jsp" %>
	</div>
    <br><br>
    <div class='container container-recom'>
		<%@include file="detalle_pedido_recom.jsp" %>
	</div>
	<br><br>
    
    <div class="container container-datos-mail">    
    	<%@include file="detalle_pedido_datos_mail.jsp" %>
    </div>
    <br><br><br>
</div>

<script src='${pageContext.request.contextPath}/catalogo/js/solicitar-pedido.js'></script>
<script src="${pageContext.request.contextPath}/catalogo/js/recomendaciones.js"></script>
<script type="text/javascript">
	
	var global = {}
	var data = ${data};
	global.context = '${pageContext.request.contextPath}';
	global.dataPedido = data.pedido;
	global.listRecomendaciones = data.listRecomendaciones;
	global.numRecomendacion = 0;
	global.listFullMacetas = data.listFullMacetas;
	parseDetallePedido();
	$(document).ready(showRecomendaciones);
</script>


</body>
</html>
