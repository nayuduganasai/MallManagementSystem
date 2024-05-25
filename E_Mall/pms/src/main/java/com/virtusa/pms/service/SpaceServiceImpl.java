package com.virtusa.pms.service;

import com.virtusa.pms.dto.ComplaintDTO;
import com.virtusa.pms.dto.DiscountResponse;
import com.virtusa.pms.dto.FeedbackDTO;
import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.model.*;
import com.virtusa.pms.repository.CategoryRepo;
import com.virtusa.pms.service.interfaces.SpaceService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import com.virtusa.pms.dto.SpaceDTO;

import com.virtusa.pms.repository.SpaceRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import com.virtusa.pms.exception.SpaceNotFoundException;
@Service
public class SpaceServiceImpl implements SpaceService {

    @Autowired
    private SpaceRepository spaceRepository;
    @Autowired
    private CategoryRepo catservice;

    @Autowired
    private ModelMapper modelMapper;

    private FeedbackDTO convertFeedBackToDto(Feedback req){
        FeedbackDTO res = new FeedbackDTO(
                req.getFeedbackId(),req.getRating(),req.getComment(),req.getUser().getUserId(),req.getSpace().getSpaceId()
        );
        return res;
    }

    private DiscountResponse convertDiscountToDto(Discount req){
        DiscountResponse res =  new DiscountResponse(req.getDiscountId(), req.getDiscountName(), req.getPercentage(),req.getStartDate(),req.getEndDate());
        return res;
    }

    private ComplaintDTO convertToDTO(Complaint complaint) {
        ComplaintDTO dto = new ComplaintDTO(complaint.getComplaintId(),
                complaint.getUser().getUserId(),
                complaint.getSpace().getSpaceId(),
                complaint.getSubject(),
                complaint.getDescription(),
                complaint.getCreateDate(),
                complaint.getStatus());
        return dto;
    }
    @Override
    public SpaceDTO getSpaceById(int spaceId) {
        Space space = spaceRepository.findById(spaceId)
                .orElseThrow(() -> new SpaceNotFoundException("Space not found"));
        return modelMapper.map(space, SpaceDTO.class);
    }

    @Override
    public SpaceDTO getSpaceByLocation(String Location) {
        Space space = spaceRepository.getSpaceByLocation(Location)
                .orElseThrow(() -> new SpaceNotFoundException("Space not found"));
        return modelMapper.map(space, SpaceDTO.class);
    }

    @Override
    public List<SpaceDTO> getAllSpaces() {
        List<Space> spaces = spaceRepository.findAll();
        return spaces.stream()
                .map(space -> modelMapper.map(space, SpaceDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public SpaceDTO createSpace(SpaceDTO spaceDTO) {
        Space space = modelMapper.map(spaceDTO, Space.class);
        Space savedSpace = spaceRepository.save(space);
        return modelMapper.map(savedSpace, SpaceDTO.class);
    }

    @Override
    public SpaceDTO updateSpace(int spaceId, SpaceDTO spaceDTO)  {
        Space existingSpace = spaceRepository.findById(spaceId)
                .orElseThrow(() -> new SpaceNotFoundException("Space not found"));

//        modelMapper.map(spaceDTO, existingSpace);
        existingSpace.setAvailableDate(spaceDTO.getAvailableDate());
        existingSpace.setLocation(spaceDTO.getLocation());
        existingSpace.setSize(spaceDTO.getSize());
        existingSpace.setCategory(catservice.findById(spaceDTO.getCategoryId()).get());
        Space updatedSpace = spaceRepository.save(existingSpace);
        return modelMapper.map(updatedSpace, SpaceDTO.class);
    }

    @Override
    public void deleteSpace(int spaceId) {
        spaceRepository.deleteById(spaceId);
    }

//    @Override
//    public List<SpaceDTO> getSpacesByRentalRateRange(Double minRate, Double maxRate) {
//        List<Space> spaces = spaceRepository.findByRentalRateRange(minRate, maxRate);
//        return spaces.stream()
//                .map(space -> modelMapper.map(space, SpaceDTO.class))
//                .collect(Collectors.toList());
//    }

    @Override
    public List<ComplaintDTO> getComplaintsBySpaceId(int spaceId) {
        Space space = spaceRepository.findById(spaceId)
                .orElseThrow(() -> new SpaceNotFoundException("Space not found"));

        return space.getComplaints().stream().map(complaint -> convertToDTO(complaint)).toList();
    }
    @Override
    public List<SpaceDTO> getSpacesByAvailableDate(LocalDate date) {
        List<Space> spaces = spaceRepository.findByAvailableDate(date);
        return spaces.stream()
                .map(space -> modelMapper.map(space, SpaceDTO.class))
                .collect(Collectors.toList());
    }
    
    private SpaceDTO convertToDTO(Space space) {
    	
        return modelMapper.map(space, SpaceDTO.class);
    }
    

    private Space convertToEntity(SpaceDTO spaceDTO) {
        return modelMapper.map(spaceDTO, Space.class);
    }
   
//	@Override
//	public List<SpaceBooking> getBookingsBySpaceId(int spaceId) throws CustomException {
//		Space space = spaceRepository.findById(spaceId)
//	                .orElseThrow(() -> new CustomException("Space not found"));
//
//	        return space.getBookings();
//
//	}

	@Override
	public List<Request> getRequestsBySpaceId(int spaceId) throws CustomException {
		Space space = spaceRepository.findById(spaceId)
                .orElseThrow(() -> new CustomException("Space not found"));

        return space.getRequests();
	}



	@Override
	public List<FeedbackDTO> getFeedbacksBySpaceId(int spaceId) throws ChangeSetPersister.NotFoundException {

		Space space = spaceRepository.findById(spaceId)
             .orElseThrow(() -> new ChangeSetPersister.NotFoundException());

    return space.getFeedbacks().stream().map((feedback -> convertFeedBackToDto(feedback))).toList();

	}

    @Override
    public List<DiscountResponse> getDiscountsBySpaceId(int spaceId) throws ChangeSetPersister.NotFoundException {

        Space space = spaceRepository.findById(spaceId)
                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());

        return space.getDiscounts().stream().map(discount -> convertDiscountToDto(discount)).toList();

    }
}
