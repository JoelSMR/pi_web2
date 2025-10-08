package com.integrador.sysmarket.Modules.Cart;



import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;



@RestController("api/v1")
public class CartController {
    
    @GetMapping("/paila")
    public static String getHelloById() {
        return "Hello user ";
    }
}
