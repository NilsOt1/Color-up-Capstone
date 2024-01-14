package nilsot1.backend.service;

import lombok.RequiredArgsConstructor;
import nilsot1.backend.exception.UserNotFoundException;
import nilsot1.backend.model.User;
import nilsot1.backend.repository.UserRepo;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {

    public String userNotFoundMessage(String userId) {
        return "User with id " + userId + " not found";
    }

    private final UserRepo repo;

    public User getUserById(String userId) throws UserNotFoundException {
    return repo.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(userNotFoundMessage(userId)));
    }

    public User createNewUser(User user) {
        User newUser = new User(user.getUserId(), user.getUserName(), user.getColorRoomSets());
        return repo.save(newUser);
    }


}