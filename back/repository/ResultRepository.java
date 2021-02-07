package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.model.Result;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends CrudRepository<Result, Long> {
    List<Result> getAllByUserId(String userId);
    List<Result> getAllByUserIdAndR(String userId, double r);
}
