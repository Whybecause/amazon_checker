require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const ip = process.env.IP || '0.0.0.0';
const PORT = process.env.PORT || 8080;

const userRoutes = require('./routes/user.route');
const campaignRoutes = require('./routes/campaign.route');
const buyboxRoutes = require('./routes/buybox.route');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use("/api", userRoutes);
app.use("/api", campaignRoutes);
app.use("/api", buyboxRoutes);

mongoose.connect(process.env.MONGO_URI,
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
)
.then(() => console.log('Connexion Mongodb réussie!'))
.catch(() => console.log('Connexion Mongodb échouée!'))

// Pour AWS
const appPath = path.join(__dirname, "../client/build");
app.use(express.static(appPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(appPath, "index.html"));
});

// Pour Heroku : 
// if (process.env.NODE_ENV === "production") {
//   const appPath = path.join(__dirname, "client", "build");
//   app.use(express.static(appPath));

//   app.get("*", (req, res) => {
//       res.sendFile(path.resolve(appPath, "index.html"));
//   });
// }

mongoose.connection.on('open', () => {
    app.listen(PORT, ip);
})

   







