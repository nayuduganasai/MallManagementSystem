package com.virtusa.pms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SpaceBookingResponse {

    private Long bookingId;
    private LocalDate startDate;
    private LocalDate endDate;
    private int referralId;
    private String status;
    private int categoryId;
    private int termId;
    private int rentTypeId;
    private int spaceId;
    private int userId;
}
