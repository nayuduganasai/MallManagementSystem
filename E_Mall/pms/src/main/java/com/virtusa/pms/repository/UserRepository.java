package com.virtusa.pms.repository;

import com.virtusa.pms.model.Role;
import com.virtusa.pms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Integer> {

	//User findByUserNameAndPassword(String userName, String password);

	User findByUserName(String userName);
	
	 List<User> findByRolesContaining(Role role);
	
	  User findByUserEmail(String userEmail);

    boolean existsByUserEmailAndPassword(String username, String password);

	List<User> findByRolesContains(Role role);


}
