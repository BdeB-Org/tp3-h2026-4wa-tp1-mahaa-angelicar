const db = require('../config/database');

// Controller GET (tous les Categories)- Maha Al-Sadoon
exports.getCategorie = (req,res)=>{
 db.all('SELECT * FROM categorie',(err,rows)=>{
  res.json(rows);
 });
};

// Controller GET (1 categorie)- Maha Al-Sadoon
exports.getCategorieById = (req,res)=>{
 const id = req.params.id;
 db.get(
  'SELECT * FROM categorie WHERE id_categorie=?',
  [id],
  (err,row)=>{
   if(err){
    return res.status(500).json({
     message:"Erreur serveur"
    }); }
   if(!row){
    return res.status(404).json({
     message:"categorie non trouvé"  }); }
   res.json(row);});};

   // Controller POST- Maha Al-Sadoon
exports.addCategorie = (req,res)=>{
    const nom_categorie = req.body.nom_categorie;

    if(!nom_categorie){
        return res.status(400).json({
            message: "Le nom de la categorie est obligatoire"
        });
    }

    console.log("Insertion:",nom_categorie);
    db.run(
        "INSERT INTO categorie (nom_categorie) VALUES (?)",
        [nom_categorie],
        function(err){
            if(err){
                console.log(err);
                return res.status(500).json({message:"Erreur serveur"});
            }
            res.json({
                message:"Categorie ajouté",
                id:this.lastID
            });
        }
    );
};

// Controller UPDATE - Maha Al-Sadoon
exports.updateCategorie = (req, res) => {
    const id = req.params.id;
    const { nom_categorie} = req.body;
        // Vérifier que l'id est fourni
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    db.run(
        'UPDATE categorie SET nom_categorie=? WHERE id_categorie=?',
        [nom_categorie, id],
        function(err){
            if(err){
                return res.status(500).json({ erreur: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({message: "Categorie non trouvé"});
            }
            res.json({
                message: "Categorie modifié",
                id: id
            });
        }
    );
};
// Controller DELETE - Maha Al-Sadoon
exports.deleteCategorie = (req, res) => {
    const id = req.params.id;
    // Vérifier que l'id est fourni
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    // Exécuter la requête SQL avec callback
    db.run(
    'DELETE FROM categorie WHERE id_categorie = ?',
    [id],
    function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erreur: err.message });
        }
        // Vérifier si une ligne a été supprimée
        if (this.changes === 0) {
            return res.status(404).json({ message: "Aucune categorie trouvé avec cet ID" });
        }
        res.json({ message: "categorie supprimé", id: id });
    }
);
};

