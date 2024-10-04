package com.im.moobeing.global.config;

import com.im.moobeing.domain.member.repository.MemberRepository;
import com.im.moobeing.global.filter.SessionAuthenticationFilter;
import com.im.moobeing.global.filter.SessionExceptionFilter;
import com.im.moobeing.global.path.WebSecurityPath;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {
    private final MemberRepository memberRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatchers((auth) -> auth.requestMatchers(WebSecurityPath.REQUIRE_AUTH_PATH.getPaths()));
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement((session) -> session
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)
                .addFilterBefore(new SessionAuthenticationFilter(memberRepository), BasicAuthenticationFilter.class)
                .addFilterBefore(new SessionExceptionFilter(), SessionAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {

        return web -> web.ignoring().requestMatchers("/auth/social/**",
                "swagger-ui/index.html", "/v1/users/{id}",
                "/swagger-ui/**",
                "/swagger-resources/**",
                "/v3/api-docs/**",
                "/api-docs/**",
                "/api-docs", "/member/login");
    }
}
