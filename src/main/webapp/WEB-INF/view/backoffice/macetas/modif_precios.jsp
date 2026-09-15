<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<%@include file="../header_backoffice.jsp" %>
      
  
</head>

<%@include file="../navbar_backoffice.jsp" %>

<body style='background-color: darkseagreen;'>

<br><br><br><br><br>
<h1 style='text-decoration:underline;text-align:center'>Modificar Precios </h1>

<br><br><br>

<div class='container'>
	<div class='row'>
		<div class="col-sm-4"></div>
		<div class="col-sm-4">
			<table id="table-pedido" class="table table-striped">
				<tr>
					<th class="text-center"> Aumento (%)</th>
					<th class="text-center"> Redondeo a </th>
					</tr>
				<tr>
					<td ><input name="pct-aumento" class="form-control num-input"
						type="number" id="pct-aumento" style="width: 70px; position:relative;left:26%;"></td>
					<td> 
						<select class="form-control" id='redondeo' style="width: 75px; position:relative;left:25%;">
							<option value=5>5</option>
							<option value=10>10</option>
						</select> 
					</td>
				</tr>
				<tr>
					<td><button id="btn-clean-precios" type="button" class="btn btn-secondary" title="Limpiar">Limpiar</button></td>
					<td> <button id="btn-aplicar-aumento" type="button" class="btn btn-secondary" title="Aplicar">Aplicar</button> </td>
				</tr>
				<tr> 
					<td colspan="2">
						<button id="btn-prev-precios" type="button" class="btn btn-secondary" title="Aplicar">Precios Anteriores</button>
					</td>
				</tr>
			</table>
		</div>
		<div class="col-sm-4"></div>
	</div>
	<br>
	<div class='row'>
		<div class="col-sm-2"></div>
		<div class='col-sm-8 col-listado-precios'>
			<form action="${pageContext.request.contextPath}/backoffice/modifPrecios" method="post" id="form-modif-precios">

				<table id="table-modif-precios" class="table table-striped">
					<tr>
						<th class="text-center">Código New</th> 
						<th class="text-center">Código</th>
						<th class="text-center">Formato</th> 
						<th class="text-center">Precio Anterior ($)</th>
						<th class="text-center">Precio Actual ($)</th> 
						<th class="text-center">Precio Nuevo ($)</th>
						<th class="text-center" style="width: 90px;vertical-align:middle;">
							<input class="pointer checkbox" type="checkbox" 
							id="allChkConfirm" value="N">
						</th>
					</tr>
				</table>
				<input name="cantModelos" type="hidden" value=0 >
			</form>
		</div>
		<div class="col-sm-2"></div>
		<br> <br>

	</div>
	<br> <br>
	<div class="row" id="msjNotCheckedDiv" style="text-align: center;display:none">
		<div class="col-sm-8" 
		style="text-align: center;position:relative;left:15%">
			<div id="msjNotChecked" class="error-highlight" style="height:60%;border-radius:7px;color: red;">
				* Debe seleccionar al menos un modelo
			</div>
		</div>
		<br><br>
	</div>
	<div class="row" style="text-align: center">
		<div class="col-sm-8" style="text-align: center">
			<input class="btn btn-primary" type="button" value="Confirmar"
				id="modifPreciosBtn" style="position:relative;left:25%;display:none;">
		</div>
	</div>
	
</div>

<br><br><br><br>  

<script src='${pageContext.request.contextPath}/backoffice/js/macetas/modif-precios.js'></script>
<script src='${pageContext.request.contextPath}/backoffice/js/macetas/tablas-body-precios.js'></script>
<script>
	var global = {};
	global.data = ${data};
	global.listPreciosNuevos = [];
	$('input[name="cantModelos"]').val(Number(global.data.length));
	$('#allChkConfirm').hide();
	makeListado();
</script>
