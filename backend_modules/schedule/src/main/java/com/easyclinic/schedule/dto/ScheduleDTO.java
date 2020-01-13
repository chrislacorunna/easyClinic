package com.easyclinic.schedule.dto;

import lombok.Data;

import java.util.ArrayList;

@Data
public class ScheduleDTO {
    private String date;
    private ArrayList<ScheduleItemDTO> items;
}
