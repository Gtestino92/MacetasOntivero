<!DOCTYPE html>
<html>

<head>
	<link rel='stylesheet' href='css/styles.css'>
	<%@include file="catalogo/header.jsp" %>
</head>

<%@include file="catalogo/navbar.jsp" %>

<body style='background-color: darkseagreen;'>
    <br><br><br><br><br>
    
    <h1 style='text-align:center' id="errorMsj"> </h1>

    <br><br>

    <div class="col-sm-12" style="text-align:center;">
        <form id="form-go-back" action="${pageContext.request.contextPath}/catalogo">
            <div id='go-back-listado'>
                <input type='submit' id="btn-go-back" class='btn btn-primary' style='color:black;' value='Ir a catálogo'>
            </div>
        </form>
    </div>
</body>

<script type="text/javascript">
	var typeError = "${typeError}";
	var pointEntry = "${puntoEntrada}";
	var context = '${pageContext.request.contextPath}';
	if(pointEntry=="C")
		$('#form-go-back').attr("action", context + "/catalogo");
	else if(pointEntry=="B") {
		$('#form-go-back').attr("action", context + "/backoffice");
		$('#btn-go-back').val("Ir a home");
		$('#link-navbar-home').attr("href",  context + "/backoffice/");
	}
	
	//Hacer un case con los distintos casos
	switch (typeError){
		case "preventAccess":
			$('#errorMsj').html('Oops! Acceso no autorizado.');
			break;
		case "bdError":
			$('#errorMsj').html('Oops! Error de conexión con la base de datos, intente más tarde.');
			break;
		case "apiConnectError":
			$('#errorMsj').html('Oops! Error de conexión, intente nuevamente más tarde.');
			break;
		default:
			$('#errorMsj').html('Oops! La página a la que intenta acceder no existe.');
			break;
	}

		
</script>
</html>