package nilsot1.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ColorService {

    @Value("${colormind.base.url}")
    private String baseUrl;
    public String getColors(@RequestBody String requestBody) {

        WebClient webclient = WebClient.create();

        return webclient.post()
                .uri(baseUrl + "/api/")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
