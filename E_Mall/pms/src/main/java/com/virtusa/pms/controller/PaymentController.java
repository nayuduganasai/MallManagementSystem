package com.virtusa.pms.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayException;
import com.virtusa.pms.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class PaymentController extends BaseController {
   @Autowired
    PaymentService service;
    @GetMapping("/payment/{amount}")
    public Order createPaymentRequest(@PathVariable("amount") Double amount) throws RazorpayException {
        Order response =  service.createPaymentOrder(amount);
        System.out.println("dkvndsovjkds----"+response);
        return response;
    }
}
