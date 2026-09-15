<!DOCTYPE html>
<html>

<head>
<%@include file="../header_backoffice.jsp"%>

</head>


<%@include file="../navbar_backoffice.jsp"%>

<body style='background-color: darkseagreen;'>
	<br>
	<br>
	<br>
	<br>
	<br>
	<h1 style='text-decoration: underline; text-align: center'>Alta Pedidos ML</h1>

	<br>
	<br>
	<br>

	<div class='container'>
		<div class='row'>
			<div class='col-lg-8' style="position:relative;left:17%">
				<form action="${pageContext.request.contextPath}/backoffice/insertPedidosEntregadosML" method="post" id="form-alta-ml">

					<div class="row" style="position:relative;left:15%">
						<div class="col-md-6">
							<div class="title">
								<h3>Subir archivo (.xlsx)</h3>
							</div>
							<div class="dropzone">
								<div class="info"></div>
							</div>
						</div>
						<div class="col-md-6">
							<br><br><br><br>
							<input class="btn btn-primary" type="button" value="Reset"
							id="reset-file-upload"> <br>
						</div>
					</div>
					<br><br><br><br>
					<div class="row" style="text-align:center">
						<div class="col-md-12">
							<input	class="btn btn-primary" type="button" value="Confirmar"
								id="altaMLBtn"> <input name="jsonPedidosML" id="jsonPedidosML" style="display: none;">
						</div>
					</div>
				</form>
			</div>
			<br> <br>

		</div>
		<br> <br>

	</div>

</body>

<script type="text/javascript">
	var global = {};
	global.context = '${pageContext.request.contextPath}';
</script>

<script src='${pageContext.request.contextPath}/backoffice/js/pedidos/alta-masiva-ml.js'></script>

</html>