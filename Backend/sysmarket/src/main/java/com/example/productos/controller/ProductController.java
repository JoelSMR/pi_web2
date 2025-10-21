package com.example.productos.controller;

import com.example.productos.entity.Product;
//import com.example.productos.repository.ProductRepository;
import com.example.productos.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;




@RestController
@RequestMapping(path = "api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAll() {
        System.out.println("Ej");
        return productService.getProduct();
    }

    @GetMapping("/{productId}")
    public Optional<Product> getBId(@PathVariable ("productId") Long productId) {
        return productService.getProduct(productId);
    }

    @PutMapping("/{productId}")
    public Product updateProduct(@PathVariable("productId") Long productId, @RequestBody Product product) {
    return productService.updateProduct(productId, product);
    }

    @PostMapping("/save")
    public Product save(@RequestBody Product product) {
        return productService.save(product);
    }

    @PostMapping
    public void saveOrUpdate(@RequestBody Product product) {
        productService.saveOrUpdate(product);
    }


    @DeleteMapping("/{productId}")
    public void saveOrUpdate(@PathVariable("productId") Long productId) {
        productService.delete(productId);
    }
}
