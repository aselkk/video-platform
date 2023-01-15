const { DynamoDB } = require("aws-sdk")

const db = new DynamoDB.DocumentClient()
const {table_name} = process.env

module.exports.handler = async (event) => {
	const userList = await db
		.scan({
			table_name,
		})
		.promise()

	return { statusCode: 200, body: JSON.stringify(userList) }
} 