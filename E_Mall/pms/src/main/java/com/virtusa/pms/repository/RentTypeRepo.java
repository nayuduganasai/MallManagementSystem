package com.virtusa.pms.repository;

import com.virtusa.pms.model.RentType;
import com.virtusa.pms.model.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentTypeRepo extends JpaRepository<RentType, Integer> {



    List<RentType> findByRentTypeNameInAndTerm(List<String> rentTypeNames, Term term);

    boolean existsByRentTypeName(String rentTypeName);

    boolean existsByRentTypeNameAndTerm(String rentTypeName, Term term);
}
