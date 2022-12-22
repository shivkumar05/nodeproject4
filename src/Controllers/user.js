const express = require("express")
const battingModel = require("../Models/battingModel")
const bowlingModel = require("../Models/bowlingModel")
const wicketModel = require("../Models/wicketModel")
const filterBowling = require("../Models/filterBowling")
const filterBatting = require("../Models/filterBatting")
const bow_batModel = require("../Models/bow_batModel")
const userModel = require("../Models/userModel")
const videoModel = require("../Models/videoUpload")
const upload = require("express-fileupload")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const app = express()

app.use(upload());

const createUser = async function (req, res) {
    try {
        let data = req.body;
        let { name, phone, join_as, signup_as, email, password } = data

        if (await userModel.findOne({ phone: phone }))
            return res.status(400).send({ message: "Phone already exist" })

        if (await userModel.findOne({ email: email }))
            return res.status(400).send({ message: "Email already exist" })

        const encryptedPassword = bcrypt.hashSync(password, 12)
        req.body['password'] = encryptedPassword;

        let savedData = await userModel.create(data)
        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

const userLogin = async function (req, res) {
    try {
        let data = req.body
        let { email, password } = data

        let user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(400).send({
                status: false,
                msg: "Email and Password is Invalid"
            })
        }

        let compared = await bcrypt.compare(password, user.password)
        if (!compared) {
            return res.status(400).send({
                status: false,
                message: "Your password is invalid"
            })
        }

        let token = jwt.sign({
            userId: user._id,
        }, "project",

        )
        return res.status(200).send({
            status: true,
            msg: "User login successfull",
            data: {
                userId: user._id,
                name: user.name,
                phone: user.phone,
                join_as: user.join_as,
                signup_as: user.signup_as,
                email: user.email,
                password: user.password,
                token: token
            }
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

const createBattings = async function (req, res) {
    try {
        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create batting"
            })
        }
        const battingCreated = await battingModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Battings created successfully",
            data: battingCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

// ========================================================================================

const createBowlings = async function (req, res) {
    try {

        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create Bowlings"
            })
        }
        const bowlingCreated = await bowlingModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Bowling created successfully",
            data: bowlingCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}
// ==============================================================================
const createWickets = async function (req, res) {
    try {

        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create Wickets"
            })
        }
        const wicketCreated = await wicketModel.create(data)
        return res.status(201).send({
            status: true,
            message: "Wicket created successfully",
            data: wicketCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}
//=============================================================================

const postBowlings = async function (req, res) {
    let data = req.body;

    const filterBow = await filterBowling.create(data)
    return res.status(201).send({
        status: true,
        message: "filterbowling created successfully",
        data: filterBow
    })
}

const getBowlings = async function (req, res) {
    let body = req.query
    const getBow = await filterBowling.find(body)
    return res.status(200).send({
        status: true,
        message: 'Success',
        data: getBow
    })
}
//========================================================================


const postBattings = async function (req, res) {
    let data = req.body;

    const filterBat = await filterBatting.create(data)
    return res.status(201).send({
        status: true,
        message: "filterbatting created successfully",
        data: filterBat
    })
}

const getBattings = async function (req, res) {
    let body = req.query
    const getBat = await filterBatting.find(body)
    return res.status(200).send({
        status: true,
        message: 'Success',
        data: getBat
    })
}

const bow_bat = async function (req, res) {
    try {
        let data = req.body;
        // console.log(data)
        data = JSON.parse(JSON.stringify(data))

        const actionCreated = await bow_batModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Success",
            data: actionCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

const videoCreate = async function (req, res) {
    try {
        const { name } = req.body;
        let videosPaths = [];

        if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
            for (let video of req.files.videos) {
                videosPaths.push('/' + video.path);
            }
        }
        const createVideo = await videoModel.create({ name, videos: videosPaths })
        return res.status(201).send({
            status: true,
            message: "video created successfully",
            data: createVideo
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

module.exports = { createUser, userLogin, createBattings, createBowlings, createWickets, postBowlings, getBowlings, postBattings, getBattings, bow_bat, videoCreate }