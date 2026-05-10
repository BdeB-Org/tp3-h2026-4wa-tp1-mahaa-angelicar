
//Angelica Roldan Chimal

// Récupère les éléments HTML du formulaire, du tableau et du message
const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyUtilisateurs');
const message = document.getElementById('message');

// Fonction pour afficher un message à l'utilisateur
function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}


// Fonction asynchrone pour charger tous les utilisateurs depuis l'API
async function chargerutilisateur() {
    try {
        const res = await apiFetch('/api/utilisateur');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(utilisateur => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${utilisateur.id_utilisateur}</td>
                <td>${escapeHtml(utilisateur.nom)}</td>
                <td>${escapeHtml(utilisateur.prenom)}</td>
                <td>${escapeHtml(utilisateur.courriel)}</td>
                <td>
                    <!-- Lien pour modifier l'utilisateur -->
                    <a class="btn-link" href="/editUtilisateur.html?id=${utilisateur.id_utilisateur}">Modifier</a>
                    
                    <!-- Bouton pour supprimer l'utilisateur -->
                    <button class="danger" onclick="supprimerUtilisateur(${utilisateur.id_utilisateur})">Supprimer</button>
                </td>
            `;
            console.log(data)
            tbody.appendChild(tr);
        });
    } catch (err) {
        // affiche un message d'erreur si la requête échoue
        showMessage(err.message, true);
    }
}

// Événement déclenché lors de l'envoi du formulaire
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const courriel = document.getElementById('courriel').value.trim();

    try {
        // Envoie une requête POST pour ajouter un utilisateur
         const res = await apiFetch('/api/utilisateur', {
            method: 'POST',
            body: JSON.stringify({ nom, prenom, courriel })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Utilisateurs ajouté avec succès');
        chargerutilisateur();
    } catch (err) {
        showMessage(err.message, true);
    }
});

// Fonction pour supprimer un utilisateur
async function supprimerUtilisateur(id) {
    // demande de confirmation
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;

    try {
        // envoie une requête DELETE à l'API
        const res = await apiFetch('/api/utilisateur/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerutilisateur();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerutilisateur();