package com.back.controllers.error;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/backoffice")
public class BackofficeErrorController {

	@GetMapping(value = { "/altaModelo" })
	public String preventAltaModelo(Model model) {
		model.addAttribute("typeError", "preventAccess");
		return "backoffice/back_error_page";
	}

	@GetMapping(value = { "/altaPedido" })
	public String preventAltaPedido(Model model) {
		return preventAltaModelo(model);
	}

	@GetMapping(value = { "/modifListadoPedido" })
	public String preventModifListadoPedido(Model model) {
		return preventAltaModelo(model);
	}

	@GetMapping(value = { "/updatePedidosEntregados" })
	public String preventUpdatePedidosEntregados(Model model) {
		return preventAltaModelo(model);
	}
}
