package com.easyclinic.visit.service;

import com.easyclinic.visit.dto.VisitDTO;
import com.easyclinic.visit.model.Visit;
import com.easyclinic.visit.persistence.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@Service
public class VisitService {

    @Autowired
    private VisitRepository repository;
    private SimpleDateFormat formatter;

    public VisitService() {
        formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    }

    public void saveVisit(VisitDTO dto) throws ParseException {
        Visit visit = new Visit();
        visit.setDate(formatter.parse(dto.getDate()));
        visit.setEmployeeId(dto.getEmployeeId());
        visit.setUserId(dto.getUserId());
        if (!dto.getAdditionalNotice().isEmpty()) {
            visit.setAdditionalNotice(dto.getAdditionalNotice());
        }
        repository.save(visit);
    }
}
