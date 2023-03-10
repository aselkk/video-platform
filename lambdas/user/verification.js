const AWS = require("aws-sdk");
const { sendResponse } = require("../index");
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
	const { email, code } = JSON.parse(event.body);
	const { client_id } = process.env
	const params = {
			ClientId: client_id,
			Username: email,
			ConfirmationCode: code,
	};
	try {
		await cognito.confirmSignUp(params, (err) => {
			if (err) {
				return sendResponse(400, { message: "code is invalid" });
			}
		});
		return sendResponse(200, { message: "success", params });
	} catch (error) {
		return sendResponse(500, { message: 'params', params });
  }
};