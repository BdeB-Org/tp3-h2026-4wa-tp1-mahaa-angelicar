
//Angelica Roldan Chimal

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

// Fonction pour charger les informations d'un utilisateur
async function chargerutilisateur() {
    try {
        // Envoie une requête GET pour récupérer l'utilisateur selon son id
        const res = await apiFetch('/api/utilisateur/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('nom').value = data.nom;
        document.getElementById('prenom').value = data.prenom;
        document.getElementById('courriel').value = data.courriel;
    } catch (err) {
        showMessage(err.message, true);
    }
}

// Événement déclenché lors de l'envoi du formulaire
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Récupère les valeurs du formulaire
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const courriel = document.getElementById('courriel').value.trim();

    try {
        // Envoie une requête PUT pour modifier l'utilisateur
        const res = await apiFetch('/api/utilisateur/' + id, {
            method: 'PUT',
            body: JSON.stringify({ nom, prenom, courriel })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);

        // Redirige vers la liste des utilisateurs
        setTimeout(() => {
            window.location.href = '/listeUtilisateur.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

// Vérifie si un id est présent dans l'URL
if (!id) {
    showMessage('ID utilisateur manquant', true);
} else {
    chargerutilisateur();
}
