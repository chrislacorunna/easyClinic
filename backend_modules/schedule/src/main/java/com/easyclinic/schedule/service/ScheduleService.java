package com.easyclinic.schedule.service;

import com.easyclinic.schedule.dto.ScheduleDTO;
import com.easyclinic.schedule.dto.ScheduleItemDTO;
import com.easyclinic.schedule.dto.ScheduleSaveDTO;
import com.easyclinic.schedule.model.Schedule;
import com.easyclinic.schedule.persistence.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class ScheduleService {

    @Autowired
    ScheduleRepository repository;

    private SimpleDateFormat dateFormatter;
    private SimpleDateFormat timeFormatter;

    public ScheduleService() {
        dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
        timeFormatter = new SimpleDateFormat("HH:mm");
    }

    public void saveSchedule(ScheduleSaveDTO dto) {
        String[] timeFrom = dto.getTimeFrom().split(":");
        String[] timeTo = dto.getTimeTo().split(":");

        Date dateFrom = new Date(dto.getDate().getTime()
                + TimeUnit.HOURS.toMillis(Long.parseLong(timeFrom[0])-1)
                + TimeUnit.MINUTES.toMillis(Long.parseLong(timeFrom[1])));
        Date dateTo = new Date(dto.getDate().getTime()
                + TimeUnit.HOURS.toMillis(Long.parseLong(timeTo[0])-1)
                + TimeUnit.MINUTES.toMillis(Long.parseLong(timeTo[1])));

        long duration = TimeUnit.MINUTES.toMillis(Long.parseLong(dto.getVisitDuration()));

        while (dateFrom.before(dateTo)) {
            Schedule schedule = new Schedule();
            schedule.setEmployeeId(dto.getEmployeeId());
            schedule.setReservated(false);
            schedule.setDate(dateFrom);
            System.out.println(dateFrom.toString());
            repository.save(schedule);
            dateFrom = new Date(dateFrom.getTime() + duration);
        }
    }

    public ArrayList<ScheduleDTO> getEmployeesSchedule(String id) {
        ArrayList<Schedule> data = repository.findAllByEmployeeId(id);
        Map<String, ArrayList<ScheduleItemDTO>> resultMap = new HashMap<>();
        data.forEach((schedule -> {
            ScheduleItemDTO dto = new ScheduleItemDTO();
            dto.setId(schedule.getId());
            dto.setTime(timeFormatter.format(schedule.getDate()));
            dto.setReservated(schedule.isReservated());
            String key = dateFormatter.format(schedule.getDate());
            if (resultMap.containsKey(key)) {
                resultMap.get(key).add(dto);
            } else {
                ArrayList<ScheduleItemDTO> list = new ArrayList<>();
                list.add(dto);
                resultMap.put(key, list);
            }
        }));
        ArrayList<ScheduleDTO> result = new ArrayList<>();
        resultMap.forEach(((s, scheduleItemDTOS) -> {
            ScheduleDTO dto = new ScheduleDTO();
            dto.setDate(s);
            dto.setItems(scheduleItemDTOS);
            result.add(dto);
        }));
        return result;
    }

    public void deleteVisitTerm(String employeeId, Date term) {
        repository.deleteByDateAndEmployeeId(term, employeeId);
    }
}
