package com.virtusa.pms.service;

import com.virtusa.pms.dto.SpaceBookingRequest;
import com.virtusa.pms.dto.SpaceBookingResponse;
import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.model.*;
import com.virtusa.pms.repository.BookingCartRepo;
import com.virtusa.pms.repository.SpaceBookingRepo;
import com.virtusa.pms.repository.SpaceRepository;
import com.virtusa.pms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SpaceBookingService {

    private final SpaceBookingRepo spaceBookingRepository;
    private final BookingCartRepo bookingCartRepository;
    private final UserRepository userRepository;
    private final SpaceRepository spaceRepository;

    @Autowired
    public SpaceBookingService(SpaceBookingRepo spaceBookingRepository, BookingCartRepo bookingCartRepository,
                               UserRepository userRepository, SpaceRepository spaceRepository) {
        this.spaceBookingRepository = spaceBookingRepository;
        this.bookingCartRepository = bookingCartRepository;
        this.userRepository = userRepository;
        this.spaceRepository = spaceRepository;
    }

//    private SpaceBooking convertToEntity(SpaceBookingRequest request) {
//        SpaceBooking booking = new SpaceBooking();
//        booking.setUser(userRepository.findById(request.getUserId()).get());
//        booking.setCartId(request.getCartId());
//        return booking;
//    }

    private SpaceBookingResponse convertToDto(SpaceBooking booking) {
        SpaceBookingResponse response = new SpaceBookingResponse();
        response.setBookingId(booking.getBookingId());
        response.setStartDate(booking.getStartDate());
        response.setEndDate(booking.getEndDate());
        response.setReferralId(booking.getReferralId());
        response.setStatus(booking.getStatus());
        response.setCategoryId(booking.getCategoryId());
        response.setTermId(booking.getTermId());
        response.setRentTypeId(booking.getRentTypeId());
        response.setSpaceId(booking.getSpace().getSpaceId());
        response.setUserId(booking.getUser().getUserId());
        return response;
    }
    public String createSpaceBooking(SpaceBookingRequest req) throws CustomException {
        Optional<User> optionalUser = userRepository.findById(req.getUserId());
        if (optionalUser.isEmpty()) {
            throw new CustomException("User not found");
        }
        User user = optionalUser.get();
        BookingCart bookingCart = bookingCartRepository.findById(req.getCartId()).get();
        List<Request> requests = bookingCart.getRequests();
        // Iterate through booking cart requests and create space bookings
        for (Request request : requests) {
            Space space = request.getSpace();
            // Create a space booking for each request
            SpaceBooking booking = new SpaceBooking();
            booking.setUser(user);
            booking.setStartDate(request.getStartDate());
            booking.setEndDate(request.getEndDate());
            booking.setStatus("Pending");
            booking.setSpace(space);
            booking.setReferralId(request.getReferralId());
            booking.setCategoryId(request.getCategoryId());
            booking.setTermId(request.getTermId());
            booking.setRentTypeId(request.getRentTypeId());
            SpaceBooking booked =spaceBookingRepository.save(booking);
            bookingCartRepository.deleteById(bookingCart.getBookingItemId());
        }

        return "Booked Successfully";
    }

    public List<SpaceBookingResponse> getAllSpaceBookings() {
        List<SpaceBooking> bookings = spaceBookingRepository.findAll();
        return bookings.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Optional<SpaceBookingResponse> getSpaceBookingById(Long bookingId) {
        Optional<SpaceBooking> spaceBooking = spaceBookingRepository.findById(bookingId);
        return spaceBooking.map(this::convertToDto);
    }

    public SpaceBookingResponse updateSpaceBooking(Long bookingId, SpaceBooking updatedSpaceBooking) throws CustomException {
        Optional<SpaceBooking> optionalSpaceBooking = spaceBookingRepository.findById(bookingId);
        if (optionalSpaceBooking.isPresent()) {
            SpaceBooking spaceBooking = optionalSpaceBooking.get();
            spaceBooking.setStartDate(updatedSpaceBooking.getStartDate());
            spaceBooking.setEndDate(updatedSpaceBooking.getEndDate());
            spaceBooking.setReferralId(updatedSpaceBooking.getReferralId());
            spaceBooking.setRentTypeId(updatedSpaceBooking.getRentTypeId());
            spaceBooking.setStatus(updatedSpaceBooking.getStatus());
            spaceBooking.setUser(updatedSpaceBooking.getUser());
            SpaceBooking savedSpaceBooking = spaceBookingRepository.save(spaceBooking);
            return convertToDto(savedSpaceBooking);
        } else {
            throw new CustomException("SpaceBooking with ID " + bookingId + " not found");
        }
    }

    public String deleteSpaceBooking(Long bookingId) throws CustomException {
        if (spaceBookingRepository.existsById(bookingId)) {
            spaceBookingRepository.deleteById(bookingId);
            return "Deleted SpaceBooking with id: " + bookingId + " Successfully";
        } else {
            throw new CustomException("SpaceBooking with ID " + bookingId + " not found");
        }
    }

    public String approveBooking(Long bookingId) throws CustomException {
        Optional<SpaceBooking> optionalSpaceBooking = spaceBookingRepository.findById(bookingId);
        if (optionalSpaceBooking.isPresent()) {
            SpaceBooking spaceBooking = optionalSpaceBooking.get();
            if (spaceBooking.getStatus().equals("Approved")) {
                return "SpaceBooking is already approved";
            }
            LocalDate startDate = spaceBooking.getStartDate();
            LocalDate endDate = spaceBooking.getEndDate();
            Space space = spaceBooking.getSpace();
            Optional<List<SpaceBooking>> bookingsOnSameDate = spaceBookingRepository
                    .findByStartDateGreaterThanEqualAndEndDateLessThanEqualAndSpace(startDate, endDate, space);

            if (bookingsOnSameDate.isPresent()) {
                for (SpaceBooking booking : bookingsOnSameDate.get()) {
                    if (!booking.getBookingId().equals(bookingId) && booking.getStatus().equals("Approved")) {
                        throw new CustomException("Space already booked for the same date and space");
                    }else if (!booking.getBookingId().equals(bookingId) && booking.getStatus().equals("Pending")) {
                        booking.setStatus("Rejected");
                        spaceBookingRepository.save(booking);
                    }
                }
            }
            spaceBooking.setStatus("Approved");
            spaceBookingRepository.save(spaceBooking);

            // Update Space entity available date
            space.setAvailableDate(endDate.plusDays(1));
            spaceRepository.save(space);
            return "SpaceBooking Approved Successfully";
        } else {
            throw new CustomException("SpaceBooking with ID " + bookingId + " not found");
        }
    }

    public String rejectBooking(Long bookingId) throws CustomException {
        Optional<SpaceBooking> optionalSpaceBooking = spaceBookingRepository.findById(bookingId);
        if (optionalSpaceBooking.isPresent()) {
            SpaceBooking spaceBooking = optionalSpaceBooking.get();
            if (spaceBooking.getStatus().equals("Rejected")) {
                return "SpaceBooking is already rejected";
            }
            spaceBooking.setStatus("Rejected");
            spaceBookingRepository.save(spaceBooking);
            return "SpaceBooking Rejected Successfully";
        } else {
            throw new CustomException("SpaceBooking with ID " + bookingId + " not found");
        }
    }

    public List<SpaceBookingResponse> getSpaceBookingByUser(int userId) throws CustomException {
        List<SpaceBooking> bookings =  spaceBookingRepository.findByUser_UserId(userId);

        if(bookings.isEmpty()){
            throw new CustomException("No bookings found for userId: " + userId);
        }
        return bookings.stream()

                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
