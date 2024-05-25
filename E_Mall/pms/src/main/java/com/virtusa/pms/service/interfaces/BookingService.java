package com.virtusa.pms.service.interfaces;

import com.virtusa.pms.dto.BookingRequestDto;

public interface BookingService {
    String bookSpace(BookingRequestDto bookingRequestDto);
}