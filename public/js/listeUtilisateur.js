
//Angelica Roldan Chimal

// Vérifie si l'utilisateur est connecté
requireAuth();

// Récupère les éléments HTML du tableau et du message
const tbody = document.getElementById('tbodyListe');
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

// Fonction pour charger la liste des utilisateurs
async function chargerutilisateur() {
    try {
        // Envoie une requête GET à l'API
        const res = await apiFetch('/api/utilisateur');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(utilisateur => {
            const tr = document.createElement('tr');
            // Ajoute les informations de l'utilisateur
            tr.innerHTML = `
                <td>${utilisateur.id_utilisateur}</td>
                <td>${escapeHtml(utilisateur.nom)}</td>
                <td>${escapeHtml(utilisateur.prenom)}</td>
                <td>${escapeHtml(utilisateur.courriel)}</td>
                <td>
                    <!-- Lien vers la page de modification -->
                    <a class="btn-link" href="/editUtilisateur.html?id=${utilisateur.id_utilisateur}">Modifier</a>
                    
                    <!-- Bouton pour supprimer l'utilisateur -->
                    <button class="danger" onclick="supprimerUtilisateur(${utilisateur.id_utilisateur})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

// Fonction pour supprimer un utilisateur
async function supprimerUtilisateur(id) {
    // demande une confirmation
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;

    try {
        // envoie une requête DELETE à l'API
        const res = await apiFetch('/api/utilisateur/' + id, { method: 'DELETE' });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        
        // Recharge la liste des utilisateurs
        chargerutilisateur();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerutilisateur();
