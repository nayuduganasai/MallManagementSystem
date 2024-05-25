package com.virtusa.pms.controller;

import com.virtusa.pms.dto.BookingRequestDto;
import com.virtusa.pms.exception.RequestNotFoundException;
import com.virtusa.pms.service.RequestServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RequestController extends BaseController{

    @Autowired
    private RequestServiceImpl requestServiceImpl;

    @GetMapping("/requests")
    public ResponseEntity<List<BookingRequestDto>> getAllRequests() {
        List<BookingRequestDto> requests = requestServiceImpl.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/requests/{requestId}")
    public ResponseEntity<BookingRequestDto> getRequestById(@PathVariable int requestId) throws RequestNotFoundException {
        BookingRequestDto request = requestServiceImpl.getRequestById(requestId).get();
        return ResponseEntity.status(HttpStatus.OK).body(request);
    }

    @PostMapping("/requests")
    public ResponseEntity<BookingRequestDto> createRequest(@RequestBody BookingRequestDto request) {
        BookingRequestDto createdRequest = requestServiceImpl.createRequest(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRequest);
    }

    @PutMapping("/requests/{requestId}")
    public ResponseEntity<BookingRequestDto> updateRequest(@PathVariable int requestId, @RequestBody BookingRequestDto updatedRequest) throws RequestNotFoundException {
        BookingRequestDto updated = requestServiceImpl.updateRequest(requestId, updatedRequest);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/requests/{requestId}")
    public ResponseEntity<String > deleteRequest(@PathVariable int requestId) throws RequestNotFoundException {
        requestServiceImpl.deleteRequest(requestId);
        return ResponseEntity.status(HttpStatus.OK).body("request with id :"+requestId+" Deleted Successfully");
    }
}
