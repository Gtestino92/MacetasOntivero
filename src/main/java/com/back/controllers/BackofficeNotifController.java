package com.back.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.backoffice.adapters.AdapterNotificaciones;
import com.backoffice.reqs.ReqGetNotifications;
import com.backoffice.reqs.ReqSetPedidosInNotifications;
import com.commonsmodels.json.JsonGenerator;
import com.commonsmodels.models.Notificacion;
import com.commonsmodels.reqs.commons.DefaultRequest;
import com.utils.MacetasUtils;

@Controller
@RequestMapping("/backoffice")
public class BackofficeNotifController {

	@Autowired
	private ReqSetPedidosInNotifications reqSetPedidosInNotifications;

	@Autowired
	private ReqGetNotifications reqGetNotifications;

	@Autowired
	private MacetasUtils macetasUtils;

	@GetMapping(value = { "/notifications" })
	public String showNotifications(Model model, HttpSession session) {
		List<Notificacion> notificaciones = reqGetNotifications.runService(DefaultRequest.builder().build());
		reqSetPedidosInNotifications.runService(notificaciones);
		macetasUtils.setFullListadoMacetasEnNotificaciones(notificaciones, session);
		model.addAttribute("data",
				JsonGenerator.convertObjectToJSON(AdapterNotificaciones.getAdapters(notificaciones)));
		return "backoffice/pedidos/notificaciones";
	}
}
