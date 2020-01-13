package com.easyclinic.schedule.persistence;

import com.easyclinic.schedule.model.Schedule;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;

@Repository
public interface ScheduleRepository extends CrudRepository<Schedule, Long> {

    ArrayList<Schedule> findAllByEmployeeId(String employeeId);

    Schedule deleteByDateAndEmployeeId(Date date, String employeeId);

}
