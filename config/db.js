const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://oryxsalvucci:Sparky544@cluster0.pzkwt.mongodb.net/MERNapp?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log("MongoDB databsae connection extablished successfully")
})