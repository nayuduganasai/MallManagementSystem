package com.virtusa.pms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiscountResponse {
    private Long Id;
    private String discountName;
    private double percentage;
    private LocalDate startDate;
    private LocalDate endDate;
}
