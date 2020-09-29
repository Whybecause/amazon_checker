require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const campaignRoutes = require('./routes/campaign.route');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use("/api", campaignRoutes);

mongoose.connect(process.env.MONGO_URI,
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true 
    }
)

mongoose.connection.on('open', () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
})

   







