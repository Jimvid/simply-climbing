package main

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/chi"
	"github.com/jimvid/simply-climbing/internal/router"
)

var chiLambda *chiadapter.ChiLambda

func handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return chiLambda.ProxyWithContext(ctx, req)
}

func init() {
	router := router.NewRouter()
	chiLambda = chiadapter.New(router)
}

func main() {
	lambda.Start(handler)
}
