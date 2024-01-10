package nilsot1.backend.controller;

import lombok.RequiredArgsConstructor;
import nilsot1.backend.service.ColorRoomSetService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ColorRoomSetController {

    private final ColorRoomSetService service;

}
