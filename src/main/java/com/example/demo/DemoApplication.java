package com.example.demo;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	

	@Bean
	
	public Docket swaggerConfiguration() {
		
		return new Docket(DocumentationType.SWAGGER_2)
				.select()				
				.apis(RequestHandlerSelectors.basePackage("com.example"))
				.build()
				.apiInfo(apiDetails());
				
		
	}
	
	private ApiInfo apiDetails () {
		
		return new ApiInfo(
				"DataTables API Info",
				"Spring boot backend API documentation for DataTables project",
				"1.0",
				"Free",
				new springfox.documentation.service.Contact("Pavel Pivovarcik", "https://github.com/Pavel4444/DataTables-1.0", "ppivov@gmail.com"),
				"API License",
				"https://github.com/Pavel4444/DataTables-1.0",
				Collections.emptyList());		
				
				
		
	}
	

	

}
