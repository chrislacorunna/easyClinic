package com.easyclinic.visit.ws;

import com.easyclinic.visit.dto.VisitCreateDTO;
import com.easyclinic.visit.dto.VisitDTO;
import com.easyclinic.visit.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/visit")
public class VisitController {

    @Autowired
    private VisitService visitService;

    @PostMapping("/save")
    public void save(@RequestBody VisitCreateDTO visit) throws ParseException {
        visitService.saveVisit(visit);
    }

    @GetMapping("/get/{id}")
    public ArrayList<VisitDTO> getVisits(@PathVariable("id") String id) {
        return visitService.getVisits(id);
    }

    @GetMapping("/details/{id}")
    public VisitDTO getVisit(@PathVariable("id") String id) {
        return visitService.getVisit(id);
    }
}
