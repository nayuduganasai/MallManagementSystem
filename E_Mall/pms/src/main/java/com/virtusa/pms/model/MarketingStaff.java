package com.virtusa.pms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
//@DiscriminatorValue("marketing_staff")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MarketingStaff extends User {

    private String firstName;
    private String lastName;
    private String address;
    private String mobileNo;

    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "referral_seq")
    @SequenceGenerator(name = "referral_seq", sequenceName = "referral_seq", initialValue = 161693, allocationSize = 1)
    private int referralId;
    private double salary;

}
