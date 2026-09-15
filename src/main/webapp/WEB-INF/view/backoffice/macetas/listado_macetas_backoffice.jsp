<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<link rel='stylesheet' href='css/styles.css'>
	<%@include file="../header_backoffice.jsp" %>  
</head>

<%@include file="../navbar_backoffice.jsp" %>

<body style='background-color: darkseagreen;'>

<br><br><br><br><br>
<h1 style='text-decoration:underline;text-align:center'>Macetas Ontivero - BackOffice</h1>

<br><br>
<script src='${pageContext.request.contextPath}/backoffice/js/macetas/fotos-popover-backoffice.js'></script>
<script src='${pageContext.request.contextPath}/backoffice/js/macetas/filtros-backoffice.js'></script>
<script src='${pageContext.request.contextPath}/backoffice/js/macetas/tablas-header-backoffice.js'></script>
<script src='${pageContext.request.contextPath}/backoffice/js/macetas/tablas-body-backoffice.js'></script>

<br>
<div class='container'>
  <div class='row'>
    <div class='col-sm-8 col-listados'>
   		
    </div>
    <div class='col-sm-4'>
      <div class='container'>
        <div class='filtros' style='position:relative;right:-200px;'>
         
            <div class='row'>
              <%@include file="filtro_formatos_backoffice.jsp" %>
      
            </div>
            <br><br>
            <div class='row'>
               <%@include file="filtro_tamano_backoffice.jsp" %>
            </div>
            <br><br>
          
        </div>
      </div>
    </div>
  </div>
</div>
<br><br><br><br>  

<script type="text/javascript">
	var global = {};
	global.context = '${pageContext.request.contextPath}';
	var data = ${data};
	global.listados = data
	makeListados();
</script>

</body>

</html>


