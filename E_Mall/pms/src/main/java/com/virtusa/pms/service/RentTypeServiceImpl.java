package com.virtusa.pms.service;


import com.virtusa.pms.dto.RentTypeDto;
import com.virtusa.pms.exception.PriceNotFoundException;
import com.virtusa.pms.exception.RentTypeNotFoundException;
import com.virtusa.pms.exception.TermNotFoundException;
import com.virtusa.pms.model.RentType;
import com.virtusa.pms.model.Term;
import com.virtusa.pms.repository.RentTypeRepo;
import com.virtusa.pms.repository.TermRepo;
import com.virtusa.pms.service.interfaces.RentTypeI;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RentTypeServiceImpl implements RentTypeI {

    @Autowired
    ModelMapper mp;

    @Autowired
    RentTypeRepo rentTypeRepo;
//    @Autowired
//    PriceServiceImpl priceService;

    @Autowired
    TermRepo termRepo;

    Log log = LogFactory.getLog(this.getClass());

    public RentTypeDto mapModelToDTO(RentType model) {
        return mp.map(model, RentTypeDto.class);
    }
    private RentType mapDTOToModel(RentTypeDto dto) {
        return mp.map(dto, RentType.class);
    }


    @Override
    public String addRentTypesToTerm(int termId, List<RentTypeDto> rentTypeDto) throws TermNotFoundException {
            Term term = termRepo.findById(termId)
                    .orElseThrow(() -> new TermNotFoundException("Term not found"));

            List<String> rentTypeNames=rentTypeDto.stream()
                    .map(RentTypeDto::getRentTypeName)
                    .collect(Collectors.toList());

                  List<RentType> existingRentTypes=rentTypeRepo.findByRentTypeNameInAndTerm(rentTypeNames,term);

                  for(RentTypeDto rentTypeDto1 :rentTypeDto){
                      if (existingRentTypes.stream().anyMatch(rentType ->rentType.getRentTypeName().equals(rentTypeDto1.getRentTypeName()))){
                          return "RentType with name" + rentTypeDto1.getRentTypeName()+"already exist in term";
                      } else {
                          RentType rentType=mp.map(rentTypeDto1,RentType.class);
                          List<Term> terms = new ArrayList<>();
                          terms.add(term);
                          rentType.setTerm(terms);
//
                          System.out.println("--------------------------------------");
                          System.out.println(rentType);
                          existingRentTypes.add(rentType);
                      }
                  }
            if (!existingRentTypes.isEmpty()) {
                List<RentType> savedRentTypes = rentTypeRepo.saveAll(existingRentTypes);
                return "RentType added successfully";
            } else {
                return "No RentTypes to add";

            }
    }

    @Override
    public List<RentTypeDto> getAllRentType() throws RentTypeNotFoundException {
            List<RentType> rentTypeList = rentTypeRepo.findAll();
            if (rentTypeList.isEmpty()){
                throw new RentTypeNotFoundException("RentType not found");
            }
        return rentTypeList.stream()
                    .map(this::mapModelToDTO)
                    .toList();
    }


    @Override
    public String updateRentType(int rId, int termId, RentTypeDto rentTypeDto) throws TermNotFoundException, RentTypeNotFoundException, PriceNotFoundException {
        RentType existingRent = rentTypeRepo.findById(rId)
                .orElseThrow(() -> new RentTypeNotFoundException("RentType with ID " + rId + " is not found"));

        Term term = termRepo.findById(termId)
                .orElseThrow(() -> new TermNotFoundException("Term not found"));
if(rentTypeRepo.existsByRentTypeNameAndTerm(rentTypeDto.getRentTypeName(),term)){
    throw new RentTypeNotFoundException("RentType with name"  + rentTypeDto.getRentTypeName() +
                               " already exists in the same category");
}
        existingRent.setRentTypeName(rentTypeDto.getRentTypeName());
        existingRent.setCost(rentTypeDto.getCost());
         List<Term> rentTypeTerms=existingRent.getTerm();
//         rentTypeTerms.add(term);
         existingRent.setTerm(rentTypeTerms);
        rentTypeRepo.save(existingRent);
        return "RentType updated Successfully";
    }

    @Override
    public String deleteRentTypeById(int rId) throws RentTypeNotFoundException {
           if (rentTypeRepo.existsById(rId)){
               rentTypeRepo.deleteById(rId);
               return "RentType deleted successfully ";
           }
           else{
               throw new RentTypeNotFoundException("RentType  with id "+ rId+"is not found");
           }


    }

    @Override
    public RentTypeDto getRentTypeById(int rId) throws RentTypeNotFoundException {
            Optional<RentType> rentTypeById = rentTypeRepo.findById(rId);
            if (rentTypeById.isPresent()){
                return mapModelToDTO(rentTypeById.get());
            }
            else {
                throw new RentTypeNotFoundException("RentType not found");
            }
    }

//    @Override
//    public RentTypeDto getRentTypeByRentTypeName(String rName) throws RentTypeNotFoundException {
//        try {
//            RentType rentTypeByName = rentTypeRepo.getRentTypeByRentTypeName(rName);
//            if (rentTypeByName!=null){
//                log.info("Retrieved rentType with name "+ rName +"successfully");
//                return mapModelToDTO(rentTypeByName);
//            }
//            else {
//                log.warn("RentType  with name "+ rName + "is not found");
//                throw new RentTypeNotFoundException("RentType not found");
//            }
//
//        }catch (Exception e) {
//            log.error("Internal server Error",e);
//            throw new RentTypeNotFoundException("RentType not found");
//        }
//
//    }
//
//    @Override
//    public RentTypeDto getRentTypeByCost(double rCost) throws RentTypeNotFoundException {
//        try {
//            RentType rentTypeByCost = rentTypeRepo.getRentTypeByCost(rCost);
//            if (rentTypeByCost!=null){
//                log.info("RentType retrieved successfully");
//                return mapModelToDTO(rentTypeByCost);
//            }
//            else {
//                log.warn("Term  with cost "+ rCost + "is not found");
//                throw new RentTypeNotFoundException("RentType not found");
//            }
//
//        }catch (Exception e) {
//            log.error("Internal server Error",e);
//            throw new RentTypeNotFoundException("RentType not found");
//        }
//
//    }
}
