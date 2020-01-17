package com.easyclinic.visit.persistence;

import com.easyclinic.visit.model.Visit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface VisitRepository extends CrudRepository<Visit, Long> {

    ArrayList<Visit> findAllByEmployeeId(String employeeId);

    ArrayList<Visit> findAllByUserId(String userId);
}
