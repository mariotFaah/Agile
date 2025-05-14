const Prime = require('../models/Prime');
const validation = require('../middleware/validation');

exports.getAllPrimes = async (req, res) => {
    try {
        const primes = await Prime.getAll();
        res.json(primes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des primes' });
    }
};

exports.getPrimesByEmployee = async (req, res) => {
    try {
        const primes = await Prime.getByEmployee(req.params.id);
        res.json(primes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des primes' });
    }
};

exports.createPrime = async (req, res) => {
    try {
        const { libelle, montant, mois, annee, id_employe } = req.body;
        const prime = new Prime(null, libelle, montant, mois, annee, id_employe);
        const id = await Prime.create(prime);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la prime' });
    }
};

exports.updatePrime = async (req, res) => {
    try {
        const { libelle, montant, mois, annee, id_employe } = req.body;
        await Prime.update(req.params.id, { libelle, montant, mois, annee, id_employe });
        res.json({ message: 'Prime mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la prime' });
    }
};

exports.deletePrime = async (req, res) => {
    try {
        await Prime.delete(req.params.id);
        res.json({ message: 'Prime supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la prime' });
    }
};
