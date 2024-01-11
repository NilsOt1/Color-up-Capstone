package nilsot1.backend.service;

import lombok.RequiredArgsConstructor;
import nilsot1.backend.exception.UserNotFoundException;
import nilsot1.backend.model.ColorRoomSet;
import nilsot1.backend.model.User;
import nilsot1.backend.repository.UserRepo;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ColorRoomSetService {

    private final UserRepo repo;

    public ColorRoomSet[] getAllColorRoomSets(String userId) throws UserNotFoundException {
        User user = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id " + userId + " not found"));

        return user.getColorRoomSets();
    }
}