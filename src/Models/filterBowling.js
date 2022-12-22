const mongoose = require("mongoose")

const filterBowling = new mongoose.Schema({
    fast_bowling:{
        type:String,
        require:true
    },
    leg_spin:{
        type:String,
        require:true
    },
    off_spin:{
        type:String,
        require:true
    },

    
}, { timestamps: true });

module.exports = mongoose.model("filterbowling", filterBowling)

