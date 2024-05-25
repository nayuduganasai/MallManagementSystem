package com.virtusa.pms.controller;

import java.util.List;

import com.virtusa.pms.dto.CustomerDto;
import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.exception.UserNotFoundException;
import com.virtusa.pms.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtusa.pms.dto.MarketingStaffDto;
import com.virtusa.pms.dto.SpaceOwnerDto;
import com.virtusa.pms.model.User;

@RestController
public class UserController extends BaseController {
    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/users/marketing-staff/register")
    @PreAuthorize("hasAuthority('SpaceOwner')")
    public ResponseEntity<String> registerMarketingStaff(@RequestBody MarketingStaffDto marketingStaffDto) {
        userService.registerMarketingStaff(marketingStaffDto);
        return ResponseEntity.ok("Marketing Staff registered successfully.");
    }

    @PostMapping("/users/{id}/assign-roles")
    public ResponseEntity<Void> assignRolesToUser(
            @PathVariable("id") int userId,
            @RequestBody List<String> roleNames
    ) {
        for (String roleName : roleNames) {
            userService.assignRoleToUser(userId, roleName);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/users/byrole/{roleName}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String roleName) {
        List<User> users = userService.getUsersByRole(roleName);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //Registering as a SpaceOwmer
    @PostMapping("/users/space-owner/register")
    public ResponseEntity<String> registerSpaceOwner(@RequestBody SpaceOwnerDto spaceOwnerDto) {
        userService.registerSpaceOwner(spaceOwnerDto);
        return ResponseEntity.ok("Space Owner registered successfully.");
    }

    @PostMapping("/users/customer/register")
    public ResponseEntity<String> registerCustomer(@RequestBody CustomerDto customerDto) {
        userService.registerCustomer(customerDto);
        return ResponseEntity.ok("Customer registered successfully.");
    }

    //Show all users
    @RequestMapping("/users")
    @PreAuthorize("hasAuthority('SpaceOwner','MarketingStaff')")
    public ResponseEntity<List<User>> getAllUsers(){
        return  ResponseEntity.ok(userService.getAllUsers());
    }

    //Show All Marketing Staff Users
    @GetMapping("/users/marketing-staff/showAllUser")
    @PreAuthorize("hasAuthority('SpaceOwner')")
    public ResponseEntity<List<User>> getAllMarketingStaff() {
        List<User> marketingStaffList = userService.getUsersByRole("MARKETING_STAFF");
        return ResponseEntity.ok(marketingStaffList);
    }

    //Delete Marketing Staff User By user id
    @DeleteMapping("/users/marketing-staff/{userId}")
    @PreAuthorize("hasAuthority('SpaceOwner')")
    public ResponseEntity<String> deleteMarketingStaff(@PathVariable int userId) throws CustomException {
        userService.deleteUserById(userId);
        return ResponseEntity.ok("Marketing Staff deleted successfully.");
    }

    // Update MarketingStaff Data by userId
    @PutMapping("/users/marketingstaff/{userId}")
    @PreAuthorize("hasAuthority('SpaceOwner')")
    public ResponseEntity<String> updateMarketingStaffDetails(
            @PathVariable long userId,
            @RequestBody MarketingStaffDto updateDetails) {
        try {
            User updatedUser = userService.updateMarketingStaff(userId, updateDetails);
            return ResponseEntity.ok("MarketingStaff  details updated successfully. User ID: " + updatedUser.getUserId());
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/users/profile/staff/{userId}")
    @PreAuthorize("hasAuthority('MarketingStaff')")
    public ResponseEntity<String> updateMarketingStaffProfile(
            @PathVariable Long userId,
            @RequestBody MarketingStaffDto updateDetails) {
        try {
            User updatedUser = userService.updateMarketingStaff(userId, updateDetails);
            return ResponseEntity.ok("MarketingStaff  Profile updated successfully. User ID: " + updatedUser.getUserId());
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    //Show All Customer Users
    @GetMapping("/users/customer/showAllUser")
    @PreAuthorize("hasAuthority('SpaceOwner','MarketingStaff')")
    public ResponseEntity<List<User>> getAllCustomer() {
        List<User> customerList = userService.getUsersByRole("CUSTOMER");
        return ResponseEntity.ok(customerList);
    }

    //Delete Customer User By user id
    @DeleteMapping("/users/customer/{userId}")
    @PreAuthorize("hasAuthority('SpaceOwner','MarketingStaff')")
    public ResponseEntity<String> deleteCustomer(@PathVariable int userId) throws CustomException {
        userService.deleteUserById(userId);
        return ResponseEntity.ok("Customer deleted successfully.");
    }

    // Update Customer Data by id
    @PutMapping("/users/customer/{userId}")
    @PreAuthorize("hasAnyAuthority('SpaceOwner', 'MarketingStaff','Customer')")
    public ResponseEntity<String> updateCustomerDetails(
            @PathVariable Long userId,
            @RequestBody CustomerDto updateDetails) {
        try {
            User updatedUser = userService.updateCustomer(userId, updateDetails);
            return ResponseEntity.ok("Customer  details updated successfully. User ID: " + updatedUser.getUserId());
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    //Get customer data by user Id
    @GetMapping("/users/profile/customer/{id}")
    @PreAuthorize("hasAuthority('Customer')")
    public ResponseEntity<User> getCustomerProfile(@PathVariable int id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    //Get Staff data by user Id
    @GetMapping("/users/profile/staff/{id}")
    @PreAuthorize("hasAuthority('MarketingStaff')")
    public ResponseEntity<User> getMakertingStaffProfile(@PathVariable int id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    //Get SpaceOwner data by user Id
    @GetMapping("/users/profile/spaceowner/{id}")
    @PreAuthorize("hasAuthority('SpaceOwner')")
    public ResponseEntity<User> getUserProfile(@PathVariable int id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    //Update Spaceowner data by user Id
    @PutMapping("/users/space-owner/{userId}")
    @PreAuthorize("hasAuthority('SpaceOwner')")
    public ResponseEntity<String> updateSpaceOwnerDetails(
            @PathVariable Long userId,
            @RequestBody SpaceOwnerDto updatedDetails) {
        userService.updateSpaceOwner(userId, updatedDetails);
        return ResponseEntity.ok("Space Owner details updated successfully.");
    }
}
