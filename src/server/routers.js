const express = require('express')
const path = require('path')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../database/models/user')
const auth = require('../database/middleware/auth')
const router = new express.Router()
require('../database/mongoose')

process.on('uncaughtException', (err, origin) => {
    //mail.send("me",{err,origin})
    console.log(err)
    process.exit(1)
});

router.get('/ping', function (req, res) {
    return res.send('pong');
});

router.post('/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        const found = await User.findOne({ $or: [{ name: req.body.name }, { email: req.body.email }] })
        if (found)
            return res.send('./transferPage.html?msg=Same user-name or email already exist!')

        await user.save()
        //sendWelcomeEmail(user.email, user.name)
        //const token = await user.generateAuthToken()
        //res.status(201).send({ user, token })
        res.status(201).send('./transferPage.html?msg=Signup complete succeefuly!!!')

    } catch (e) {
        console.log(e.message)
        return res.status(400).send('password too short or email invalid!')
    }
})

router.post('/login', async (req, res) => {
    console.log("trying login")
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        console.log(user)
        const token = await user.generateAuthToken()
        res.cookie('JudaAuthToken', token)
        res.redirect("game-lobby.html")
    } catch (e) {
        res.status(400).send('login failed!');//redirect('/')
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

router.get('*', async (req, res) => {
    return res.redirect('/')
})

router.get(/html$/, async (req, res) => {
    res.redirect('/')
})




module.exports = router