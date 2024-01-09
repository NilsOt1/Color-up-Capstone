package nilsot1.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ColorService {

    private WebClient webClient;

    public ColorService(@Value("${colormind.base.url}") String baseUrl) {
        webClient = WebClient.create(baseUrl);
    }
    public String getColors(String requestBody) {


        return webClient
                .post()
                .uri("/api/")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();


    }
}
