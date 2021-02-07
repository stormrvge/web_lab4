package com.controllers.login;

import com.controllers.SessionService;
import com.model.User;
import com.repository.UserRepository;
import com.utils.PasswordHash;
import com.utils.json.JsonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.SessionScope;

import javax.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@SessionScope
public class LoginController
{
    private final UserRepository user_repository;

    public LoginController(UserRepository user_repository)
    {
        this.user_repository = user_repository;
    }

    @GetMapping("/rest/logout")
    public ResponseEntity<String> logout(HttpSession session)
    {
        SessionService.global.remove(session.getId());
        session.invalidate();
        return new ResponseEntity<>(JsonResponse.data(null), HttpStatus.OK);
    }

    @PostMapping("/rest/login")
    public ResponseEntity<String> login(HttpSession session, @RequestBody User newUser)
    {
        User user = user_repository.findByUsername(newUser.getUsername());

        if(user == null || !PasswordHash.checkPass(newUser.getPassword(), user.getPassword())) {
            return new ResponseEntity<>(
                    JsonResponse.error("Username or password is incorrect"),
                    HttpStatus.OK);
        } else {
            SessionService.global.add(session.getId(), newUser.getUsername(), user.getId());

            return new ResponseEntity<>(JsonResponse.data(null), HttpStatus.OK);
        }
    }
}
