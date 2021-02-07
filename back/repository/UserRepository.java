package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.model.User;
import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
