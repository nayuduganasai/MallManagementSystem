package com.virtusa.pms.controller;

import com.virtusa.pms.dto.ComplaintDTO;
import com.virtusa.pms.service.interfaces.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ComplaintController extends BaseController  {

    @Autowired
    private ComplaintService complaintService;

    @GetMapping("/complaints/{complaintId}")
    public ResponseEntity<ComplaintDTO> getComplaintById(@PathVariable int complaintId) {
        ComplaintDTO complaintDTO = complaintService.getComplaintById(complaintId);
        return new ResponseEntity<>(complaintDTO, HttpStatus.OK);
    }

    @GetMapping("/complaints")
    public ResponseEntity<List<ComplaintDTO>> getAllComplaints() {
        List<ComplaintDTO> complaintDTOList = complaintService.getAllComplaints();
        return new ResponseEntity<>(complaintDTOList, HttpStatus.OK);
    }

    @PostMapping("/complaints")
    public ResponseEntity<ComplaintDTO> createComplaint(@RequestBody ComplaintDTO complaintDTO) {
        ComplaintDTO createdComplaint = complaintService.createComplaint(complaintDTO);
        return new ResponseEntity<>(createdComplaint, HttpStatus.CREATED);
    }

    @PutMapping("/complaints/{complaintId}")
    public ResponseEntity<ComplaintDTO> updateComplaint(@PathVariable int complaintId, @RequestBody ComplaintDTO complaintDTO) {
        ComplaintDTO updatedComplaint = complaintService.updateComplaint(complaintId, complaintDTO);
        return new ResponseEntity<>(updatedComplaint, HttpStatus.OK);
    }

    @DeleteMapping("/complaints/{complaintId}")
    public ResponseEntity<Void> deleteComplaint(@PathVariable int complaintId) {
        complaintService.deleteComplaint(complaintId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
