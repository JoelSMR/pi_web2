package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.http.HttpHeaders; // Importar HttpHeaders para una mejor claridad

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                
                // 1. Declarar Headers necesarios para claridad y seguridad
                // Se deben incluir Content-Type y Authorization para APIs modernas
                String[] allowedHeaders = new String[] {
                    HttpHeaders.CONTENT_TYPE, 
                    HttpHeaders.AUTHORIZATION, 
                    "X-Requested-With", // Común en peticiones AJAX
                    "Accept" 
                };

                registry.addMapping("/**")
                        // CORRECCIÓN 1: Sintaxis y Especificación. Siempre especificar el esquema y el puerto.
                        // Se pueden añadir múltiples orígenes separados por coma: "http://localhost:3000", "https://mi-frontend.com"
                        .allowedOrigins("http://localhost:3000") 
                        
                        // CORRECCIÓN 2: Métodos. Uso de constantes para claridad.
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        
                        // CORRECCIÓN 3 (Seguridad): Evitar el comodín * y especificar solo los headers necesarios.
                        .allowedHeaders(allowedHeaders)
                        
                        // BUENA PRÁCTICA: Especificar solo los headers que el cliente necesita leer.
                        .exposedHeaders(HttpHeaders.LOCATION) 
                        
                        // Advertencia: Mantener 'true' solo si es estrictamente necesario para la autenticación.
                        .allowCredentials(true) 
                        
                        // BUENA PRÁCTICA: Cache para peticiones OPTIONS.
                        .maxAge(3600);
            }
        };
    }
}