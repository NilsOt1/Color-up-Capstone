package nilsot1.backend.controller;

import nilsot1.backend.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;


@SpringBootTest
@AutoConfigureMockMvc
class ColorRoomSetControllerTest {

    private final String BASE_URL = "/api/user";

    @Autowired
    private MockMvc mvc;

    @Test
    void testGetAllColorRoomSets_shouldReturnEmptyList_whenCalledInitially() throws Exception {
        User user = new User("1", "test", new ArrayList<>());

        mvc.perform(MockMvcRequestBuilders.post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "userId": "1",
                                "userName": "test",
                                "colorRoomSets": []
                                }
                                """))

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                        "userId": "1",
                        "userName": "test",
                        "colorRoomSets": []
                        }
                        """));


        mvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/" + user.getUserId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                        "userId": "1",
                        "userName": "test",
                        "colorRoomSets": []
                        }
                        """));
    }
}
