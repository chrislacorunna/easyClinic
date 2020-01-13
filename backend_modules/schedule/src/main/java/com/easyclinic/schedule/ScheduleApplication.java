package com.easyclinic.schedule;

import com.easyclinic.schedule.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication
public class ScheduleApplication implements CommandLineRunner {

	@Autowired
	ScheduleService service;

	public static void main(String[] args) {
		SpringApplication.run(ScheduleApplication.class, args);
	}
	@Override
	public void run(String... args) {

	}


}
