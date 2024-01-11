package nilsot1.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("User")
public class User {

    @Id
    String userId;
    String userName;
    List<ColorRoomSet> colorRoomSets;
    }
