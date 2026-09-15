<!DOCTYPE html>
<html>

<head>
	<link rel='stylesheet' href='css/styles.css'>
	<%@include file="header.jsp" %>
</head>

<%@include file="navbar.jsp" %>


<body style='background-color: darkseagreen;'>
    <br><br><br><br><br>
    
    <h1 style='text-align:center'>Tu pedido ha sido enviado! Te contactaremos en breve. </h1>

    <br><br>

    <div class="col-sm-12" style="text-align:center;">
        <form action="${pageContext.request.contextPath}/catalogo">
            <div id='go-back-listado'>
                <input type='submit' class='btn btn-primary' style='color:black;' value='Volver a listados'>
            </div>
        </form>
    </div>
</body>

</html>