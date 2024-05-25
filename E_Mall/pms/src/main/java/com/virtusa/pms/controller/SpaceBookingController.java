package com.virtusa.pms.controller;

import com.virtusa.pms.dto.SpaceBookingRequest;
import com.virtusa.pms.dto.SpaceBookingResponse;
import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.model.SpaceBooking;
import com.virtusa.pms.service.SpaceBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class SpaceBookingController extends BaseController {

    @Autowired
    private SpaceBookingService spaceBookingService;

    @PostMapping("/spacebookings")
    public ResponseEntity<String> createSpaceBooking(@RequestBody SpaceBookingRequest spaceBookingRequest) {
        try {
            String createdSpaceBooking = spaceBookingService.createSpaceBooking(spaceBookingRequest);
            return ResponseEntity.ok(createdSpaceBooking);
        } catch (CustomException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/spacebookings")
    public ResponseEntity<List<SpaceBookingResponse>> getAllSpaceBookings() {
        List<SpaceBookingResponse> spaceBookings = spaceBookingService.getAllSpaceBookings();
        return ResponseEntity.ok(spaceBookings);
    }

    @GetMapping("/spacebookings/{bookingId}")
    public ResponseEntity<SpaceBookingResponse> getSpaceBookingById(@PathVariable Long bookingId) {
        Optional<SpaceBookingResponse> spaceBooking = spaceBookingService.getSpaceBookingById(bookingId);
        return spaceBooking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/spacebookings/{bookingId}")
    public ResponseEntity<SpaceBookingResponse> updateSpaceBooking(@PathVariable Long bookingId, @RequestBody SpaceBooking updatedSpaceBooking) {
        try {
            SpaceBookingResponse updated = spaceBookingService.updateSpaceBooking(bookingId, updatedSpaceBooking);
            return ResponseEntity.ok(updated);
        } catch (CustomException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/spacebookings/{bookingId}")
    public ResponseEntity<String> deleteSpaceBooking(@PathVariable Long bookingId) {
        try {
            String message = spaceBookingService.deleteSpaceBooking(bookingId);
            return ResponseEntity.ok(message);
        } catch (CustomException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/spacebookings/approve/{bookingId}")
    public ResponseEntity<String> approveBooking(@PathVariable Long bookingId) {
        try {
            String message = spaceBookingService.approveBooking(bookingId);
            return ResponseEntity.ok(message);
        } catch (CustomException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/spacebookings/reject/{bookingId}")
    public ResponseEntity<String> rejectBooking(@PathVariable Long bookingId) {
        try {
            String message = spaceBookingService.rejectBooking(bookingId);
            return ResponseEntity.ok(message);
        } catch (CustomException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/spacebookings/user/{userId}")
    public ResponseEntity<List<SpaceBookingResponse>> getSpaceBookingByUser(@PathVariable int userId) throws CustomException {
        List<SpaceBookingResponse> spaceBookingResponses = spaceBookingService.getSpaceBookingByUser(userId);
        System.out.println(spaceBookingResponses);
        return ResponseEntity.ok(spaceBookingResponses);     }

}
