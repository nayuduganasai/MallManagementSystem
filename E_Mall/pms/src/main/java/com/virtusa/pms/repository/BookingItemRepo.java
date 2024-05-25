package com.virtusa.pms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtusa.pms.model.BookingCart;

@Repository
public interface BookingItemRepo extends JpaRepository<BookingCart, Long> {

}
