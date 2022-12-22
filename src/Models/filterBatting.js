const mongoose = require("mongoose")

const filterBatting = new mongoose.Schema({
    backfoot:{
        type:String,
        require:true
    },
    cover:{
        type:String,
        require:true
    },
    flickshot:{
        type:String,
        require:true
    },
    frontfoot:{
        type:String,
        require:true
    },
    leaving_ball:{
        type:String,
        require:true
    },
    on_drive:{
        type:String,
        require:true
    },
    pullshot:{
        type:String,
        require:true
    },
    square_cut:{
        type:String,
        require:true
    },
    straight:{
        type:String,
        require:true
    },
    sweepshot:{
        type:String,
        require:true
    },

    
}, { timestamps: true });

module.exports = mongoose.model("filterBatting", filterBatting)

