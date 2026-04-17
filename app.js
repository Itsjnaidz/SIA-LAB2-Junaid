// Note: When you deploy to Render, change this to your Render URL!
const API_URL = "http://localhost:3000"; 

async function fetchWeapons() {
    const response = await fetch(`${API_URL}/weapons`);
    const data = await response.json();
    displayData(data);
}

async function searchWeapons() {
    const query = document.getElementById('searchInput').value;
    const response = await fetch(`${API_URL}/search?name=${query}`);
    const data = await response.json();
    displayData(data);
}

async function fetchTopDamage() {
    const response = await fetch(`${API_URL}/top-damage`);
    const data = await response.json();
    displayData(data);
}

function displayData(weapons) {
    const container = document.getElementById('weapon-list');
    container.innerHTML = weapons.map(w => `
        <div class="card">
            <h3>${w.name}</h3>
            <p><strong>Type:</strong> ${w.type}</p>
            <p><strong>Damage:</strong> ${w.damage}</p>
            <p><strong>Ammo:</strong> ${w.ammo}</p>
        </div>
    `).join('');
}

// Initial Load
fetchWeapons();