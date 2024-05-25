package com.virtusa.pms.service;

import com.virtusa.pms.dto.CategoryDto;
import com.virtusa.pms.dto.CategoryResponse;
import com.virtusa.pms.dto.RentTypeDto;
import com.virtusa.pms.dto.TermDto;
import com.virtusa.pms.exception.CategoryNotFoundException;
import com.virtusa.pms.model.Category;
import com.virtusa.pms.model.RentType;
import com.virtusa.pms.model.Term;
import com.virtusa.pms.repository.CategoryRepo;
import com.virtusa.pms.service.interfaces.CategoryI;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class CategoryServiceImp implements CategoryI {

    @Autowired
    ModelMapper mp;

    @Autowired
    CategoryRepo categoryRepo;

    public CategoryServiceImp(CategoryRepo categoryRepo) {
    }


    public CategoryDto mapModelToDTO(Category model) {
        return mp.map(model, CategoryDto.class);
    }


    public RentTypeDto mapModelToRentDTO(RentType model) {
        return mp.map(model, RentTypeDto.class);
    }
    public TermDto mapModelToTermDTO(Term model){
        TermDto response = new TermDto();
        response.setTermId(model.getTermId());
        response.setTermName(model.getTermName());
        List<RentTypeDto> rentTypes = model.getRentType().stream().map(this::mapModelToRentDTO).collect(Collectors.toList());
        response.setRentype(rentTypes);

        return response;
    }
    public CategoryResponse mapModelToCatRes(Category category) {
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setCategoryId(category.getCategoryId());
        categoryResponse.setCategoryName(category.getCategoryName());
        System.out.println(category);
        System.out.println(category.getTerm());
        // Map List<Term> to List<String> containing term names
        List<TermDto> termNames = category.getTerm().stream()
                .map(this::mapModelToTermDTO)
                .collect(Collectors.toList());

        categoryResponse.setTerms(termNames);
        System.out.println(categoryResponse);
        return categoryResponse;
    }
    private Category mapDTOToModel(CategoryDto dto) {
        return mp.map(dto, Category.class);
    }


    @Override
    public String addCategory(CategoryDto categoryDto) throws CategoryNotFoundException {
        if(categoryRepo.existsByCategoryName(categoryDto.getCategoryName())){
            throw new CategoryNotFoundException("Category with name " + categoryDto.getCategoryName() + " already exists");
        }
            Category category = mapDTOToModel(categoryDto);
            Category savedCategory = categoryRepo.save(category);
            CategoryDto category1 =mapModelToDTO(savedCategory);
        return "Category added successfully";
    }


    @Override
    public List<CategoryResponse> getAllCategories() throws CategoryNotFoundException {
            List<Category> categoryList = categoryRepo.findAll();
            if (categoryList.isEmpty()) {
                throw new CategoryNotFoundException("No Categories Found");
            }
        System.out.println(categoryList);
        return categoryList.stream()
                    .map(this::mapModelToCatRes)
                    .collect(Collectors.toList());
        }


    @Override
    public String updateCategory(int cId, CategoryDto categoryDto) throws CategoryNotFoundException {
        if(categoryRepo.existsByCategoryName(categoryDto.getCategoryName())) {
            throw new CategoryNotFoundException("Category with name " + categoryDto.getCategoryName() + " already exists");
        }
            if (categoryRepo.existsById(categoryDto.getCategoryId())) {
                Category category = mapDTOToModel(categoryDto);
                categoryRepo.save(category);
                return "Category Updated successfully";
            } else {
                throw new CategoryNotFoundException("Category with ID " + categoryDto.getCategoryId() + " not found");
            }

    }

    @Override
    public String deleteCategoryById(int cId) throws CategoryNotFoundException {
            if (categoryRepo.existsById(cId)) {
                categoryRepo.deleteById(cId);
                return "Category Deleted Successfully";
            } else {
                throw new CategoryNotFoundException("Category with ID " + cId + " not found");
            }
    }

    @Override
    public CategoryResponse getCategoryById(int cId) throws CategoryNotFoundException {
        Optional<Category> categoryById = categoryRepo.findById(cId);
        if(categoryById.isPresent()){
            System.out.println(categoryById);
            return mapModelToCatRes(categoryById.get());
        }
        else {
            throw new CategoryNotFoundException("Category with ID " + cId + " not found");
        }
}

//    @Override
//    public CategoryDto getCategoryByCategoryName(String cName) throws CategoryNotFoundException {
//        try {
//            Category categoryByName = categoryRepo.getCategoryByCategoryName(cName);
//            if(categoryByName != null){
//                log.info("Category retrieved successfully using name");
//                return mapModelToDTO(categoryByName);
//            }
//            else {
//                log.warn("Category with name " +cName+"not found");
//                throw new CategoryNotFoundException("Category Not Found");
//            }
//        } catch (Exception e) {
//            log.error("Internal Server Error", e);
//            throw new CategoryNotFoundException("Error retrieving category by name");
//        }
//    }

}
