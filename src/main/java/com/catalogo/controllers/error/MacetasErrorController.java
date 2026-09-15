package com.catalogo.controllers.error;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MacetasErrorController {

	@GetMapping(value = { "/catalogo/solicitar" })
	public String preventSolicitar(Model model) {
		model.addAttribute("typeError", "preventAccess");
		model.addAttribute("puntoEntrada", "C");
		return "default_error_page";
	}

	@GetMapping(value = { "/catalogo/enviarPedido" })
	public String preventPedidoMail(Model model) {
		return preventSolicitar(model);
	}

	@GetMapping(value = {})
	public String redirectEverythingOtherThanTest() {
		return "default_redirect";
	}

}
