package com.im.moobeing.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("https://j11a404.p.ssafy.io", "http://localhost:3000", "http://localhost:5173", "https//moobeing.shop")
				.allowCredentials(true)
				.maxAge(3600)
				.allowedHeaders("*")
				.allowedMethods("*");

	}
}


