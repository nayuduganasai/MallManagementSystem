package com.virtusa.pms.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class TermDto {

    private int termId;
    private String termName;
    private List<RentTypeDto> rentype;
//    private List<CategoryDto> categoryList;


}
