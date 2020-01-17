package com.easyclinic.payment.persistence;

import com.easyclinic.payment.model.VisitPrice;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitPriceRepository extends CrudRepository<VisitPrice, String> {

}
