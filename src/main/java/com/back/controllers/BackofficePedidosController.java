package com.back.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.backoffice.adapters.AdapterGoAltaPedido;
import com.backoffice.adapters.AdapterGoModifListadoPedido;
import com.backoffice.reqs.ReqAltaPedido;
import com.backoffice.reqs.ReqCancelarPedido;
import com.backoffice.reqs.ReqGoAltaPedido;
import com.backoffice.reqs.ReqGoModificarListadoPedido;
import com.backoffice.reqs.ReqInsertPedidosML;
import com.backoffice.reqs.ReqModificarListadoPedido;
import com.backoffice.reqs.models.ReqAltaPedidoRequest;
import com.backoffice.reqs.models.ReqGoModificarListadoPedidoRequest;
import com.backoffice.reqs.models.ReqModificarListadoPedidoRequest;
import com.commonsmodels.json.JsonGenerator;
import com.commonsmodels.models.EstadoPedido;
import com.commonsmodels.models.Maceta;
import com.commonsmodels.models.Pedido;
import com.commonsmodels.reqs.commons.DefaultRequest;

@Controller
@RequestMapping("/backoffice")
public class BackofficePedidosController {

	private static final String SUCCESS = "success";

	private static final String BACKOFFICE_UPDATE_PEDIDO_OK = "backoffice/update_pedido_ok";

	private static final String LIST_MACETAS_BY_FORMATO = "list_macetas_by_formato";

	@Autowired
	private BackofficePedidosRestController pedidosRestController;

	@Autowired
	private ReqGoModificarListadoPedido reqGoModificarListadoPedido;

	@Autowired
	private ReqModificarListadoPedido reqModificarListadoPedido;

	@Autowired
	private ReqGoAltaPedido reqGoAltaPedido;

	@Autowired
	private ReqAltaPedido reqAltaPedido;

	@Autowired
	private ReqCancelarPedido reqCancelarPedido;

	@Autowired
	private ReqInsertPedidosML reqInsertPedidosML;

	@GetMapping(value = { "/pedidosPendientes" })
	public String goPedidosPendientes(HttpSession session, Model model,
			@RequestParam(defaultValue = "") String fechaSolicitudDesde,
			@RequestParam(defaultValue = "") String fechaSolicitudHasta,
			@RequestParam(defaultValue = "") String fechaEntregaDesde,
			@RequestParam(defaultValue = "") String fechaEntregaHasta) {
		model.addAttribute("data",
				JsonGenerator.convertObjectToJSON(pedidosRestController
						.getPedidos(session, model, EstadoPedido.PENDIENTE.getCode(), fechaSolicitudDesde,
								fechaSolicitudHasta, fechaEntregaDesde, fechaEntregaHasta, 0, true)
						.getBody()));
		return "backoffice/pedidos/pedidos_pendientes";
	}

	@GetMapping(value = { "/pedidosEntregados" })
	public String goPedidosEntregados(HttpSession session, Model model,
			@RequestParam(defaultValue = "") String fechaSolicitudDesde,
			@RequestParam(defaultValue = "") String fechaSolicitudHasta,
			@RequestParam(defaultValue = "") String fechaEntregaDesde,
			@RequestParam(defaultValue = "") String fechaEntregaHasta) {
		model.addAttribute("data",
				JsonGenerator.convertObjectToJSON(pedidosRestController
						.getPedidos(session, model, EstadoPedido.ENTREGADO.getCode(), fechaSolicitudDesde,
								fechaSolicitudHasta, fechaEntregaDesde, fechaEntregaHasta, 0, true)
						.getBody()));
		return "backoffice/pedidos/pedidos_entregados";
	}

	@GetMapping(value = { "/pedidosCancelados" })
	public String goPedidosCancelados(HttpSession session, Model model,
			@RequestParam(defaultValue = "") String fechaSolicitudDesde,
			@RequestParam(defaultValue = "") String fechaSolicitudHasta,
			@RequestParam(defaultValue = "") String fechaEntregaDesde,
			@RequestParam(defaultValue = "") String fechaEntregaHasta) {
		model.addAttribute("data",
				JsonGenerator.convertObjectToJSON(pedidosRestController
						.getPedidos(session, model, EstadoPedido.CANCELADO.getCode(), fechaSolicitudDesde,
								fechaSolicitudHasta, fechaEntregaDesde, fechaEntregaHasta, 0, true)
						.getBody()));
		return "backoffice/pedidos/pedidos_cancelados";
	}

