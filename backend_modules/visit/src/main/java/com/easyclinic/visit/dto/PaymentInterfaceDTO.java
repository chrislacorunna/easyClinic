package com.easyclinic.visit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentInterfaceDTO {
    private String visitId;
    private String userId;
    private Integer price;
}
