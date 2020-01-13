package com.easyclinic.schedule.dto;

import lombok.Data;

@Data
public class ScheduleItemDTO {
    private String time;
    private Long id;
    private boolean reservated;
}
