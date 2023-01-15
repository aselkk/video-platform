const { sendResponse, validateInput } = require("../index");
const { CognitoUserPool } = require("amazon-cognito-identity-js");
const { user_pool_id, client_id } = process.env;

const poolData = {
  UserPoolId: user_pool_id,
  ClientId: client_id,
};

const signUpHelper = (email, password, firstName, lastName) => {
  const UserPool = new CognitoUserPool(poolData);
  let attributeList = [
    {
      Name: "custom:first_name",
      Value: firstName,
    },
    {
      Name: "custom:last_name",
      Value: lastName,
    },
  ];

  return new Promise((resolve, reject) => {
    UserPool.signUp(email, password, attributeList, [], (err, data) => {
      if (err) {
        console.error(err);
        resolve({ status: err.code, message: err.message });
      }
      resolve({
        status: 201,
        message: "Please, check your email.",
      });
    });
  });
};

module.exports.handler = async (event) => {
	try {
		const isValid = validateInput(event.body);
		if (!isValid) return sendResponse(400, { message: "Invalid input" });

		const { email, password, first_name, last_name } = JSON.parse(event.body);
		const response = await signUpHelper(email, password, first_name, last_name);
		return sendResponse(200, {
			message: response.message,
		});
	} catch (error) {
		const message = error.message ? error.message : "Internal server error";
		return sendResponse(500, { message });
	}
};