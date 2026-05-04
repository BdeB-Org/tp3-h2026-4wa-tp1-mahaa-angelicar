const express = require("express");
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const authRoutes = require('./routes/authRoutes');

//Angelica
const utilisateurRoutes = require("./routes/utilisateurRoutes");
//Maha
const categorieRoutes = require("./routes/categorieRoutes");

//Angelica
app.use('/api/utilisateur', utilisateurRoutes);

//Maha
app.use('/api/categorie', categorieRoutes);




app.use('/api/auth', authRoutes);

// Redirection par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

