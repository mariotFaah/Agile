const fs = require('fs');
const path = require('path');
const db = require('../config/db');

async function setupDatabase() {
    try {
        // Lire le fichier SQL
        const sql = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
        
        // Exécuter le script SQL
        await db.query(sql);
        console.log('Base de données initialisée avec succès');
        
        // Créer un employé de test
        await db.query(
            'INSERT INTO Employee (nom, prenom, salaire_base) VALUES (?, ?, ?)',
            ['Dupont', 'Jean', 2500.00]
        );
        console.log('Employé de test créé avec succès');
        
    } catch (error) {
        console.error('Erreur lors de la configuration de la base de données:', error);
    }
}

setupDatabase();
