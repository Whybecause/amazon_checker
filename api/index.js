require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');

const campaignRoutes = require('./routes/campaign.route');
const uriRoutes = require('./routes/uri.route');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use("/api", campaignRoutes);
app.use("/api", uriRoutes);

mongoose.connect(process.env.MONGO_URI,
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true 
    }
)

axios.get('https://amazon.fr/Staedtler-plastic-plastique-phtalate-52650/dp/B0007OEE7E/ref=sr_1_5?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=staedtler&qid=1600723282&sr=8-5')
.then( (response) => {
    console.log(response);
})
.catch( (error) => {
    console.log(error);
})

mongoose.connection.on('open', () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
})