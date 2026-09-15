package com.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.catalogomacetas.reqs.ReqGetListadosByFormatos;
import com.commonsmodels.models.Maceta;
import com.commonsmodels.models.Notificacion;
import com.commonsmodels.models.Pedido;
import com.commonsmodels.reqs.commons.DefaultRequest;

@Component
public class MacetasUtils {

	private static final String LIST_MACETAS_BY_FORMATO = "list_macetas_by_formato";

	@Autowired
	private ReqGetListadosByFormatos reqGetListadosByFormatos;

	public void setFullListadoMacetasEnPedidos(List<Pedido> pedidos, HttpSession session) {
		for (Pedido pedido : pedidos) {
			pedido.setListadoMacetas(getFullMacetasBySession(pedido.getListadoMacetas(), session));
		}
	}

	public void setFullListadoMacetasEnNotificaciones(List<Notificacion> notificaciones, HttpSession session) {
		for (Notificacion notif : notificaciones) {
			Pedido pedido = notif.getPedido();
			pedido.setListadoMacetas(getFullMacetasBySession(pedido.getListadoMacetas(), session));
			notif.setPedido(pedido);
		}
	}

	@SuppressWarnings("unchecked")
	private List<Maceta> getFullMacetasBySession(List<Maceta> macetasPedido, HttpSession session) {
		List<Maceta> macetasFullPedido = new ArrayList<>();
		HashMap<String, List<Maceta>> listByFormato = (HashMap<String, List<Maceta>>) session
				.getAttribute(LIST_MACETAS_BY_FORMATO);
		if (listByFormato == null) {
			listByFormato = reqGetListadosByFormatos.runService(DefaultRequest.builder().build());
			session.setAttribute(LIST_MACETAS_BY_FORMATO, listByFormato);
		}
		List<Maceta> macetasFullListado = getFullList(listByFormato);
		for (Maceta maceta : macetasPedido) {
			for (Maceta macetaFull : macetasFullListado) {
				if (maceta.getCodigoNew().equals(macetaFull.getCodigoNew())) {
					macetaFull.setCantSolicitada(maceta.getCantSolicitada());
					macetasFullPedido.add(macetaFull);
					break;
				}
			}
		}
		return macetasFullPedido;
	}

	private List<Maceta> getFullList(HashMap<String, List<Maceta>> listByFormato) {
		List<Maceta> listMacetasFull = new ArrayList<>();
		for (String key : listByFormato.keySet()) {
			listMacetasFull.addAll(listByFormato.get(key));
		}
		return listMacetasFull;
	}

}
