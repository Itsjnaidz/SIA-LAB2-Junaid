const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Dataset: 10+ items
let weapons = [
    { id: 1, name: "M416", type: "AR", damage: 41, ammo: "5.56mm", rarity: "Common" },
    { id: 2, name: "AWM", type: "Sniper", damage: 105, ammo: ".300 Magnum", rarity: "Legendary" },
    { id: 3, name: "UZI", type: "SMG", damage: 26, ammo: "9mm", rarity: "Common" },
    { id: 4, name: "Kar98k", type: "Sniper", damage: 79, ammo: "7.62mm", rarity: "Rare" },
    { id: 5, name: "M24", type: "Sniper", damage: 75, ammo: "7.62mm", rarity: "Rare" },
    { id: 6, name: "Groza", type: "AR", damage: 47, ammo: "7.62mm", rarity: "Legendary" },
    { id: 7, name: "Vector", type: "SMG", damage: 31, ammo: "9mm", rarity: "Common" },
    { id: 8, name: "M249", type: "LMG", damage: 40, ammo: "5.56mm", rarity: "Rare" },
    { id: 9, name: "P92", type: "Pistol", damage: 35, ammo: "9mm", rarity: "Common" },
    { id: 10, name: "Pan", type: "Melee", damage: 80, ammo: "None", rarity: "Epic" }
];

// --- 10 REQUIRED ENDPOINTS ---

// 1. GET all weapons
app.get('/weapons', (req, res) => res.json(weapons));

// 2. GET weapon by ID
app.get('/weapons/:id', (req, res) => {
    const weapon = weapons.find(w => w.id === parseInt(req.params.id));
    if (!weapon) return res.status(404).json({ message: "Weapon not found" });
    res.json(weapon);
});

// 3. GET weapons by type (Filter)
app.get('/weapons/type/:type', (req, res) => {
    const filtered = weapons.filter(w => w.type.toLowerCase() === req.params.type.toLowerCase());
    res.json(filtered);
});

// 4. GET top damage weapons
app.get('/top-damage', (req, res) => {
    const top = [...weapons].sort((a, b) => b.damage - a.damage).slice(0, 3);
    res.json(top);
});

// 5. GET search by name
app.get('/search', (req, res) => {
    const name = req.query.name || "";
    const results = weapons.filter(w => w.name.toLowerCase().includes(name.toLowerCase()));
    res.json(results);
});

// 6. GET random weapon (Daily Drop)
app.get('/random', (req, res) => {
    const randomIdx = Math.floor(Math.random() * weapons.length);
    res.json(weapons[randomIdx]);
});

// 7. GET stats summary
app.get('/stats', (req, res) => {
    res.json({ total: weapons.length, types: [...new Set(weapons.map(w => w.type))] });
});

// 8. POST - Add new weapon
app.post('/weapons', (req, res) => {
    const newWeapon = { id: weapons.length + 1, ...req.body };
    weapons.push(newWeapon);
    res.status(201).json(newWeapon);
});

// 9. PUT - Update weapon
app.put('/weapons/:id', (req, res) => {
    const index = weapons.findIndex(w => w.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Weapon not found" });
    weapons[index] = { ...weapons[index], ...req.body };
    res.json(weapons[index]);
});

// 10. DELETE - Remove weapon
app.delete('/weapons/:id', (req, res) => {
    weapons = weapons.filter(w => w.id !== parseInt(req.params.id));
    res.json({ message: "Weapon deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));