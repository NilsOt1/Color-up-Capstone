package nilsot1.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import nilsot1.backend.model.User;
import nilsot1.backend.model.UserDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;


@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    private final String BASE_URL = "/api/user";

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllColorRoomSets_shouldReturnEmptyList_whenCalledInitially() throws Exception {
        UserDto user = new UserDto("test", new ArrayList<>());
        String newUserAsJSON = objectMapper.writeValueAsString(user);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newUserAsJSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(newUserAsJSON))
                        .andReturn();

        User savedUser = objectMapper.readValue(result.getResponse().getContentAsString(), User.class);
        String userAsJSON = objectMapper.writeValueAsString(savedUser);

        mvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/" + savedUser.getUserId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(userAsJSON));
    }
}
