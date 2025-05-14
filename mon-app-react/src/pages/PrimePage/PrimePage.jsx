import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../components/ui/Modal/Modal';
import './PrimePage.css';
import Navbar from "../../components/ui/Navbar/Navbar";

const PrimePage = () => {
  const [primes, setPrimes] = useState([]);
  const [selectedPrime, setSelectedPrime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [formData, setFormData] = useState({ libelle: '', montant: '', mois: '', annee: '', id_employe: '' });

  // Charger la liste des primes
  useEffect(() => {
    fetchPrimes();
  }, []);

  const fetchPrimes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/primes');
      setPrimes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des primes :', error);
    }
  };

  // Gestion des champs de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Ouvrir le modal
  const openModal = (mode, prime = null) => {
    setSelectedPrime(prime);
    setModalMode(mode);
    setFormData(prime || { libelle: '', montant: '', mois: '', annee: '', id_employe: '' });
    setIsModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => setIsModalOpen(false);

  // Ajouter ou modifier une prime
  const handleSave = async () => {
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:8000/api/primes', formData);
      } else if (modalMode === 'edit' && selectedPrime) {
        await axios.put(`http://localhost:8000/api/primes/${selectedPrime.id_prime}`, formData);
      }
      fetchPrimes();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
    }
  };

  // Supprimer une prime
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/primes/${selectedPrime.id_prime}`);
      fetchPrimes();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  return (
    <div className="prime-page">
    <Navbar />
	  <h2>Liste des primes</h2>
      <button onClick={() => openModal('add')} className="add-btn">Ajouter une prime</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Libellé</th>
            <th>Montant</th>
            <th>Mois</th>
            <th>Année</th>
            <th>ID Employé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {primes.map(prime => (
            <tr key={prime.id_prime}>
              <td>{prime.id_prime}</td>
              <td>{prime.libelle}</td>
              <td>{prime.montant} €</td>
              <td>{prime.mois}</td>
              <td>{prime.annee}</td>
              <td>{prime.id_employe}</td>
              <td>
                <button onClick={() => openModal('edit', prime)}>Modifier</button>
                <button onClick={() => openModal('delete', prime)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalMode === 'add' ? 'Ajouter une prime' : modalMode === 'edit' ? 'Modifier la prime' : 'Supprimer la prime'}>
        {modalMode !== 'delete' ? (
          <>
            <input name="libelle" placeholder="Libellé" value={formData.libelle} onChange={handleInputChange} />
            <input name="montant" placeholder="Montant" value={formData.montant} onChange={handleInputChange} />
            <input name="mois" placeholder="Mois" value={formData.mois} onChange={handleInputChange} />
            <input name="annee" placeholder="Année" value={formData.annee} onChange={handleInputChange} />
            <input name="id_employe" placeholder="ID Employé" value={formData.id_employe} onChange={handleInputChange} />
            <button onClick={handleSave}>{modalMode === 'add' ? 'Ajouter' : 'Modifier'}</button>
          </>
        ) : (
          <>
            <p>Voulez-vous vraiment supprimer la prime {selectedPrime?.libelle} ?</p>
            <button onClick={handleDelete}>Confirmer</button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default PrimePage;

