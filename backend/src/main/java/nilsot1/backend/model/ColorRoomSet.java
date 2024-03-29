package nilsot1.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColorRoomSet {
    String colorRoomSetId;
    Room room;
    ColorPalette savedColors;
}
