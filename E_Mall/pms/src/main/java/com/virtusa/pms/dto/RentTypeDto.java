package com.virtusa.pms.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class RentTypeDto {

    private int rentTypeId;
    private String rentTypeName;
    private double cost;



}
