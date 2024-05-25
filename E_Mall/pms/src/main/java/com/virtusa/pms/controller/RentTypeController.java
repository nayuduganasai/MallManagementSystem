package com.virtusa.pms.controller;

import com.virtusa.pms.dto.RentTypeDto;
import com.virtusa.pms.exception.PriceNotFoundException;
import com.virtusa.pms.exception.RentTypeNotFoundException;
import com.virtusa.pms.exception.TermNotFoundException;
import com.virtusa.pms.service.RentTypeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RentTypeController extends BaseController {

    @Autowired
    RentTypeServiceImpl rentTypeService;

    @GetMapping("/rentTypes")
    public ResponseEntity<?> getAllRentTypes() throws RentTypeNotFoundException {
        List<RentTypeDto> rentTypeDtoList = rentTypeService.getAllRentType();
        return new ResponseEntity<List<RentTypeDto>>(rentTypeDtoList, HttpStatus.OK);

    }

    @PostMapping("{termId}/rentTypes")
    public ResponseEntity<?> addRentTypesToTerm(@PathVariable("termId") int termId , @RequestBody List<RentTypeDto> rentTypeDto) throws TermNotFoundException, PriceNotFoundException {
        String msg= rentTypeService.addRentTypesToTerm(termId,rentTypeDto);
        return new ResponseEntity<String>(msg,HttpStatus.OK);
    }

    @PutMapping("/rentTypes/{termId}/{rentTypeId}")
    public ResponseEntity<?> updateRentType(@PathVariable("rentTypeId") int rentTypeId, @PathVariable("termId") int termId, @RequestBody RentTypeDto rentTypeDto) throws RentTypeNotFoundException, TermNotFoundException, PriceNotFoundException {
        String msg=rentTypeService.updateRentType(rentTypeId,termId,rentTypeDto);
        return new ResponseEntity<String>(msg,HttpStatus.OK);
    }

    @GetMapping("/rentTypes/{rentTypeId}")
    public ResponseEntity<?> getRentTypeById(@PathVariable ("rentTypeId") int rentTypeId) throws RentTypeNotFoundException{
        RentTypeDto rentTypeDto = rentTypeService.getRentTypeById(rentTypeId);
        return new ResponseEntity<RentTypeDto>(rentTypeDto,HttpStatus.OK);
    }

    @DeleteMapping("/rentTypes/{rentTypeId}")
    public ResponseEntity<?> deleteRentTypeById(@PathVariable ("rentTypeId") int rentTypeId) throws RentTypeNotFoundException{
        String msg= rentTypeService.deleteRentTypeById(rentTypeId);
        return new ResponseEntity<String>(msg,HttpStatus.OK);

    }
//
//    @GetMapping("rentTypes/byName/{rentTypeName}")
//    public ResponseEntity<?> getTermByName(@PathVariable ("rentTypeName") String rentTypeName) throws RentTypeNotFoundException{
//        RentTypeDto rentTypeDto=  rentTypeService.getRentTypeByRentTypeName(rentTypeName);
//        return new ResponseEntity<RentTypeDto>(rentTypeDto,HttpStatus.OK);
//    }
//
//    @GetMapping("rentTypes/byCost/{rentTypeCost}")
//    public ResponseEntity<?> getTermByName(@PathVariable ("rentTypeCost") double rentTypeCost) throws RentTypeNotFoundException{
//        RentTypeDto rentTypeDto=  rentTypeService.getRentTypeByCost(rentTypeCost);
//        return new ResponseEntity<RentTypeDto>(rentTypeDto,HttpStatus.OK);
//    }
}
