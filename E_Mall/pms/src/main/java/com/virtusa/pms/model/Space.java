package com.virtusa.pms.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@Entity
@JsonIgnoreProperties({"complaints","feedbacks","discounts","requests"})
public class Space {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int spaceId;
	private String location;

	@ManyToOne
	@JoinColumn(name = "categoryId")
	private Category category;

	private String size;
	private LocalDate availableDate;

	@OneToMany(mappedBy = "space")
	private List<Request> requests;

	@OneToMany(mappedBy = "space")
	private List<Complaint> complaints;

	@OneToMany(mappedBy = "space")
	private List<Feedback> feedbacks;
//
	@ManyToMany(mappedBy = "spaces")
	private List<Discount> discounts;


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
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
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

//	public Double getRentalRate() {
//		return rentalRate;
//	}
//	public void setRentalRate(Double rentalRate) {
//		this.rentalRate = rentalRate;
//	}
	public Space() {
		super();
		
	}
	
    public Space(int spaceId, String location, Category category, String size, LocalDate availableDate) {
		super();
		this.spaceId = spaceId;
		this.location = location;
		this.category = category;
		this.size = size;
		this.availableDate = availableDate;

	}


	
  
}
