
const express = require("express");
const router = express.Router();

//Angelica 
    const utilisateurController = require("../controllers/utilisateurController");

    //GET Utilisateurs (tous) - Angelica 
    router.get("/utilisateur", utilisateurController.getUtilisateur);
    //GET Utilisateurs (1) - Angelica 
    router.get("/utilisateur/:id", utilisateurController.getUtilisateurById);
    //POST Utilisateur - Angelica 
    router.post("/utilisateur", utilisateurController.addUtilisateur);
    //UPDATE Utilisateur - Angelica 
    router.put("/utilisateur/:id", utilisateurController.updateUtilisateur);
    //DELETE Utilisateur - Angelica 
    router.delete("/utilisateur/:id", utilisateurController.deleteUtilisateur);



module.exports = router;
