package com.ReefGaurdian.rp.service;

import java.util.List;
import java.util.Optional;

import com.ReefGaurdian.rp.model.WorkoutPlan;

public interface WorkoutPlanService {

    List<WorkoutPlan> getAllWorkoutPlans();

    Optional<WorkoutPlan> getWorkoutPlanById(String id);

    WorkoutPlan createWorkoutPlan(WorkoutPlan workoutPlan);

    WorkoutPlan updateWorkoutPlan(String workoutPlanId, WorkoutPlan workoutPlan);

    void deleteWorkoutPlan(String workoutPlanId);

}
