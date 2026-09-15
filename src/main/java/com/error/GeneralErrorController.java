package com.error;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GeneralErrorController implements ErrorController {

	@GetMapping(value = "/error")
	public String returnErrorPage(HttpServletRequest request, Model model) {
		model.addAttribute("typeError", "default");
		String[] originUriVec = request.getAttribute(RequestDispatcher.FORWARD_REQUEST_URI).toString().split("/");
		if (originUriVec.length <= 1)
			return "default_error_page";
		else {
			String module = originUriVec[1];
			String puntoEntrada;
			if ("backoffice".equals(module))
				puntoEntrada = "B";
			else
				puntoEntrada = "C";
			model.addAttribute("puntoEntrada", puntoEntrada);
			return "default_error_page";
		}
	}

	@Override
	public String getErrorPath() {
		return "/error";
	}

}
