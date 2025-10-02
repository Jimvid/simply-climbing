package climbs

type ClimbModel struct {
	ID                  string `json:"id" dynamodb:"id"`
	UserId              string `json:"userId" dynamodb:"userId"`
	Grade               string `json:"grade" dynamodb:"grade"`
	PrecievedDifficulty string `json:"precievedDifficulty" dynamodb:"precievedDifficulty"`
	TypeOfClimb         string `json:"typeOfClimb" dynamodb:"typeOfClimb"`
	GradeSystem         string `json:"gradeSystem" dynamodb:"gradeSystem"`
	CreatedAt           int64  `json:"createdAt" dynamodb:"createdAt"`
	UpdatedAt           int64  `json:"updatedAt" dynamodb:"updatedAt"`
}
