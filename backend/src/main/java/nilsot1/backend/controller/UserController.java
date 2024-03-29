package nilsot1.backend.controller;

import lombok.RequiredArgsConstructor;
import nilsot1.backend.exception.ColorRoomSetNotFoundException;
import nilsot1.backend.exception.UserNotFoundException;
import nilsot1.backend.model.*;
import nilsot1.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
    public User createNewUser(@RequestBody UserDto user) {
        return service.createNewUser(user);
    }

    @DeleteMapping("/{userId}")
    public User deleteUserById(@PathVariable String userId) throws UserNotFoundException {
        return service.deleteUserById(userId);
    }

    @GetMapping("/{userId}/color-room-sets")
    public List<ColorRoomSet> getAllColorRoomSets(@PathVariable String userId) throws UserNotFoundException {
        return service.getAllColorRoomSets(userId);
    }

    @GetMapping("/{userId}/color-room-sets/{colorRoomSetId}")
    public ColorRoomSet getColorRoomSetById(@PathVariable String userId, @PathVariable String colorRoomSetId) throws UserNotFoundException, ColorRoomSetNotFoundException {
        return service.getColorRoomSetById(userId, colorRoomSetId);
    }

    @PutMapping("/{userId}")
    public User saveNewColorRoomSet(@PathVariable String userId, @RequestBody ColorRoomSetDto colorRoomSet) throws UserNotFoundException {

        return service.saveNewColorRoomSet(colorRoomSet, userId);
    }

    @PutMapping("/{userId}/update-name/{colorRoomSetId}")
    public User updateRoomName(@PathVariable String userId, @PathVariable String colorRoomSetId, @RequestBody String roomName) throws UserNotFoundException, ColorRoomSetNotFoundException {
        return service.updateRoomName(userId, colorRoomSetId, roomName);
    }

    @PutMapping("/{userId}/update-colors/{colorRoomSetId}")
    public User updateColorPalette(@PathVariable String userId, @PathVariable String colorRoomSetId, @RequestBody ColorPalette colorPalette) throws UserNotFoundException, ColorRoomSetNotFoundException {
        return service.updateColorPalette(userId, colorRoomSetId, colorPalette);
    }

    @PutMapping("/{userId}/delete-set/{colorRoomSetId}")
    public User deleteColorRoomSetById(@PathVariable String userId, @PathVariable String colorRoomSetId) throws UserNotFoundException, ColorRoomSetNotFoundException {
        return service.deleteColorRoomSetById(userId, colorRoomSetId);
    }
}

