<!DOCTYPE html>
<html>

<head>
	<%@include file="header_backoffice.jsp" %>
</head>

<%@include file="navbar_backoffice.jsp" %>

<body style='background-color: darkseagreen;'>
    <br><br><br><br><br>
    
    <h1 style='text-align:center' id="updateMsj"> </h1>
    
    <br>

    <div class="col-sm-12" style="text-align:center;">
        <form action="${pageContext.request.contextPath}/backoffice">
            <div id='go-back-listado'>
                <input type='submit' class='btn btn-primary' style='color:black;' value='Volver a listados'>
            </div>
        </form>
    </div>
</body>

<script type="text/javascript">
	var success = "${success}";
	//Hacer un case con los distintos casos
	switch (success){
		case "alta":
			$('#updateMsj').html('Se ha agregado el pedido correctamente!');
			break;
		case "update":
			$('#updateMsj').html('Se ha actualizado el pedido correctamente!');
			break;
		case "delete":
			$('#updateMsj').html('Se ha eliminado el pedido correctamente!');
			break;
		case "cancel":
			$('#updateMsj').html('Se ha cancelado el pedido correctamente!');
			break;
		default:
			break;
	}
</script>

</html>