package com.virtusa.pms.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
//    @Autowired
//    PaymentRepo repo;

    @Value("${rzp_key_id}")
    private String keyId;

    @Value("${rzp_key_secret}")
    private String secret;

    public Order createPaymentOrder(Double amount) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(keyId,secret);
        JSONObject orderRequest =  new JSONObject();
        orderRequest.put("amount", amount);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "order_receipt_01");
        Order order = razorpayClient.orders.create(orderRequest);
        return order;
    }
}
