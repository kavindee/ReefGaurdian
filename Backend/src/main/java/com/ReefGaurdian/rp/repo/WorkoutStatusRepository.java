package com.ReefGaurdian.rp.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ReefGaurdian.rp.model.WorkoutStatus;

@Repository
public interface WorkoutStatusRepository extends MongoRepository<WorkoutStatus, String> {

}