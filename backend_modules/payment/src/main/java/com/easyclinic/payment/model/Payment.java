package com.easyclinic.payment.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Payment {
    @Id
    private String visitId;
    private String userId;
    private Integer price;
    private boolean paid;
}
