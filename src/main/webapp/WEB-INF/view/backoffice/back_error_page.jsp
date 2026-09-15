<!DOCTYPE html>
<html>

<head>
	<%@include file="header_backoffice.jsp" %>
</head>
<%@include file="navbar_backoffice.jsp"%>


<body style='background-color: darkseagreen;'>
    <br><br><br><br><br>
    
    <h1 style='text-align:center' id="errorMsj"> </h1>

    <br><br>

    <div class="col-sm-12" style="text-align:center;">
        <form action= "${pageContext.request.contextPath}/backoffice'">
            <div id='go-back-listado'>
                <input type='submit' class='btn btn-primary' style='color:black;' value='Volver a listados'>
            </div>
        </form>
    </div>
</body>

<script type="text/javascript">
	var typeError = "${typeError}";
	console.log('${pageContext.request.contextPath}');
	switch (typeError){
		case "bdError":
			$('#errorMsj').html('Oops! Error de conexion con la base de datos, intente mas tarde.');
			break;
		case "apiConnectError":
			$('#errorMsj').html('Oops! Error de conexión, intente nuevamente mas tarde.');
			break;
		case "preventAccess":
			$('#errorMsj').html('Oops! Acceso no autorizado.');
			break;
		case "codigoNotFound":
			$('#errorMsj').html('Oops! El codigo ingresado no corresponde a un modelo existente.');
			break;
		case "pedidoNotFound":
			$('#errorMsj').html('Oops! El pedido no ha sido encontrado.');
			break;
		case "cancelError":
			$('#errorMsj').html('Oops! El pedido no ha sido encontrado!');
			break;
		case "invalidState":
			$('#errorMsj').html('Oops! El estado del pedido ingresado no existe.');
			break;
		default:
			$('#errorMsj').html('Oops! La pagina a la que intenta acceder no existe.');
			break;
	}
</script>
</html>