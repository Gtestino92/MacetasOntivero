package com.catalogo.controllers;

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

import com.catalogomacetas.adapters.AdapterGoSolicitarPedido;
import com.catalogomacetas.adapters.AdapterMacetasByFormato;
import com.catalogomacetas.reqs.ReqEnviarPedido;
import com.catalogomacetas.reqs.ReqGetDetallePedido;
import com.catalogomacetas.reqs.ReqGetListadosByFormatos;
import com.catalogomacetas.reqs.ReqSendNotification;
import com.catalogomacetas.reqs.models.ReqGetDetallePedidoResponse;
import com.commonsmodels.json.JsonGenerator;
import com.commonsmodels.models.EstadoPedido;
import com.commonsmodels.models.Maceta;
import com.commonsmodels.models.Pedido;
import com.commonsmodels.reqs.commons.DefaultRequest;

@Controller
@RequestMapping("/catalogo")
public class CatalogoMacetasController {

	private static final String LIST_MACETAS_BY_FORMATO = "list_macetas_by_formato";

	@Autowired
	private ReqGetListadosByFormatos reqGetListadosByFormatos;

	@Autowired
	private ReqGetDetallePedido reqGetDetallePedido;

	@Autowired
	private ReqEnviarPedido reqEnviarPedido;

	@Autowired
	private ReqSendNotification reqSendNotification;
	
	@GetMapping(value = { "" })
	public String showPage(Model model, HttpSession session) {
		HashMap<String, List<Maceta>> listByFormato = reqGetListadosByFormatos
				.runService(DefaultRequest.builder().build());
		session.setAttribute(LIST_MACETAS_BY_FORMATO, listByFormato);
		model.addAttribute("data",
				JsonGenerator.convertObjectToJSON(AdapterMacetasByFormato.getAdapters(listByFormato)));
		return "catalogo/listado_macetas";
	}

	@SuppressWarnings("unchecked")
	@PostMapping(value = { "/solicitar" })
	public String goSolicitar(HttpServletRequest request, @RequestParam String jsonStrPedido, HttpSession session,
			Model model) {
		ReqGetDetallePedidoResponse result = reqGetDetallePedido.runService(jsonStrPedido);
		model.addAttribute("data",
				JsonGenerator.convertObjectToJSON(new AdapterGoSolicitarPedido(result.getPedidoSolicitado(),
						result.getListRecomendaciones(),
						getFullList((HashMap<String, List<Maceta>>) session.getAttribute(LIST_MACETAS_BY_FORMATO)))));
		return "catalogo/detalle_pedido";
	}

	@PostMapping(value = { "/enviarPedido" })
	public String enviarPedido(HttpServletRequest request, @RequestParam String nombre, @RequestParam String mail,
			@RequestParam String msjMail, @RequestParam(required = false) String celular, @RequestParam Long total,
			@RequestParam Integer cantModelos, Model model) {
		Long idPedido = reqEnviarPedido.runService(Pedido.builder().celular(celular).mail(mail).msjMail(msjMail).nombre(nombre)
				.total(total).estadoPedido(EstadoPedido.PENDIENTE)
				.listadoMacetas(getListadoPedidoByHttpRequest(request, cantModelos)).build());
		reqSendNotification.runService(idPedido);
		return "catalogo/envio_pedido_ok";
	}

	private List<Maceta> getListadoPedidoByHttpRequest(HttpServletRequest request, Integer cantModelos) {
		List<Maceta> listado = new ArrayList<>();
		for (int i = 0; i < cantModelos; i++) {
			String codigo = request.getParameter("modeloCod" + i);
			String codigoNew = request.getParameter("modeloCodNew" + i);
			Integer cantSolicitada = Integer.parseInt(request.getParameter("modeloCant" + i));
			listado.add(Maceta.builder().codigo(codigo).codigoNew(codigoNew).cantSolicitada(cantSolicitada).build());
		}
		return listado;
	}

	private List<Maceta> getFullList(HashMap<String, List<Maceta>> listByFormato) {
		if (listByFormato == null)
			listByFormato = reqGetListadosByFormatos.runService(DefaultRequest.builder().build());
		List<Maceta> listMacetasFull = new ArrayList<>();
		for (String key : listByFormato.keySet()) {
			listMacetasFull.addAll(listByFormato.get(key));
		}
		return listMacetasFull;
	}

}
