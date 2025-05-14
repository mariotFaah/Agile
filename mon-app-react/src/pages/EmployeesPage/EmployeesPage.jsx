import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../components/ui/Modal/Modal';
import './EmployeesPage.css';
import Navbar from "../../components/ui/Navbar/Navbar";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [formData, setFormData] = useState({ nom: '', prenom: '', salaire_base: '' });

  // Charger la liste des employés
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des employés :', error);
    }
  };

  // Gestion des champs de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Ouvrir le modal
  const openModal = (mode, employee = null) => {
    setSelectedEmployee(employee);
    setModalMode(mode);
    setFormData(employee || { nom: '', prenom: '', salaire_base: '' });
    setIsModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => setIsModalOpen(false);

  // Ajouter ou modifier un employé
  const handleSave = async () => {
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:8000/api/employees', formData);
      } else if (modalMode === 'edit' && selectedEmployee) {
        await axios.put(`http://localhost:8000/api/employees/${selectedEmployee.id_employe}`, formData);
      }
      fetchEmployees();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
    }
  };

  // Supprimer un employé
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/employees/${selectedEmployee.id_employe}`);
      fetchEmployees();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  return (
    <div className="employees-page">
	  <Navbar/>
      <h2>Liste des employés</h2>
      <button onClick={() => openModal('add')} className="add-btn">Créer un nouvel employé</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Salaire</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id_employe}>
              <td>{employee.id_employe}</td>
              <td>{employee.nom}</td>
              <td>{employee.prenom}</td>
              <td>{employee.salaire_base} €</td>
              <td>
                <button onClick={() => openModal('edit', employee)}>Modifier</button>
                <button onClick={() => openModal('delete', employee)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalMode === 'add' ? 'Ajouter un employé' : modalMode === 'edit' ? 'Modifier l\'employé' : 'Supprimer l\'employé'}>
        {modalMode !== 'delete' ? (
          <>
            <input name="nom" placeholder="Nom" value={formData.nom} onChange={handleInputChange} />
            <input name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleInputChange} />
            <input name="salaire_base" placeholder="Salaire" value={formData.salaire_base} onChange={handleInputChange} />
            <button onClick={handleSave}>{modalMode === 'add' ? 'Ajouter' : 'Modifier'}</button>
          </>
        ) : (
          <>
            <p>Voulez-vous vraiment supprimer {selectedEmployee?.nom} {selectedEmployee?.prenom} ?</p>
            <button onClick={handleDelete}>Confirmer</button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default EmployeesPage;

