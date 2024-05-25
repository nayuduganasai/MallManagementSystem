package com.virtusa.pms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.model.*;
import com.virtusa.pms.repository.*;
import com.virtusa.pms.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.virtusa.pms.dto.CustomerDto;
import com.virtusa.pms.dto.MarketingStaffDto;
import com.virtusa.pms.dto.SpaceOwnerDto;

@Service
public class UserServiceImpl implements UserService {


	@Autowired
	private UserRepository userRepository;
	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private MarketingStaffRepository marketingStaffRepository;

	@Autowired
	private SpaceOwnerRepository spaceOwnerRepository;
	@Autowired
	private RoleRepository roleRepository;

	public int generateRandomReferralId() {
		// Generate a random number within a range, for instance, between 10000 and 99999
		return ThreadLocalRandom.current().nextInt(10000, 1000000);
	}


	public Customer registerCustomer(CustomerDto customerDto) {
		List<Role> roles = new ArrayList<>();
		Role role = roleRepository.findByName(String.valueOf(UserRole.CUSTOMER));
		if(role != null){
			roles.add(role);
		}else{
			Role newRole =  roleRepository.save(new Role(String.valueOf(UserRole.CUSTOMER)));
			roles.add(newRole);
		}
		if (isUsernameTaken(customerDto.getUserName())) {
			throw new UsernameNotFoundException("Username is already taken");
		}
		if (isUserEmailTaken(customerDto.getUserEmail())) {
			throw new UsernameNotFoundException("User email is already taken");
		}
		Customer customer = new Customer();
		customer.setUserName(customerDto.getUserName());
		customer.setUserEmail(customerDto.getUserEmail());
		customer.setPassword(customerDto.getPassword());
		customer.setFirstName(customerDto.getFirstName());
		customer.setLastName(customerDto.getLastName());
		customer.setAddress(customerDto.getAddress());
		customer.setMobileNo(customerDto.getMobileNo());
		customer.setReferralId(generateRandomReferralId());
		customer.setRoles(roles);
		return customerRepository.save(customer);

	}

	public MarketingStaff registerMarketingStaff(MarketingStaffDto marketingStaffDto) {
		List<Role> roles = new ArrayList<>();
		Role role = roleRepository.findByName(String.valueOf(UserRole.MARKETING_STAFF));
		if(role != null){
			roles.add(role);
		}else{
			Role newRole =  roleRepository.save(new Role(String.valueOf(UserRole.MARKETING_STAFF)));
			roles.add(newRole);
		}
		MarketingStaff marketingStaff = new MarketingStaff();

		if (isUsernameTaken(marketingStaffDto.getUserName())) {
			throw new UsernameNotFoundException("Username is already taken");
		}
		if (isUserEmailTaken(marketingStaffDto.getUserEmail())) {
			throw new UsernameNotFoundException("User email is already taken");
		}
		marketingStaff.setUserName(marketingStaffDto.getUserName());
		marketingStaff.setUserEmail(marketingStaffDto.getUserEmail());
		marketingStaff.setPassword(marketingStaffDto.getPassword());
		marketingStaff.setFirstName(marketingStaffDto.getFirstName());
		marketingStaff.setLastName(marketingStaffDto.getLastName());
		marketingStaff.setAddress(marketingStaffDto.getAddress());
		marketingStaff.setMobileNo(marketingStaffDto.getMobileNo());
		marketingStaff.setSalary(marketingStaffDto.getSalary());
		marketingStaff.setReferralId(generateRandomReferralId());

		marketingStaff.setRoles(roles);
		return marketingStaffRepository.save(marketingStaff);
	}

	public SpaceOwner registerSpaceOwner(SpaceOwnerDto spaceOwnerDto) {
		List<Role> roles = new ArrayList<>();
		Role role = roleRepository.findByName(String.valueOf(UserRole.SPACE_OWNER));
		if(role != null){
			roles.add(role);
		}else{
			Role newRole =  roleRepository.save(new Role(String.valueOf(UserRole.SPACE_OWNER)));
			roles.add(newRole);
		}

		SpaceOwner spaceOwner = new SpaceOwner();

		if (isUsernameTaken(spaceOwnerDto.getUserName())) {
			throw new UsernameNotFoundException("Username is already taken");
		}
		if (isUserEmailTaken(spaceOwnerDto.getUserEmail())) {
			throw new UsernameNotFoundException("User email is already taken");
		}
		spaceOwner.setUserName(spaceOwnerDto.getUserName());
		spaceOwner.setUserEmail(spaceOwnerDto.getUserEmail());
		spaceOwner.setPassword(spaceOwnerDto.getPassword());
		spaceOwner.setFirstName(spaceOwnerDto.getFirstName());
		spaceOwner.setLastName(spaceOwnerDto.getLastName());
		spaceOwner.setAddress(spaceOwnerDto.getAddress());
		spaceOwner.setMobileNo(spaceOwnerDto.getMobileNo());
		spaceOwner.setReferralId(generateRandomReferralId());
		spaceOwner.setRoles(roles);
		return spaceOwnerRepository.save(spaceOwner);
	}

	public boolean loginUser(String username, String password) {
		return userRepository.existsByUserEmailAndPassword(username, password);
	}

	public void assignRoleToUser(int userId, String roleName) {
		User user = userRepository.findById(userId).orElse(null);
		Role role = roleRepository.findByName(roleName);

		if (user != null && role != null) {
			user.getRoles().add(role);
			userRepository.save(user);
		}
	}

	public User getUserById(int userId) {
		return userRepository.findById(userId).orElse(null);
	}

	public List<User> getUsersByRole(String roleName) {
		Role role = roleRepository.findByName(roleName);
		return userRepository.findByRolesContains(role);
	}




