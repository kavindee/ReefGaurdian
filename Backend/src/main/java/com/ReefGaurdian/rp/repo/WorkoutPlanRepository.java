package com.ReefGaurdian.rp.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ReefGaurdian.rp.model.WorkoutPlan;

@Repository
public interface WorkoutPlanRepository extends MongoRepository<WorkoutPlan, String> {

}