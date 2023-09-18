package com.backend.demo.Controller;

import com.backend.demo.Model.User;
import com.backend.demo.Service.UserService;
import com.backend.demo.Service.UserService.FiltredDev;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/user", method = { RequestMethod.GET, RequestMethod.GET })
public class UserController {
    /**
     * InnerUserController
     */


    @Autowired
    UserService userService;

    @PostMapping("/registre")
    public boolean addUser(@RequestBody User user, @RequestParam List<String> categories){
        return userService.addUser(user,categories);
    }

    @PostMapping("/login")
    public HashMap<String, Object> login(@RequestBody HashMap<String, String> data) {
        return userService.login(data.get("email"), data.get("password"));
    }





}
