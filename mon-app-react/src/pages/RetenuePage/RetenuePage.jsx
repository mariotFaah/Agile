// src/pages/RetenuePage/RetenuePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../components/ui/Modal/Modal';
import './RetenuePage.css';

const RetenuePage = () => {
  const [retenues, setRetenues] = useState([]);
  const [selectedRetenue, setSelectedRetenue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [formData, setFormData] = useState({ libelle: '', montant: '', mois: '', annee: '' });

  // Charger la liste des retenues
  useEffect(() => {
    fetchRetenues();
  }, []);

  const fetchRetenues = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/retenues');
      setRetenues(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des retenues :', error);
    }
  };

  // Gestion des champs de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Ouvrir le modal
  const openModal = (mode, retenue = null) => {
    setSelectedRetenue(retenue);
    setModalMode(mode);
    setFormData(retenue || { libelle: '', montant: '', mois: '', annee: '' });
    setIsModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => setIsModalOpen(false);

  // Ajouter ou modifier une retenue
  const handleSave = async () => {
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:8000/api/retenues', formData);
      } else if (modalMode === 'edit' && selectedRetenue) {
        await axios.put(`http://localhost:8000/api/retenues/${selectedRetenue.id_retenue}`, formData);
      }
      fetchRetenues();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
    }
  };

  // Supprimer une retenue
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/retenues/${selectedRetenue.id_retenue}`);
      fetchRetenues();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  return (
    <div className="retenue-page">
	  <h2>Liste des retenues</h2>
      <button onClick={() => openModal('add')} className="add-btn">Créer une nouvelle retenue</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Libelle</th>
            <th>Montant</th>
            <th>Mois</th>
            <th>Année</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {retenues.map(retenue => (
            <tr key={retenue.id_retenue}>
              <td>{retenue.id_retenue}</td>
              <td>{retenue.libelle}</td>
              <td>{retenue.montant} €</td>
              <td>{retenue.mois}</td>
              <td>{retenue.annee}</td>
              <td>
                <button onClick={() => openModal('edit', retenue)}>Modifier</button>
                <button onClick={() => openModal('delete', retenue)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalMode === 'add' ? 'Ajouter une retenue' : modalMode === 'edit' ? 'Modifier la retenue' : 'Supprimer la retenue'}>
        {modalMode !== 'delete' ? (
          <>
            <input name="libelle" placeholder="Libelle" value={formData.libelle} onChange={handleInputChange} />
            <input name="montant" placeholder="Montant" value={formData.montant} onChange={handleInputChange} />
            <input name="mois" placeholder="Mois" value={formData.mois} onChange={handleInputChange} />
            <input name="annee" placeholder="Année" value={formData.annee} onChange={handleInputChange} />
            <button onClick={handleSave}>{modalMode === 'add' ? 'Ajouter' : 'Modifier'}</button>
          </>
        ) : (
          <>
            <p>Voulez-vous vraiment supprimer cette retenue ?</p>
            <button onClick={handleDelete}>Confirmer</button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default RetenuePage;

