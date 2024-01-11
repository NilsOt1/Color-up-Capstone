package nilsot1.backend.controller;

import lombok.RequiredArgsConstructor;
import nilsot1.backend.exception.UserNotFoundException;
import nilsot1.backend.model.ColorRoomSet;
import nilsot1.backend.service.ColorRoomSetService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ColorRoomSetController {

    private final ColorRoomSetService service;

    @GetMapping("/{userId}/user")
    public ColorRoomSet[] getAllColorRoomSets(@PathVariable String userId) throws UserNotFoundException {
        return service.getAllColorRoomSets(userId);
    }
}