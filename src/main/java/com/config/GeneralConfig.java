package com.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
@PropertySource("classpath:application.properties")
public class GeneralConfig implements WebMvcConfigurer {

	@Value("${contextPath}")
	private String contextPath;

	public String getContextPath() {
		return contextPath;
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		registry.addResourceHandler("/images/*").addResourceLocations(contextPath + "/WEB-INF/classes/static/images/");
		
	}
}
