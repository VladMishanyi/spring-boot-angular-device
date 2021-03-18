package com.vk.springbootangulardevice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.handler.AbstractHandlerExceptionResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by KIP-PC99 on 26.09.2018.
 */
@ControllerAdvice
@ComponentScan(basePackages = {"com.vk.service"})
public class ErrorsController extends AbstractHandlerExceptionResolver  {

    private static final Logger LOGGER = LoggerFactory.getLogger(ErrorsController.class);

    @Override
    protected ModelAndView doResolveException(HttpServletRequest request,
                                              HttpServletResponse response,
                                              Object handler,
                                              Exception exception) {
        if (exception instanceof NoHandlerFoundException) return handleException(exception, request, HttpStatus.NOT_FOUND);
        if (exception instanceof NullPointerException) return handleException(exception, request, HttpStatus.BAD_REQUEST);
        if (exception instanceof IllegalArgumentException) return handleException(exception, request, HttpStatus.BAD_REQUEST);
        if (exception instanceof IllegalAccessException) return handleException(exception, request, HttpStatus.FORBIDDEN);
        if (exception instanceof HttpRequestMethodNotSupportedException) return handleException(exception, request, HttpStatus.METHOD_NOT_ALLOWED);
        if (exception instanceof Exception) return handleException(exception, request, HttpStatus.INTERNAL_SERVER_ERROR);
        return handleException(exception, request, HttpStatus.INTERNAL_SERVER_ERROR);
    }

//    @ExceptionHandler({NoHandlerFoundException.class, EntityNotFoundException.class})
//    @ResponseStatus(value = HttpStatus.NOT_FOUND)
//    public ModelAndView noHandlerFoundException(
//            final NoHandlerFoundException exception,
//            final HttpServletRequest request
//    ) {
//        return handleException(exception, request, HttpStatus.NOT_FOUND);
//    }

    @ExceptionHandler(NullPointerException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ModelAndView nullPointerException(
            final NullPointerException exception,
            final HttpServletRequest request
    ) {
        return handleException(exception, request, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ModelAndView illegalArgumentException(
            final IllegalArgumentException exception,
            final HttpServletRequest request
    ) {
        return handleException(exception, request, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalAccessException.class)
    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    public ModelAndView illegalAccessException(
            final IllegalAccessException exception,
            final HttpServletRequest request
    ) {
        return handleException(exception, request, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(value = HttpStatus.METHOD_NOT_ALLOWED)
    public ModelAndView illegalMappingException(
            final HttpRequestMethodNotSupportedException ex,
            final HttpServletRequest request
    ) {
        return handleException(ex, request, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ModelAndView otherException(
            final Exception exception,
            final HttpServletRequest request) {
        return handleException(exception, request, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ModelAndView handleException(
            final Exception ex,
            final HttpServletRequest request,
            final HttpStatus httpStatus
    ) {
        logError(ex, request);
        final ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("value", httpStatus.value());
        modelAndView.addObject("message", httpStatus.getReasonPhrase());
        modelAndView.setViewName("error/error");
        return modelAndView;
    }

    private void logError(
            final Exception ex,
            final HttpServletRequest request
    ) {
        LOGGER.error(request.getRemoteAddr() + " : " + request.getRequestURL());
        LOGGER.error(ex.getMessage(), ex);
        ex.printStackTrace();
    }
}
