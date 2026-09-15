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
	<h1 style='text-decoration: underline; text-align: center'>Alta
		Modelo</h1>

	<br>
	<br>
	<br>

	<div class='container'>
		<div class='row'>
			<div class='col-lg-8' style="position:relative;left:15%">
				<form action="${pageContext.request.contextPath}/backoffice/altaModelo" method="post" id="form-alta-modelo">

					<table class="table table-striped">
						<tr>
							<td style="text-align:left;"><label style="font-weight:bold">Código</label></td>
							<td><label><input class="form-control" type="text" id="codigo" name="codigo"></label></td>
						</tr>
						<tr>
							<td style="text-align:left;"><label style="font-weight:bold">Código Nuevo</label></td>
							<td><label><input class="form-control" type="text" id="codigoNew" maxlength=5 name="codigoNew"></label></td>
						</tr>
						<tr>
							<td style="text-align:left;"><label style="font-weight:bold">Formato</label></td>
							<td><label><select class="form-control" id="formato" name="formato"></select></label></td>
						</tr>
						<tr>
							<td style="text-align:left;"><label  style="font-weight:bold">Largo (cm)</label></td>
							<td><label><input class="form-control num-input" id="largo" type="number" name="largo" style="width:100px"></label></td>
						</tr>
						<tr>
							<td style="text-align:left;"><label style="font-weight:bold">Ancho (cm)</label></td>
							<td><label><input class="form-control num-input" type="number" id="ancho" name="ancho" style="width:100px"></label></td>
						</tr>
						<tr>
							<td style="text-align:left;"><label style="font-weight:bold">Alto (cm)</label></td>
							<td><label><input class="form-control num-input" type="number" id="alto" name="alto" style="width:100px"></label></td>
						</tr>
						<tr>
							<td style="text-align:left;"><label style="font-weight:bold">Precio ($)</label></td>
							<td><label><input class="form-control num-input" type="number" id="precio" name="precio" style="width:100px"></label></td>
						</tr>
						<tr>
							<td style="text-align:left;"><label style="font-weight:bold">Capacidad (cm<sup>3</sup>)</label></td>
							<td><label><input class="form-control  num-input" type="number"
								id="capacidad" name="capacidad" style="width:100px"></label></td>
						</tr>
					</table>


					<br>
					<div class="row" style="position:relative;left:10%">
						<div class="col-md-6" id="imgur-div">
							<div class="title">
								<h3>Subir fotos</h3>
							</div>
							<div class="dropzone">
								<div class="info"></div>
							</div>
						</div>
						<div class="col-md-6">
							<br><br><br><br>
							<input class="btn btn-primary" type="button" value="Reset"
							id="reset-img-upload"> <br>
						</div>
					</div>
					<br><br><br><br>
					<div class="row" style="text-align:center">
						<div class="col-md-12">
							<input	class="btn btn-primary" type="button" value="Confirmar"
								id="altaBtn"> <input name="cantImagenes" type="number"
								value=0 style="display: none;">
						</div>
					</div>
				</form>
			</div>
			<br> <br>

		</div>
		<br> <br>

	</div>

</body>


<script type="text/javascript" src="${pageContext.request.contextPath}/backoffice/js/macetas/imgur.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/backoffice/js/macetas/upload.js"></script>
<script src='${pageContext.request.contextPath}/backoffice/js/macetas/alta-modelo.js'></script>
<script type="text/javascript">
	var global = {};
	global.data = ${data};
	global.cantImag = 0;
	$('select[name = "formato"]').html(
			'<option	disabled selected>Seleccione un formato</option>'
					+ getHtmlCombo(global.data.formatos));
</script>

</html>