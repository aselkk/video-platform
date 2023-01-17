const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    region: 'us-east-1',
		signatureVersion: 'v4',
});
const {bucket_name} = process.env;

exports.handler = async (event) => {
	const randomID = parseInt(Math.random() * 10000000);
	const Key = `${randomID}.mp4`;
	const Bucket = bucket_name;
	const Expires = 300;

	const s3Url = await s3.getSignedUrlPromise('putObject', {
			Bucket,
			Key,
			Expires,
			ContentType: 'video/mp4',
			ACL: 'public-read'
	});
	
	return {
			statusCode: 200,
			body: JSON.stringify({uploadURL: s3Url, Key}),
			headers: {
				'Content-Type': 'application/json'
			}
	};
}