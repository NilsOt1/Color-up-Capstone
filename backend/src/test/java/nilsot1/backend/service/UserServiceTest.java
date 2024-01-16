package nilsot1.backend.service;

import nilsot1.backend.exception.ColorRoomSetNotFoundException;
import nilsot1.backend.exception.UserNotFoundException;
import nilsot1.backend.model.*;
import nilsot1.backend.repository.UserRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    UserRepo userRepo = mock(UserRepo.class);

    IdService idService = mock(IdService.class);

    UserService userService = new UserService(userRepo, idService);

    @Test
    void testGetAllColorRoomSets_shouldReturnListOfColorRoomSet_whenCalledWithUserId() throws UserNotFoundException {
        //GIVEN
        User testUser = new User("1", "test Name", new ArrayList<>());
        when(userRepo.findById(testUser.getUserId())).thenReturn(Optional.of(testUser));

        ColorRoomSet colorRoomSet1 = new ColorRoomSet("id1", new Room("roomId1", "roomName1"), new ColorPalette());
        ColorRoomSet colorRoomSet2 = new ColorRoomSet("id2", new Room("roomId2", "roomName2"), new ColorPalette());

        testUser.setColorRoomSets(List.of(colorRoomSet1, colorRoomSet2));

        //WHEN
        List<ColorRoomSet> actual = userService.getAllColorRoomSets(testUser.getUserId());

        //THEN
        List<ColorRoomSet> expected = Arrays.asList(
                new ColorRoomSet("id1", new Room("roomId1", "roomName1"), new ColorPalette()),
                new ColorRoomSet("id2", new Room("roomId2", "roomName2"), new ColorPalette())
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

        verify(userRepo).findById("notExistingId");
    }

    @Test
    void testGetColorRoomSetById_shouldReturnColorRoomSet_whenCalledWithUserIdAndColorRoomSetId() throws UserNotFoundException, ColorRoomSetNotFoundException {
        // GIVEN
        User testUser = new User("1", "test Name", new ArrayList<>());
        when(userRepo.findById(testUser.getUserId())).thenReturn(Optional.of(testUser));

        ColorRoomSet colorRoomSet1 = new ColorRoomSet("id1", new Room("roomId1", "roomName1"), new ColorPalette());
        ColorRoomSet colorRoomSet2 = new ColorRoomSet("id2", new Room("roomId2", "roomName2"), new ColorPalette());

        testUser.setColorRoomSets(List.of(colorRoomSet1, colorRoomSet2));

        // WHEN
        ColorRoomSet actual = userService.getColorRoomSetById(testUser.getUserId(), colorRoomSet1.getColorRoomSetId());

        // THEN
        ColorRoomSet expected = new ColorRoomSet("id1", new Room("roomId1", "roomName1"), new ColorPalette());

        verify(userRepo).findById(testUser.getUserId());
        assertEquals(expected, actual);
    }

    @Test
    void testUpdateColorPalette_shouldUpdateColorPalette_whenColorRoomSetExists() throws UserNotFoundException {
        // GIVEN
        String userId = "1";
        String userId2 = "2";

        String colorRoomSetId = "test-id";
        String colorRoomSetId2 = "test-id2";

        ColorPalette colorPalette1 = new ColorPalette(new int[][]{{1, 1, 1}, {1, 1, 1}});
        ColorPalette colorPalette2 = new ColorPalette(new int[][]{{2, 2, 2}, {2, 2, 2}});

        List<ColorRoomSet> existingColorRoomSets = new ArrayList<>();
        ColorRoomSet existingColorRoomSet = new ColorRoomSet(colorRoomSetId, new Room("roomId1", "roomName1"), colorPalette1);
        existingColorRoomSets.add(existingColorRoomSet);

        List<ColorRoomSet> existingColorRoomSets2 = new ArrayList<>();
        ColorRoomSet existingColorRoomSet2 = new ColorRoomSet(colorRoomSetId2, new Room("roomId2", "roomName2"), colorPalette2);
        existingColorRoomSets2.add(existingColorRoomSet);


        User existingUser = new User(userId, "test Name", existingColorRoomSets);

        User uppdatedUser = new User(userId2, "test Name2", existingColorRoomSets2);

        when(userRepo.findById(userId)).thenReturn(Optional.of(existingUser));



        // WHEN

        userService.updateColorPalette(userId2, colorRoomSetId2, colorPalette1);

        when(userRepo.save(existingUser)).thenReturn(existingUser);

        // THEN

        verify(userRepo).findById(userId);
        verify(userRepo).save(existingUser);
        System.out.println(uppdatedUser);
        assertEquals(colorPalette1, existingUser.getColorRoomSets().get(0).getSavedColors());
    }


/*    @Test
    void testSaveNewColorRoomSet_shouldReturnSavedColorRoomSet_whenNewColoRoomSet() throws UserNotFoundException {

        // GIVEN
        User testUser = new User("1", "test Name", new ArrayList<>());
        when(userRepo.findById(testUser.getUserId())).thenReturn(Optional.of(testUser));

        ColorRoomSetDTO colorRoomSetDTO = new ColorRoomSetDTO(new Room("roomId1", "roomName1"), new ColorPalette());
        ColorRoomSet colorRoomSetToSave = new ColorRoomSet("test-id", new Room("roomId1", "roomName1"), new ColorPalette());

        when(idService.randomId()).thenReturn("test-id");

        // WHEN
        User actual = colorRoomSetService.saveNewColorRoomSet(colorRoomSetDTO, testUser.getUserId());

        // THEN
        User userToSave = colorRoomSetService.saveNewColorRoomSet(new ColorRoomSetDTO(colorRoomSetToSave), testUser.getUserId());
        verify(userRepo, times(1)).save(userToSave);
        assertEquals(1, actual.getColorRoomSets().size());
    }*/
}
