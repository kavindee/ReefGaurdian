package com.ReefGaurdian.rp.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ReefGaurdian.rp.model.MealPlan;

@Repository
public interface MealPlanRepository extends MongoRepository<MealPlan, String> {

}
