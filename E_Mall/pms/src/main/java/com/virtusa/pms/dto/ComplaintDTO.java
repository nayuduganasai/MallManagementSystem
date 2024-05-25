package com.virtusa.pms.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
public class ComplaintDTO {
	private int complaintId;
    private int userId;
    private int spaceId;
    private String subject;
    private String description;
    private LocalDate createDate;
    private String status;
	public ComplaintDTO( int complaintId,int userId, int spaceId, String subject, String description,
			LocalDate createDate, String status) {
		super();
		this.complaintId = complaintId;
		this.userId = userId;
		this.spaceId = spaceId;
		this.subject = subject;
		this.description = description;
		this.createDate = createDate;
		this.status = status;
	}
	public ComplaintDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getSpaceId() {
		return spaceId;
	}
	public void setSpaceId(int spaceId) {
		this.spaceId = spaceId;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public LocalDate getCreateDate() {
		return createDate;
	}
	public void setCreateDate(LocalDate createDate) {
		this.createDate = createDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}


   
}
