package nilsot1.backend.service;

import nilsot1.backend.exception.ColorRoomSetNotFoundException;
import nilsot1.backend.exception.UserNotFoundException;
import nilsot1.backend.model.*;
import nilsot1.backend.repository.UserRepo;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    UserRepo userRepo = mock(UserRepo.class);
    IdService idService = mock(IdService.class);
    UserService userService = new UserService(userRepo, idService);

    String userId = "1";
    String userName = "test name";
    String colorRoomSetId = "1";
    String roomId = "room Id";
    String roomName = "test room";
    ColorPalette colorPalette = new ColorPalette(new int[][]{{1, 1, 1}, {1, 1, 1}, {1, 1, 1}});
    Room room = new Room(roomId, roomName);
    ColorRoomSet colorRoomSet = new ColorRoomSet(colorRoomSetId, room, colorPalette);
    ColorRoomSetDto colorRoomSetDTO = new ColorRoomSetDto(room, colorPalette);
    User testUser = new User(userId, userName, List.of(colorRoomSet));
    UserDto testUserDto = new UserDto(userName, List.of(colorRoomSet));

    @Test
    void testUserNotFoundMessage_shouldReturnMessageString_whenCalledWithUserId() {
        //GIVEN
        String expected = "User with id " + userId + " not found";

        //WHEN
        String actual = userService.userNotFoundMessage(userId);

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void testColorRoomSetNotFoundMessage_shouldReturnMessageString_whenCalledWithUserId() {
        //GIVEN & WHEN
        String actual = userService.colorRoomSetNotFoundMessage(userId);

        //THEN
        String expected = "ColorRoomSet with id " + colorRoomSetId + " not found";
        assertEquals(expected, actual);
    }

    @Test
    void testGetUserById_shouldReturnUser_whenCalledWithUserId() throws UserNotFoundException {
        //GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));
        User expected = testUser;

        //WHEN
        User actual = userService.getUserById(userId);

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void testGetUserById_shouldThrowUserNotFoundException_whenUserNotFound() {
        // GIVEN
        when(userRepo.findById("Non existing ID")).thenReturn(Optional.empty());

        // WHEN & THEN
        assertThrows(UserNotFoundException.class, () -> userService.getUserById("Non existing ID"));
    }

    @Test
    void testCreateNewUser_shouldSaveNewUser_whenCalledWithBody() {
        //GIVEN
        when(idService.randomId()).thenReturn("randomId");
        User expected = new User("randomId", testUser.getUserName(), testUser.getColorRoomSets());

        //WHEN
        User actual = userService.createNewUser(testUserDto);

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void testCreateNewUser_shouldSaveCorrectUserData_whenCalledWithBody() {
        // Given
        when(idService.randomId()).thenReturn("randomId");
        User expected = new User("randomId", testUser.getUserName(), testUser.getColorRoomSets());

        // When
        User actual = userService.createNewUser(testUserDto);

        // Then
        assertEquals(expected.getUserId(), actual.getUserId());
        assertEquals(expected.getUserName(), actual.getUserName());
        assertEquals(expected.getColorRoomSets(), actual.getColorRoomSets());
    }

    @Test
    void testCreateNewUser_shouldThrowException_whenCalledWithNull() {
        //WHEN & THEN
        assertThrows(IllegalArgumentException.class, () -> userService.createNewUser(null));
    }

    @Test
    void testDeleteUserById_shouldDeleteUser_whenCalledWithUserId() throws UserNotFoundException {
        //GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));
        User expected = testUser;

        //WHEN
        User actual = userService.deleteUserById(userId);

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void testDeleteUserById_shouldThrowUserNotFoundException_whenUserNotFound() {
        //GIVEN
        when(userRepo.findById("Non existing ID")).thenReturn(Optional.empty());

        //WHEN & THEN
        assertThrows(UserNotFoundException.class, () -> userService.deleteUserById("Non existing ID"));
    }

    @Test
    void testGetAllColorRoomSets_shouldReturnListOfColorRoomSet_whenCalledWithUserId() throws UserNotFoundException {
        //GIVEN
        when(userRepo.findById(testUser.getUserId())).thenReturn(Optional.of(testUser));
        List<ColorRoomSet> expected = List.of(
                new ColorRoomSet(colorRoomSetId, new Room(roomId, roomName), colorPalette));

        //WHEN
        List<ColorRoomSet> actual = userService.getAllColorRoomSets(testUser.getUserId());

        //THEN
        verify(userRepo).findById(testUser.getUserId());
        assertEquals(expected, actual);
    }

    @Test
    void testGetAllColorRoomSets_shouldThrowUserNotFoundException_whenUserNotFound() {
        // GIVEN
        when(userRepo.findById("Non existing ID")).thenReturn(Optional.empty());

        // WHEN & THEN
        assertThrows(UserNotFoundException.class, () -> userService.getAllColorRoomSets("Non existing ID"));
    }

    @Test
    void testGetColorRoomSetById_shouldReturnColorRoomSet_whenCalledWithUserIdAndColorRoomSetId() throws UserNotFoundException, ColorRoomSetNotFoundException {
        // GIVEN
        when(userRepo.findById(testUser.getUserId())).thenReturn(Optional.of(testUser));
        ColorRoomSet expected = colorRoomSet;

        // WHEN
        ColorRoomSet actual = userService.getColorRoomSetById(testUser.getUserId(), colorRoomSet.getColorRoomSetId());

        // THEN
        verify(userRepo).findById(testUser.getUserId());
        assertEquals(expected, actual);
    }

    @Test
    void testGetColorRoomSetById_shouldThrowUserNotFoundException_whenUserNotFound() {
        // GIVEN
        when(userRepo.findById("Non existing ID")).thenReturn(Optional.empty());

        // WHEN & THEN
        assertThrows(UserNotFoundException.class, () -> userService.getUserById("Non existing ID"));
    }

    @Test
    void testGetColorRoomSetById_shouldThrowColorRoomSetException_whenColorRoomSetNotFound() {
        // GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));

        // WHEN & THEN
        assertThrows(ColorRoomSetNotFoundException.class, () -> userService.getColorRoomSetById(userId, "Non existing ID"));
    }

    @Test
    void testSaveNewColorRoomSet_shouldReturnSavedColorRoomSet_whenNewColoRoomSet() throws UserNotFoundException {
        // GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));
        ColorPalette newColorPalette = new ColorPalette(new int[][]{{2, 2, 2}, {2, 2, 2}, {2, 2, 2}});
        ColorRoomSetDto colorRoomSetDTO = new ColorRoomSetDto(room, newColorPalette);
        when(idService.randomId()).thenReturn("test-id");

        // WHEN
        User actual = userService.saveNewColorRoomSet(colorRoomSetDTO, userId);

        // THEN
        assertEquals(2, actual.getColorRoomSets().size());
    }

    @Test
    void testSaveNewColorRoomSet_shouldThrowUserNotFoundException_whenUserNotFound() {
        // GIVEN
        when(userRepo.findById("Non existing ID")).thenReturn(Optional.empty());

        // WHEN & THEN
        assertThrows(UserNotFoundException.class, () -> userService.saveNewColorRoomSet(colorRoomSetDTO, "Non existing ID"));
    }

    @Test
    void testUpdateRoomName_shouldUpdateRoomName_whenColorRoomSetExists() throws UserNotFoundException, ColorRoomSetNotFoundException {
        //GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));
        String newRoomName = "new name";

        //WHEN
        User updatedUser = userService.updateRoomName(userId, colorRoomSetId, newRoomName);
        String actual = updatedUser.getColorRoomSets().getFirst().getRoom().getRoomName();

        //THEN
        assertEquals(newRoomName, actual);
    }

    @Test
    void testUpdateRoomName_shouldThrowColorRoomSetException_whenColorRoomSetNotFound() {
        // GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));

        // WHEN & THEN
        assertThrows(ColorRoomSetNotFoundException.class, () -> userService.updateRoomName(userId, "Non existing ID", roomName));
    }

    @Test
    void testUpdateRoomName_shouldThrowUserNotFoundException_whenUserNotFound() {
        // GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.empty());

        // WHEN & THEN
        assertThrows(UserNotFoundException.class, () -> userService.updateRoomName(userId, colorRoomSetId, roomName));
    }

    @Test
    void testUpdateColorPalette_shouldUpdateColorPalette_whenColorRoomSetExists() throws UserNotFoundException, ColorRoomSetNotFoundException {
        // Given
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));
        ColorPalette newColorPalette = new ColorPalette(new int[][]{{2, 2, 2}, {2, 2, 2}, {2, 2, 2}});

        // When
        User updatedUser = userService.updateColorPalette(userId, colorRoomSetId, newColorPalette);
        ColorPalette actual = updatedUser.getColorRoomSets().getFirst().getSavedColors();

        // Then
        assertEquals(newColorPalette, actual);
    }

    @Test
    void testUpdateColorPalette_shouldThrowColorRoomSetException_whenColorRoomSetNotFound() {
        // GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));

        // WHEN & THEN
        assertThrows(ColorRoomSetNotFoundException.class, () -> userService.updateColorPalette(userId, "Non existing ID", colorPalette));
    }

    @Test
    void testUpdateColorPalette_shouldThrowUserNotFoundException_whenUserNotFound() {
        // GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.empty());

        // WHEN & THEN
        assertThrows(UserNotFoundException.class, () -> userService.updateColorPalette(userId, colorRoomSetId, colorPalette));
    }

    @Test
    void testDeleteColorRoomSetById_shouldDeleteColorRoomSet_whenColorRoomSetExists() throws UserNotFoundException, ColorRoomSetNotFoundException {
        // Given
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));

        // When
        userService.deleteColorRoomSetById(userId, colorRoomSetId);
        User updatedUser = userService.getUserById(userId);
        int actual = updatedUser.getColorRoomSets().size();

        // Then
        assertEquals(0, actual);
    }

    @Test
    void testDeleteColorRoomSetById_shouldThrowUserNotFoundException_whenUserNotFound() {
        // GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.empty());

        // WHEN & THEN
        assertThrows(UserNotFoundException.class, () -> userService.deleteColorRoomSetById(userId, colorRoomSetId));
    }

    @Test
    void testDeleteColorRoomSetById_shouldThrowColorRoomSetException_whenColorRoomSetNotFound() {
        // GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));

        // WHEN & THEN
        assertThrows(ColorRoomSetNotFoundException.class, () -> userService.deleteColorRoomSetById(userId, "Non existing ID"));
    }
}
