package com.easyclinic.visit.dto;

import lombok.Data;

@Data
public class VisitCreateDTO {
    private String date;
    private String employeeId;
    private String additionalNotice;
    private String userId;
    private String profession;
}
