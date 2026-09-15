package com.back.controllers.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.commonsmodels.exceptions.ApiConnectionRestException;
import com.commonsmodels.exceptions.InvalidRequestApiRestException;
import com.commonsmodels.exceptions.PedidoNotFoundException;
import com.commonsmodels.exceptions.PredictionException;

@RestControllerAdvice
public class BackofficeErrorAdviceRestController {

	@ExceptionHandler({ PedidoNotFoundException.class })
	public ResponseEntity<String> returnErrorWhenException(Model model, PedidoNotFoundException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ ApiConnectionRestException.class })
	public ResponseEntity<String> returnErrorNoConnection(Model model, ApiConnectionRestException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_GATEWAY);
	}

	@ExceptionHandler({ InvalidRequestApiRestException.class })
	public ResponseEntity<String> returnErrorInvalidFile(Model model, InvalidRequestApiRestException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.valueOf(ex.getCode()));
	}

	@ExceptionHandler({ PredictionException.class })
	public ResponseEntity<String> returnErrorPrediction(Model model, PredictionException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.EXPECTATION_FAILED);
	}
}
