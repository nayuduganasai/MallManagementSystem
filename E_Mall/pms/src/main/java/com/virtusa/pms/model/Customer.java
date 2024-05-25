package com.virtusa.pms.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
//@DiscriminatorValue("customer")
public class Customer extends User {

    private String firstName;
    private String lastName;
    private String address;
    private String mobileNo;
    // Additional properties/methods specific to Customer
}
