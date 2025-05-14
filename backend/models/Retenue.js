const db = require('../config/db');

class Retenue {
    constructor(id_retenue, libelle, montant, mois, annee, id_employe) {
        this.id_retenue = id_retenue;
        this.libelle = libelle;
        this.montant = montant;
        this.mois = mois;
        this.annee = annee;
        this.id_employe = id_employe;
    }

    static async getAll() {
        const [rows] = await db.query('SELECT * FROM Retenue');
        return rows;
    }

    static async getByEmployee(id_employe, mois = null, annee = null) {
        let query = 'SELECT * FROM Retenue WHERE id_employe = ?';
        const params = [id_employe];

        if (mois && annee) {
            query += ' AND mois = ? AND annee = ?';
            params.push(mois, annee);
        }

        query += ' ORDER BY annee DESC, mois DESC';

        const [rows] = await db.query(query, params);
        return rows;
    }

    static async create(retenue) {
        const [result] = await db.query(
            'INSERT INTO Retenue (libelle, montant, mois, annee, id_employe) VALUES (?, ?, ?, ?, ?)',
            [retenue.libelle, retenue.montant, retenue.mois, retenue.annee, retenue.id_employe]
        );
        return result.insertId;
    }

    static async update(id, retenue) {
        await db.query(
            'UPDATE Retenue SET libelle = ?, montant = ?, mois = ?, annee = ?, id_employe = ? WHERE id_retenue = ?',
            [retenue.libelle, retenue.montant, retenue.mois, retenue.annee, retenue.id_employe, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM Retenue WHERE id_retenue = ?', [id]);
    }
}

module.exports = Retenue;
