package com.virtusa.pms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SpaceOwnerDto extends UserDto {
	
	private String firstName;
	private String lastName;
	private String address;
	private String mobileNo;

}
