package com.virtusa.pms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor

public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int termId;
    private String termName;

    @ManyToMany(mappedBy = "term",cascade = CascadeType.ALL)
    private List<RentType> rentType;

    @ManyToMany
    List<Category> category;

    @Override
    public String toString() {
        return "Term{" +
                "termId=" + termId +
                ", termName='" + termName + '\'' +
                '}';
    }
}
