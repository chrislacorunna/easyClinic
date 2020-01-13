package com.easyclinic.user.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserCreateDTO {
    private String name;
    private String surname;
    private String gender;
    private String address;
    private Date birthdate;
    private String email;
    private String userType;
    private String profession;
}
