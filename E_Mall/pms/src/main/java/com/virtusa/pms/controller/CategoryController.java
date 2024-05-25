package com.virtusa.pms.controller;

import com.virtusa.pms.dto.CategoryDto;
import com.virtusa.pms.dto.CategoryResponse;
import com.virtusa.pms.exception.CategoryNotFoundException;
import com.virtusa.pms.service.CategoryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class CategoryController extends  BaseController{

    @Autowired
    CategoryServiceImp categoryServiceImp;

    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategories() throws CategoryNotFoundException {
        List<CategoryResponse> categoryDtoList=categoryServiceImp.getAllCategories();
//        System.out.println(categoryDtoList);
        return new ResponseEntity<>(categoryDtoList, HttpStatus.OK);
    }

    @PostMapping("/categories")
    public ResponseEntity<?> saveCategory(@RequestBody CategoryDto categoryDto) throws CategoryNotFoundException{
        String msg=categoryServiceImp.addCategory(categoryDto);
        return new ResponseEntity<>(msg, HttpStatus.CREATED);

    }

    @PutMapping("/categories/{categoryId}")
    public ResponseEntity<?> updateCategory(@PathVariable ("categoryId") int categoryId,@RequestBody CategoryDto categoryDto) throws CategoryNotFoundException{
       String msg= categoryServiceImp.updateCategory(categoryId,categoryDto);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @GetMapping("/categories/{categoryId}")
    public ResponseEntity<?> getCategoryById(@PathVariable ("categoryId") int categoryId) throws CategoryNotFoundException{
          CategoryResponse categoryDto= categoryServiceImp.getCategoryById(categoryId);
          return new ResponseEntity<>(categoryDto, HttpStatus.OK);
    }

    @DeleteMapping("/categories/{categoryId}")
    public ResponseEntity<?> deleteCategoryById(@PathVariable ("categoryId") int categoryId) throws CategoryNotFoundException{
       String msg= categoryServiceImp.deleteCategoryById(categoryId);
        return new ResponseEntity<String>(msg,HttpStatus.OK);
    }


}
