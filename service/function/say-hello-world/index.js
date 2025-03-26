// Lambda function that calls the HelloWorldFunction
const AWS = require('aws-sdk');

exports.handler = async (event) => {
    console.log('CallerFunction received event:', JSON.stringify(event, null, 2));

    // Configure Lambda client
    // For local development with SAM Local
    const lambda = new AWS.Lambda({
        endpoint: 'http://lambda.local:3001',
        region: process.env.AWS_DEFAULT_REGION || 'eu-central-1'
    });

    try {
        // Invoke the HelloWorldFunction
        const params = {
            FunctionName: `${process.env.ENVIRONMENT || 'local'}-function-HelloWorldFunction`,
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(event)
        };

        console.log('Invoking HelloWorldFunction with params:', JSON.stringify(params, null, 2));

        const response = await lambda.invoke(params).promise();

        console.log('HelloWorldFunction response:', JSON.stringify(response, null, 2));

        // Parse the payload from the response
        const payload = JSON.parse(response.Payload);

        // Extract and return just the message
        const result = JSON.parse(payload.body);

        return {
            statusCode: 200,
            body: JSON.stringify({
                originalMessage: result.message,
                callerInfo: "This response was forwarded by the caller function"
            })
        };
    } catch (error) {
        console.error('Error invoking HelloWorldFunction:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error calling HelloWorldFunction",
                error: error.message
            })
        };
    }
};