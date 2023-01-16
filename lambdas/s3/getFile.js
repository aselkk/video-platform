const { sendResponse } = require('../index');
const S3 = require('../s3/s3');

const {bucket_name} = process.env;

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.fileName) {
        // failed without an fileName
        return sendResponse(400, { message: 'missing the fileName from the path' });
    }

    let fileName = event.pathParameters.fileName;

    const file = await S3.get(fileName, bucket_name).catch(err => {
        console.log('error in S3 get', err);
        return null;
    });

    if (!file) {
        return sendResponse(400, { message: 'Failed to read data by filename' });
    }

    return sendResponse(200, { file });
};