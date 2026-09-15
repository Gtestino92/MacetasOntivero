<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<%@include file="header.jsp" %>  
</head>

<%@include file="navbar.jsp" %>

<body style='background-color: darkseagreen;'>

<br><br><br><br><br>


<div class='container'>
  <div class='row'>
    <div class='col-lg-8 col-listados'>
   	
    </div>
    <div class='col-lg-4'>
      <div class='container'>
        <div class='filtros' style='position:relative;right:-62%;'>
         
            <div class='row'>
              <%@include file="filtro_formatos.jsp" %>
      
            </div>
            <br><br>
            <div class='row'>
               <%@include file="filtro_tamano.jsp" %>
            </div>
            <br><br>
          
        </div>
       

        <div class='carrito' id='carrito' >
          <div style='position:relative;left:200px;'>
                     
               <%@include file="carrito.jsp" %>
     
          </div>
        </div>
      </div>

      
      
    </div>
  </div>
</div>
<br><br><br><br>  

<script src='${pageContext.request.contextPath}/catalogo/js/filtros.js'></script>
<script src='${pageContext.request.contextPath}/catalogo/js/carrito.js'></script>
<script src='${pageContext.request.contextPath}/catalogo/js/tablas-header.js'></script>
<script src='${pageContext.request.contextPath}/catalogo/js/tablas-body.js'></script>

<script type="text/javascript">
	
	window.fotoPopOver = "";
	window.cantCarrito = 0;
	window.maxCantPageCarrito = 5;
	window.pageActualCarrito = 1;
  
	var global = {};
	global.context = '${pageContext.request.contextPath}';
    
	global.data = ${data};
	
	
	$("#link-navbar-help").popover({
	    html: true, 
		content: function() {
	          return $('#popover-help-content').html();
	        }
	});
	
	makeTables();
</script>


</body>

</html>


