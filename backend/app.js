require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');

// Configuration du logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Ajouter un transport console en développement
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

const employeeRoutes = require('./routes/employee.routes');
const primeRoutes = require('./routes/prime.routes');
const retenueRoutes = require('./routes/retenue.routes');
const bulletinRoutes = require('./routes/bulletin.routes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/primes', primeRoutes);
app.use('/api/retenues', retenueRoutes);
app.use('/api/bulletins', bulletinRoutes);

// Error handling
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Une erreur est survenue' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Serveur démarré sur le port ${PORT}`);
});
