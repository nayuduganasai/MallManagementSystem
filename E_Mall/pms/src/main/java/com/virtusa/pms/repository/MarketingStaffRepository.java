package com.virtusa.pms.repository;

import com.virtusa.pms.model.MarketingStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarketingStaffRepository extends JpaRepository<MarketingStaff, Long> {
    // Define custom queries if needed
}

