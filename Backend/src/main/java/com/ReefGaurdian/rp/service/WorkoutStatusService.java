package com.ReefGaurdian.rp.service;

import java.util.List;
import java.util.Optional;

import com.ReefGaurdian.rp.model.WorkoutStatus;

public interface WorkoutStatusService {

    List<WorkoutStatus> getAllWorkoutStatus();

    Optional<WorkoutStatus> getWorkoutStatsusById(String statusId);

    WorkoutStatus createWorkoutStatus(WorkoutStatus workoutStatus);

    WorkoutStatus updateWorkoutStatus(String statusId, WorkoutStatus workoutStatus);

    void deleteWorkoutStatus(String statusId);

}