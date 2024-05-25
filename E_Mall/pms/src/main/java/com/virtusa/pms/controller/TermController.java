package com.virtusa.pms.controller;



import com.virtusa.pms.dto.TermDto;
import com.virtusa.pms.exception.CategoryNotFoundException;
import com.virtusa.pms.exception.TermNotFoundException;
import com.virtusa.pms.service.TermServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
public class TermController extends BaseController {

    @Autowired
    TermServiceImp termServiceImp;

    @GetMapping("/terms")
    public ResponseEntity<?> getAllTerms() throws TermNotFoundException {
        List<TermDto> termDtoList = termServiceImp.getAllTerms();
        return new ResponseEntity<List<TermDto>>(termDtoList,HttpStatus.OK);

    }

    @PostMapping("{categoryId}/terms")
    public ResponseEntity<?> addTermsToCategory(@PathVariable ("categoryId") int categoryId , @RequestBody List<TermDto> termDto) throws CategoryNotFoundException {
        String msg= termServiceImp.addTermsToCategory(categoryId,termDto);
        return new ResponseEntity<String>(msg,HttpStatus.OK);
    }

    @PutMapping("/terms/{categoryId}/{termId}")
    public ResponseEntity<?> updateTerm(@PathVariable("termId") int termId, @PathVariable("categoryId") int categoryId , @RequestBody TermDto termDto) throws TermNotFoundException, CategoryNotFoundException {
//        List<Integer> categoryIds = termDto.getCategoryIds();
       String msg=termServiceImp.updateTerm(termId, categoryId,termDto);
       return new ResponseEntity<String>(msg,HttpStatus.OK);
    }

    @GetMapping("/terms/{termId}")
    public ResponseEntity<?> getTermById(@PathVariable ("termId") int termId) throws TermNotFoundException{
        TermDto termDto= termServiceImp.getTermById(termId);
          return new ResponseEntity<>(termDto, HttpStatus.OK);
    }

    @DeleteMapping("/terms/{termId}")
    public ResponseEntity<?> deleteTermById(@PathVariable ("termId") int termId) throws TermNotFoundException{
        String msg= termServiceImp.deleteTermById(termId);
        return new ResponseEntity<String>(msg,HttpStatus.OK);

    }

//    @GetMapping("terms/byName/{categoryId}/{termName}")
//    public ResponseEntity<?> getTermByName(@PathVariable ("termName")  String termName,@PathVariable("categoryId") int categoryId ) throws TermNotFoundException, CategoryNotFoundException {
//        TermDto termDto=  termServiceImp.getTermByTermName(termName,categoryId);
//        return new ResponseEntity<TermDto>(termDto,HttpStatus.OK);
//    }
}
