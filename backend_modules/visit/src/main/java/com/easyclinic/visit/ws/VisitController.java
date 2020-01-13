package com.easyclinic.visit.ws;

import com.easyclinic.visit.dto.VisitDTO;
import com.easyclinic.visit.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/visit")
public class VisitController {

    @Autowired
    private VisitService visitService;

    @PostMapping("/save")
    public void save(@RequestBody VisitDTO visit) throws ParseException {
        visitService.saveVisit(visit);
    }
}
