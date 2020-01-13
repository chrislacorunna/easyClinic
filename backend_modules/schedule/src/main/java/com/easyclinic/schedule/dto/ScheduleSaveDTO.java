package com.easyclinic.schedule.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ScheduleSaveDTO {
    private String employeeId;
    private String timeFrom;
    private String timeTo;
    private String visitDuration;
    private Date date;
}