	public User findByUserName(String username) {
		User user = userRepository.findByUserName(username);

		if (user != null) {
			throw new UsernameNotFoundException("User not found");
		}
		return user;
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}


	public boolean isSameUser(int userId) {
		System.out.println("hitting------------------------------------------");
		User user1 = userRepository.findById(userId).get();
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		return authentication.getPrincipal().equals( user1.getUserName());
	}

	public boolean isUsernameTaken(String username) {
		return userRepository.findByUserName(username) != null;
	}

	public boolean isUserEmailTaken(String userEmail) {
		return userRepository.findByUserEmail(userEmail) != null;
	}

	public MarketingStaff updateMarketingStaff(Long marketingStaffId, MarketingStaffDto updatedMarketingStaffDto) {
		MarketingStaff existingMarketingStaff = marketingStaffRepository.findById(marketingStaffId)
				.orElseThrow(() -> new UsernameNotFoundException("Marketing Staff not found"));

		// Check if username or email is already taken by another user
		if (!updatedMarketingStaffDto.getUserEmail().equals(existingMarketingStaff.getUserEmail()) &&
				isUserEmailTaken(updatedMarketingStaffDto.getUserEmail())) {
			throw new UsernameNotFoundException("User email is already taken");
		}

		if (!existingMarketingStaff.getUserName().equals(updatedMarketingStaffDto.getUserName()) &&
				isUsernameTaken(updatedMarketingStaffDto.getUserName())) {
			throw new UsernameNotFoundException("Username is already taken");
		}

		// Update the fields
		//existingMarketingStaff.setUserName(updatedMarketingStaffDto.getUserName());
		existingMarketingStaff.setUserEmail(updatedMarketingStaffDto.getUserEmail());
		//existingMarketingStaff.setPassword(updatedMarketingStaffDto.getPassword());
		existingMarketingStaff.setFirstName(updatedMarketingStaffDto.getFirstName());
		existingMarketingStaff.setLastName(updatedMarketingStaffDto.getLastName());
		existingMarketingStaff.setAddress(updatedMarketingStaffDto.getAddress());
		existingMarketingStaff.setMobileNo(updatedMarketingStaffDto.getMobileNo());
		existingMarketingStaff.setSalary(updatedMarketingStaffDto.getSalary());

		return marketingStaffRepository.save(existingMarketingStaff);
	}

	public SpaceOwner updateSpaceOwner(Long spaceOwnerId, SpaceOwnerDto updatedSpaceOwnerDto) {
		SpaceOwner existingSpaceOwner = spaceOwnerRepository.findById(spaceOwnerId)
				.orElseThrow(() -> new UsernameNotFoundException("Space Owner not found"));
		System.out.println(existingSpaceOwner);
		// Check if username or email is already taken by another user
		if (!updatedSpaceOwnerDto.getUserEmail().equals(existingSpaceOwner.getUserEmail()) &&
				isUserEmailTaken(updatedSpaceOwnerDto.getUserEmail())) {
			throw new UsernameNotFoundException("User email is already taken");
		}

		if (!isUsernameTaken(updatedSpaceOwnerDto.getUserName()) && existingSpaceOwner.getUserName().equals(updatedSpaceOwnerDto.getUserName())) {
			throw new UsernameNotFoundException("Username is already taken");
		}

		// Update the fields
		//existingSpaceOwner.setUserName(updatedSpaceOwnerDto.getUserName());
		existingSpaceOwner.setUserEmail(updatedSpaceOwnerDto.getUserEmail());
		//existingSpaceOwner.setPassword(updatedSpaceOwnerDto.getPassword());
		existingSpaceOwner.setFirstName(updatedSpaceOwnerDto.getFirstName());
		existingSpaceOwner.setLastName(updatedSpaceOwnerDto.getLastName());
		existingSpaceOwner.setAddress(updatedSpaceOwnerDto.getAddress());
		existingSpaceOwner.setMobileNo(updatedSpaceOwnerDto.getMobileNo());

		return spaceOwnerRepository.save(existingSpaceOwner);
	}

	public Customer updateCustomer(Long customerId, CustomerDto updatedCustomerDto) {
		Customer existingCustomer = customerRepository.findById(customerId)
				.orElseThrow(() -> new UsernameNotFoundException("Customer not found"));

		// Check if username or email is already taken by another user
		if (!updatedCustomerDto.getUserEmail().equals(existingCustomer.getUserEmail()) &&
				isUserEmailTaken(updatedCustomerDto.getUserEmail())) {
			throw new UsernameNotFoundException("User email is already taken");
		}

		if (!existingCustomer.getUserName().equals(updatedCustomerDto.getUserName()) &&
				isUsernameTaken(updatedCustomerDto.getUserName())) {
			throw new UsernameNotFoundException("Username is already taken");
		}

		// Update the fields
		//existingCustomer.setUserName(updatedCustomerDto.getUserName());
		existingCustomer.setUserEmail(updatedCustomerDto.getUserEmail());
		//existingCustomer.setPassword(updatedCustomerDto.getPassword());
		existingCustomer.setFirstName(updatedCustomerDto.getFirstName());
		existingCustomer.setLastName(updatedCustomerDto.getLastName());
		existingCustomer.setAddress(updatedCustomerDto.getAddress());
		existingCustomer.setMobileNo(updatedCustomerDto.getMobileNo());

		return customerRepository.save(existingCustomer);
	}



	public void deleteUserById(int userId) throws CustomException {
		if (!userRepository.existsById(userId)) {
			throw new CustomException("User with ID " + userId + " not found");
		}
		userRepository.deleteById(userId);
	}

}
