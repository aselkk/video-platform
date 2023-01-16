const { sendResponse } = require('../index');
const S3 = require('../s3/s3');

const {bucket_name} = process.env;

exports.handler = async event => {
	console.log('event', event);

	if (!event.pathParameters || !event.pathParameters.fileName) {
		return sendResponse(400, { message: 'missing the fileName from the path' });
	}

	let fileName = event.pathParameters.fileName;
	const data = JSON.parse(event.body);

	const newData = await S3.write(data, fileName, bucket_name).catch(err => {
		console.log('error in S3 write', err);
		return null;
	});

	if (!newData) {
		return sendResponse(400, { message: 'Failed to write data by filename' });
	}

	return sendResponse(200, { newData });
};