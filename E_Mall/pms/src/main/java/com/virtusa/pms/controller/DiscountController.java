package com.virtusa.pms.controller;

import com.virtusa.pms.dto.DiscountRequest;
import com.virtusa.pms.dto.DiscountResponse;
import com.virtusa.pms.dto.DiscountUpdateResponse;
import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.service.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DiscountController extends BaseController{

    private final DiscountService discountService;

    @Autowired
    public DiscountController(DiscountService discountService) {
        this.discountService = discountService;
    }

    @GetMapping("/discounts")
    public ResponseEntity<?> getAllDiscounts() {
        try {

            List<DiscountResponse> discounts = discountService.getAllDiscounts();
            return new ResponseEntity<List<DiscountResponse>>(discounts, HttpStatus.OK);
        } catch (CustomException ex) {
            return new ResponseEntity<String>(ex.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/discounts/{id}")
    public ResponseEntity<?> getDiscountById(@PathVariable Long id) {
        try {
            DiscountUpdateResponse discount = discountService.getDiscountById(id);
            return new ResponseEntity<DiscountUpdateResponse>(discount, HttpStatus.OK);
        } catch (CustomException ex) {
            return new ResponseEntity<String>(ex.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/discounts")
    public ResponseEntity<?> createDiscount(@RequestBody DiscountRequest request) {
        try {
            DiscountResponse createdDiscount = discountService.createDiscount(request);
            return new ResponseEntity<DiscountResponse>(createdDiscount, HttpStatus.CREATED);
        } catch (CustomException ex) {
            return new ResponseEntity<String>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/discounts/{id}")
    public ResponseEntity<?> updateDiscount(@PathVariable Long id, @RequestBody DiscountRequest request) {
        try {
            DiscountUpdateResponse updatedDiscount = discountService.updateDiscount(id, request);
            return new ResponseEntity<DiscountUpdateResponse>(updatedDiscount, HttpStatus.OK);
        } catch (CustomException ex) {
            return new ResponseEntity<String>(ex.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/discounts/{id}")
    public ResponseEntity<?> deleteDiscount(@PathVariable Long id) {
        try {
            return new ResponseEntity<String>(discountService.deleteDiscount(id),HttpStatus.OK);
        } catch (CustomException ex) {
            return new ResponseEntity<String>(ex.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
}

