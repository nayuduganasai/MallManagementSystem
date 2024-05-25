package com.virtusa.pms.dto;

import org.springframework.context.annotation.Configuration;

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
@Configuration
public class CustomerDto extends UserDto {
	
	private String firstName;
	private String lastName;
	private String address;
	private String mobileNo;
	
	

}
