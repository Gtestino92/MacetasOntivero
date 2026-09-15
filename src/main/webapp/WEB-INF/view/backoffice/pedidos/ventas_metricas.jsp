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
	<h1 style='text-decoration: underline; text-align: center'>Métricas de Ventas</h1>

	<br>
	<br>
	<br>
	
	<div class="container">
		<div class="row">
			<div class="col-sm-2"></div>
			<div class="col-sm-8 canvas-div">
				<canvas id="myChart" width="70" height="50"></canvas>
			</div>
			<div class="col-sm-2"></div>
		</div>
		<br>
		<br>
		<div class="row">
			<div class="col-sm-2"></div>
			<div class="col-sm-8 text-center">
				<input class="btn btn-primary" type="button" value="Predecir" id="predictionsBtn">
			</div>
			<div class="col-sm-2"></div>
		</div>
	</div>
	
	<br>
	<br>
	<br>
</body>

<script src='${pageContext.request.contextPath}/backoffice/js/pedidos/graph-ventas.js'></script>
<script type="text/javascript">
	var global = {};
	global.context = '${pageContext.request.contextPath}';
	global.data = ${data};
	console.log(global.data);
	global.datasets = getDatasets(global.data.dataByFormato);
	global.graphLabels = global.data.fechas.map(item => new Intl.DateTimeFormat().format(new Date(item)));
	plotData(global.datasets, global.graphLabels, 'line');
</script>


</html>