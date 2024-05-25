package com.virtusa.pms.repository;

import com.virtusa.pms.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByName(String s);
}
