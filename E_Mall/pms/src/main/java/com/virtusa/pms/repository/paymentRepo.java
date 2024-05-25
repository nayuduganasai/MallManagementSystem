package com.virtusa.pms.repository;

import com.virtusa.pms.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface paymentRepo extends JpaRepository<Payment, Long> {

}
