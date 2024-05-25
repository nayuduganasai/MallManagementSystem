package com.virtusa.pms.service.interfaces;

import com.virtusa.pms.dto.BookingRequestDto;
import com.virtusa.pms.exception.RequestNotFoundException;

import java.util.List;
import java.util.Optional;

public interface RequestService {

    List<BookingRequestDto> getAllRequests();

    Optional<BookingRequestDto> getRequestById(int requestId) throws RequestNotFoundException;

    BookingRequestDto createRequest(BookingRequestDto bookingRequestDto);

    BookingRequestDto updateRequest(int requestId, BookingRequestDto updatedRequestDto) throws RequestNotFoundException;

    void deleteRequest(int requestId) throws RequestNotFoundException;
}
