const mongoose = require("mongoose");


const showsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    releasedYear: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    }
})

const shows = mongoose.model("Shows", showsSchema);
module.exports = shows;