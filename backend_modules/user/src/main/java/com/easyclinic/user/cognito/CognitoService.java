package com.easyclinic.user.cognito;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.model.*;
import com.easyclinic.user.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CognitoService {

    @Autowired
    private AWSCognitoIdentityProvider cognitoClient;
    @Autowired
    private CognitoProperties properties;
    private SimpleDateFormat formatter;

    public CognitoService() {
        formatter = new SimpleDateFormat("YYYY-MM-dd");
    }

    public UserType signUp(UserCreateDTO dto){
        ArrayList<AttributeType> attributes = new ArrayList<>();

        attributes.add(new AttributeType().withName("name").withValue(dto.getName()));
        attributes.add(new AttributeType().withName("family_name").withValue(dto.getSurname()));
        attributes.add(new AttributeType().withName("email").withValue(dto.getEmail()));
        attributes.add(new AttributeType().withName("gender").withValue(dto.getGender()));
        attributes.add(new AttributeType().withName("birthdate").withValue(formatter.format(dto.getBirthdate())));
        attributes.add(new AttributeType().withName("address").withValue(dto.getAddress()));
        attributes.add(new AttributeType().withName("email_verified").withValue("true"));
        if (dto.getProfession() != null) {
            attributes.add(new AttributeType().withName("custom:profession").withValue(dto.getProfession()));
        }

        AdminCreateUserRequest request = new AdminCreateUserRequest()
            .withUserPoolId(properties.getUserPoolId())
            .withUsername(dto.getEmail())
            .withUserAttributes(attributes)
            .withTemporaryPassword(generatePassword())
            //.withMessageAction("SUPPRESS")
            .withDesiredDeliveryMediums(DeliveryMediumType.EMAIL)
            .withForceAliasCreation(Boolean.FALSE);

        AdminCreateUserResult createUserResult =  cognitoClient.adminCreateUser(request);

        AdminAddUserToGroupRequest addUserToGroupRequest = new AdminAddUserToGroupRequest();
        addUserToGroupRequest.setGroupName(dto.getUserType());
        addUserToGroupRequest.setUsername(dto.getEmail());
        assignUserToGroup(addUserToGroupRequest);

        return createUserResult.getUser();
    }

    public AdminDeleteUserResult deleteUser(String email) {
        AdminDeleteUserRequest request = new AdminDeleteUserRequest();
        request.setUsername(email);
        request.setUserPoolId(properties.getUserPoolId());

        return cognitoClient.adminDeleteUser(request);
    }

    public ArrayList<UserListItemDTO> getUsers(ListUsersInGroupRequest request) {
        request.setUserPoolId(properties.getUserPoolId());
        request.setLimit(60);
        ListUsersInGroupResult result = cognitoClient.listUsersInGroup(request);
        ArrayList<UserListItemDTO> list = (ArrayList<UserListItemDTO>) result.getUsers().stream().map(userType -> {
            UserListItemDTO dto = new UserListItemDTO();
            dto.setId(userType.getUsername());
            dto.setGroup(getUserGroup(userType.getUsername()));
            userType.getAttributes().stream().forEach(attributeType -> {
               if (attributeType.getName().equals("name")) {
                   dto.setName(attributeType.getValue());
               }
               if (attributeType.getName().equals("family_name")) {
                   dto.setSurname(attributeType.getValue());
               }
               if (attributeType.getName().equals("custom:profession")) {
                   dto.setProfession(attributeType.getValue());
               }
            });
            dto.setEnabled(userType.getEnabled());
            return dto;
        }).collect(Collectors.toList());

        return list;
    }

    public AdminAddUserToGroupResult assignUserToGroup(AdminAddUserToGroupRequest request) {
        request.setUserPoolId(properties.getUserPoolId());
        return cognitoClient.adminAddUserToGroup(request);
    }

    public String getUserGroup(String username) {
        AdminListGroupsForUserRequest request = new AdminListGroupsForUserRequest();
        request.setUsername(username);
        request.setUserPoolId(properties.getUserPoolId());
        request.setLimit(1);
        return  cognitoClient.adminListGroupsForUser(request).getGroups().size() > 0 ?
                cognitoClient.adminListGroupsForUser(request).getGroups().get(0).getGroupName()
                : "NO_GROUP";
    }

    public UserDetailsDTO adminGetUser(String username) {
        AdminGetUserRequest request = new AdminGetUserRequest();
        request.setUserPoolId(properties.getUserPoolId());
        request.setUsername(username);

        AdminGetUserResult result = cognitoClient.adminGetUser(request);
        UserDetailsDTO dto = new UserDetailsDTO();

        dto.setGroup(getUserGroup(result.getUsername()));
        dto.setId(result.getUsername());
        result.getUserAttributes().stream().forEach(attributeType -> {
            if (attributeType.getName().equals("email")) {
                dto.setEmail(attributeType.getValue());
            }
            if (attributeType.getName().equals("family_name")) {
                dto.setSurname(attributeType.getValue());
            }
            if (attributeType.getName().equals("name")) {
                dto.setName(attributeType.getValue());
            }
            if (attributeType.getName().equals("gender")) {
                dto.setGender(attributeType.getValue());
            }
            if (attributeType.getName().equals("address")) {
                dto.setAddress(attributeType.getValue());
            }
            if (attributeType.getName().equals("custom:profession")) {
                dto.setProfession(attributeType.getValue());
            }
            if (attributeType.getName().equals("birthdate")) {
                dto.setBirthdate(attributeType.getValue());
            }
        });
        return dto;
    }

    public AdminUpdateUserAttributesResult updateUserAttributes(UserEditDTO dto) {
        AdminUpdateUserAttributesRequest request = new AdminUpdateUserAttributesRequest();
        request.setUserPoolId(properties.getUserPoolId());
        request.setUsername(dto.getId());

        ArrayList<AttributeType> attributes = new ArrayList<>();
        if (dto.getName() != null) {
            attributes.add(new AttributeType().withName("name").withValue(dto.getName()));
        }
        if (dto.getSurname() != null) {
            attributes.add(new AttributeType().withName("family_name").withValue(dto.getSurname()));
        }
        if (dto.getEmail() != null) {
            attributes.add(new AttributeType().withName("email").withValue(dto.getEmail()));
        }
        if (dto.getGender() != null) {
            attributes.add(new AttributeType().withName("gender").withValue(dto.getGender()));
        }
        if (dto.getBirthdate() != null) {
            attributes.add(new AttributeType().withName("birthdate").withValue(formatter.format(dto.getBirthdate())));
        }
        if (dto.getAddress() != null) {
            attributes.add(new AttributeType().withName("address").withValue(dto.getAddress()));
        }
        if (dto.getProfession() != null) {
            attributes.add(new AttributeType().withName("custom:profession").withValue(dto.getProfession()));
        }
        request.setUserAttributes(attributes);

        return cognitoClient.adminUpdateUserAttributes(request);
    }

    public void setUserDisableStatus(ChangeDisableStatusDTO dto) {
        if (dto.isDisable()) {
            AdminDisableUserRequest request = new AdminDisableUserRequest();
            request.setUserPoolId(properties.getUserPoolId());
            request.setUsername(dto.getId());
            cognitoClient.adminDisableUser(request);
        } else {
            AdminEnableUserRequest request = new AdminEnableUserRequest();
            request.setUserPoolId(properties.getUserPoolId());
            request.setUsername(dto.getId());
            cognitoClient.adminEnableUser(request);
        }
    }

    public String performLoginCheckAndReturnUserGroup(String id) {
        String group = getUserGroup(id);
        if (group.equals("NO_GROUP")) {
            ChangeDisableStatusDTO dto = new ChangeDisableStatusDTO();
            dto.setDisable(true);
            dto.setId(id);
            setUserDisableStatus(dto);

            AdminAddUserToGroupRequest addUserToGroupRequest = new AdminAddUserToGroupRequest();
            addUserToGroupRequest.setGroupName("CUSTOMER");
            addUserToGroupRequest.setUsername(id);
            assignUserToGroup(addUserToGroupRequest);
        }
        return group;
    }

    private String generatePassword() {
        UUID password = UUID.randomUUID();
        String prefix = password.toString().substring(0, 6);
        return prefix + "a1A";
    }

}
