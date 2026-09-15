
package com.back.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.backoffice.adapters.AdapterGoAltaModelo;
import com.backoffice.adapters.AdapterMaceta;
import com.backoffice.adapters.AdapterMacetaPrecio;
import com.backoffice.adapters.AdapterMacetasByFormato;
import com.backoffice.adapters.AdapterPedidosGraph;
import com.backoffice.reqs.ReqAltaMaceta;
import com.backoffice.reqs.ReqEliminarModelo;
import com.backoffice.reqs.ReqGetDataPedidosGraph;
import com.backoffice.reqs.ReqGetTokenOntiveroApi;
import com.backoffice.reqs.ReqGoAltaModelos;
import com.backoffice.reqs.ReqGoModifPreciosMasiva;
import com.backoffice.reqs.ReqGoModificarModelo;
import com.backoffice.reqs.ReqModifPrecios;
import com.backoffice.reqs.ReqModificarModelo;
import com.backoffice.reqs.models.ReqGoAltaModelosResponse;
import com.catalogomacetas.reqs.ReqGetListadosByFormatos;
import com.commonsmodels.json.JsonGenerator;
import com.commonsmodels.models.FormatoMaceta;
import com.commonsmodels.models.Maceta;
import com.commonsmodels.models.PedidosEntregadosGraph;
import com.commonsmodels.reqs.commons.DefaultRequest;

@Controller
@RequestMapping("/backoffice")
public class BackofficeController {

	private static final String BACKOFFICE_UPDATE_OK = "backoffice/update_ok";

	private static final String SUCCESS = "success";

	private static final String TOKEN_ONTIVERO_API = "token_ontivero_api";

	private static final String LIST_MACETAS_BY_FORMATO = "list_macetas_by_formato";

	private static final String PEDIDOS_GRAPH = "pedidos_graph";

	@Autowired
	private ReqGetListadosByFormatos reqGetListadosByFormatos;

	@Autowired
	private ReqAltaMaceta reqAltaMaceta;

	@Autowired
	private ReqGoAltaModelos reqGoAltaModelos;

	@Autowired
	private ReqGoModificarModelo reqGoModificarModelo;

	@Autowired
	private ReqModificarModelo reqModificarModelo;

	@Autowired
	private ReqEliminarModelo reqEliminarModelo;

	@Autowired
	private ReqGoModifPreciosMasiva reqGoModifPreciosMasiva;

	@Autowired
	private ReqModifPrecios reqModifPrecios;

	@Autowired
	private ReqGetDataPedidosGraph reqGetDataPedidosGraph;

	@Autowired
	private ReqGetTokenOntiveroApi reqGetTokenOntiveroApi;

