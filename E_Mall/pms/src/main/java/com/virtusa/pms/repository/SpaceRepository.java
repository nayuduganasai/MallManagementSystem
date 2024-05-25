package com.virtusa.pms.repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.virtusa.pms.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
	public interface SpaceRepository extends JpaRepository<Space, Integer> {
	 List<Space> findByAvailableDate(LocalDate date);
	 Optional<Space> getSpaceByLocation(String location);
//	 @Query("SELECT s FROM Space s WHERE s.rentalRate >= :minRate AND s.rentalRate <= :maxRate")
//	    List<Space> findByRentalRateRange(@Param("minRate") Double minRate, @Param("maxRate") Double maxRate);
	}

