const fs = require('fs');
const path = require('path');
const db = require('../config/db');

async function initDatabase() {
    try {
        // Lire le fichier SQL
        const sql = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
        
        // Exécuter le script SQL
        await db.query(sql);
        console.log('Base de données initialisée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
    }
}

initDatabase();
