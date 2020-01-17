package com.easyclinic.visit.service;

import com.easyclinic.visit.dto.*;
import com.easyclinic.visit.model.Visit;
import com.easyclinic.visit.persistence.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

@Service
public class VisitService {

    private final static String USER_URL = "http://localhost:8080/user/admin/getuserdetails";
    private final static String VISIT_PRICE_URL = "http://localhost:8083/payment/price";
    private final static String PAYMENT_CREATE_URL = "http://localhost:8083/payment/save";

    @Autowired
    private VisitRepository visitRepository;

    private SimpleDateFormat formatter;

    public VisitService() {
        formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    }

    public void saveVisit(VisitCreateDTO dto) throws ParseException {
        Visit visit = new Visit();
        visit.setDate(formatter.parse(dto.getDate()));
        visit.setEmployeeId(dto.getEmployeeId());
        visit.setUserId(dto.getUserId());
        if (!dto.getAdditionalNotice().isEmpty()) {
            visit.setAdditionalNotice(dto.getAdditionalNotice());
        }
        Visit visitObj = visitRepository.save(visit);

        System.out.println(dto.getProfession() + " " + dto.getDate());

        PaymentInterfaceDTO payment = new PaymentInterfaceDTO();
        payment.setPrice(new RestTemplate()
                .getForObject(VISIT_PRICE_URL + "/" + dto.getProfession(), Integer.class));
        payment.setVisitId(visitObj.getId().toString());
        payment.setUserId(dto.getUserId());
        new RestTemplate()
                .postForObject(PAYMENT_CREATE_URL, payment, Object.class);

    }

    public ArrayList<VisitDTO> getVisits(String id) {
        ArrayList<Visit> visits = new ArrayList<>();
        visits.addAll(visitRepository.findAllByUserId(id));
        visits.addAll(visitRepository.findAllByEmployeeId(id));

        ArrayList<VisitDTO> result = new ArrayList<>();
        visits.forEach((visit -> {
            VisitDTO dto = new VisitDTO();
            dto.setDate(formatter.format(visit.getDate()));
            dto.setVisitId(visit.getId().toString());
            UserInterfaceDTO user = new RestTemplate()
                    .getForObject(USER_URL + "/" + visit.getUserId(), UserInterfaceDTO.class);
            UserInterfaceDTO employee = new RestTemplate()
                    .getForObject(USER_URL + "/" + visit.getEmployeeId(), UserInterfaceDTO.class);
            dto.setPatient(user.getName() + " " + user.getSurname());
            dto.setSpecialist(employee.getName() + " " + employee.getSurname());
            dto.setSpecialisation(employee.getProfession());
            result.add(dto);
        }));
        return result;
    }

    public VisitDTO getVisit(String visitId) {
        Visit visit = visitRepository.findById(Long.parseLong(visitId)).get();
        VisitDTO dto = new VisitDTO();
        dto.setDate(formatter.format(visit.getDate()));
        dto.setVisitId(visit.getId().toString());
        UserInterfaceDTO user = new RestTemplate()
                .getForObject(USER_URL + "/" + visit.getUserId(), UserInterfaceDTO.class);
        UserInterfaceDTO employee = new RestTemplate()
                .getForObject(USER_URL + "/" + visit.getEmployeeId(), UserInterfaceDTO.class);
        dto.setPatient(user.getName() + " " + user.getSurname());
        dto.setSpecialist(employee.getName() + " " + employee.getSurname());
        dto.setSpecialisation(employee.getProfession());
        Integer price = new RestTemplate()
                .getForObject(VISIT_PRICE_URL + "/" + employee.getProfession(), Integer.class);
        dto.setPrice(price.toString());
        dto.setAdditionalNotice(visit.getAdditionalNotice());
        return dto;
    }
    
}
