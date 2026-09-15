<nav class="navbar fixed-top navbar-expand-lg bg-light">

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" id="link-navbar-home" href="${pageContext.request.contextPath}/catalogo">Home </a>
      </li>
      <li>
    	<div>
      	<a class="nav-link" data-placement="bottom"
       	  data-toggle="popover" data-container="body"
       	  type="button" data-html="true" href="#" id="link-navbar-help" >Ayuda </a>
       	<div id="popover-help-content" style="display:none;">
      	 		<ul>
		    	<li class='text-explain'>
		          Clickee en la foto  &nbsp<img id='lupa-img' class='btn' src='/css/search-icon.png' title='Ver foto'></img>  &nbsp para ver la imagen en pantalla completa.
		        </li>
		        <li class='text-explain'>
		          Presione  &nbsp<a class='btn btn-primary btn-explain' style='cursor:auto;' title='Agregar al carrito'>
		          	<i class='fa fa-plus fa-lg' style="position:relative;bottom:1px;"></i></a>  &nbsp para agregar el modelo al &nbsp
	            	<button class='btn btn-secondary' style='background-color:green;width:115px;cursor:auto;'>
	              		<i class='fa fa-shopping-cart fa-lg' style="position:relative;bottom:1px;"></i>&nbsp&nbsp&nbsp<strong>Carrito</strong>&nbsp
	            	</button>
		        </li>
		        <li class='text-explain'>
		          Utilice los  &nbsp<button class='btn btn-primary' style='cursor:auto;'><strong>Filtros</strong></button>  &nbsp para filtrar por formato y tamaño.
		        </li>
		 	</ul>
      	 </div>
      </div>
      </li>
   </ul>
  </div>
</nav>