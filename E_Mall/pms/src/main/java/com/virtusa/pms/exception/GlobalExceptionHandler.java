package com.virtusa.pms.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    Log log = LogFactory.getLog(this.getClass());

    @ExceptionHandler(CustomException.class)
    public @ResponseBody ErrorInfo getCustomError(CustomException e, HttpServletRequest req) {
        return new ErrorInfo(LocalDateTime.now(),e.getMessage(),req.getRequestURI());

    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(CategoryNotFoundException.class)
    public @ResponseBody ErrorInfo CategoryErrorException(CategoryNotFoundException e, HttpServletRequest req) {
        log.error(e.getMessage());
        return new ErrorInfo(LocalDateTime.now(), e.getMessage(), req.getRequestURI());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(TermNotFoundException.class)
    public @ResponseBody ErrorInfo TermErrorException(TermNotFoundException e, HttpServletRequest req) {
        log.error(e.getMessage());
        return new ErrorInfo(LocalDateTime.now(), e.getMessage(), req.getRequestURI());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(RentTypeNotFoundException.class)
    public @ResponseBody ErrorInfo RentTypeErrorException(RentTypeNotFoundException e, HttpServletRequest req) {
        log.error(e.getMessage());
        return new ErrorInfo(LocalDateTime.now(), e.getMessage(), req.getRequestURI());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(PriceNotFoundException.class)
    public @ResponseBody ErrorInfo priceErrorException(PriceNotFoundException e, HttpServletRequest req) {
        log.error(e.getMessage());
        return new ErrorInfo(LocalDateTime.now(), e.getMessage(), req.getRequestURI());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<String> handleRoleNotFoundException(RoleNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler({UsernameNotFoundException.class, UserEmailTakenException.class})
    public ResponseEntity<String> handleUserRegistrationException(Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + ex.getMessage());
    }
}
