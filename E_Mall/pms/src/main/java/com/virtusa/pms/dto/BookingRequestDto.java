package com.virtusa.pms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDto {

    private int requestId;
    private int spaceId;
    private int userId;
    private LocalDate requestDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private int referralId;
    private int categoryId;
    private int termId;
    private int rentTypeId;
}
