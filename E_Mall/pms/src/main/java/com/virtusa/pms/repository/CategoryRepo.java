package com.virtusa.pms.repository;

import com.virtusa.pms.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {

//    Category getCategoryByCategoryName(String categoryName);

    boolean existsByCategoryName(String categoryName);
}
