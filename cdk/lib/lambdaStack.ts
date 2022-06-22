import { Construct } from "constructs";
import { Stack, aws_lambda, Duration } from "aws-cdk-lib";

export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const bootstrapLocation = `${__dirname}/../../rust/target/cdk/release`;
        const entryId = "main";
        new aws_lambda.Function(this, entryId, {
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
    }
}