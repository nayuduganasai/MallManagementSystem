package com.virtusa.pms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.virtusa.pms.model.BookingCart;

import java.util.Optional;

@Repository public interface BookingCartRepo extends JpaRepository<BookingCart, Integer> {

    @Query("SELECT bc FROM BookingCart bc WHERE bc.user.userId = :userId")
    Optional<BookingCart> findByUser_UserId(int userId);

}
