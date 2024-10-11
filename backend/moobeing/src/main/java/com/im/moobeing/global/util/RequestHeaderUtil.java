package com.im.moobeing.global.util;

import com.im.moobeing.global.config.ApiKeyConfig;
import java.lang.reflect.Constructor;

//todo 다시보기 이해 안됨. chagpt가 해줌.
public class RequestHeaderUtil {

    // Header 객체를 생성하는 제네릭 메소드
    public static <T> T createHeader(Class<T> headerClass, Class<?> requestClass, ApiKeyConfig apiKeyConfig, String userKey) {
        try {
            String apiName = ApiNameUtil.generateApiName(requestClass);
            Constructor<T> constructor = headerClass.getConstructor(
                    String.class, String.class, String.class, String.class, String.class,
                    String.class, String.class, String.class, String.class
            );

            return constructor.newInstance(
                    apiName,
                    apiKeyConfig.getTransmissionDate(),
                    apiKeyConfig.getTransmissionTime(),
                    apiKeyConfig.getInstitutionCode(),
                    apiKeyConfig.getFintechAppNo(),
                    apiName,
                    apiKeyConfig.getInstitutionTransactionUniqueNo(),
                    apiKeyConfig.getApiKey(),
                    userKey
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to create header", e);
        }
    }

    // 제네릭 요청 객체를 생성하는 메소드
    public static <T, H> T createRequest(Class<T> requestClass, Class<H> headerClass, ApiKeyConfig apiKeyConfig, String userKey) {
        try {
            H header = createHeader(headerClass, requestClass, apiKeyConfig, userKey);
            Constructor<T> constructor = requestClass.getConstructor(headerClass);
            return constructor.newInstance(header);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create request", e);
        }
    }
}
