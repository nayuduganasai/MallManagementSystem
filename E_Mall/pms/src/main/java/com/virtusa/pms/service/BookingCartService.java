package com.virtusa.pms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.virtusa.pms.dto.BookingRequestDto;
import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.model.Request;
import com.virtusa.pms.model.User;
import com.virtusa.pms.repository.RequestRepo;
import com.virtusa.pms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtusa.pms.dto.BookingCartRequest;
import com.virtusa.pms.dto.BookingCartResponse;
import com.virtusa.pms.model.BookingCart;
import com.virtusa.pms.repository.BookingCartRepo;

@Service
public class BookingCartService {

    @Autowired
    private BookingCartRepo bookingCartRepo;
    @Autowired
    private RequestRepo requestRepo;
    @Autowired
    private UserRepository userRepository;

    private BookingCart convertToEntity(BookingCartRequest request) {
        BookingCart bookingCart = new BookingCart();
        User user = userRepository.findById(request.getUserId()).get();
        List<Request> requests = new ArrayList<>();
        request.getRequests().forEach(id->requests.add(requestRepo.findById(id).get()));
        bookingCart.setRequests(requests);
        bookingCart.setTotalCost(request.getTotalCost());
        bookingCart.setUser(user);
        return bookingCart;
    }



    private BookingCartResponse convertToDto(BookingCart bookingCart) {
        BookingCartResponse response = new BookingCartResponse();
        response.setBookingCartId(bookingCart.getBookingItemId());
        response.setRequests(bookingCart.getRequests().stream().map(this::ReqEntityToReqDto).toList());
        response.setTotalCost(bookingCart.getTotalCost());
        response.setUserId(bookingCart.getUser().getUserId());
        return response;
    }

    private BookingRequestDto ReqEntityToReqDto(Request request){
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
    public List<BookingCartResponse> getAllBookingItems() {
        List<BookingCart> bookingCarts = bookingCartRepo.findAll();
        return bookingCarts.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Optional<BookingCartResponse> getBookingItemById(int bookingItemId) {
        Optional<BookingCart> bookingItem = bookingCartRepo.findById(bookingItemId);
        return bookingItem.map(this::convertToDto);
    }

    public Optional<BookingCartResponse> getBookingCartByUser(int userId) throws CustomException {
       Optional<BookingCart> cart =  bookingCartRepo.findByUser_UserId(userId);
        if(!cart.isPresent()){
            throw new CustomException("cart not found for userId: "+ userId);
        }
        return Optional.of(convertToDto(cart.get()));
    }

    public BookingCartResponse createBookingItem(BookingCartRequest bookingCartRequest) {
        BookingCart bookingCart = convertToEntity(bookingCartRequest);
        BookingCart savedBookingCart = bookingCartRepo.save(bookingCart);
        return convertToDto(savedBookingCart);
    }

    public BookingCartResponse updateBookingItem(int bookingItemId, BookingCartRequest updatedBookingCartRequest) {
        BookingCart existingBookingCart = bookingCartRepo.findById(bookingItemId).orElse(null);
        if (existingBookingCart != null) {
            BookingCart updatedBookingCart = convertToEntity(updatedBookingCartRequest);
            updatedBookingCart.setBookingItemId(existingBookingCart.getBookingItemId()); // Ensure the ID is set for update
            BookingCart savedBookingCart = bookingCartRepo.save(updatedBookingCart);
            return convertToDto(savedBookingCart);
        }
        return null; // Handle the case where the booking item with the given ID doesn't exist
    }

    public void deleteBookingItem(int bookingItemId) {
        bookingCartRepo.deleteById(bookingItemId);
    }
}
