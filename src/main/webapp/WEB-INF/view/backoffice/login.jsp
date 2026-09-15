<!DOCTYPE html>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>

<head>
	<link rel='stylesheet' href='css/styles.css'>
	<%@include file="header_backoffice.jsp"%>
</head>
<%@include file="navbar_login.jsp"%>
<br><br><br><br><br>
	
<body style='background-color: darkseagreen;'>
	<div class="container">
		<div
			style="width: 600px; margin-left: auto; margin-right: auto; margin-top: 24px; padding: 24px;">
			<div class="card">
				<div class="card-header">
					<i class="fa fa-user"></i> BackOffice - Ingreso
				</div>
				<div class="card-block" style="padding: 24px;">
					<form name="f" action="${pageContext.request.contextPath}/backoffice/login" method="post">
						<fieldset>
							<!-- Thymeleaf + Spring Security error display -->
							<c:if test='${error}'>
      
								<div class="alert alert-danger">
								<c:out value = "Acceso denegado"></c:out></div>
							</c:if>
							<c:if test='${logout}'>
      
								<div class="alert alert-success">
								<c:out value = "La sesión ha acabado"></c:out></div>
							</c:if>
							<!-- Login Controls -->
							<div class="form-group">
								<label for="username">Usuario</label> <input type="text"
									class="form-control" id="username" name="username"
									placeholder="Usuario">
							</div>

							<div class="form-group">
								<label for="password">Contraseña</label> <input type="password"
									class="form-control" id="password" name="password"
									placeholder="Contraseña">
							</div>

							<div class="form-check">
								<input type="checkbox" class="form-check-input pointer"
									id="remember-me" name="remember-me" style="transform:scale(1.7);position:relative;bottom:-2.5px;left:4px;"> <label
									class="form-check-label" for="remember-me" style="margin-left:8px;">Recordarme?</label>
							</div>

							<!-- Login Button -->
							<div class="form-actions" style="margin-top: 20px;text-align: center">
								<button type="submit" class="btn btn-success">Ingresar</button>
							</div>
						</fieldset>
					</form>
					
				</div>
			</div>
		</div>
	</div>
</body>
</html>