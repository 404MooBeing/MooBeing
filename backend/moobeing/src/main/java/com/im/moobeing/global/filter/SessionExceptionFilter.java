package com.im.moobeing.global.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.ErrorResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public class SessionExceptionFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.error(e.getMessage());
            setErrorResponse(response, ErrorCode.AU_SESSION_EXPIRED);
        }
    }

    private void setErrorResponse(HttpServletResponse response, ErrorCode errorCode) {
        log.error("filter에서 에러 체크");

        ObjectMapper objectMapper = new ObjectMapper();
        response.setStatus(errorCode.getStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        try {
            response.getWriter().write(objectMapper.writeValueAsString(ErrorResponse.of(errorCode)));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
