require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const jwt = require ('jsonwebtoken');
const cookies = require('cookies');

const campaignRoutes = require('./routes/campaign.route');
const userRoutes = require('./routes/user.route');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use("/api", campaignRoutes);
app.use("/api", userRoutes);

mongoose.connect(process.env.MONGO_URI,
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true 
    }
)
.then(() => console.log('Connexion Mongodb réussie!'))
.catch(() => console.log('Connexion Mongodb échouée!'))


// Pour Heroku : 
if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "client", "build");
  app.use(express.static(appPath));

  app.get("*", (req, res) => {
      res.sendFile(path.resolve(appPath, "index.html"));
  });
}


mongoose.connection.on('open', () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
})

   
// Pour créer les Roles dans la DB lorsqu'ils n'existent pas
    // Role.estimatedDocumentCount((err, count) => {
    //   if (!err && count === 0) {
    //     new Role({
    //       name: "user",
    //     }).save((err) => {
    //       if (err) {
    //         console.log("error", err);
    //       }
  
    //       console.log("added 'user' to roles collection");
    //     });
  
    //     new Role({
    //       name: "moderator",
    //     }).save((err) => {
    //       if (err) {
    //         console.log("error", err);
    //       }
  
    //       console.log("added 'moderator' to roles collection");
    //     });
  
    //     new Role({
    //       name: "admin",
    //     }).save((err) => {
    //       if (err) {
    //         console.log("error", err);
    //       }
  
    //       console.log("added 'admin' to roles collection");
    //     });
    //   }
    // });
  






