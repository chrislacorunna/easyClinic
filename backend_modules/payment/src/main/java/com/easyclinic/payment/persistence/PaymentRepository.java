package com.easyclinic.payment.persistence;

import com.easyclinic.payment.model.Payment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface PaymentRepository extends CrudRepository<Payment, String> {

    ArrayList<Payment> findAllByUserId(String userId);

    @Override
    ArrayList<Payment> findAll();
}
