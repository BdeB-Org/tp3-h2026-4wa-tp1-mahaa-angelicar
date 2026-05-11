//Maha Al-Sadoon

// Vérifie si l'utilisateur est connecté
requireAuth();

// Récupère les éléments 
const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Fonction pour afficher un message à l'utilisateur
function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

// Fonction pour charger les informations d'une categorie
async function chargerCategorie() {
    try {
        // Envoie une requête GET pour récupérer la categorie selon son id
        const res = await apiFetch('/api/categorie/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('id_categorie').value = data.id_categorie;
        document.getElementById('nom_categorie').value = data.nom_categorie;
    } catch (err) {
        showMessage(err.message, true);
    }
}

// Événement déclenché lors de l'envoi du formulaire
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Récupère les valeurs du formulaire
    const id_categorie = document.getElementById('id_categorie').value.trim();
    const nom_categorie = document.getElementById('nom_categorie').value.trim();

    try {
        // Envoie une requête PUT pour modifier la categorie
        const res = await apiFetch('/api/categorie/' + id, {
            method: 'PUT',
            body: JSON.stringify({ id_categorie, nom_categorie })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);

        // Redirige vers la liste des categories
        setTimeout(() => {
            window.location.href = '/listeCategorie.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

// Vérifie si un id est présent dans l'URL
if (!id) {
    showMessage('ID categorie manquant', true);
} else {
    chargerCategorie();
}