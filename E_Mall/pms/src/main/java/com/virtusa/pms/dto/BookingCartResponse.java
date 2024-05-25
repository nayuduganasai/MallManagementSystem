package com.virtusa.pms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingCartResponse {
    private int bookingCartId;
    private List<BookingRequestDto> requests;
    private Double totalCost;
    private int userId;
}
