const BulletinPaie = require('../models/BulletinPaie');

exports.getAllBulletins = async (req, res) => {
    try {
        const bulletins = await BulletinPaie.getAll();
        res.json(bulletins);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des bulletins' });
    }
};

exports.getBulletinsByEmployee = async (req, res) => {
    try {
        const bulletins = await BulletinPaie.getByEmployee(req.params.id);
        res.json(bulletins);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des bulletins' });
    }
};

exports.generateBulletin = async (req, res) => {
    try {
        const { id_employe, mois, annee } = req.body;
        const bulletinId = await BulletinPaie.generateBulletin(id_employe, mois, annee);
        res.status(201).json({ id: bulletinId });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la génération du bulletin' });
    }
};
