<div class="modal fade bs-example-modal-md" tabindex="-1" role="dialog"
	id="modal-add-recom" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content"
			style="background-color: lightgreen; position: relative; left: 0.5px;">
			<div class="modal-header">
				<h5 class="modal-title"></h5>
				<button type="button" class="close" id="close-modal-add-recom"
					data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<p>
					Agregar el modelo <label class='label-modelo' id='add-recom-codigo'></label>
					al pedido
				</p>

				<table>
					<tr>
						<td>Medidas:</td>
						<td><label id='add-recom-largo'></label>x<label
							id='add-recom-ancho'></label>x<label id='add-recom-alto'></label>cm
						</td>
					</tr>
					<tr>
						<td>Precio:</td>
						<td>$<label id='add-recom-precio'></label>
						</td>
					</tr>
					<tr>
						<td>Cantidad:</td>
						<td><label> <input id='add-recom-cant' type='number'
								min='0' style="width: 70px;" class='form-control'></label></td>
					</tr>
				</table>

				<input type='hidden' id='add-recom-cod-new'>
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" title="Cancelar"
					data-dismiss="modal">Cancelar</button>
				<button id='add-recom-confirmar' type="button"
					class="btn btn-primary" title="Confirmar">Confirmar</button>
			</div>

		</div>
	</div>
</div>