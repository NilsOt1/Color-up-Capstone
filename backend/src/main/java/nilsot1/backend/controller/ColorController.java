package nilsot1.backend.controller;

import lombok.RequiredArgsConstructor;
import nilsot1.backend.service.ColorService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ColorController {

    private final ColorService service;

    @PostMapping("/getColors")
    public String getColors(@RequestBody String requestBody) {
        return service.getColors(requestBody);
    }
}
