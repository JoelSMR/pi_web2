package com.integrador.sysmarket.Modules.Products.Models;

import com.integrador.sysmarket.Utility.Criptography.EncryptionUtil;

import com.integrador.sysmarket.Modules.Providers.Models.Provider;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import jakarta.persistence.GenerationType;

@Getter
@Entity @Table(name = "Products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Price cant be blank")
    @Column(nullable = false)
    private String price;

    @NotBlank(message = "Name cant be blank")
    @Column(nullable= false)
    private String name;

    @Column(nullable = true)
    private String description;

    @Column(nullable = true)
    private String categorie;

    @OneToOne()
    @JoinColumn(name="providerId")
    private Provider providerId;

    public Product(String price,String name )throws Exception{
        this.price=EncryptionUtil.encrypt("poi", price);
        this.name=EncryptionUtil.encrypt(price, name)


}
}
