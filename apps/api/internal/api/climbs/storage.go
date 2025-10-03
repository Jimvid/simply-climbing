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
	climb.PK = "USER#" + climb.UserId
	climb.SK = "CLIMB#" + time.Now().Format("2006-01-02T15:04:05.000Z") + "#" + climb.ID
	climb.EntityType = "CLIMB"

	attributeValue, err := dynamodbattribute.MarshalMap(climb)
	if err != nil {
		slog.Error("Failed to marshal climb", "error", err)
		return ClimbModel{}, err
	}

	input := &dynamodb.PutItemInput{
		TableName: aws.String(c.cfg.TABLE_NAME),
		Item:      attributeValue,
	}

	slog.Debug("Writing to DynamoDB", "table", c.cfg.TABLE_NAME, "PK", climb.PK, "SK", climb.SK)
	_, err = c.db.PutItem(input)
	if err != nil {
		slog.Error("DynamoDB PutItem failed", "error", err, "table", c.cfg.TABLE_NAME)
		return ClimbModel{}, err
	}

	return climb, nil
}

func (c *ClimbStorage) GetAll(userId string) ([]ClimbModel, error) {
	var climbs []ClimbModel

	input := &dynamodb.QueryInput{
		TableName:              aws.String(c.cfg.TABLE_NAME),
		KeyConditionExpression: aws.String("PK = :pk AND begins_with(SK, :sk)"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":pk": {S: aws.String("USER#" + userId)},
			":sk": {S: aws.String("CLIMB#")},
		},
	}

	result, err := c.db.Query(input)
	if err != nil {
		slog.Error("DynamoDB Query failed", "error", err, "userId", userId)
		return climbs, err
	}

	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &climbs)
	if err != nil {
		slog.Error("Failed to unmarshal climbs", "error", err)
		return climbs, err
	}

	return climbs, nil
}
