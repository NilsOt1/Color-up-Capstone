package nilsot1.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRoomSetRepo extends MongoRepository<ColorRoomSet, String> {
}
