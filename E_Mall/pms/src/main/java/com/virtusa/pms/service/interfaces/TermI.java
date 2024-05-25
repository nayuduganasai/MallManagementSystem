package com.virtusa.pms.service.interfaces;

import com.virtusa.pms.dto.TermDto;
import com.virtusa.pms.exception.CategoryNotFoundException;
import com.virtusa.pms.exception.TermNotFoundException;

import java.util.List;

public interface TermI {

    String addTermsToCategory(int categoryId ,List<TermDto> termDto) throws CategoryNotFoundException;
   List<TermDto> getAllTerms()  ;
    String updateTerm(int tId, int categoryId, TermDto termDto ) throws TermNotFoundException,CategoryNotFoundException ;
    String deleteTermById(int tId) throws TermNotFoundException;
    TermDto getTermById(int tId) throws TermNotFoundException;
//    TermDto getTermByTermName(String tName , int categoryId) throws TermNotFoundException, CategoryNotFoundException;

//    TermDto getTermByTermName(String tName  int categoryid) throws TermNotFoundException;
}
