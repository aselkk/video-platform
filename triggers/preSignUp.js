const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event, context, callback) => {
	const { table_name } = process.env;
	const { userAttributes } = event.request;
	const params = {
		Item: {
			email: userAttributes.email,
			firstName: userAttributes["custom:first_name"],
			lastName: userAttributes["custom:last_name"],
			role: 'student',
			uploads: []
		},
		TableName: table_name,
	};
	await dynamoDB.put(params).promise();
	callback(null, event);
};
