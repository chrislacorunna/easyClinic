package com.easyclinic.user.ws;

import com.amazonaws.services.cognitoidp.model.*;
import com.easyclinic.user.cognito.CognitoService;
import com.easyclinic.user.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private CognitoService cognitoService;

    @PostMapping("/admin/create")
    public UserType createUser(@RequestBody UserCreateDTO dto) {
        return cognitoService.signUp(dto);
    }

    @GetMapping("/admin/delete/{username}")
    public AdminDeleteUserResult deleteUser(@PathVariable("username") String username) {
        return cognitoService.deleteUser(username);
    }

    @PostMapping("/admin/users")
    public ArrayList<UserListItemDTO> getUsers(@RequestBody ListUsersInGroupRequest request) {
        return cognitoService.getUsers(request);
    }

    @PostMapping("/admin/addtogroup")
    public AdminAddUserToGroupResult addToGroup(@RequestBody AdminAddUserToGroupRequest request) {
        return cognitoService.assignUserToGroup(request);
    }

    @GetMapping("/getgroup/{username}")
    public String getUserGroup(@PathVariable("username") String username) {
        return cognitoService.getUserGroup(username);
    }

    @GetMapping("/admin/getuserdetails/{username}")
    public UserDetailsDTO getUserDetails(@PathVariable("username") String username) {
        return cognitoService.adminGetUser(username);
    }

    @PostMapping("/admin/update")
    public AdminUpdateUserAttributesResult updateUser(@RequestBody UserEditDTO dto) {
        return cognitoService.updateUserAttributes(dto);
    }

    @PostMapping("/admin/disable")
    public void changeUserDisableStatus(@RequestBody ChangeDisableStatusDTO dto) {
        cognitoService.setUserDisableStatus(dto);
    }

    @GetMapping("/logincheck/{id}")
    public String performLoginCheck(@PathVariable("id") String id) {
        return cognitoService.performLoginCheckAndReturnUserGroup(id);
    }
}
