package climbs

import (
	"log/slog"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/google/uuid"
	"github.com/jimvid/simply-climbing/config"
)

type ClimbStorage struct {
	db  *dynamodb.DynamoDB
	cfg *config.Config
}

func NewClimbStorage(db *dynamodb.DynamoDB, cfg *config.Config) *ClimbStorage {
	return &ClimbStorage{
		db:  db,
		cfg: cfg,
	}
}

func (c *ClimbStorage) Create(climb ClimbModel) (ClimbModel, error) {
	climb.ID = uuid.New().String()
	climb.CreatedAt = time.Now().Unix()
	climb.UpdatedAt = time.Now().Unix()

	attributeValue, err := dynamodbattribute.MarshalMap(climb)
	if err != nil {
		slog.Error("Failed to marshal climb", "error", err)
		return ClimbModel{}, err
	}

	input := &dynamodb.PutItemInput{
		TableName: aws.String(c.cfg.TABLE_NAME),
		Item:      attributeValue,
	}

	slog.Debug("Writing to DynamoDB", "table", c.cfg.TABLE_NAME, "climbId", climb.ID)
	_, err = c.db.PutItem(input)
	if err != nil {
		slog.Error("DynamoDB PutItem failed", "error", err, "table", c.cfg.TABLE_NAME)
		return ClimbModel{}, err
	}

	return climb, nil
}
