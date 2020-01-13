package com.easyclinic.user.dto;

import lombok.Data;

@Data
public class UserListItemDTO {
    protected String name;
    protected String surname;
    protected String id;
    protected String profession;
    protected String group;
    protected boolean enabled;
}
