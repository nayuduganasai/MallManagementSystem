package com.virtusa.pms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Data
@AllArgsConstructor
public class BookingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingItemId;

    @OneToMany
    private List<Request> requests;

	@OneToOne
	private User user;

    private Double totalCost;



	public int getBookingItemId() {
		return bookingItemId;
	}

	public void setBookingItemId(int bookingItemId) {
		this.bookingItemId = bookingItemId;
	}

	public List<Request> getRequests() {
		return requests;
	}

	public void setRequests(List<Request> requests) {
		this.requests = requests;
	}

	public Double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(Double totalCost) {
		this.totalCost = totalCost;
	}

	public BookingCart(int bookingItemId, List<Request> requests, Double totalCost) {
		super();
		this.bookingItemId = bookingItemId;
		this.requests = requests;
		this.totalCost = totalCost;
	}

	public BookingCart() {
		super();
		// TODO Auto-generated constructor stub
	}



}
