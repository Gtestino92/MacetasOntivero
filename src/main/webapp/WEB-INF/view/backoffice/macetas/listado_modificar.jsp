<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<%@include file="../header_backoffice.jsp" %>
      
  
</head>

<%@include file="../navbar_backoffice.jsp" %>
<%@include file="modal_eliminar.jsp"%>

<body style='background-color: darkseagreen;'>

<br><br><br><br><br>
<h1 style='text-decoration:underline;text-align:center'>Modificar Listados </h1>

<br><br>
<script src='${pageContext.request.contextPath}/backoffice/js/macetas/fotos-popover-backoffice.js'></script>
<script src='${pageContext.request.contextPath}/backoffice/js/macetas/tablas-header-modif.js'></script>
<script src='${pageContext.request.contextPath}/backoffice/js/macetas/tablas-body-modif.js'></script>
<script src='${pageContext.request.contextPath}/backoffice/js/macetas/eliminar-modelo.js'></script>
<br>
<div class='container'>
  <div class='row'>
    <div class='col-sm-12 col-listados'>
   
    </div>
  </div>
</div>
<br><br><br><br>  

<script type="text/javascript">
	
	window.fotoPopOver = "";
	var global = {};
	global.context = '${pageContext.request.contextPath}';
	global.data = ${data};
	makeListados();
</script>

</body>

</html>


