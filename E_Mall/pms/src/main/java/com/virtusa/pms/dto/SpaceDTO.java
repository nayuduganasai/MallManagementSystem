package com.virtusa.pms.dto;
import com.virtusa.pms.model.*;

import java.time.LocalDate;
import java.util.List;

public class SpaceDTO {
    private int spaceId;
    private String location;
    private int categoryId;
    private String size;
    private LocalDate availableDate;

    private List<Request> requests;
    private List<Complaint> complaints;
    private List<Feedback> feedbacks;
    private List<SpaceBooking> bookings;
    private List<Discount> discounts;
    public SpaceDTO() {
    }

    public SpaceDTO(int spaceId, String location, int categoryId, String size, LocalDate availableDate) {
        this.spaceId = spaceId;
        this.location = location;
        this.categoryId = categoryId;
        this.size = size;
        this.availableDate = availableDate;
//        this.rentalRate = rentalRate;
    }

    public int getSpaceId() {
        return spaceId;
    }

    public void setSpaceId(int spaceId) {
        this.spaceId = spaceId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public LocalDate getAvailableDate() {
        return availableDate;
    }

    public void setAvailableDate(LocalDate availableDate) {
        this.availableDate = availableDate;
    }

//    public Double getRentalRate() {
//        return rentalRate;
//    }
//
//    public void setRentalRate(Double rentalRate) {
//        this.rentalRate = rentalRate;
//    }

   
    @Override
    public String toString() {
        return "SpaceDTO{" +
                "spaceId=" + spaceId +
                ", location='" + location + '\'' +
                ", categoryId=" + categoryId +
                ", size='" + size + '\'' +
                ", availableDate=" + availableDate +
                '}';
    }
}
