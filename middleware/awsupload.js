// const s3 = require('../config/aws')
// const fs = require('fs')

// const AWSupload = (req, res, next) => {
//     const file = fs.readFileSync(req.file?.path) 
//     s3.upload({
//         Bucket: process.env.S3_BUCKET,
//         Key: req.file.filename,
//         Body: file,
//     }, (err, data) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(data.Location)
//             req.locals.location = data.Location
//             next()
//         }
//     })
// }

// module.exports = AWSupload