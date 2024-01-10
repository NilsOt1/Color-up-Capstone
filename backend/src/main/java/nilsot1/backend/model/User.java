package nilsot1.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    String userId;
    String userName;
    ColorRoomSet[] colorRoomSets;
}
