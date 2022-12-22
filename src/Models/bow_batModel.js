const mongoose = require("mongoose")

const bow_batSchema = new mongoose.Schema({

    batsman: {
        type: String,
        require:true
    },
    bowler: {
        type: String,
        require:true
    },
    batting_order: {
        type: String,
        require:true
    },
    handed_bowling:{
        type:String,
        require:true
    }
     
}, { timestamps: true });

module.exports = mongoose.model("bow_bat", bow_batSchema)

