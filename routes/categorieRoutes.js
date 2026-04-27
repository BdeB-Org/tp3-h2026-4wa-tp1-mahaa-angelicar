const express = require("express");
const router = express.Router();

//Maha Al-Sadoon 
    const categorieController = require("../controllers/categorieController");

    //GET Categorie (tous) - Maha Al-Sadoon 
    router.get("/categorie", categorieController.getCategorie);
    //GET Categorie (1) - Maha Al-Sadoon
       router.get("/categorie/:id", categorieController.getCategorieById);
    //POST Categorie - Maha Al-Sadoon
    router.post("/categorie", categorieController.addCategorie);
    //UPDATE Categorie - Maha _Al-Sadoon 
        router.put("/categorie/:id", categorieController.updateCategorie);
    //DELETE Categorie - Maha Al-Sadoon
        router.delete("/categorie/:id", categorieController.deleteCategorie);


module.exports = router;