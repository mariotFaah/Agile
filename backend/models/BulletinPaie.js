const db = require('../config/db');

class BulletinPaie {
    constructor(id_bulletin, mois, annee, salaire_brut, salaire_net, id_employe, date_generation) {
        this.id_bulletin = id_bulletin;
        this.mois = mois;
        this.annee = annee;
        this.salaire_brut = salaire_brut;
        this.salaire_net = salaire_net;
        this.id_employe = id_employe;
        this.date_generation = date_generation;
    }

    static async getAll() {
        const [rows] = await db.query('SELECT * FROM BulletinPaie');
        return rows;
    }

    static async getByEmployee(id_employe) {
        const [rows] = await db.query(
            'SELECT * FROM BulletinPaie WHERE id_employe = ? ORDER BY annee DESC, mois DESC',
            [id_employe]
        );
        return rows;
    }

    static async create(bulletin) {
        const [result] = await db.query(
            'INSERT INTO BulletinPaie (mois, annee, salaire_brut, salaire_net, id_employe, date_generation) VALUES (?, ?, ?, ?, ?, ?)',
            [bulletin.mois, bulletin.annee, bulletin.salaire_brut, bulletin.salaire_net, bulletin.id_employe, bulletin.date_generation]
        );
        return result.insertId;
    }

    static async update(id, bulletin) {
        await db.query(
            'UPDATE BulletinPaie SET mois = ?, annee = ?, salaire_brut = ?, salaire_net = ?, id_employe = ?, date_generation = ? WHERE id_bulletin = ?',
            [bulletin.mois, bulletin.annee, bulletin.salaire_brut, bulletin.salaire_net, bulletin.id_employe, bulletin.date_generation, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM BulletinPaie WHERE id_bulletin = ?', [id]);
    }

    static async generateBulletin(id_employe, mois, annee) {
        try {
            console.log('Génération du bulletin pour employé:', id_employe, 'mois:', mois, 'année:', annee);
            
            // Récupérer les données nécessaires
            const [employee] = await db.query('SELECT * FROM Employee WHERE id_employe = ?', [id_employe]);
            console.log('Employé trouvé:', employee[0]);
            
            const [primes] = await db.query(
                'SELECT * FROM Prime WHERE id_employe = ? AND mois = ? AND annee = ?',
                [id_employe, mois, annee]
            );
            console.log('Primes trouvées:', primes);
            
            const [retenues] = await db.query(
                'SELECT * FROM Retenue WHERE id_employe = ? AND mois = ? AND annee = ?',
                [id_employe, mois, annee]
            );
            console.log('Retenues trouvées:', retenues);

            if (!employee[0]) {
                throw new Error('Employé non trouvé');
            }

            // Calculer le salaire brut
            const salaire_base = parseFloat(employee[0].salaire_base);
            const primes_total = primes.reduce((sum, prime) => sum + parseFloat(prime.montant), 0);
            const salaire_brut = (salaire_base + primes_total).toFixed(2);

            // Calculer le salaire net
            const retenues_total = retenues.reduce((sum, retenue) => sum + parseFloat(retenue.montant), 0);
            const salaire_net = (salaire_brut - retenues_total).toFixed(2);

            // Créer le bulletin
            const bulletin = {
                mois,
                annee,
                salaire_brut,
                salaire_net,
                id_employe,
                date_generation: new Date()
            };

            return await BulletinPaie.create(bulletin);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BulletinPaie;
