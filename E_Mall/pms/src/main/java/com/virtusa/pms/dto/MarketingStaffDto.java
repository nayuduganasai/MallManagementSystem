package com.virtusa.pms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class MarketingStaffDto extends UserDto {
	
	private String firstName;
	private String lastName;
	private double salary;
	private String address;
	private String mobileNo;
	

}
