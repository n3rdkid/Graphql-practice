const mongoose = require("mongoose");
mongoose.connect(`YOUR MONGO STRING HERE`).then().catch(e => {
    console.log("Error")
}, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})