const AWS = require('aws-sdk');
require('dotenv').config()
const path = require('path')

const s3 = new AWS.S3(
    {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ORYX,
    // region: process.env.AWS_REGION
}
)

// const AWSupload = async (filename, file) => {
//     await s3.upload({
//     Bucket: process.env.S3_BUCKET,
//     Key: filename,
//     Body: file,
//   }, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data.Location)
//     }
//   })
// }

module.exports = s3