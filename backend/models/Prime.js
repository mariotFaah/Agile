const db = require('../config/db');

class Prime {
    constructor(id_prime, libelle, montant, mois, annee, id_employe) {
        this.id_prime = id_prime;
        this.libelle = libelle;
        this.montant = montant;
        this.mois = mois;
        this.annee = annee;
        this.id_employe = id_employe;
    }

    static async getAll() {
        const [rows] = await db.query('SELECT * FROM Prime');
        return rows;
    }

    static async getByEmployee(id_employe, mois = null, annee = null) {
        let query = 'SELECT * FROM Prime WHERE id_employe = ?';
        const params = [id_employe];

        if (mois && annee) {
            query += ' AND mois = ? AND annee = ?';
            params.push(mois, annee);
        }

        query += ' ORDER BY annee DESC, mois DESC';

        const [rows] = await db.query(query, params);
        return rows;
    }

    static async create(prime) {
        const [result] = await db.query(
            'INSERT INTO Prime (libelle, montant, mois, annee, id_employe) VALUES (?, ?, ?, ?, ?)',
            [prime.libelle, prime.montant, prime.mois, prime.annee, prime.id_employe]
        );
        return result.insertId;
    }

    static async update(id, prime) {
        await db.query(
            'UPDATE Prime SET libelle = ?, montant = ?, mois = ?, annee = ?, id_employe = ? WHERE id_prime = ?',
            [prime.libelle, prime.montant, prime.mois, prime.annee, prime.id_employe, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM Prime WHERE id_prime = ?', [id]);
    }
}

module.exports = Prime;
