package com.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping(value = { "/catalogo/", "/*", "" })
	public void goCatalogo(HttpServletResponse response, HttpServletRequest request) throws IOException {
		Object obj = request.getRequestURI();
		String contextPath = request.getContextPath();
		Integer contextPathNum = contextPath.split("/").length;
		String[] originUriVec = obj.toString().split("/");
		if (originUriVec.length > contextPathNum && ("backoffice").equals(originUriVec[contextPathNum]))
			response.sendRedirect(contextPath + "/backoffice/");
		else
			response.sendRedirect(contextPath + "/catalogo");
	}

}
