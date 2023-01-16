const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient();
const { table_name } = process.env;
const headers = {
    "content-type": "application/json",
};

module.exports.handler = async () => {
    const output = await docClient
        .scan({
            TableName: table_name,
        })
        .promise();

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(output.Items),
    };
};