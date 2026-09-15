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
		pedido</h1>

	<br>
	<br>
	<br>

	<div class='container'>
		<div class='row'>
			<div class="col-sm-2"></div>
			<div class='col-sm-8 col-listados'>
				<form action="${pageContext.request.contextPath}/backoffice/altaPedido" method="post" id="form-alta-pedido">

					<table id="table-pedido" class="table table-striped ">
						<tr>
							<th></th>
							<th class="text-center">Modelo</th>
							<th class="text-center"><label>Cantidad</label></th>
							<th style="width: 90px;"></th>
						</tr>
						<tr>
							<td><a title="Agregar modelo" data-numbtn=0
								class="btn btn-primary add-modelo"><i
									class="fa fa-plus fa-lg"></i></a></td>
							<td><select class="form-control" id="codigoNew0"
								name="codigoNew0"></select></td>
							<td><input name="cantSolicitada0" class="form-control num-input"
								type="number" id="cantSolicitada0"
								style="width: 70px; position: relative; left: 30px;"></td>
							<td></td>
						</tr>
					</table>


					<br> <br>
					<div>

						<div class='row'>
							<div class='col-sm-4' style='text-align: center;'>
								<label class="label-form"> Nombre: </label>
							</div>
							<div class='col-sm-4'>
								<input class='form-control' id='nombre' name='nombre'
									style='width: 400px;' maxlength=30>
							</div>

						</div>
						<br>
						<div class='row'>
							<div class='col-sm-4' style='text-align: center;'>
								<label class="label-form"> Mail: </label>
							</div>
							<div class='col-sm-4'>
								<input class='form-control' id='mail' name='mail'
									style='width: 400px;' maxlength=30>
							</div>

						</div>

						<br>
						<div class='row'>
							<div class='col-sm-4' style='text-align: center;'>
								<label class="label-form"> Celular: </label>
							</div>
							<div class='col-sm-4'>
								<input class='form-control' id='celular' name='celular'
									style='width: 400px;' maxlength=15>
							</div>

						</div>

						<br>
					
						<div class='row'>
							<div class='col-sm-4' style='text-align: center;'>
								<label class="label-form"> Estado de Pedido </label>
							</div>
							<div class='col-sm-4'>
								<div style='position: relative; left: 40%'>

									<select class="form-control" id="estadoPedido"
										name="estadoPedido"></select>
								</div>
							</div>
						</div>
					
						<br>
						<div class='row'>
							<div class='col-sm-4' style='text-align: center;'>
								<label class="label-form"> Fecha de Solicitud </label>
							</div>
							<div class='col-sm-4' style='position: relative; left: 8%'>
								<input name="fechaSolicitud" id="fechaSolicitud" width="276" />
							</div>

						</div>
						
						<div id="fechaEntregaDiv" style="display:none">
							<br>
							<div class='row'>
								
								<div class='col-sm-4' style='text-align: center;'>
									<label class="label-form"> Fecha de Entrega </label>
								</div>
								<div class='col-sm-4' style='position: relative; left: 8%'>
									<input name="fechaEntrega" id="fechaEntrega" width="276" />
								</div>
	
							</div>
						</div>
						<br>

						<div class='row'>
							<div class='col-sm-4' style='text-align: center;'>
								<label class="label-form"> Total </label>
							</div>
							<div class='col-sm-4'>
								<input class='form-control num-input' type="number" id='total'
									name='total' style='width: 250px;position:relative;left:0%' maxlength=30>
								
							</div>
							<div class='col-sm-4'>
								<button id="calcularTotal" type="button" style='position:relative;left:13%'
									class="btn btn-secondary" title="Calcular total">Calcular total</button>
							</div>

						</div>
						<br>
						<div class="row" id="msjRepeatedDiv" style="text-align: center;display:none">
							<div class="col-sm-8" 
							style="text-align: center;position:relative;left:15%">
								<div id="msjRepeated" class="error-highlight" style="height:60%;border-radius:7px;color: red;">
									* Al menos un modelo se encuentra repetido
								</div>
							</div>
							<br><br>
						</div>
						
						<div class="row" id="fechasErrorDiv" style="text-align: center;display:none">
							<div class="col-sm-8" 
							style="text-align: center;position:relative;left:15%">
								<div id="fechasError" class="error-highlight" style="height:60%;border-radius:7px;color: red;">
									* La fecha de solicitud no puede ser posterior a la de entrega
								</div>
							</div>
							<br><br>
						</div>
						<br>
						<div class="row" style="text-align: center">
							<div class="col-sm-8" style="text-align: center">
								<input class="btn btn-primary" type="button" value="Ingresar"
									id="altaPedidoBtn" style="position:relative;left:25%">
								<input name="cantModelos" type="hidden" value=1 >
							</div>
						</div>
					</div>

					
				</form>
			</div>
			<div class="col-sm-2"></div>
			<br> <br>

		</div>
		<br> <br>

	</div>

</body>


<script src='${pageContext.request.contextPath}/backoffice/js/pedidos/alta-pedido.js'></script>
<script src='${pageContext.request.contextPath}/backoffice/js/pedidos/moment.js'></script>
<script type="text/javascript">
	var global = {};
	var data = ${data};
	global.estados = data.estados;
	global.macetas = data.macetas;
	global.cantImag = 0;
	$('select[name = "codigoNew0"]').html(
			'<option	disabled selected>Seleccione un modelo</option>'
					+ getHtmlCombo(global.macetas));
	$('select[name = "estadoPedido"]').html(
			'<option	disabled selected>Seleccione el estado</option>'
					+ getHtmlCombo(global.estados));

	$('#fechaSolicitud').datepicker({uiLibrary : 'bootstrap4', maxDate: new Date(), format: 'dd/mm/yyyy'});
	$('#fechaEntrega').datepicker({uiLibrary : 'bootstrap4', maxDate: new Date(), format: 'dd/mm/yyyy'});
	$('div.ui-datepicker').css("font-size", "62%");
</script>

</html>