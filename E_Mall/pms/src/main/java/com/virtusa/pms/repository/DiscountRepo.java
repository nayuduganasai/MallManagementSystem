package com.virtusa.pms.repository;

import com.virtusa.pms.model.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountRepo extends JpaRepository<Discount,Long> {

    boolean existsByDiscountName(String name);


}
