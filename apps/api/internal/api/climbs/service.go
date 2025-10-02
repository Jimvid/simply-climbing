package climbs

type ClimbService struct {
	storage *ClimbStorage
}

func NewClimbService(storage *ClimbStorage) *ClimbService {
	return &ClimbService{
		storage: storage,
	}
}

func (s *ClimbService) Create(climb ClimbModel) (ClimbModel, error) {
	climb, err := s.storage.Create(climb)
	if err != nil {
		return ClimbModel{}, err
	}
	return climb, err
}
