package nilsot1.backend.service;

import lombok.RequiredArgsConstructor;
import nilsot1.backend.exception.ColorRoomSetNotFoundException;
import nilsot1.backend.exception.UserNotFoundException;
import nilsot1.backend.model.ColorPalette;
import nilsot1.backend.model.ColorRoomSet;
import nilsot1.backend.model.ColorRoomSetDTO;
import nilsot1.backend.model.User;
import nilsot1.backend.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ColorRoomSetService {

    private final UserRepo repo;

    public String userNotFoundMessage(String userId) {
        return "User with id " + userId + " not found";
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
                .orElseThrow(() -> new ColorRoomSetNotFoundException("ColorRoomSet with id " + colorRoomSetId + " not found"));
    }

    public User saveNewColorRoomSet(ColorRoomSetDTO colorRoomSet, String userId) throws UserNotFoundException {

        User user = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userNotFoundMessage(userId)));

        ColorRoomSet newColorRoomSet = new ColorRoomSet(UUID.randomUUID().toString(), colorRoomSet.getRoom(), colorRoomSet.getSavedColors());

        user.getColorRoomSets().add(newColorRoomSet);

        return repo.save(user);
    }

    public User updateColorPalette(String userId, String colorRoomSetId, ColorPalette colorPalette) throws UserNotFoundException {

        User user = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userNotFoundMessage(userId)));

        List<ColorRoomSet> colorRoomSets = user.getColorRoomSets();

        Optional<ColorRoomSet> foundColorRoomSet = colorRoomSets.stream()
                .filter(colorRoomSet -> colorRoomSet.getColorRoomSetId().equals(colorRoomSetId))
                .findFirst();

        foundColorRoomSet.ifPresent(colorRoomSet -> colorRoomSet.setSavedColors(colorPalette));

        return repo.save(user);
    }

    public User deleteColorRoomSetById(String userId, String colorRoomSetId) throws UserNotFoundException {
        User user = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userNotFoundMessage(userId)));

        List<ColorRoomSet> colorRoomSets = user.getColorRoomSets();

        colorRoomSets.removeIf(colorRoomSet -> colorRoomSet.getColorRoomSetId().equals(colorRoomSetId));

        return repo.save(user);
    }
}