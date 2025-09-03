package com.integrador.sysmarket.Modules.CheckoutProducts.Payment.Models;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;


/**
 * @author Whoami
 * @Description This class refers to the table Payments, one that stores sll the payments made in the app<p>
 * Have Getters,Setters and AllArgsConstructor by using Lombook
 * @Attrib {id} Long -  Autoincrement-PrimaryKey
 * @Attrib {paysxOrder} int - Foreign Key ()
 * @Attrib {paymentMethod} int - Foreign Key()
 * @Attrib {amount} float - Refers the amount payed
 * @Attrib {Status} boolean - Refers the status of the payment 
 * @Attrib {Date} Date - Refers the date of the payment
 */
@Entity
@Table(name = "Payments")
@Getter @Setter
@AllArgsConstructor  
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private Long id;
    
    //private int paysxOrder;

    //private int paymentMethod;

    @NotBlank(message = "No valid ammount")
    @Column(name="amount",nullable = false)
    private float amount;

    private boolean status;

    private Date date;

    
}
