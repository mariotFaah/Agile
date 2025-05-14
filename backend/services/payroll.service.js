const Employee = require('../models/Employee');
const Prime = require('../models/Prime');
const Retenue = require('../models/Retenue');
const BulletinPaie = require('../models/BulletinPaie');

class PayrollService {
    static async calculateSalary(id_employe, mois, annee) {
        try {
            // Récupérer les données de l'employé
            const employee = await Employee.getById(id_employe);
            if (!employee) {
                throw new Error('Employé non trouvé');
            }

            // Récupérer les primes pour le mois et l'année spécifiés
            const primes = await Prime.getByEmployee(id_employe, mois, annee);
            const primesTotal = primes.reduce((sum, prime) => sum + prime.montant, 0);

            // Récupérer les retenues pour le mois et l'année spécifiés
            const retenues = await Retenue.getByEmployee(id_employe, mois, annee);
            const retenuesTotal = retenues.reduce((sum, retenue) => sum + retenue.montant, 0);

            // Calculer le salaire brut
            const salaireBrut = employee.salaire_base + primesTotal;

            // Calculer le salaire net
            const salaireNet = salaireBrut - retenuesTotal;

            return {
                salaire_base: employee.salaire_base,
                primes: primes,
                primes_total: primesTotal,
                retenues: retenues,
                retenues_total: retenuesTotal,
                salaire_brut: salaireBrut,
                salaire_net: salaireNet
            };
        } catch (error) {
            throw error;
        }
    }

    static async generateBulletin(id_employe, mois, annee) {
        try {
            // Calculer le salaire
            const calcul = await this.calculateSalary(id_employe, mois, annee);

            // Créer le bulletin
            const bulletinId = await BulletinPaie.create({
                mois,
                annee,
                salaire_brut: calcul.salaire_brut,
                salaire_net: calcul.salaire_net,
                id_employe,
                date_generation: new Date()
            });

            return {
                id_bulletin: bulletinId,
                ...calcul
            };
        } catch (error) {
            throw error;
        }
    }

    static async getEmployeePayroll(id_employe) {
        try {
            // Récupérer les bulletins de l'employé
            const bulletins = await BulletinPaie.getByEmployee(id_employe);
            
            // Pour chaque bulletin, récupérer les primes et retenues pour la période
            const detailedBulletins = await Promise.all(
                bulletins.map(async (bulletin) => {
                    const primes = await Prime.getByEmployee(id_employe, bulletin.mois, bulletin.annee);
                    const retenues = await Retenue.getByEmployee(id_employe, bulletin.mois, bulletin.annee);
                    return {
                        ...bulletin,
                        primes,
                        retenues
                    };
                })
            );

            return detailedBulletins;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PayrollService;
