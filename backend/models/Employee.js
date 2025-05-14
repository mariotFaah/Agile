const db = require('../config/db');

class Employee {
    constructor(id_employe, nom, prenom, salaire_base) {
        this.id_employe = id_employe;
        this.nom = nom;
        this.prenom = prenom;
        this.salaire_base = salaire_base;
    }

    static async getAll() {
        const [rows] = await db.query('SELECT * FROM Employee');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM Employee WHERE id_employe = ?', [id]);
        return rows[0];
    }

    static async create(employee) {
        const [result] = await db.query(
            'INSERT INTO Employee (nom, prenom, salaire_base) VALUES (?, ?, ?)',
            [employee.nom, employee.prenom, employee.salaire_base]
        );
        return result.insertId;
    }

    static async update(id, employee) {
        await db.query(
            'UPDATE Employee SET nom = ?, prenom = ?, salaire_base = ? WHERE id_employe = ?',
            [employee.nom, employee.prenom, employee.salaire_base, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM Employee WHERE id_employe = ?', [id]);
    }
}

module.exports = Employee;
