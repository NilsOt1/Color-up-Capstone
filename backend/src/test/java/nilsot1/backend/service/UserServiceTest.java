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
    User testUser = new User(userId, userName, List.of(colorRoomSet));


    @Test
    void testUserNotFoundMessage_shouldReturnMessageString_whenCalledWithUserId() {
        //GIVEN & WHEN
        String actual = userService.userNotFoundMessage(userId);

        //THEN
        String expected = "User with id " + userId + " not found";
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
        when(userRepo.findById(userId)).thenReturn(Optional.ofNullable(testUser));
        //WHEN
        User actual = userService.getUserById(userId);

        //THEN
        User expected = testUser;
        assertEquals(expected, actual);
    }

    @Test
    void testGetUserById_shouldThrowUserNotFoundException_whenUserNotFound() throws UserNotFoundException {
        // GIVEN
        when(userRepo.findById("nonExistingId")).thenReturn(Optional.empty());

        // WHEN & THEN
        assertThrows(UserNotFoundException.class, () -> {
            userService.getUserById("nonExistingId");
        });
    }

    @Test
    void testCreateNewUser_shouldSaveNewUser_whenCalledWithBody() {
        //GIVEN
        when(userRepo.save(testUser)).thenReturn(testUser);
        //WHEN
        User actual = userService.createNewUser(testUser);
        //THEN
        User expected = testUser;
        assertEquals(expected, actual);
    }

    @Test
    void testCreateNewUser_shouldSaveCorrectUserData_whenCalledWithBody() {
        // Given
        when(userRepo.save(testUser)).thenReturn(testUser);

        // When
        User actual = userService.createNewUser(testUser);

        // Then
        assertEquals(testUser.getUserId(), actual.getUserId());
        assertEquals(testUser.getUserName(), actual.getUserName());
        assertEquals(testUser.getColorRoomSets(), actual.getColorRoomSets());
    }

    @Test
    void testCreateNewUser_withNullUser_shouldThrowException() {

        //WHEN & THEN
        assertThrows(IllegalArgumentException.class, () -> userService.createNewUser(null));
    }

    @Test
    void testGetAllColorRoomSets_shouldReturnListOfColorRoomSet_whenCalledWithUserId() throws UserNotFoundException {
        //GIVEN
        when(userRepo.findById(testUser.getUserId())).thenReturn(Optional.of(testUser));

        //WHEN
        List<ColorRoomSet> actual = userService.getAllColorRoomSets(testUser.getUserId());

        //THEN
        List<ColorRoomSet> expected = List.of(
                new ColorRoomSet(colorRoomSetId, new Room(roomId, roomName), colorPalette)
        );

        verify(userRepo).findById(testUser.getUserId());
        assertEquals(expected, actual);
    }






    @Test
    void testGetAllColorRoomSets_shouldThrowUserNotFoundException_whenUserNotFound() {
        // GIVEN
        when(userRepo.findById("notExistingId")).thenReturn(Optional.empty());

        // WHEN & THEN

        assertThrows(UserNotFoundException.class, () -> {
            userService.getAllColorRoomSets("notExistingId");
        });
    }

    @Test
    void testGetColorRoomSetById_shouldReturnColorRoomSet_whenCalledWithUserIdAndColorRoomSetId() throws UserNotFoundException, ColorRoomSetNotFoundException {
        // GIVEN
        when(userRepo.findById(testUser.getUserId())).thenReturn(Optional.of(testUser));

        // WHEN
        ColorRoomSet actual = userService.getColorRoomSetById(testUser.getUserId(), colorRoomSet.getColorRoomSetId());

        // THEN
        ColorRoomSet expected = colorRoomSet;

        verify(userRepo).findById(testUser.getUserId());
        assertEquals(expected, actual);
    }

    @Test
    void testUpdateColorPalette_shouldUpdateColorPalette_whenColorRoomSetExists() throws UserNotFoundException, ColorRoomSetNotFoundException, ColorRoomSetNotFoundException {
        // Given
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));
        ColorPalette newColorPalette = new ColorPalette(new int[][]{{2, 2, 2}, {2, 2, 2}, {2, 2, 2}});

        // When
        User updatedUser = userService.updateColorPalette(userId, colorRoomSetId, newColorPalette);

        ColorRoomSet updatedSet = userService.getColorRoomSetById(userId, colorRoomSetId);

        ColorPalette actual = updatedSet.getSavedColors();

        // Then

        assertEquals(newColorPalette, actual);
    }

    @Test
    void testUpdateColorPalette_shouldThrowColorRoomSetException_whenColorRoomSetNotFound() {
        // GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));
        String nonExistentColorRoomSetId = "nonexistent-id";

        // WHEN & THEN
        assertThrows(ColorRoomSetNotFoundException.class, () -> userService.updateColorPalette(userId, nonExistentColorRoomSetId, colorPalette));
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
    void testSaveNewColorRoomSet_shouldReturnSavedColorRoomSet_whenNewColoRoomSet() throws UserNotFoundException {

        // GIVEN
        when(userRepo.findById(userId)).thenReturn(Optional.of(testUser));

        ColorPalette newColorPalette = new ColorPalette(new int[][]{{2, 2, 2}, {2, 2, 2}, {2, 2, 2}});

        ColorRoomSetDTO colorRoomSetDTO = new ColorRoomSetDTO(room, newColorPalette);

        when(idService.randomId()).thenReturn("test-id");

        // WHEN
        User actual = userService.saveNewColorRoomSet(colorRoomSetDTO, userId);

        // THEN
        assertEquals(2, actual.getColorRoomSets().size());
    }

}
