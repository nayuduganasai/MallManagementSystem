package com.virtusa.pms.controller;

import com.virtusa.pms.dto.BookingCartRequest;
import com.virtusa.pms.dto.BookingCartResponse;
import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.service.BookingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class BookingCartController extends BaseController {

    @Autowired
    private BookingCartService bookingCartService;

    @GetMapping("/bookingcarts")
    public ResponseEntity<List<BookingCartResponse>> getAllBookingItems() {
        List<BookingCartResponse> bookingCarts = bookingCartService.getAllBookingItems();
        return ResponseEntity.ok(bookingCarts);
    }

    @GetMapping("/bookingcarts/{bookingItemId}")
    public ResponseEntity<BookingCartResponse> getBookingItemById(@PathVariable int bookingItemId) {
        Optional<BookingCartResponse> bookingItem = bookingCartService.getBookingItemById(bookingItemId);
        return bookingItem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/bookingcarts/user/{id}")
    public ResponseEntity<BookingCartResponse> getBookingItemByUser(@PathVariable int id) throws CustomException {
        Optional<BookingCartResponse> bookingItem = bookingCartService.getBookingCartByUser(id);
        return bookingItem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/bookingcarts")
    public ResponseEntity<BookingCartResponse> createBookingItem(@RequestBody BookingCartRequest bookingCartRequest) {
        BookingCartResponse createdBookingCart = bookingCartService.createBookingItem(bookingCartRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBookingCart);
    }

    @PutMapping("/bookingcarts/{bookingItemId}")
    public ResponseEntity<BookingCartResponse> updateBookingItem(@PathVariable int bookingItemId, @RequestBody BookingCartRequest updatedBookingCartRequest) {
        BookingCartResponse updated = bookingCartService.updateBookingItem(bookingItemId, updatedBookingCartRequest);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/bookingcarts/{bookingItemId}")
    public ResponseEntity<Void> deleteBookingItem(@PathVariable int bookingItemId) {
        bookingCartService.deleteBookingItem(bookingItemId);
        return ResponseEntity.noContent().build();
    }
}
