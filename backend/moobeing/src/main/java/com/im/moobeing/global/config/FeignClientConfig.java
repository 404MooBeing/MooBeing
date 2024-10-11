package com.im.moobeing.global.config;

import com.im.moobeing.global.client.error.ShinhanErrorDecoder;
import feign.Client;
import feign.codec.ErrorDecoder;
import okhttp3.OkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.net.ssl.*;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.concurrent.TimeUnit;

@Configuration
public class FeignClientConfig {

    @Bean
    public Client feignClient() {
        return new feign.okhttp.OkHttpClient(okHttpClient());
    }

    @Bean
    public OkHttpClient okHttpClient() {
        try {
            // 모든 인증서를 신뢰하도록 설정
            final TrustManager[] trustAllCerts = new TrustManager[]{
                    new X509TrustManager() {
                        @Override
                        public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                        }

                        @Override
                        public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                        }

                        @Override
                        public X509Certificate[] getAcceptedIssuers() {
                            return new X509Certificate[]{};
                        }
                    }
            };

            // SSL 컨텍스트 설정
            final SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

            // 모든 호스트네임을 신뢰하도록 설정
            final HostnameVerifier allHostsValid = new HostnameVerifier() {
                @Override
                public boolean verify(String hostname, SSLSession session) {
                    return true;
                }
            };

            // OkHttpClient 빌더 구성
            OkHttpClient.Builder builder = new OkHttpClient.Builder()
                    .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCerts[0])
                    .hostnameVerifier(allHostsValid)
                    .connectTimeout(10, TimeUnit.SECONDS)
                    .readTimeout(10, TimeUnit.SECONDS)
                    .writeTimeout(10, TimeUnit.SECONDS);

            return builder.build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Bean
    public ErrorDecoder errorDecoder() {
        return new ShinhanErrorDecoder();
    }
}
