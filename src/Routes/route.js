const express = require("express")
const battingController = require("../Controllers/user")
const commnMid = require("../Middleware/Auth")
const Router = express.Router()

const multer = require("multer")
const fs = require("fs")
const path = require("path")

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        if(!fs.existsSync("public")){
            fs.mkdirSync("public")
        }
        if(!fs.existsSync('public/videos')){
            fs.mkdirSync('public/videos')
        }
        cb(null, "public/videos")
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        let ext = path.extname(file.originalname)
        if(ext !== '.mkv' && ext !== '.mp4'){
            return cb(new Error("only videos are allowed"))
        }
        cb(null, true)
    }
})

Router.post("/user", battingController.createUser)
Router.post("/userlogin", battingController.userLogin)
Router.post("/:userId/bow_batPost",commnMid.jwtValidation,commnMid.authorization, battingController.bow_bat)
Router.post("/:userId/batting",commnMid.jwtValidation,commnMid.authorization, battingController.createBattings)
Router.post("/:userId/bowling",commnMid.jwtValidation,commnMid.authorization, battingController.createBowlings)
Router.post("/:userId/wicket",commnMid.jwtValidation,commnMid.authorization, battingController.createWickets)
Router.post("/:userId/postBowlings",commnMid.jwtValidation,commnMid.authorization, battingController.postBowlings)
Router.get("/:userId/getBowlings",commnMid.jwtValidation,commnMid.authorization,battingController.getBowlings)
Router.post("/:userId/postBattings",commnMid.jwtValidation,commnMid.authorization, battingController.postBattings)
Router.get("/:userId/getBattings",commnMid.jwtValidation,commnMid.authorization,battingController.getBattings)
Router.post("/:userId/videoUpload",commnMid.jwtValidation,commnMid.authorization,upload.fields({name: "videos",maxCount: 5}), battingController.videoCreate)


//************ checking your end point valid or not */
Router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct or Not!"
    })
})

module.exports = Router


