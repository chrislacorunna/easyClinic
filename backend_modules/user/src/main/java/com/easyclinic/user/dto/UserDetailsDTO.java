package com.easyclinic.user.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDetailsDTO extends UserListItemDTO {
    private String email;
    private String birthdate;
    private String gender;
    private String address;
}
