import express from 'express'
import brcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

//@route    POST /api/v1/users/signup
//@desc     user sign up
//@body     firstName, lastName, email, password
//@access   Public
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        let user = await User.findOne({ email }).lean()

        if (user) {
            return res.status(422).json({ status: 'fail', message: 'Email already in use' })
        }

        const encryptedPassword = await brcrypt.hash(password, 10)

        user = new User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.status(200).json({ status: 'success', message: 'signup was successful', data: { token, firstName: user.firstName, id: user._id } })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Something went wrong with the server' })
    }
})

//@route    POST /api/v1/users/login
//@desc     user login
//@body     email, password
//@access   Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }).lean()

        if (!user) {
            return res.status(422).json({ status: 'fail', message: 'Invalid Credentials' })
        }

        const doPasswordsMatch = await brcrypt.compare(password, user.password)
        if (!doPasswordsMatch) {
            return res.status(422).json({ status: 'fail', message: 'Invalid Credentials' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.status(200).json({ status: 'success', message: 'login was successful', data: { token, firstName: user.firstName, id: user._id } })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Something went wrong with the server' })
    }
})

export default router