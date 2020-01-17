package com.easyclinic.payment;

import com.easyclinic.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PaymentApplication implements CommandLineRunner {

	@Autowired
	PaymentService paymentService;

	public static void main(String[] args) {
		SpringApplication.run(PaymentApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		paymentService.initDefaultPrices();
	}
}
