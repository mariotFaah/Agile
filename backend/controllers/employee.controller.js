const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.getAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des employés' });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.getById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employé non trouvé' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'employé' });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const { nom, prenom, salaire_base } = req.body;
        const employee = new Employee(null, nom, prenom, salaire_base);
        const id = await Employee.create(employee);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'employé' });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { nom, prenom, salaire_base } = req.body;
        await Employee.update(req.params.id, { nom, prenom, salaire_base });
        res.json({ message: 'Employé mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'employé' });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.delete(req.params.id);
        res.json({ message: 'Employé supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'employé' });
    }
};
