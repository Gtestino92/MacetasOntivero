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
	<h1 style='text-decoration: underline; text-align: center'>Modificar Pedido</h1>
	<br>
	<br>
	<br>

	<div class='container'>
		<div class='row'>
			<div class="col-sm-2"></div>
			<div class='col-sm-8' class="col-listados">
				<form action="${pageContext.request.contextPath}/backoffice/modifPedido" method="post" id="form-modif-pedido">


					<table id="table-pedido" class="table table-striped">
						<tr>
							<th></th>
							<th class="text-center">Modelo</th>
							<th class="text-center"><label>Cantidad</label></th>
							<th style="width: 90px;"></th>
						</tr>
						<tr>
							<td><a title="Agregar modelo" data-numbtn=0
								class="btn btn-primary add-modelo"><i class="fa fa-plus fa-lg"></i></a></td>
							<td><select class="form-control" id="codigoNew0"
								name="codigoNew0"></select></td>
							<td><input name="cantSolicitada0" class="form-control num-input"
								type="number" id="cantSolicitada0"
								style="width: 70px; position: relative; left: 30px;"></td>
							<td></td>
						</tr>
					</table>
					<br>
					<div>				
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
						
						<br>
						<div class="row" style="text-align: center">
							<div class="col-sm-8" style="text-align: center">
								<input class="btn btn-primary" type="button" value="Confirmar"
									id="modifPedidoBtn" style="position:relative;left:25%">
								<input name="cantModelos" type="hidden" value=1 >
								<input id="idPedido" name="idPedido" type="hidden">
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

<script src='${pageContext.request.contextPath}/backoffice/js/pedidos/modif-pedido.js'></script>
<script type="text/javascript">
	var global = {};
	global.data = ${data};
	
	console.log(global.data.listadoPedido);
	console.log(global.data.macetas);
	$('select[name = "codigoNew0"]').html(
			'<option	disabled selected>Seleccione un modelo</option>'
					+ getHtmlCombo(global.data.macetas));
	$('.add-modelo').click(funcionAppendFila);
	loadDataModif();
</script>
</html>