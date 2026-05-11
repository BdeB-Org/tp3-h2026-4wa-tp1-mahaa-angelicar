//Maha Al-Sadoon

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

// Fonction pour charger la liste des categories
async function chargerCategorie() {
    try {
        // Envoie une requête GET à l'API
        const res = await apiFetch('/api/categorie');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(Categorie => {
            const tr = document.createElement('tr');
            // Ajoute les informations de la categorie
            tr.innerHTML = `
                <td>${Categorie.id_categorie}</td>
                <td>${escapeHtml(Categorie.nom_categorie)}</td>
                <td>
                    <!-- Lien vers la page de modification -->
                    <a class="btn-link" href="/editCategorie.html?id=${Categorie.id_categorie}">Modifier</a>
                    
                    <!-- Bouton pour supprimer la categorie -->
                    <button class="danger" onclick="supprimerCategorie(${Categorie.id_categorie})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

// Fonction pour supprimer une categorie
async function supprimerCategorie(id) {
    // demande une confirmation
    if (!confirm('Voulez-vous vraiment supprimer cette categorie ?')) return;

    try {
        // envoie une requête DELETE à l'API
        const res = await apiFetch('/api/categorie/' + id, { method: 'DELETE' });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        
        // Recharge la liste des categories
        chargerCategorie();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerCategorie();
