package com.easyclinic.payment.service;

import com.easyclinic.payment.model.Payment;
import com.easyclinic.payment.model.VisitPrice;
import com.easyclinic.payment.persistence.PaymentRepository;
import com.easyclinic.payment.persistence.VisitPriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class PaymentService {

    private static final String VISIT_DETAILS_URL = "visit:8082/visit/details";

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private VisitPriceRepository visitPriceRepository;

    public Integer getVisitPrice(String profession) {
        return visitPriceRepository.findById(profession).get().getPrice();
    }

    public void savePayment(Payment payment) {
        payment.setPaid(false);
        paymentRepository.save(payment);
    }

    public ArrayList<Payment> getPaymentsForUser(String id) {
        return paymentRepository.findAllByUserId(id);
    }

    public ArrayList<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public void checkPaymentAsPaid(String visitId) {
        Payment payment = paymentRepository.findById(visitId).get();
        payment.setPaid(true);
        paymentRepository.save(payment);
    }

    public void initDefaultPrices() {
        visitPriceRepository.save(new VisitPrice("Dentist", 200));
        visitPriceRepository.save(new VisitPrice("Pediatrician", 120));
        visitPriceRepository.save(new VisitPrice("Internist", 150));
        visitPriceRepository.save(new VisitPrice("Ophthalmologist", 180));
        visitPriceRepository.save(new VisitPrice("Cardiologist", 250));
    }

}
