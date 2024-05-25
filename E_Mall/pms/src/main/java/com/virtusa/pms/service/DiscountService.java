package com.virtusa.pms.service;

import com.virtusa.pms.dto.DiscountRequest;
import com.virtusa.pms.dto.DiscountResponse;
import com.virtusa.pms.dto.DiscountUpdateResponse;
import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.model.Discount;
import com.virtusa.pms.model.Space;
import com.virtusa.pms.repository.DiscountRepo;
import com.virtusa.pms.repository.SpaceRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DiscountService {

    private final DiscountRepo discountRepo;

    private final ModelMapper modelMapper;

    private final SpaceRepository spaceRepository;
    @Autowired
    public DiscountService(DiscountRepo discountRepo,ModelMapper mapper,SpaceRepository spaceRepository) {
        this.discountRepo = discountRepo;
        this.modelMapper = mapper;
        this.spaceRepository = spaceRepository;
    }

    private DiscountUpdateResponse convertEntityToRes(Discount discount){
        DiscountUpdateResponse response = new DiscountUpdateResponse();
        response.setDiscountId(discount.getDiscountId());
        response.setName(discount.getDiscountName());
        response.setPercentage(discount.getPercentage());
        response.setStartDate(discount.getStartDate());
        response.setEndDate(discount.getEndDate());
        List<Integer> spaceIds = new ArrayList<>();
        discount.getSpaces().forEach((space)->spaceIds.add(space.getSpaceId()));
        response.setSpaceIds(spaceIds);
        return response;

    }

    public DiscountResponse createDiscount(DiscountRequest req) throws CustomException {
        DiscountResponse response;
        if(discountRepo.existsByDiscountName(req.getName())){
            throw new CustomException("Discount with the given"+req.getName()+"already exist");
        }else {
            Discount discount = new Discount();
            discount.setDiscountName(req.getName());
            discount.setStartDate(req.getStartDate());
            discount.setPercentage(req.getPercentage());
            discount.setEndDate(req.getEndDate());
            Set<Space> spaces = req.getSpaceIds().stream().map(ele->spaceRepository.findById(ele).get()).collect(Collectors.toSet());
            discount.setSpaces(spaces);
            Discount result = discountRepo.save(discount);
            response = modelMapper.map(result,DiscountResponse.class);

        }
        return response;

    }

    public List<DiscountResponse> getAllDiscounts() throws CustomException {
        List<Discount> result = discountRepo.findAll();
        if(result.isEmpty()){
            throw new CustomException("Sorry No Discounts Found");
        }else{

            return result.stream().map(obj->modelMapper.map(obj,DiscountResponse.class)).toList();
        }

    }

    public DiscountUpdateResponse getDiscountById(Long id) throws CustomException {
        Optional<Discount> optionalDiscount = discountRepo.findById(id);
        if (optionalDiscount.isPresent()) {
            return convertEntityToRes(optionalDiscount.get()) ;

        } else {
            throw new CustomException("Discount with ID " + id + " not found");
        }
    }

    public DiscountUpdateResponse updateDiscount(Long id, DiscountRequest req) throws CustomException {
        Optional<Discount> optionalDiscount = discountRepo.findById(id);
        if (optionalDiscount.isPresent()) {
            Discount discount = optionalDiscount.get();
            Set<Space> spaces =  new HashSet<>();
            req.getSpaceIds().forEach(spaceId->spaces.add(spaceRepository.findById(spaceId).get()));
            discount.setSpaces(spaces);
            discount.setDiscountName(req.getName());
            discount.setPercentage(req.getPercentage());
            discount.setStartDate(req.getStartDate());
            discount.setEndDate(req.getEndDate());

            return convertEntityToRes(discountRepo.save(discount));
        } else {
            throw new CustomException("Discount with ID " + id + " not found");
        }
    }

    public String deleteDiscount(Long id) throws CustomException {
        if (discountRepo.existsById(id)) {
            discountRepo.deleteById(id);
            return "Deleted Discount with id: "+id+" Successfully";
        } else {
            throw new CustomException("Discount with ID " + id + " not found");
        }
    }



}
