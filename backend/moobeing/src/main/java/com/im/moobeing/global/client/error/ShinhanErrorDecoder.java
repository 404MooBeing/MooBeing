package com.im.moobeing.global.client.error;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.im.moobeing.global.error.ErrorResponse;
import com.im.moobeing.global.error.exception.ShinhanApiException;
import feign.Response;
import feign.codec.ErrorDecoder;
import io.micrometer.core.instrument.util.IOUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class ShinhanErrorDecoder implements ErrorDecoder {
    @Override
    public Exception decode(String methodKey, Response response) {
        if (response.status() == 400) {
            try {
                String errorBody = IOUtils.toString(response.body().asInputStream(), StandardCharsets.UTF_8);
                ObjectMapper mapper = new ObjectMapper();
                ErrorResponse errorResponse = mapper.readValue(errorBody, ErrorResponse.class);
                return new ShinhanApiException(errorResponse.getCode(), errorResponse.getMessage());
            } catch (IOException e) {
                return new Exception("Error parsing error response");
            }
        }
        return new Default().decode(methodKey, response);
    }
}
