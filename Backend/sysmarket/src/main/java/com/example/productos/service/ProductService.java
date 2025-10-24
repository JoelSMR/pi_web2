package com.example.productos.service;

import com.example.productos.entity.Product;
import com.example.productos.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    public List<Product> getProduct() {
        return productRepository.findAll();
    }

    // Get a product by ID
    public Optional<Product> getProduct(Long id) {
        return productRepository.findById(id);
    }

    // Save a new product
    public Product save(Product product) {
        return productRepository.save(product);
    }

    // Update an existing product
    public Product updateProduct(Long productId, Product product) {
        Optional<Product> existingProduct = productRepository.findById(productId);

        if (existingProduct.isPresent()) {
            Product updatedProduct = existingProduct.get();

            // Update data
            updatedProduct.setName(product.getName());
            updatedProduct.setPrice(product.getPrice());
            updatedProduct.setDescription(product.getDescription());
            updatedProduct.setCategory(product.getCategory());
            updatedProduct.setProveedor(product.getProveedor());

            return productRepository.save(updatedProduct);
        } else {
            // If the product is not found, null could be returned or an exception could be thrown.
            return null;
        }
    }

    // delete a product
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
