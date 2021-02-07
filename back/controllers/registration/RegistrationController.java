package com.controllers.registration;

import com.model.User;

import com.repository.UserRepository;
import com.utils.PasswordHash;
import com.utils.json.JsonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
public class RegistrationController
{
    private final UserRepository user_repository;

    public RegistrationController(UserRepository user_repository)
    {
        this.user_repository = user_repository;
    }


    @PostMapping("/rest/registration")
    public ResponseEntity<String> registration(@RequestBody User newUser)
    {
        User user = user_repository.findByUsername(newUser.getUsername());

        if (user != null) {
            return new ResponseEntity<>(
                    JsonResponse.error("User already exists"),
                    HttpStatus.OK
            );
        } else {
            String hashedPassword = PasswordHash.hashPassword(newUser.getPassword());

            user_repository.save(new User(newUser.getUsername(), hashedPassword));

            return new ResponseEntity<>(
                    JsonResponse.data(null),
                    HttpStatus.OK
            );
        }
    }
}
