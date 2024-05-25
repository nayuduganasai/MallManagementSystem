package com.virtusa.pms.dto;

import com.virtusa.pms.model.Space;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiscountUpdateResponse extends DiscountRequest {

    private Long discountId;

    public DiscountUpdateResponse(String name, double percentage, LocalDate startDate, LocalDate endDate, List<Integer> spaceIds, Long discountId) {
        super(name, percentage, startDate, endDate, spaceIds);
        this.discountId = discountId;
    }
}
