const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    region: 'us-east-1',
		signatureVersion: 'v4',
});
const {bucket_name} = process.env;
const parseMultipart = require('parse-multipart');


exports.handler = async (event) => {
	try {
    const { filename, data } = extractFile(event)
    await s3.putObject({ Bucket: bucket_name, Key: filename, ACL: 'public-read', Body: data }).promise();
		
    return {
      statusCode: 200,
      body: JSON.stringify({ link: `https://${bucket_name}.s3.amazonaws.com/${filename}` })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.stack, headers: event.headers })
    }
  }
}
function extractFile(event) {
  const boundary = parseMultipart.getBoundary(event.headers['Content-Type'])
  const parts = parseMultipart.Parse(Buffer.from(event.body, 'base64'), boundary);
  const [{ filename, data }] = parts

  return {
    filename,
    data
  }
}