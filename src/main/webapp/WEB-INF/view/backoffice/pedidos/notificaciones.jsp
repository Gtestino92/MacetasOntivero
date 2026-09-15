<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<%@include file="../header_backoffice.jsp"%>

</head>

<%@include file="../navbar_backoffice.jsp" %>
<%@include file="../pedidos/modal_pedido_error_callback.jsp" %>


<body style='background-color: darkseagreen;'>

<br><br><br><br><br>
<h1 style='text-decoration:underline;text-align:center'>Notificaciones</h1>

<br><br>

<br>
<div class='container'>
  <div class='row'>
    <div class='col-sm-8'>
    	<div id='col-listados'>
			<div id='noResultsNotifications' class="error-highlight" style="border-radius:7px;color: red;height:30px;display:none;">
				&nbsp; &nbsp; No hay notificaciones pendientes
			</div>
			<a id="callback-error-btn" data-toggle="modal" href="#modal-pedido-error-callback" type="hidden"></a>
		</div>
    </div>
  </div>
</div>
<br><br><br><br>  

<script  src='${pageContext.request.contextPath}/backoffice/js/pedidos/listados-notificaciones.js'></script>
<script src='${pageContext.request.contextPath}/backoffice/js/pedidos/update-notif.js'></script>

<script type="text/javascript">
	
	var global = {};
	global.data = ${data};
	global.context = '${pageContext.request.contextPath}';
	makeListPedidosNotifications(global.data);
</script>

</body>


</html>