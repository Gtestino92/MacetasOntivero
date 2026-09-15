<div class="modal fade bs-example-modal-md"  tabindex="-1" role="dialog" id="modal-eliminar" aria-labelledby="mymdallModalLabel" aria-hidden="true">
  <div class="modal-dialog"> 
    <div class="modal-content" style="background-color: lightgreen;position:relative;left:0.5px;">
      <div class="modal-header">
        <h5 class="modal-title"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>¿Estás seguro que quieres eliminar el modelo?</p>
      </div>
      <form id="form-eliminar" method="post" action="${pageContext.request.contextPath}/backoffice/eliminarModelo">
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" title="Cancelar" data-dismiss="modal">Cancelar</button>							
	        <input name="codigoNew" type="hidden">
	        <button type="submit" class="btn btn-primary" title="Confirmar">Confirmar</button>
	      </div>
	  </form>
    </div>
  </div>
</div>