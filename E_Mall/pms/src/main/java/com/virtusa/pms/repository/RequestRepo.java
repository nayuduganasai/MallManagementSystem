package com.virtusa.pms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtusa.pms.model.Request;

@Repository
public interface RequestRepo extends JpaRepository<Request, Integer> {

}
