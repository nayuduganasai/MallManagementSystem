package com.virtusa.pms.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiscountRequest {

    private String name;
    private double percentage;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<Integer> spaceIds;

}
