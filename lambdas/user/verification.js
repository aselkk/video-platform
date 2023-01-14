const AWS = require("aws-sdk");
const { sendResponse } = require("../index");
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
	try {
		const { email, code } = JSON.parse(event.body);
		const { client_id } = process.env;
		const params = {
			ClientId: client_id,
			Username: email,
			ConfirmationCode: code,
		};
		await cognito.confirmSignUp(params, (err) => {
			returnData = (200, { message: "your email verified successfull" });
			if (err) {
				returnData = (400, { message: "code is invalid" });
			}
			return returnData;
		});
		return sendResponse(200, { message: 'Success' });
	} catch (error) {
		return sendResponse(500, { message: 'Fail' });
	}
};