package nilsot1.backend.service;

import lombok.RequiredArgsConstructor;
import nilsot1.backend.exception.ColorRoomSetNotFoundException;
import nilsot1.backend.exception.UserNotFoundException;
import nilsot1.backend.model.*;
import nilsot1.backend.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo repo;
    private final IdService idService;

    public String userNotFoundMessage(String userId) {
        return "User with id " + userId + " not found";

    }

    public String colorRoomSetNotFoundMessage(String colorRoomSetId) {
        return "ColorRoomSet with id " + colorRoomSetId + " not found";
    }


    public User getUserById(String userId) throws UserNotFoundException {
        return repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userNotFoundMessage(userId)));
    }

    public User createNewUser(UserDto user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        User newUser = new User(idService.randomId(), user.getUserName(), user.getColorRoomSets());
        repo.save(newUser);

        return newUser;
    }

    public User deleteUserById(String userId) throws UserNotFoundException {
        User userToDelete = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userNotFoundMessage(userId)));

        repo.deleteById(userId);

        return userToDelete;
    }

    public List<ColorRoomSet> getAllColorRoomSets(String userId) throws UserNotFoundException {
        User user = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userNotFoundMessage(userId)));

        return user.getColorRoomSets();
    }

    public ColorRoomSet getColorRoomSetById(String userId, String colorRoomSetId) throws UserNotFoundException, ColorRoomSetNotFoundException {
        User user = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userNotFoundMessage(userId)));

        List<ColorRoomSet> colorRoomSets = user.getColorRoomSets();

        Optional<ColorRoomSet> foundColorRoomSet = colorRoomSets.stream()
                .filter(colorRoomSet -> colorRoomSet.getColorRoomSetId().equals(colorRoomSetId))
                .findFirst();

        return foundColorRoomSet
                .orElseThrow(() -> new ColorRoomSetNotFoundException(colorRoomSetNotFoundMessage(colorRoomSetId)));
    }

    public User saveNewColorRoomSet(ColorRoomSetDto colorRoomSet, String userId) throws UserNotFoundException {

        User user = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userNotFoundMessage(userId)));

        ColorRoomSet newColorRoomSet = new ColorRoomSet(idService.randomId(), colorRoomSet.getRoom(), colorRoomSet.getSavedColors());

        List<ColorRoomSet> updatedColorRoomSets = new ArrayList<>(user.getColorRoomSets());

        updatedColorRoomSets.add(newColorRoomSet);

        user.setColorRoomSets(updatedColorRoomSets);

        repo.save(user);

        return user;
    }

    public User updateRoomName(String userId, String colorRoomSetId, String roomName) throws UserNotFoundException, ColorRoomSetNotFoundException {

        User user = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userNotFoundMessage(userId)));

        List<ColorRoomSet> colorRoomSets = user.getColorRoomSets();

        ColorRoomSet foundColorRoomSet = colorRoomSets.stream()
                .filter(colorRoomSet -> colorRoomSet.getColorRoomSetId().equals(colorRoomSetId))
                .findFirst()
                .orElseThrow(() -> new ColorRoomSetNotFoundException(colorRoomSetNotFoundMessage(colorRoomSetId)));

        foundColorRoomSet.getRoom().setRoomName(roomName);

        repo.save(user);

        return user;
    }

    public User updateColorPalette(String userId, String colorRoomSetId, ColorPalette colorPalette) throws UserNotFoundException, ColorRoomSetNotFoundException {

        User user = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userNotFoundMessage(userId)));

        List<ColorRoomSet> colorRoomSets = user.getColorRoomSets();

        ColorRoomSet foundColorRoomSet = colorRoomSets.stream()
                .filter(colorRoomSet -> colorRoomSet.getColorRoomSetId().equals(colorRoomSetId))
                .findFirst()
                .orElseThrow(() -> new ColorRoomSetNotFoundException(colorRoomSetNotFoundMessage(colorRoomSetId)));

        foundColorRoomSet.setSavedColors(colorPalette);

        repo.save(user);

        return user;

    }

    public User deleteColorRoomSetById(String userId, String colorRoomSetId) throws UserNotFoundException, ColorRoomSetNotFoundException {
        User user = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userNotFoundMessage(userId)));

        List<ColorRoomSet> colorRoomSets = new ArrayList<>(user.getColorRoomSets());

        boolean removed = colorRoomSets.removeIf(colorRoomSet -> colorRoomSet.getColorRoomSetId().equals(colorRoomSetId));

        if (!removed) {
            throw new ColorRoomSetNotFoundException(colorRoomSetNotFoundMessage(colorRoomSetId));
        }

        user.setColorRoomSets(colorRoomSets);

        repo.save(user);

        return user;
    }
}