	@GetMapping(value = { "/" })
	public String showPage(Model model, HttpSession session) {
		HashMap<String, List<Maceta>> listByFormato = reqGetListadosByFormatos
				.runService(DefaultRequest.builder().build());
		String username = "";
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof UserDetails)
			username = ((UserDetails) principal).getUsername();
		else
			username = principal.toString();
		String token = (String) session.getAttribute(TOKEN_ONTIVERO_API);
		if (StringUtils.isEmpty(token)) {
			try {
				token = reqGetTokenOntiveroApi.runService(username);
				session.setAttribute(TOKEN_ONTIVERO_API, token);
			} catch (Exception e) {
				return login(model, session, "", null);
			}
		}
		session.setAttribute(LIST_MACETAS_BY_FORMATO, listByFormato);
		model.addAttribute("data",
				JsonGenerator.convertObjectToJSON(AdapterMacetasByFormato.getAdapters(listByFormato)));
		return "backoffice/macetas/listado_macetas_backoffice";
	}

	@GetMapping(value = { "/goAltaModelo" })
	public String goAltaModelo(Model model) {
		ReqGoAltaModelosResponse result = reqGoAltaModelos.runService(DefaultRequest.builder().build());
		model.addAttribute("data",
				JsonGenerator.convertObjectToJSON(new AdapterGoAltaModelo(result.getMacetas(), result.getFormatos())));
		return "backoffice/macetas/alta_modelo";
	}

	@PostMapping(value = { "/altaModelo" })
	public String altaModelo(HttpServletRequest httpRequest, Model model, @RequestParam String codigoNew,
			@RequestParam BigDecimal precio, @RequestParam BigDecimal largo, @RequestParam BigDecimal ancho,
			@RequestParam BigDecimal alto, @RequestParam String formato, @RequestParam String codigo,
			@RequestParam Integer capacidad, @RequestParam Integer cantImagenes) {
		reqAltaMaceta.runService(Maceta.builder().precio(precio).largo(largo).codigoNew(codigoNew.toUpperCase())
				.fotosLink(getLinksImagenesFromHttpRequest(httpRequest, cantImagenes, 0))
				.formato(FormatoMaceta.getFormatoByCode(formato)).codigo(codigo).capacidad(capacidad).alto(alto)
				.ancho(ancho).alto(alto).build());
		model.addAttribute(SUCCESS, "alta");
		return BACKOFFICE_UPDATE_OK;
	}

	@GetMapping(value = { "/goModificarListados" })
	public String goModificarListados(Model model, HttpServletResponse response) {
		model.addAttribute("data", JsonGenerator.convertObjectToJSON(AdapterMacetasByFormato
				.getAdapters(reqGetListadosByFormatos.runService(DefaultRequest.builder().build()))));
		return "backoffice/macetas/listado_modificar";
	}

	@GetMapping(value = { "/goModificarModelo" })
	public String goModificarModelo(Model model, @RequestParam String codigoNew) {
		model.addAttribute("data",
				JsonGenerator.convertObjectToJSON(new AdapterMaceta(reqGoModificarModelo.runService(codigoNew))));
		return "backoffice/macetas/modif_modelo";
	}

	@PostMapping(value = { "/modificarModelo" })
	public String modificarModelo(HttpServletRequest httpRequest, Model model, @RequestParam String codigoNew,
			@RequestParam BigDecimal precio, @RequestParam BigDecimal largo, @RequestParam BigDecimal ancho,
			@RequestParam BigDecimal alto, @RequestParam Integer capacidad, @RequestParam Integer cantLinksOld,
			@RequestParam Integer cantLinksNew, @RequestParam Integer cantImgStatic) {
		reqModificarModelo.runService(Maceta.builder().codigoNew(codigoNew.toUpperCase()).precio(precio).largo(largo)
				.fotosLink(getLinksImagenesFromHttpRequest(httpRequest, cantLinksOld, cantLinksNew))
				.capacidad(capacidad).alto(alto).ancho(ancho).alto(alto).cantImgStatic(cantImgStatic).build());
		model.addAttribute(SUCCESS, "update");
		return BACKOFFICE_UPDATE_OK;
	}

	@PostMapping(value = { "/eliminarModelo" })
	public String eliminarModelo(HttpServletRequest httpRequest, Model model, @RequestParam String codigoNew) {
		reqEliminarModelo.runService(codigoNew);
		model.addAttribute(SUCCESS, "delete");
		return BACKOFFICE_UPDATE_OK;
	}

	@GetMapping(value = { "/goModifPreciosMasiva" })
	public String goModifPreciosMasiva(Model model) {
		model.addAttribute("data", JsonGenerator.convertObjectToJSON(
				AdapterMacetaPrecio.getAdapters(reqGoModifPreciosMasiva.runService(DefaultRequest.builder().build()))));
		return "backoffice/macetas/modif_precios";
	}

	@SuppressWarnings("unchecked")
	@PostMapping(value = { "/modifPrecios" })
	public String modifPrecios(HttpServletRequest httpRequest, HttpSession session, Model model,
			@RequestParam Integer cantModelos) {
		reqModifPrecios.runService(getMacetasModifPreciosFromHttpRequest(httpRequest, cantModelos,
				(HashMap<String, List<Maceta>>) session.getAttribute(LIST_MACETAS_BY_FORMATO)));
		model.addAttribute(SUCCESS, "precios");
		return BACKOFFICE_UPDATE_OK;
	}

	@GetMapping(value = { "/goDataAnalysis" })
	public String goDataAnalysis(Model model, HttpSession session) {
		PedidosEntregadosGraph pedidosGraph = reqGetDataPedidosGraph
				.runService((String) session.getAttribute(TOKEN_ONTIVERO_API));
		session.setAttribute(PEDIDOS_GRAPH, pedidosGraph);
		model.addAttribute("data", JsonGenerator.convertObjectToJSON(new AdapterPedidosGraph(pedidosGraph)));
		return "backoffice/pedidos/ventas_metricas";
	}

	@GetMapping(value = { "/login" })
	public String login(Model model, HttpSession session, String error, String logout) {
		if ("".equals(error))
			model.addAttribute("error", true);
		if ("".equals(logout))
			model.addAttribute("logout", true);
		return "backoffice/login";
	}

	private List<String> getLinksImagenesFromHttpRequest(HttpServletRequest httpRequest, Integer cantLinksOld,
			Integer cantLinksNew) {
		List<String> result = new ArrayList<>();
		for (int i = 0; i < cantLinksOld; i++) {
			result.add(httpRequest.getParameter("linkImagenOld" + i));
		}
		for (int i = 0; i < cantLinksNew; i++) {
			result.add(httpRequest.getParameter("linkImagenNew" + i));
		}
		return result;
	}

	private List<Maceta> getMacetasModifPreciosFromHttpRequest(HttpServletRequest httpRequest, Integer cantModelos,
			HashMap<String, List<Maceta>> listByFormato) {
		List<Maceta> result = new ArrayList<>();
		List<String> listAllCodNew = getAllCodigosNew(httpRequest, cantModelos);
		List<String> listCodNewUpdate = getCodigosUpdate(httpRequest, listAllCodNew);
		for (String codigoNew : listCodNewUpdate) {
			BigDecimal precioAnterior = getMacetaByCodNew(listByFormato, codigoNew);
			BigDecimal precioNuevo = new BigDecimal(httpRequest.getParameter("precio-nuevo-" + codigoNew));
			result.add(
					Maceta.builder().codigoNew(codigoNew).precio(precioNuevo).precioAnterior(precioAnterior).build());
		}
		return result;
	}

	private BigDecimal getMacetaByCodNew(HashMap<String, List<Maceta>> listByFormato, String codigoNew) {
		BigDecimal precio = null;
		for (String key : listByFormato.keySet()) {
			List<Maceta> list = listByFormato.get(key);
			for (Maceta maceta : list) {
				if (codigoNew.equals(maceta.getCodigoNew()))
					precio = maceta.getPrecio();
			}
		}
		return precio;
	}

	private List<String> getCodigosUpdate(HttpServletRequest httpRequest, List<String> listAllCodNew) {
		List<String> listCodigosUpdate = new ArrayList<>();
		for (String codNew : listAllCodNew) {
			if ("S".equals(httpRequest.getParameter("precio-chk-" + codNew)))
				listCodigosUpdate.add(codNew);
		}
		return listCodigosUpdate;
	}

	private List<String> getAllCodigosNew(HttpServletRequest httpRequest, Integer cantModelos) {
		List<String> listCodNew = new ArrayList<>();
		for (int i = 0; i < cantModelos; i++)
			listCodNew.add(httpRequest.getParameter("cod-new-" + i));
		return listCodNew;
	}
}
