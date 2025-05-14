const Joi = require('joi');

// Schémas de validation
const employeeSchema = Joi.object({
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    salaire_base: Joi.number().required().min(0)
});

const primeSchema = Joi.object({
    libelle: Joi.string().required(),
    montant: Joi.number().required().min(0),
    mois: Joi.number().required().min(1).max(12),
    annee: Joi.number().required().min(2000),
    id_employe: Joi.number().required()
});

const retenueSchema = Joi.object({
    libelle: Joi.string().required(),
    montant: Joi.number().required().min(0),
    mois: Joi.number().required().min(1).max(12),
    annee: Joi.number().required().min(2000),
    id_employe: Joi.number().required()
});

// Middleware de validation
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

module.exports = {
    validateEmployee: validate(employeeSchema),
    validatePrime: validate(primeSchema),
    validateRetenue: validate(retenueSchema)
};
