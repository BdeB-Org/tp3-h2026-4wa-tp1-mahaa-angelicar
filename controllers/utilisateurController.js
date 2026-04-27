const db = require('../config/database');

// Controller GET (tous les utlisateurs)- Angelica Roldan
exports.getUtilisateur = (req,res)=>{
 db.all('SELECT * FROM utilisateur',(err,rows)=>{
  res.json(rows);
 });
};

// Controller GET (1 utilisateur)- Angelica Roldan
exports.getUtilisateurById = (req,res)=>{
 const id = req.params.id;
 db.get(
  'SELECT * FROM utilisateur WHERE id_utilisateur=?',
  [id],
  (err,row)=>{
   if(err){
    return res.status(500).json({
     message:"Erreur serveur"
    }); }
   if(!row){
    return res.status(404).json({
     message:"Utilisateur non trouvé"  }); }
   res.json(row);});};


// Controller POST- Angelica Roldan
exports.addUtilisateur = (req,res)=>{
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const courriel = req.body.courriel;

    if(!nom || !prenom || !courriel){
        return res.status(400).json({
            message: "Nom, prenom et courriel obligatoires"
        });
    }

    console.log("Insertion:",nom,prenom,courriel);
    db.run(
        "INSERT INTO utilisateur (nom,prenom,courriel) VALUES (?,?,?)",
        [nom,prenom,courriel],
        function(err){
            if(err){
                console.log(err);
                return res.status(500).json({message:"Erreur serveur"});
            }
            res.json({
                message:"Utilisateur ajouté",
                id:this.lastID
            });
        }
    );
};

// Controller UPDATE - Angelica Roldan
exports.updateUtilisateur = (req, res) => {
    const id = req.params.id;
    const { nom, prenom, courriel } = req.body;
        // Vérifier que l'id est fourni
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    db.run(
        'UPDATE utilisateur SET nom=?, prenom=?, courriel=? WHERE id_utilisateur=?',
        [nom, prenom, courriel, id],
        function(err){
            if(err){
                return res.status(500).json({ erreur: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({message: "Utilisateur non trouvé"});
            }
            res.json({
                message: "Utilisateur modifié",
                id: id
            });
        }
    );
};

// Controller DELETE - Angelica Roldan
exports.deleteUtilisateur = (req, res) => {
    const id = req.params.id;
    // Vérifier que l'id est fourni
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    // Exécuter la requête SQL avec callback
    db.run(
    'DELETE FROM utilisateur WHERE id_utilisateur = ?',
    [id],
    function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erreur: err.message });
        }
        // Vérifier si une ligne a été supprimée
        if (this.changes === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet ID" });
        }
        res.json({ message: "Utilisateur supprimé", id: id });
    }
);
};
