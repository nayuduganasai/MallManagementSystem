package com.virtusa.pms.repository;

import com.virtusa.pms.model.SpaceOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpaceOwnerRepository extends JpaRepository<SpaceOwner, Long> {
    // Define custom queries if needed
}

