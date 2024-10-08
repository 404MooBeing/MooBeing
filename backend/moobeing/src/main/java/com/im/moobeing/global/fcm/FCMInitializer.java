package com.im.moobeing.global.fcm;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Slf4j
@Component
public class FCMInitializer {

    @Value("${fcm.type}")
    private String type;

    @Value("${fcm.project-id}")
    private String projectId;

    @Value("${fcm.private-key-id}")
    private String privateKeyId;

    @Value("${fcm.private-key}")
    private String privateKey;

    @Value("${fcm.client-email}")
    private String clientEmail;

    @Value("${fcm.client-id}")
    private String clientId;

    @Value("${fcm.auth-uri}")
    private String authUri;

    @Value("${fcm.token-uri}")
    private String tokenUri;

    @Value("${fcm.auth-provider-x509-cert-url}")
    private String authProviderCertUrl;

    @Value("${fcm.client-x509-cert-url}")
    private String clientCertUrl;

    @PostConstruct
    public void initialize() {
        // 이중 따옴표가 있을 경우 제거
        privateKey = privateKey.startsWith("\"") && privateKey.endsWith("\"")
                ? privateKey.substring(1, privateKey.length() - 1)
                : privateKey;

        try {
            String processedPrivateKey = privateKey.replace("\n", "\\n");

            String firebaseConfig = "{\n" +
                    "  \"type\": \"" + type + "\",\n" +
                    "  \"project_id\": \"" + projectId + "\",\n" +
                    "  \"private_key_id\": \"" + privateKeyId + "\",\n" +
                    "  \"private_key\": \"" + processedPrivateKey + "\",\n" +
                    "  \"client_email\": \"" + clientEmail + "\",\n" +
                    "  \"client_id\": \"" + clientId + "\",\n" +
                    "  \"auth_uri\": \"" + authUri + "\",\n" +
                    "  \"token_uri\": \"" + tokenUri + "\",\n" +
                    "  \"auth_provider_x509_cert_url\": \"" + authProviderCertUrl + "\",\n" +
                    "  \"client_x509_cert_url\": \"" + clientCertUrl + "\"\n" +
                    "}";

            // JSON 구성 확인을 위한 로그 출력
//            log.info("Generated Firebase Config JSON:\n" + firebaseConfig);

            // InputStream을 생성하여 FirebaseOptions 설정
            try (InputStream is = new ByteArrayInputStream(firebaseConfig.getBytes(StandardCharsets.UTF_8))) {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(is))
                        .build();

                if (FirebaseApp.getApps().isEmpty()) {
                    FirebaseApp.initializeApp(options);
                    log.info("FirebaseApp initialization complete using environment variables");
                }
            }
        } catch (Exception e) {
            log.error("Error initializing FirebaseApp: ", e);
        }
    }

}
