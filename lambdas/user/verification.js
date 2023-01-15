const AWS = require("aws-sdk");
const { sendResponse } = require("../index");
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
	try {
		const { email, code } = JSON.parse(event.body);
		const {client_id} = process.env
		const params = {
				ClientId: client_id,
				Username: email,
				ConfirmationCode: code,
		};
		const response = await cognito.confirmSignUp(params, (err) => {
				if (err) {
					return sendResponse(400, { message: "code is invalid" });
				}
		});
		return sendResponse(200, { message: "success" });
	} catch (error) {
		const message = error.message ? error.message : "Internal server error";
		return sendResponse(500, { message });
    }
};