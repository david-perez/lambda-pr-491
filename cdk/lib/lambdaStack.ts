import { Construct } from "constructs";
import { Stack, aws_lambda, Duration } from "aws-cdk-lib";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as apigwv2 from "@aws-cdk/aws-apigatewayv2-alpha";
import * as aws_apigateway from "aws-cdk-lib/aws-apigateway";

export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const bootstrapLocation = `${__dirname}/../../rust/target/cdk/release`;
        const entryId = "main";
        const lambda = new aws_lambda.Function(this, entryId, {
            functionName: `${id}-${entryId}`,
            runtime: aws_lambda.Runtime.PROVIDED_AL2,
            // This value has no effect since we're bringing with us a custom
            // runtime
            // (https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html)
            // that just makes the Lambda execute a binary.
            handler: "irrelevant",
            code: aws_lambda.Code.fromAsset(bootstrapLocation),
            memorySize: 128,
            timeout: Duration.seconds(5),
        });

        new aws_apigateway.LambdaRestApi(this, 'RestApi', {
            handler: lambda,
            proxy: true
        });

        const httpApi = new apigwv2.HttpApi(this, "HttpApi");
        httpApi.addRoutes({
            path: "/prod/hello",
            methods: [apigwv2.HttpMethod.GET],
            integration: new HttpLambdaIntegration(
                "HttpLambdaIntegration",
                lambda
            ),
        });
    }
}
