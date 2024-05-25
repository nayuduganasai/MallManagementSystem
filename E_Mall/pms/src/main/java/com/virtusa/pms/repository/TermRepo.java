package com.virtusa.pms.repository;

import com.virtusa.pms.model.Category;
import com.virtusa.pms.model.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TermRepo extends JpaRepository<Term,Integer> {

//   Term getTermByTermName(String termName);

    List<Term> findByTermNameInAndCategory(List<String> termNames, Category category);

    Term findByTermNameAndCategory(String termName, Category category);

    boolean existsByTermName(String termName);

    boolean existsByTermNameAndCategory(String termName, Category category);

//   @Query("SELECT t FROM Term t JOIN FETCH t.category")
//   List<Term> findAllTermsWithCategory();

}
