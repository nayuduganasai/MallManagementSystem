package com.virtusa.pms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Payment {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int paymentId;
//    private String paymentMethod;
//    private Double amountPaid;
//
//    @OneToOne
//    @JoinColumn(name="bookingItemId")
//    private  BookingItem bookingItem;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payment_id;
    private String payment_method;
    private Double amount_paid;
    private String payment_status;
    private LocalDate created_at;
    private String razorpay_payment_id;
    private String razorpay_order_id;
    private String razorpay_signature;

    @OneToOne
    @JoinColumn(name = "bookingId")
    private SpaceBooking booking;

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

}
