package com.virtusa.pms.controller;
import com.virtusa.pms.dto.ComplaintDTO;
import com.virtusa.pms.dto.DiscountResponse;
import com.virtusa.pms.dto.FeedbackDTO;
import com.virtusa.pms.model.Discount;
import com.virtusa.pms.model.Feedback;
import com.virtusa.pms.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.virtusa.pms.dto.SpaceDTO;
import com.virtusa.pms.exception.ComplaintNotFoundException;
import com.virtusa.pms.model.Complaint;
import com.virtusa.pms.service.interfaces.SpaceService;

import java.time.LocalDate;
import java.util.List;
@RestController
public class SpaceController extends BaseController {

    @Autowired
    private SpaceService spaceService;

    @GetMapping("/spaces/{spaceId}")
    public ResponseEntity<SpaceDTO> getSpaceById(@PathVariable int spaceId) {
        SpaceDTO spaceDTO = spaceService.getSpaceById(spaceId);
        return new ResponseEntity<>(spaceDTO, HttpStatus.OK);
    }
    @GetMapping("/spaces/location/{location}")
    public ResponseEntity<SpaceDTO> getSpaceByLocation(@PathVariable String location) {
        SpaceDTO spaceDTO = spaceService.getSpaceByLocation(location);
        return new ResponseEntity<>(spaceDTO, HttpStatus.OK);
    }

    @GetMapping("/spaces")
    public ResponseEntity<List<SpaceDTO>> getAllSpaces() {
        List<SpaceDTO> spaceDTOList = spaceService.getAllSpaces();
        return new ResponseEntity<>(spaceDTOList, HttpStatus.OK);
    }

    @PostMapping("/spaces")
    public ResponseEntity<SpaceDTO> createSpace(@RequestBody SpaceDTO spaceDTO) {
        SpaceDTO createdSpace = spaceService.createSpace(spaceDTO);
        return new ResponseEntity<>(createdSpace, HttpStatus.CREATED);
    }

    @PutMapping("/spaces/{spaceId}")
    public ResponseEntity<SpaceDTO> updateSpace(@PathVariable int spaceId, @RequestBody SpaceDTO spaceDTO) {
        SpaceDTO updatedSpace = spaceService.updateSpace(spaceId, spaceDTO);
        return new ResponseEntity<>(updatedSpace, HttpStatus.OK);
    }

    @DeleteMapping("/spaces/{spaceId}")
    public ResponseEntity<Void> deleteSpace(@PathVariable int spaceId) {
        spaceService.deleteSpace(spaceId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/spaces/{spaceId}/complaints")
    public ResponseEntity<List<ComplaintDTO>> getComplaintsBySpaceId(@PathVariable int spaceId) {
        try {
            List<ComplaintDTO> complaints = spaceService.getComplaintsBySpaceId(spaceId);
            return ResponseEntity.ok(complaints);
        } catch (ComplaintNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    } 
    @GetMapping("/spaces/findByAvailableDate/{date}")
    public ResponseEntity<List<SpaceDTO>> getSpacesByAvailableDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<SpaceDTO> spaces = spaceService.getSpacesByAvailableDate(date);
        return ResponseEntity.ok(spaces);
    }

    @GetMapping("/spaces/{spaceId}/feedbacks")
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksBySpaceId(@PathVariable int spaceId) {
        try {
            List<FeedbackDTO> feedbacks = spaceService.getFeedbacksBySpaceId(spaceId);
            return ResponseEntity.ok(feedbacks);
        } catch (ChangeSetPersister.NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/spaces/{spaceId}/Discounts")
    public ResponseEntity<List<DiscountResponse>> getDiscountsBySpaceId(@PathVariable int spaceId) {
        try {
            List<DiscountResponse> discounts = spaceService.getDiscountsBySpaceId(spaceId);
            return ResponseEntity.ok(discounts);
        } catch (ChangeSetPersister.NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
  
}
