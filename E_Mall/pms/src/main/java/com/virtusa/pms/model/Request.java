package com.virtusa.pms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
public class Request {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="spaceId")
    private Space space;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="userId")
    private User user;

    private LocalDate requestDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private int referralId;
	private int categoryId;
	private int termId;
	private int rentTypeId;


    public int getRequestId() {
		return requestId;
	}
	public void setRequestId(int requestId) {
		this.requestId = requestId;
	}
	public Space getSpace() {
		return space;
	}
	public void setSpace(Space space) {
		this.space = space;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public LocalDate getRequestDate() {
		return requestDate;
	}
	public void setRequestDate(LocalDate requestDate) {
		this.requestDate = requestDate;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	public int getReferralId() {
		return referralId;
	}
	public void setReferralId(int referralId) {
		this.referralId = referralId;
	}
	public Request(int requestId, Space space, User user, LocalDate requestDate, LocalDate startDate, LocalDate endDate,
			int referralId) {
		super();
		this.requestId = requestId;
		this.space = space;
		this.user = user;
		this.requestDate = requestDate;
		this.startDate = startDate;
		this.endDate = endDate;
		this.referralId = referralId;

	}
	public Request() {
		super();
		// TODO Auto-generated constructor stub
	}


	@Override
	public String toString() {
		return "Request{" +
				"requestId=" + requestId +
				", requestDate=" + requestDate +
				", startDate=" + startDate +
				", endDate=" + endDate +
				", referralId=" + referralId +
				", categoryId=" + categoryId +
				", termId=" + termId +
				", rentTypeId=" + rentTypeId +
				'}';
	}
}
