package com.virtusa.pms.repository;

import com.virtusa.pms.model.Space;
import com.virtusa.pms.model.SpaceBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SpaceBookingRepo extends JpaRepository<SpaceBooking, Long> {
    Optional<List<SpaceBooking>> findByStartDateGreaterThanEqualAndEndDateLessThanEqualAndSpace(LocalDate startDate, LocalDate endDate, Space space);

    @Query("SELECT sb FROM SpaceBooking sb WHERE sb.user.userId = :userId")
    List<SpaceBooking> findByUser_UserId(int userId);
}
