//Maha Al-Sadoon

// Récupère les éléments HTML du formulaire, du tableau et du message
const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyCategorie');
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


// Fonction asynchrone pour charger tous les categories depuis l'API
async function chargerCategorie() {
    try {
        const res = await apiFetch('/api/categorie');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(Categorie => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${Categorie.id_categorie}</td>
                <td>${escapeHtml(Categorie.nom_categorie)}</td>
                <td>
                    <!-- Lien pour modifier la categorie -->
                    <a class="btn-link" href="/editCategorie.html?id=${Categorie.id_categorie}">Modifier</a>
                    
                    <!-- Bouton pour supprimer la categorie -->
                    <button class="danger" onclick="supprimerCategorie(${Categorie.id_categorie})">Supprimer</button>
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

    const nom_categorie = document.getElementById('nom_categorie').value.trim();

    try {
        // Envoie une requête POST pour ajouter une categorie
         const res = await apiFetch('/api/categorie', {
            method: 'POST',
            body: JSON.stringify({ nom_categorie })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Categorie ajouté avec succès');
        chargerCategorie();
    } catch (err) {
        showMessage(err.message, true);
    }
});

// Fonction pour supprimer un categorie
async function supprimerCategorie(id) {
    // demande de confirmation
    if (!confirm('Voulez-vous vraiment supprimer cette categorie ?')) return;

    try {
        // envoie une requête DELETE à l'API
        const res = await apiFetch('/api/categorie/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerCategorie();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerCategorie();