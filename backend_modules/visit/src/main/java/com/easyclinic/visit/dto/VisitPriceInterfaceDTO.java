package com.easyclinic.visit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VisitPriceInterfaceDTO {
    @Id
    private String profession;
    private Integer price;
}
