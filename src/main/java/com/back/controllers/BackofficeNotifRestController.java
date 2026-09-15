package com.back.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backoffice.reqs.ReqGetCantNotifications;
import com.backoffice.reqs.ReqMarcarNotifLeida;
import com.commonsmodels.reqs.commons.DefaultRequest;

@RestController
@RequestMapping("/backoffice")
public class BackofficeNotifRestController {

	@Autowired
	private ReqGetCantNotifications reqGetCantNotifications;

	@Autowired
	private ReqMarcarNotifLeida reqMarcarNotifLeida;

	@PostMapping(value = { "/getCantNotifications" })
	public ResponseEntity<Long> showNotifications(Model model, HttpSession session) {
		Long result = reqGetCantNotifications.runService(DefaultRequest.builder().build());
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PostMapping(value = { "/markLeida" })
	public ResponseEntity<Long> marcarNotifLeida(HttpServletRequest httpRequest, HttpSession session,
			@RequestParam Long idPedido) {
		reqMarcarNotifLeida.runService(idPedido);
		return new ResponseEntity<>(idPedido, HttpStatus.OK);
	}
}
