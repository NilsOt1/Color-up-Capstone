package nilsot1.backend.controller;

import lombok.RequiredArgsConstructor;
import nilsot1.backend.exception.UserNotFoundException;
import nilsot1.backend.model.User;
import nilsot1.backend.service.UserService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable String userId) throws UserNotFoundException {
        return service.getUserById(userId);
    }

    @PostMapping
    public User createNewUser(@RequestBody User user) {
        return service.createNewUser(user);
    }

    @DeleteMapping("/{userId}")
    public User deleteUserById(@PathVariable String userId) throws UserNotFoundException {
        return service.deleteUserById(userId);
    }
}

