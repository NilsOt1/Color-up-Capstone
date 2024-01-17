package nilsot1.backend.controller;

import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.IOException;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class ColorControllerTest {
    private static MockWebServer mockWebServer;

    @Autowired
    private MockMvc mockMvc;

    @BeforeAll
    public static void beforeAll() throws IOException {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
    }

    @AfterAll
    public static void afterAll() throws IOException {
        mockWebServer.shutdown();
    }

    @DynamicPropertySource
    static void backendProperties(DynamicPropertyRegistry registry) {
        registry.add("colormind.base.url", () -> mockWebServer.url("/").toString());
    }

    @Test
    void testGetColors_whenCalled_thenReturnString() throws Exception {
        mockWebServer.enqueue(new MockResponse().setBody("""
                        {
                        "result":[[39,39,57],[89,117,110],[207,164,97],[238,241,82],[207,211,19]]
                        }
                """).addHeader("Content-Type", "text/plain"));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/colors").content("""
                    {"model":"default"}
                """)).andExpect(status().isOk()).andExpect(content().json("""
                {                  
                    "result":[[39,39,57],[89,117,110],[207,164,97],[238,241,82],[207,211,19]]
                }
                """));
    }
}
