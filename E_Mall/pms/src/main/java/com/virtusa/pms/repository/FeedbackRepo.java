package com.virtusa.pms.repository;

import com.virtusa.pms.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepo extends JpaRepository<Feedback,Long> {

}
