// src/pages/BulletinPage/BulletinPage.jsx
import React, { useState, useEffect } from 'react';
import { getAllBulletins, deleteBulletin } from '../../services/bulletinService';
import Modal from '../../components/ui/Modal/Modal';
import './BulletinPage.css';

const BulletinPage = () => {
  const [bulletins, setBulletins] = useState([]);
  const [selectedBulletin, setSelectedBulletin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBulletins();
  }, []);

  const fetchBulletins = async () => {
    try {
      const data = await getAllBulletins();
      setBulletins(data);
    } catch (error) {
      console.error('Erreur lors du chargement des bulletins :', error);
    }
  };

  const openModal = (bulletin) => {
    setSelectedBulletin(bulletin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBulletin(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (selectedBulletin) {
        await deleteBulletin(selectedBulletin.id_bulletin);
        fetchBulletins();
        closeModal();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  return (
    <div className="bulletin-page">
      <h2>Liste des Bulletins de Paie</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mois</th>
            <th>Année</th>
            <th>Salaire Brut</th>
            <th>Salaire Net</th>
            <th>ID Employé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bulletins.map((bulletin) => (
            <tr key={bulletin.id_bulletin}>
              <td>{bulletin.id_bulletin}</td>
              <td>{bulletin.mois}</td>
              <td>{bulletin.annee}</td>
              <td>{bulletin.salaire_brut} €</td>
              <td>{bulletin.salaire_net} €</td>
              <td>{bulletin.id_employe}</td>
              <td>
                <button onClick={() => openModal(bulletin)}>Voir</button>
                <button onClick={() => openModal(bulletin)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedBulletin && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Détails du Bulletin">
          <p>ID: {selectedBulletin.id_bulletin}</p>
          <p>Mois: {selectedBulletin.mois}</p>
          <p>Année: {selectedBulletin.annee}</p>
          <p>Salaire Brut: {selectedBulletin.salaire_brut} €</p>
          <p>Salaire Net: {selectedBulletin.salaire_net} €</p>
          <p>ID Employé: {selectedBulletin.id_employe}</p>
          <button className="delete-btn" onClick={handleDelete}>Supprimer</button>
        </Modal>
      )}
    </div>
  );
};

export default BulletinPage;

