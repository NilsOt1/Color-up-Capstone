package nilsot1.backend.controller;

import com.fasterxml.jackson.databind.introspect.TypeResolutionContext;
import nilsot1.backend.model.ColorRoomSet;
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
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

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
                        .content(user.toString()))

                        .andExpect(MockMvcResultMatchers.status().isOk());


        mvc.perform(MockMvcRequestBuilders.get(BASE_URL + "{userId}"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    void getColorRoomSetById() {
    }

    @Test
    void saveNewColorRoomSet() {
    }

    @Test
    void updateColorPalette() {
    }

    @Test
    void deleteColorRoomSetById() {
    }
}