package nilsot1.backend.service;

import lombok.RequiredArgsConstructor;
import nilsot1.backend.repository.ColorRoomSetRepo;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ColorRoomSetService {

    private final ColorRoomSetRepo repo;


}
