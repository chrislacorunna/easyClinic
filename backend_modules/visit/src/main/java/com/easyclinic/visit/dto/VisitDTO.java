package com.easyclinic.visit.dto;

import lombok.Data;

@Data
public class VisitDTO {
    private String visitId;
    private String date;
    private String specialist;
    private String specialisation;
    private String patient;
    private String price;
    private String additionalNotice;
}
