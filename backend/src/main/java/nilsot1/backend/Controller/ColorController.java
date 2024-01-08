package nilsot1.backend.Controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequestMapping("/api")
public class ColorController {

    @PostMapping("/getColors")
    public String getColors(@RequestBody String requestBody) {

        WebClient webclient = WebClient.create();

        return webclient.post()
                .uri("http://colormind.io/api/")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