	@SuppressWarnings("unchecked")
	@GetMapping(value = { "/goModifListadoPedido" })
	public String goModificarPedido(Model model, HttpSession session, @RequestParam Long idPedido,
			@RequestParam String estado, @RequestParam Long total) {
		Pedido result = reqGoModificarListadoPedido.runService(
				ReqGoModificarListadoPedidoRequest.builder().estado(estado).idPedido(idPedido).total(total).build());
		model.addAttribute("data",
				JsonGenerator.convertObjectToJSON(new AdapterGoModifListadoPedido(result.getListadoMacetas(),
						getFullList((HashMap<String, List<Maceta>>) session.getAttribute(LIST_MACETAS_BY_FORMATO)),
						result.getTotal(), result.getIdPedido())));
		return "backoffice/pedidos/modif_pedido";
	}

	@PostMapping(value = { "/modifPedido" })
	public String modifPedido(HttpServletRequest httpRequest, Model model, @RequestParam Long idPedido,
			@RequestParam Integer cantModelos, @RequestParam Long total) {
		reqModificarListadoPedido.runService(ReqModificarListadoPedidoRequest.builder().idPedido(idPedido).total(total)
				.listadoMacetas(getListadoMacetasByHttpRequest(httpRequest, cantModelos)).build());
		model.addAttribute(SUCCESS, "update");
		return BACKOFFICE_UPDATE_PEDIDO_OK;
	}

	@GetMapping(value = { "/goAltaPedido" })
	public String goAltaPedido(Model model) {
		model.addAttribute("data", JsonGenerator.convertObjectToJSON(
				new AdapterGoAltaPedido(reqGoAltaPedido.runService(DefaultRequest.builder().build()))));
		return "backoffice/pedidos/alta_pedido";
	}

	@PostMapping(value = { "/altaPedido" })
	public String altaPedido(HttpServletRequest httpRequest, Model model, @RequestParam String fechaSolicitud,
			@RequestParam(required = false) String fechaEntrega, @RequestParam String estadoPedido,
			@RequestParam String celular, @RequestParam String mail, @RequestParam String nombre,
			@RequestParam Integer cantModelos, @RequestParam Long total) {
		reqAltaPedido.runService(ReqAltaPedidoRequest.builder().celular(celular).mail(mail).nombre(nombre).total(total)
				.fechaEntrega(fechaEntrega).fechaSolicitud(fechaSolicitud).estadoPedido(estadoPedido)
				.listadoMacetas(getListadoMacetasByHttpRequest(httpRequest, cantModelos)).build());
		model.addAttribute(SUCCESS, "alta");
		return BACKOFFICE_UPDATE_PEDIDO_OK;
	}

	@PostMapping(value = { "/cancelarPedido" })
	public String cancelarPedido(HttpServletRequest httpRequest, Model model, @RequestParam Long idPedido) {
		reqCancelarPedido.runService(idPedido);
		model.addAttribute(SUCCESS, "cancel");
		return BACKOFFICE_UPDATE_PEDIDO_OK;
	}

	@GetMapping(value = { "/goAltaML" })
	public String goAltaPedidosML() {
		return "backoffice/pedidos/alta_masiva_ml";
	}

	@PostMapping(value = { "/insertPedidosEntregadosML" })
	public String insertPedidosEntregadosML(HttpServletRequest httpRequest, Model model,
			@RequestParam String jsonPedidosML) {
		reqInsertPedidosML.runService(jsonPedidosML);
		model.addAttribute(SUCCESS, "insertML");
		return "backoffice/update_ok";
	}

	private List<Maceta> getListadoMacetasByHttpRequest(HttpServletRequest httpRequest, Integer cantModelos) {
		List<Maceta> macetasList = new ArrayList<>();
		for (int i = 0; i < cantModelos; i++) {
			macetasList.add(Maceta.builder().codigoNew(httpRequest.getParameter("codigoNew" + i))
					.cantSolicitada(Integer.parseInt(httpRequest.getParameter("cantSolicitada" + i))).build());
		}
		return macetasList;
	}

	private List<Maceta> getFullList(HashMap<String, List<Maceta>> listByFormato) {
		List<Maceta> listMacetasFull = new ArrayList<>();
		for (String key : listByFormato.keySet()) {
			listMacetasFull.addAll(listByFormato.get(key));
		}
		return listMacetasFull;
	}

}
