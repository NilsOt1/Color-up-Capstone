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

        mvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/" + savedUser.getUserId() + "/color-room-sets"))
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

    @Test
    void testSaveNewColorRoomSet_shouldSaveColorRoomSet_whenCalledWithIdAndBody() throws Exception {
        UserDto userDto = new UserDto("test", new ArrayList<>());
        String newUserAsJSON = objectMapper.writeValueAsString(userDto);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newUserAsJSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(newUserAsJSON))
                .andReturn();

        User savedUser = objectMapper.readValue(result.getResponse().getContentAsString(), User.class);

        ColorRoomSetDto colorRoomSetDTO = new ColorRoomSetDto(new Room(), new ColorPalette());
        String colorRoomSetDtoAsJSON = objectMapper.writeValueAsString(colorRoomSetDTO);

        MvcResult resultAfterPut = mvc.perform(MockMvcRequestBuilders.put(BASE_URL + "/" + savedUser.getUserId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(colorRoomSetDtoAsJSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        User updatedUser = objectMapper.readValue(resultAfterPut.getResponse().getContentAsString(), User.class);
        String updatedUserAsJSON = objectMapper.writeValueAsString(updatedUser);

        mvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/" + updatedUser.getUserId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(updatedUserAsJSON));
    }

    @Test
    void testUpdateRoomName_shouldReturnUpdatedUser_whenCalledWithIdAndBody() throws Exception {
        UserDto userDto = new UserDto("test", List.of(new ColorRoomSet("test", new Room(), new ColorPalette())));
        String newUserAsJSON = objectMapper.writeValueAsString(userDto);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newUserAsJSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(newUserAsJSON))
                .andReturn();

        User savedUser = objectMapper.readValue(result.getResponse().getContentAsString(), User.class);
        String newRoomName = "new name";

        User expectedUser = new User(savedUser.getUserId(), "test", List.of(new ColorRoomSet("test", new Room(savedUser.getColorRoomSets().get(0).getRoom().getRoomId(), newRoomName), new ColorPalette())));
        String expectedUserAsJSON = objectMapper.writeValueAsString(expectedUser);

        mvc.perform(MockMvcRequestBuilders.put(BASE_URL + "/" + savedUser.getUserId() + "/update-name" + "/" + savedUser.getColorRoomSets().get(0).getColorRoomSetId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newRoomName))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedUserAsJSON));
    }

    @Test
    void testUpdateColorPalette_shouldReturnUpdatedUser_whenCalledWithIdAndBody() throws Exception {
        UserDto userDto = new UserDto("test", List.of(new ColorRoomSet("test", new Room(), new ColorPalette())));
        String newUserAsJSON = objectMapper.writeValueAsString(userDto);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newUserAsJSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(newUserAsJSON))
                .andReturn();

        User savedUser = objectMapper.readValue(result.getResponse().getContentAsString(), User.class);
        ColorPalette newColorPalette = new ColorPalette(new int[][]{{1, 1, 1}, {1, 1, 1}, {1, 1, 1}});
        String newColorPaletteAsJSON = objectMapper.writeValueAsString(newColorPalette);

        User expectedUser = new User(savedUser.getUserId(), "test", List.of(new ColorRoomSet("test", new Room(), newColorPalette)));
        String expectedUserAsJSON = objectMapper.writeValueAsString(expectedUser);

        mvc.perform(MockMvcRequestBuilders.put(BASE_URL + "/" + savedUser.getUserId() + "/" + savedUser.getColorRoomSets().get(0).getColorRoomSetId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newColorPaletteAsJSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedUserAsJSON));
    }

    @Test
    void testDeleteColorRoomSetById_shouldReturnUserWithoutColorRoomSets_whenCalledWithId() throws Exception {
        UserDto userDto = new UserDto("test", List.of(new ColorRoomSet("test", new Room(), new ColorPalette())));
        String newUserAsJSON = objectMapper.writeValueAsString(userDto);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newUserAsJSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(newUserAsJSON))
                .andReturn();

        User savedUser = objectMapper.readValue(result.getResponse().getContentAsString(), User.class);

        User expectedUser = new User(savedUser.getUserId(), "test", new ArrayList<>());
        String expectedUserAsJSON = objectMapper.writeValueAsString(expectedUser);

        mvc.perform(MockMvcRequestBuilders.put(BASE_URL + "/" + savedUser.getUserId() + "/delete-set" + "/" + "test"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedUserAsJSON));
    }
}
