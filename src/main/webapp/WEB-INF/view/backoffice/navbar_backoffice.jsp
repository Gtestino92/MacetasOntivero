<nav class="navbar fixed-top navbar-expand-lg bg-light">

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="${pageContext.request.contextPath}/backoffice"> Catálogo </a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle pointer" data-target="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Mantenimiento Listados
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="${pageContext.request.contextPath}/backoffice/goAltaModelo">Alta Modelo</a>
          <a class="dropdown-item" href="${pageContext.request.contextPath}/backoffice/goModificarListados">Modificar Listados</a>
          <a class="dropdown-item" href="${pageContext.request.contextPath}/backoffice/goModifPreciosMasiva">Modificar precios masivamente</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle pointer" data-target="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Pedidos
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="${pageContext.request.contextPath}/backoffice/pedidosPendientes">Pendientes</a>
          <a class="dropdown-item" href="${pageContext.request.contextPath}/backoffice/pedidosEntregados">Entregados</a>
          <a class="dropdown-item" href="${pageContext.request.contextPath}/backoffice/pedidosCancelados">Cancelados</a>
          <a class="dropdown-item" href="${pageContext.request.contextPath}/backoffice/goAltaPedido">Agregar Pedido</a>
          <a class="dropdown-item" href="${pageContext.request.contextPath}/backoffice/goAltaML">Alta pedidos ML</a>
        </div>
      </li>
     
      <li class="nav-item">
        <a class="nav-link" href="${pageContext.request.contextPath}/backoffice/goDataAnalysis" style="color:red;">Métricas Ventas</a>
      </li>
    	
      <li class="nav-item">
      	<a class="nav-link notification" title="Notificaciones" href="${pageContext.request.contextPath}/backoffice/notifications"> 
        	<span><i class="fa fa-bell fa-lg notif-bell"></i></span>
	    	<span class="badge" style="display: none;">0</span>
		</a>
      </li>  
    
    </ul>
    
    <!-- >ul class="navbar-nav mr-auto">
    	</ul --> 
   	
    <form class="form-inline my-4 my-lg-1" action="${pageContext.request.contextPath}/backoffice/logout" method="post">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Salir</button>
    </form>
  </div>
</nav>

<script src='${pageContext.request.contextPath}/backoffice/js/pedidos/update-notif.js'></script>
<script>
	var context = '${pageContext.request.contextPath}';
	setTimeout(
			function() {
				executeAjaxWithoutTimeout(context + '/backoffice/getCantNotifications', 'updateCantNotifications', $(this), null);
			}, 1000);

</script>