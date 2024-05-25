package com.virtusa.pms.service;

import com.virtusa.pms.dto.RentTypeDto;
import com.virtusa.pms.dto.TermDto;
import com.virtusa.pms.exception.CategoryNotFoundException;
import com.virtusa.pms.exception.TermNotFoundException;
import com.virtusa.pms.model.Category;
import com.virtusa.pms.model.RentType;
import com.virtusa.pms.model.Term;
import com.virtusa.pms.repository.CategoryRepo;
import com.virtusa.pms.repository.TermRepo;
import com.virtusa.pms.service.interfaces.TermI;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TermServiceImp implements TermI {

    @Autowired
    ModelMapper mp;

    @Autowired
    TermRepo termRepo;

    @Autowired
    CategoryRepo categoryRepo;


    public Term mapDTOToModel(TermDto dto){
        return mp.map(dto,Term.class);
    }

    public RentTypeDto mapModelToRentDTO(RentType model) {
        return mp.map(model, RentTypeDto.class);
    }
    public TermDto mapModelToDTO(Term model){
        TermDto response = new TermDto();
        response.setTermId(model.getTermId());
        response.setTermName(model.getTermName());
        List<RentTypeDto> rentTypes = model.getRentType().stream().map(this::mapModelToRentDTO).collect(Collectors.toList());
        response.setRentype(rentTypes);

        return response;
    }


    public String addTermsToCategory(int categoryId, List<TermDto> termDto) throws CategoryNotFoundException {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

            List<String> termNames = termDto.stream()
                    .map(TermDto::getTermName)
                    .collect(Collectors.toList());

            List<Term> existingTerms = termRepo.findByTermNameInAndCategory(termNames, category);

            for (TermDto termDto1 : termDto) {
                if (existingTerms.stream().anyMatch(term -> term.getTermName().equals(termDto1.getTermName()))) {
                    return "Term with name " + termDto1.getTermName() + " already exists in the category";
                } else {
                    Term term = mp.map(termDto1, Term.class);
                    List<Category> catlist = new ArrayList<>();
                    catlist.add(category);
                    term.setCategory(catlist);
                    existingTerms.add(term);
                }
            }

            if (!existingTerms.isEmpty()) {
                List<Term> savedTerms = termRepo.saveAll(existingTerms);
                System.out.println(savedTerms);
//                category.setTerm(savedTerms);
//                categoryRepo.save(category);
                return "Terms added to the category successfully";
            } else {
                return "No new terms to add";
            }

    }


    @Override
    public List<TermDto> getAllTerms()   {
            List<Term> termList = termRepo.findAll();
        System.out.println(termList.get(0).getRentType());
        return termList.stream()
                    .map(this::mapModelToDTO)
                    .collect(Collectors.toList());
        }

    @Override
    public String updateTerm(int tId, int categoryId, TermDto termDto) throws TermNotFoundException, CategoryNotFoundException {
        Term existingTerm = termRepo.findById(tId)
                .orElseThrow(() -> new TermNotFoundException("Term with ID " + tId + " is not found"));

        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        if (termRepo.existsByTermNameAndCategory(termDto.getTermName(), category)) {
            throw new TermNotFoundException("Term with name " + termDto.getTermName() +
                    " already exists in the same category");
        }
        existingTerm.setTermName(termDto.getTermName());
        List<Category> termCategories=existingTerm.getCategory();
//        termCategories.add(category);
        existingTerm.setCategory(termCategories);
        termRepo.save(existingTerm);
        return "Term updated Successfully";
    }



    @Override
    public String deleteTermById(int tId)  throws TermNotFoundException   {
            if (termRepo.existsById(tId)){
                termRepo.deleteById(tId);
               return "Term deleted Successfully";
            }
            else {
               throw new TermNotFoundException ("Term  with id "+ tId+ " is not found");
            }
    }

    @Override
    public TermDto getTermById(int tId) throws TermNotFoundException {
            Optional<Term> termById = termRepo.findById(tId);
            if (termById.isPresent()){
                return mapModelToDTO(termById.get());
            }
            else {
                throw new TermNotFoundException("Term not found");
            }
    }


}

