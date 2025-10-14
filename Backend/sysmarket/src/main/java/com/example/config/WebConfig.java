package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // habilita todos los endpoints
                        .allowedOrigins("http://localhost:3000") // dominio de Next.js (dev)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
    @Bean  
    public CorsConfigurationSource corsConfigurationSource() {  
        CorsConfiguration config = new CorsConfiguration();  
  
        // Orígenes permitidos: pon tu Next.js dev y prod  
        config.setAllowedOrigins(List.of(  
            "http://localhost:3000",  
            "http://127.0.0.1:3000",  
            "https://tu-next-app.com"  
        ));  
        // Si prefieres patrones (útil para puertos variables):  
        // config.setAllowedOriginPatterns(List.of("http://localhost:*", "https://*.tu-dominio.com"));  
  
        config.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));  
        config.setAllowedHeaders(List.of("*")); // o lista explícita: "Content-Type", "Authorization", ...  
        config.setExposedHeaders(List.of("Authorization","Content-Type")); // si necesitas leerlos en el cliente  
        config.setAllowCredentials(true); // si usas cookies o credenciales  
        config.setMaxAge(3600L); // cache del preflight  
  
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();  
        source.registerCorsConfiguration("/**", config);  
        return source;  
    }
}