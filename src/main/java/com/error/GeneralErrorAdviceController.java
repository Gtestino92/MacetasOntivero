package com.error;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.commonsmodels.exceptions.ApiConnectionException;
import com.commonsmodels.exceptions.BackofficeException;
import com.commonsmodels.exceptions.InvalidRequestApiException;
import com.commonsmodels.exceptions.SQLConnectionErrorException;

@ControllerAdvice
public class GeneralErrorAdviceController {

	private static final String TYPE_ERROR = "typeError";

	@ExceptionHandler({ SQLConnectionErrorException.class })
	public String returnErrorNoConnection(Model model, SQLConnectionErrorException ex, HttpServletRequest request) {
		model.addAttribute(TYPE_ERROR, "bdError");
		Object obj = request.getRequestURI();
		String[] originUriVec = obj.toString().split("/");
		String contextPath = request.getContextPath();
		Integer contextPathNum = contextPath.split("/").length;

		String puntoEntrada;
		if (originUriVec.length > contextPathNum && "backoffice".equals(originUriVec[contextPathNum]))
			puntoEntrada = "B";
		else
			puntoEntrada = "C";
		model.addAttribute("puntoEntrada", puntoEntrada);
		return "default_error_page";

	}

	@ExceptionHandler({ BackofficeException.class })
	public String returnErrorBackoffice(Model model, BackofficeException ex, HttpServletRequest request) {
		model.addAttribute(TYPE_ERROR, ex.getTypeError());
		return "/backoffice/back_error_page";
	}

	@ExceptionHandler({ ApiConnectionException.class })
	public String returnErrorApiConnection(Model model, ApiConnectionException ex, HttpServletRequest request) {
		model.addAttribute(TYPE_ERROR, ex.getTypeError());
		return "/backoffice/back_error_page";
	}
	
	@ExceptionHandler({ InvalidRequestApiException.class })
	public String returnErrorApi(Model model, InvalidRequestApiException ex, HttpServletRequest request) {
		model.addAttribute(TYPE_ERROR, ex.getTypeError());
		return "/backoffice/back_error_page";
	}
}
