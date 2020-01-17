package com.easyclinic.payment.ws;

import com.easyclinic.payment.model.Payment;
import com.easyclinic.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/payment")
@RestController
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/price/{profession}")
    public Integer getPriceForVisit(@PathVariable("profession") String profession) {
        return paymentService.getVisitPrice(profession);
    }

    @PostMapping("/save")
    public void savePayment(@RequestBody Payment payment) {
        paymentService.savePayment(payment);
    }

    @GetMapping("/admin/get")
    public ArrayList<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/get/{visitId}")
    public ArrayList<Payment> getAllPaymentsForUser(@PathVariable("visitId") String visitId) {
        return paymentService.getPaymentsForUser(visitId);
    }

    @GetMapping("/admin/check/{visitId}")
    public void checkAsPaid(@PathVariable("visitId") String visitId) {
        paymentService.checkPaymentAsPaid(visitId);
    }
}
