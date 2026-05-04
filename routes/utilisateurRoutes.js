
const express = require("express");
const router = express.Router();
const ctrl = require('../controllers/utilisateurController');
const authMiddleware = require('../middleware/authMiddleware');

//Angelica

    //GET Utilisateurs (tous) - Angelica 
    router.get('/', authMiddleware, ctrl.getUtilisateur);
    //GET Utilisateurs (1) - Angelica 
    router.get('/:id', authMiddleware, ctrl.getUtilisateurById);
    //POST Utilisateur - Angelica 
    router.post('/', authMiddleware, ctrl.addUtilisateur);
    //UPDATE Utilisateur - Angelica 
    router.put('/:id', authMiddleware, ctrl.updateUtilisateur);
    //DELETE Utilisateur - Angelica 
    router.delete('/:id', authMiddleware, ctrl.deleteUtilisateur);


module.exports = router;
