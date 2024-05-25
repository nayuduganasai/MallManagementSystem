package com.virtusa.pms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long discountId;
    private String discountName;
    private double percentage;
    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "spaceid")
    private Set<Space> spaces;
}
