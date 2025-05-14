-- Création de la base de données
CREATE DATABASE IF NOT EXISTS payroll_management;
USE payroll_management;

-- Table Employee
CREATE TABLE IF NOT EXISTS Employee (
    id_employe INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    salaire_base DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table Prime
CREATE TABLE IF NOT EXISTS Prime (
    id_prime INT PRIMARY KEY AUTO_INCREMENT,
    libelle VARCHAR(100) NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    mois INT NOT NULL,
    annee INT NOT NULL,
    id_employe INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_employe) REFERENCES Employee(id_employe)
);

-- Table Retenue
CREATE TABLE IF NOT EXISTS Retenue (
    id_retenue INT PRIMARY KEY AUTO_INCREMENT,
    libelle VARCHAR(100) NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    mois INT NOT NULL,
    annee INT NOT NULL,
    id_employe INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_employe) REFERENCES Employee(id_employe)
);

-- Table BulletinPaie
CREATE TABLE IF NOT EXISTS BulletinPaie (
    id_bulletin INT PRIMARY KEY AUTO_INCREMENT,
    mois INT NOT NULL,
    annee INT NOT NULL,
    salaire_brut DECIMAL(10,2) NOT NULL,
    salaire_net DECIMAL(10,2) NOT NULL,
    id_employe INT,
    date_generation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_employe) REFERENCES Employee(id_employe)
);

-- Indexes pour optimiser les requêtes
CREATE INDEX idx_employee_name ON Employee(nom, prenom);
CREATE INDEX idx_prime_date ON Prime(mois, annee);
CREATE INDEX idx_retenue_date ON Retenue(mois, annee);
CREATE INDEX idx_bulletin_date ON BulletinPaie(mois, annee);
