package nilsot1.backend.service;

import nilsot1.backend.exception.UserNotFoundException;
import nilsot1.backend.model.ColorPalette;
import nilsot1.backend.model.ColorRoomSet;
import nilsot1.backend.model.Room;
import nilsot1.backend.model.User;
import nilsot1.backend.repository.UserRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class ColorRoomSetServiceTest {

    UserRepo userRepo = mock(UserRepo.class);

    ColorRoomSetService colorRoomSetService = new ColorRoomSetService(userRepo);

    @Test
    void testGetAllColorRoomSets_shouldReturnListOfColorRoomSet_whenCalledWithUserId() throws UserNotFoundException {
        //GIVEN
        User testUser = new User("1", "test Name", new ArrayList<>());
        when(userRepo.findById(testUser.getUserId())).thenReturn(Optional.of(testUser));

        ColorRoomSet colorRoomSet1 = new ColorRoomSet("id1", new Room("roomId1", "roomName1"), new ColorPalette());
        ColorRoomSet colorRoomSet2 = new ColorRoomSet("id2", new Room("roomId2", "roomName2"), new ColorPalette());

        testUser.setColorRoomSets(List.of(colorRoomSet1, colorRoomSet2));

        //WHEN
        List<ColorRoomSet> actual = colorRoomSetService.getAllColorRoomSets(testUser.getUserId());

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
            colorRoomSetService.getAllColorRoomSets("notExistingId");
        });

        verify(userRepo).findById("notExistingId");

    }


}