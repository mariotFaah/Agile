const Retenue = require('../models/Retenue');
const validation = require('../middleware/validation');

exports.getAllRetenues = async (req, res) => {
    try {
        const retenues = await Retenue.getAll();
        res.json(retenues);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des retenues' });
    }
};

exports.getRetenuesByEmployee = async (req, res) => {
    try {
        const retenues = await Retenue.getByEmployee(req.params.id);
        res.json(retenues);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des retenues' });
    }
};

exports.createRetenue = async (req, res) => {
    try {
        const { libelle, montant, mois, annee, id_employe } = req.body;
        const retenue = new Retenue(null, libelle, montant, mois, annee, id_employe);
        const id = await Retenue.create(retenue);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la retenue' });
    }
};

exports.updateRetenue = async (req, res) => {
    try {
        const { libelle, montant, mois, annee, id_employe } = req.body;
        await Retenue.update(req.params.id, { libelle, montant, mois, annee, id_employe });
        res.json({ message: 'Retenue mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la retenue' });
    }
};

exports.deleteRetenue = async (req, res) => {
    try {
        await Retenue.delete(req.params.id);
        res.json({ message: 'Retenue supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la retenue' });
    }
};
