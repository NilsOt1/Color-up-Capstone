package nilsot1.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import nilsot1.backend.model.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class UserControllerTest {

    private final String BASE_URL = "/api/user";

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetUserById_shouldReturnUser_whenCalledWithUserId() throws Exception {

        UserDto userDto = new UserDto("test", new ArrayList<>());
        String userDtoAsJson = objectMapper.writeValueAsString(userDto);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDtoAsJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        User savedUser = objectMapper.readValue(result.getResponse().getContentAsString(), User.class);
        String userAsJSON = objectMapper.writeValueAsString(savedUser);

        mvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/" + savedUser.getUserId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(userAsJSON));
    }

    @Test
    void testCreateNewUser_shouldSaveAndReturnNewUser_WhenCalledWithBody() throws Exception {
        UserDto userDto = new UserDto("test", new ArrayList<>());
        String userDtoAsJson = objectMapper.writeValueAsString(userDto);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDtoAsJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        User savedUser = objectMapper.readValue(result.getResponse().getContentAsString(), User.class);
        String userAsJSON = objectMapper.writeValueAsString(savedUser);

        mvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/" + savedUser.getUserId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(userAsJSON));
    }

    @Test
    void testDeleteUserById_shouldReturnDeletedUser_whenCalledWithId() throws Exception {
        UserDto userDto = new UserDto("test", new ArrayList<>());
        String userDtoAsJSON = objectMapper.writeValueAsString(userDto);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDtoAsJSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        User savedUser = objectMapper.readValue(result.getResponse().getContentAsString(), User.class);
        String userAsJSON = objectMapper.writeValueAsString(savedUser);

        mvc.perform(MockMvcRequestBuilders.delete(BASE_URL + "/" + savedUser.getUserId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(userAsJSON));
    }

    @Test
    void testGetAllColorRoomSets_shouldReturnEmptyList_whenCalledInitially() throws Exception {
        UserDto userDto = new UserDto("test", new ArrayList<>());
        String newUserAsJSON = objectMapper.writeValueAsString(userDto);

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
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    void testGetColorRoomSetById_shouldReturnColorRoomSet_WhenCalledWithId() throws Exception {
        UserDto userDto = new UserDto("test", List.of(new ColorRoomSet("test", new Room(), new ColorPalette())));
        String newUserAsJSON = objectMapper.writeValueAsString(userDto);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newUserAsJSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(newUserAsJSON))
                .andReturn();

        User savedUser = objectMapper.readValue(result.getResponse().getContentAsString(), User.class);
        String colorRoomSetAsJSON = objectMapper.writeValueAsString(savedUser.getColorRoomSets().get(0));

        mvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/" + savedUser.getUserId() + "/color-room-sets" + "/" + savedUser.getColorRoomSets().get(0).getColorRoomSetId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(colorRoomSetAsJSON));
    }
}
