package com.virtusa.pms.service.interfaces;

import com.virtusa.pms.dto.RentTypeDto;
import com.virtusa.pms.exception.PriceNotFoundException;
import com.virtusa.pms.exception.RentTypeNotFoundException;
import com.virtusa.pms.exception.TermNotFoundException;

import java.util.List;

public interface RentTypeI {



    String addRentTypesToTerm(int termId, List<RentTypeDto> rentTypeDto) throws TermNotFoundException, RentTypeNotFoundException, PriceNotFoundException;

    List<RentTypeDto> getAllRentType() throws RentTypeNotFoundException;

//    String updateRentType(int rId,int termId,RentTypeDto rentTypeDto ) throws RentTypeNotFoundException,TermNotFoundException;

    String updateRentType(int rId, int termId, RentTypeDto rentTypeDto) throws TermNotFoundException, RentTypeNotFoundException, PriceNotFoundException;

    String deleteRentTypeById(int rId) throws RentTypeNotFoundException;
    RentTypeDto getRentTypeById(int rId) throws RentTypeNotFoundException;
//    RentTypeDto getRentTypeByRentTypeName(String rName) throws RentTypeNotFoundException;
//    RentTypeDto getRentTypeByCost(double rCost) throws RentTypeNotFoundException;
}
