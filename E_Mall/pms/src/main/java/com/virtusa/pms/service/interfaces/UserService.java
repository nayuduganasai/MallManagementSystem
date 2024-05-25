package com.virtusa.pms.service.interfaces;

import java.util.List;

import com.virtusa.pms.dto.CustomerDto;
import com.virtusa.pms.dto.MarketingStaffDto;
import com.virtusa.pms.dto.SpaceOwnerDto;
import com.virtusa.pms.model.Customer;
import com.virtusa.pms.model.MarketingStaff;
import com.virtusa.pms.model.SpaceOwner;
import com.virtusa.pms.model.User;

public interface UserService {
	
	Customer registerCustomer(CustomerDto customerDto);
	MarketingStaff registerMarketingStaff(MarketingStaffDto marketingStaffDto);
	SpaceOwner registerSpaceOwner(SpaceOwnerDto spaceOwnerDto);
//	String login(String userName, String password);
	User findByUserName(String username);
	
	List<User> getAllUsers();

    boolean isUsernameTaken(String username);

    boolean isUserEmailTaken(String userEmail);
    
}
