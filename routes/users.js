const mongoose = require('mongoose');
const multer = require('multer');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');
const upload = require('../middleware/multer');
const s3 = require('../config/aws')
const fs = require('fs')

router.get('/protected', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = await User.findOne({username: req.user.username})
    const userfiles = user.files
    
    res.status(200).json({ success: true, msg: 'You are authorized!', userData: {username: user.username, files: userfiles} })
});

router.post('/upload', upload.single('file'), passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    console.log(req.file)
    console.log(req.user)
    const file = fs.readFileSync(req.file.path)
    try {
        const locationdata = await s3.upload({
            Bucket: "cyclic-wild-bedclothes-wasp-ap-northeast-1",
            Key: req.file.filename,
            Body: file,
        }).promise()

        const user = await User.findOne({username: req.user.username})
           await user.files.push({
                filename: req.file.filename,
                mimetype: req.file.mimetype,
                location: locationdata.Location,
                size: req.file.size
            })

            const updatedUser = await user.save()
            fs.unlink(req.file.path, err => console.log(err))
            res.json({username: updatedUser.username, token: req.headers.token, files: updatedUser.files})

            
    } catch (err) {
        console.log(err)
        res.json(err)
    }


})

router.post('/login', function(req, res, next){
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                res.status(401).json({ success: false, msg: "Could not find user"})
            }

            const isValid = utils.validPassword(req.body.password, user.hash, user.salt)

            if (isValid) {
                const tokenObject = utils.issueJWT(user)
                res.status(200).json({ success: true, user: {username: user.username, token: tokenObject.token, files: user.files} })
            } else {
                res.status(401).json({ success: false, msg: 'You entered the wrong password'})
            }
        })
        
        .catch((err) => {
            next(err)
        })
});

router.post('/register', async function(req, res, next){
    let userExist = await User.findOne({username: req.body.username})

    if (userExist?.username === req.body.username) {
        res.status(400).json({message: 'username already exists'})
    } else {
        const saltHash = utils.genPassword(req.body.password)

        const salt = saltHash.salt
        const hash = saltHash.hash

        const newUser = new User({
            username: req.body.username,
            hash: hash,
            salt: salt,
        })

        newUser.save()
            .then((user) => {
                const jwt = utils.issueJWT(user)
                res.json({ success: true, user: {username: user.username, token: jwt.token, files: user.files }})
                console.log(user, jwt.token)
            })
            .catch(err => next(err))
    }
});

module.exports = router;