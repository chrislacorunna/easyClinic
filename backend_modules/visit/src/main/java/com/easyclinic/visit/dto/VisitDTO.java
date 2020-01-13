package com.easyclinic.visit.dto;

import lombok.Data;

import java.util.Date;

@Data
public class VisitDTO {
    private String date;
    private String employeeId;
    private String additionalNotice;
    private String userId;
}
