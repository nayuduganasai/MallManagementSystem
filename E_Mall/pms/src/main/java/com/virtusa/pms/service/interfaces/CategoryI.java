package com.virtusa.pms.service.interfaces;

import com.virtusa.pms.dto.CategoryDto;
import com.virtusa.pms.dto.CategoryResponse;
import com.virtusa.pms.exception.CategoryNotFoundException;

import java.util.List;

public interface CategoryI {

    String addCategory(CategoryDto categoryDto) throws CategoryNotFoundException;
    List<CategoryResponse> getAllCategories() throws CategoryNotFoundException;
    String updateCategory(int cId, CategoryDto categoryDto ) throws CategoryNotFoundException;
    String deleteCategoryById(int cId) throws CategoryNotFoundException;
    CategoryResponse getCategoryById(int cId) throws CategoryNotFoundException;
//    CategoryDto getCategoryByCategoryName(String cName) throws CategoryNotFoundException;
}
