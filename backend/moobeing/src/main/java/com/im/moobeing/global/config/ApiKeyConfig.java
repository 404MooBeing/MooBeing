package com.im.moobeing.global.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicInteger;

@Configuration
public class ApiKeyConfig {

    @Getter
    @Value("${SSAFY_APIKEY}")
    private String apiKey;

    private String lastDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    private AtomicInteger sequence = new AtomicInteger(0);

    // 현재 날짜를 "yyyyMMdd" 형식으로 반환하는 메소드 추가
    public String getTransmissionDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        return LocalDate.now().format(formatter);
    }

    // 현재 시간(시, 분, 초)을 "HHmmss" 형식으로 반환하는 메소드
    public String getTransmissionTime() {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HHmmss");
        return LocalDateTime.now().format(dateTimeFormatter);
    }

    public String getInstitutionCode(){
        return "00100";
    }

    public String getFintechAppNo(){
        return "001";
    }

    // 하루가 지나면 숫자를 초기화하고, 호출할 때마다 +1하여 6자리 숫자를 생성
    public synchronized String getInstitutionTransactionUniqueNo() {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        if (!currentDate.equals(lastDate)) {
            sequence.set(0);
            lastDate = currentDate;
        }

        // 6자리 숫자로 포맷
        String sequenceStr = String.format("%06d", sequence.incrementAndGet());

        return currentDate + getTransmissionTime() + sequenceStr;
    }
}

