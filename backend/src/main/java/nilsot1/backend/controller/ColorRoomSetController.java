package nilsot1.backend.controller;

import lombok.RequiredArgsConstructor;
import nilsot1.backend.exception.UserNotFoundException;
import nilsot1.backend.model.ColorRoomSet;
import nilsot1.backend.model.User;
import nilsot1.backend.service.ColorRoomSetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class ColorRoomSetController {

    private final ColorRoomSetService service;

    @GetMapping("/{userId}")
    public List<ColorRoomSet> getAllColorRoomSets(@PathVariable String userId) throws UserNotFoundException {
        return service.getAllColorRoomSets(userId);
    }

    @PostMapping("/{userId}")
    public User saveNewColorRoomSet(@PathVariable String userId, @RequestBody ColorRoomSet colorRoomSet) throws UserNotFoundException {

        return service.saveNewColorRoomSet(colorRoomSet, userId);
    }


}