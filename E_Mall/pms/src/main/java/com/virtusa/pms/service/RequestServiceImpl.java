package com.virtusa.pms.service;

import com.virtusa.pms.dto.BookingRequestDto;
import com.virtusa.pms.exception.RequestNotFoundException;
import com.virtusa.pms.repository.SpaceRepository;
import com.virtusa.pms.repository.UserRepository;
import com.virtusa.pms.service.interfaces.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.virtusa.pms.model.Request;
import com.virtusa.pms.repository.RequestRepo;

@Service
public class RequestServiceImpl implements RequestService {

    @Autowired
    private RequestRepo requestRepo;
    @Autowired
    private SpaceRepository spaceRepo;
    @Autowired
    private UserRepository userRepo;

    private Request convertToEntity(BookingRequestDto dto){
        Request req = new Request();
        req.setRequestDate(dto.getRequestDate());
        req.setCategoryId(dto.getCategoryId());
        req.setEndDate(dto.getEndDate());
        req.setReferralId(dto.getReferralId());
        req.setRentTypeId(dto.getRentTypeId());
        req.setTermId(dto.getTermId());
        req.setStartDate(dto.getStartDate());
        req.setUser(userRepo.findById(dto.getUserId()).orElse(null)); // Check for existence
        req.setSpace(spaceRepo.findById(dto.getSpaceId()).orElse(null)); // Check for existence
        return req;
    }

    private BookingRequestDto entityToDto(Request request){
        BookingRequestDto response = new BookingRequestDto();
        response.setRequestId(request.getRequestId());
        response.setRequestDate(request.getRequestDate());
        response.setCategoryId(request.getCategoryId());
        response.setEndDate(request.getEndDate());
        response.setReferralId(request.getReferralId());
        response.setRentTypeId(request.getRentTypeId());
        response.setTermId(request.getTermId());
        response.setStartDate(request.getStartDate());
        response.setUserId(request.getUser() != null ? request.getUser().getUserId() : null); // Check for existence
        response.setSpaceId(request.getSpace() != null ? request.getSpace().getSpaceId() : null); // Check for existence
        return response;
    }

    @Override
    public List<BookingRequestDto> getAllRequests() {
        return requestRepo.findAll().stream().map(this::entityToDto).collect(Collectors.toList());
    }

    @Override
    public Optional<BookingRequestDto> getRequestById(int requestId) throws RequestNotFoundException {
        Optional<Request> request = requestRepo.findById(requestId);
        if(!request.isPresent()){
            throw new RequestNotFoundException("Request with ID " + requestId + " not found");
        }
        return request.map(this::entityToDto);
    }

    @Override
    public BookingRequestDto createRequest(BookingRequestDto bookingRequestDto) {
        Request request = convertToEntity(bookingRequestDto);
        Request savedRequest = requestRepo.save(request);
        return entityToDto(savedRequest);
    }

    @Override
    public BookingRequestDto updateRequest(int requestId, BookingRequestDto updatedRequestDto) throws RequestNotFoundException {
        Request existingRequest = requestRepo.findById(requestId).orElseThrow(() -> new RequestNotFoundException("Request not found with id: " + requestId));
        Request updatedRequest = convertToEntity(updatedRequestDto);
        updatedRequest.setRequestId(existingRequest.getRequestId()); // Ensure the ID is set for update
        Request savedRequest = requestRepo.save(updatedRequest);
        return entityToDto(savedRequest);
    }

    @Override
    public void deleteRequest(int requestId) throws RequestNotFoundException {
        if (!requestRepo.existsById(requestId)) {
            throw new RequestNotFoundException("Request not found with id: " + requestId);
        }
        requestRepo.deleteById(requestId);
    }
}
