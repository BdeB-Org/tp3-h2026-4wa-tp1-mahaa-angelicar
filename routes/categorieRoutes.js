const express = require("express");
const router = express.Router();

//Maha Al-Sadoon 
const categorieController = require("../controllers/categorieController");

//GET Categorie (tous) - Maha Al-Sadoon 
router.get("/", categorieController.getCategorie);
//GET Categorie (1) - Maha Al-Sadoon
router.get("/:id", categorieController.getCategorieById);
//POST Categorie - Maha Al-Sadoon
router.post("/", categorieController.addCategorie);
//UPDATE Categorie - Maha _Al-Sadoon 
router.put("/:id", categorieController.updateCategorie);
//DELETE Categorie - Maha Al-Sadoon
router.delete("/:id", categorieController.deleteCategorie);

module.exports = router;