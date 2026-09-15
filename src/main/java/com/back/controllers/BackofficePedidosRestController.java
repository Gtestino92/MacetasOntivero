package com.back.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backoffice.adapters.AdapterListPedidos;
import com.backoffice.adapters.AdapterPredictionsGraph;
import com.backoffice.reqs.ReqGetPedidosByEstado;
import com.backoffice.reqs.ReqGetPedidosML;
import com.backoffice.reqs.ReqGetPredictions;
import com.backoffice.reqs.ReqUpdatePedidoAsEntregado;
import com.backoffice.reqs.models.ReqGetPedidosByEstadoRequest;
import com.backoffice.reqs.models.ReqGetPredictionsResponse;
import com.commonsmodels.models.BodyPedidosFront;
import com.commonsmodels.models.EstadoPedido;
import com.commonsmodels.models.PedidosEntregadosGraph;
import com.utils.MacetasUtils;

@RestController
@RequestMapping("/backoffice")
public class BackofficePedidosRestController {

	private static final String PEDIDOS_GRAPH = "pedidos_graph";

	@Autowired
	private ReqGetPedidosByEstado reqGetPedidosByEstado;

	@Autowired
	private ReqUpdatePedidoAsEntregado reqUpdatePedidoAsEntregado;

	@Autowired
	private ReqGetPedidosML reqGetPedidosML;

	@Autowired
	private ReqGetPredictions reqGetPredictions;

	@Autowired
	private MacetasUtils macetasUtils;

	@PostMapping(value = { "/getPedidosFilt" })
	public ResponseEntity<AdapterListPedidos> getPedidos(HttpSession session, Model model, @RequestParam String estado,
			@RequestParam(defaultValue = "") String fechaSolicitudDesde,
			@RequestParam(defaultValue = "") String fechaSolicitudHasta,
			@RequestParam(defaultValue = "") String fechaEntregaDesde,
			@RequestParam(defaultValue = "") String fechaEntregaHasta,
			@RequestParam(defaultValue = "0") Integer countFrom,
			@RequestParam(defaultValue = "false") Boolean isNotFilt) {
		BodyPedidosFront response = reqGetPedidosByEstado.runService(ReqGetPedidosByEstadoRequest.builder()
				.estado(EstadoPedido.getEstadoByCode(estado)).fechaSolicitudDesdeStr(fechaSolicitudDesde)
				.fechaSolicitudHastaStr(fechaSolicitudHasta).fechaEntregaDesdeStr(fechaEntregaDesde)
				.fechaEntregaHastaStr(fechaEntregaHasta).countFrom(countFrom).isNotFilt(isNotFilt).build());
		macetasUtils.setFullListadoMacetasEnPedidos(response.getPedidos(), session);
		return new ResponseEntity<>(new AdapterListPedidos(response.getPedidos(), EstadoPedido.getEstadoByCode(estado),
				response.getNoMorePedidosLeft()), HttpStatus.OK);
	}

	@PostMapping(value = { "/updatePedidoEntregado" })
	public ResponseEntity<String> entregarPedido(HttpServletRequest httpRequest, HttpSession session,
			@RequestParam Long idPedido) {
		reqUpdatePedidoAsEntregado.runService(idPedido);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping(value = { "/getListPedidosML" })
	public ResponseEntity<String> getJsonPedidosML(HttpServletRequest httpRequest,
			@RequestParam MultipartFile filePedidosML) {
		return new ResponseEntity<>(reqGetPedidosML.runService(filePedidosML), HttpStatus.OK);
	}

	@GetMapping(value = { "/getPredictions" })
	public ResponseEntity<AdapterPredictionsGraph> getPredictions(HttpServletRequest httpRequest, HttpSession session) {
		ReqGetPredictionsResponse response = reqGetPredictions
				.runService((PedidosEntregadosGraph) session.getAttribute(PEDIDOS_GRAPH));
		return new ResponseEntity<>(new AdapterPredictionsGraph(response.getPredicciones(), response.getFechaPredict()),
				HttpStatus.OK);
	}

}
