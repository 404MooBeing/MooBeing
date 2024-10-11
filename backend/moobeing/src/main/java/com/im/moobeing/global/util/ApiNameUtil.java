package com.im.moobeing.global.util;

public class ApiNameUtil {
    // 클래스명에서 "Get"과 "Request"를 제거하고 앞자리를 소문자로 바꿔서 apiName 생성
    public static String generateApiName(Class<?> clazz) {
        String className = clazz.getSimpleName();
        String baseName = className.replace("Get", "").replace("Request", "");
        return Character.toLowerCase(baseName.charAt(0)) + baseName.substring(1);
    }
}
