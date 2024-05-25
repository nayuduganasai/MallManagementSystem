package com.virtusa.pms.service.interfaces;

import java.time.LocalDate;
import java.util.List;

import com.virtusa.pms.dto.ComplaintDTO;
import com.virtusa.pms.dto.DiscountResponse;
import com.virtusa.pms.dto.FeedbackDTO;
import com.virtusa.pms.dto.SpaceDTO;
import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.model.Complaint;
import com.virtusa.pms.model.Discount;
import com.virtusa.pms.model.Feedback;
import com.virtusa.pms.model.Request;
import org.springframework.data.crossstore.ChangeSetPersister;

public interface SpaceService {
    SpaceDTO getSpaceById(int spaceId);

    SpaceDTO getSpaceByLocation(String Location);

    List<SpaceDTO> getAllSpaces();

    SpaceDTO createSpace(SpaceDTO spaceDTO);

    SpaceDTO updateSpace(int spaceId, SpaceDTO spaceDTO);

    void deleteSpace(int spaceId);
    
//    List<SpaceDTO> getSpacesByRentalRateRange(Double minRate, Double maxRate);
    List<ComplaintDTO> getComplaintsBySpaceId(int spaceId);
    List<SpaceDTO> getSpacesByAvailableDate(LocalDate date);

    List<Request> getRequestsBySpaceId(int spaceId) throws CustomException;

    //    List<Booking> getBookingsBySpaceId(int spaceId)
//
//    List<Request> getRequestsBySpaceId(int spaceId) throws NotFoundException;
//
    List<FeedbackDTO> getFeedbacksBySpaceId(int spaceId) throws ChangeSetPersister.NotFoundException;

    List<DiscountResponse> getDiscountsBySpaceId(int spaceId) throws ChangeSetPersister.NotFoundException;
}
