package com.easyclinic.schedule.ws;

import com.easyclinic.schedule.dto.ScheduleDTO;
import com.easyclinic.schedule.dto.ScheduleSaveDTO;
import com.easyclinic.schedule.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/schedule")
@RestController
public class ScheduleController {

    @Autowired
    ScheduleService service;

    @PostMapping("/save")
    public void saveSchedule(@RequestBody ScheduleSaveDTO dto) {
        service.saveSchedule(dto);
    }

    @GetMapping("/get/{employeeId}")
    public ArrayList<ScheduleDTO> getSchedule(@PathVariable("employeeId") String employeeId) {
        return service.getEmployeesSchedule(employeeId);
    }
}
