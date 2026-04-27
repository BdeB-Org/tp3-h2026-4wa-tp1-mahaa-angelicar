const express = require("express");
const app = express();

//Angelica
const utilisateurRoutes = require("./routes/utilisateurRoutes");
//Maha
const categorieRoutes = require("./routes/categorieRoutes");
app.use(express.json());

//Angelica
app.use("/", utilisateurRoutes);
//Maha
app.use("/", categorieRoutes);


app.listen(3000, () =>{
    console.log("serveur est lancé sur le port 3000")
});

