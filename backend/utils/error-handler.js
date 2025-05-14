class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    // Erreur de validation de Joi
    if (err.isJoi) {
        return res.status(400).json({
            status: 'error',
            message: err.details[0].message
        });
    }

    // Erreur SQL
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
            status: 'error',
            message: 'Cette entrée existe déjà'
        });
    }

    // Erreur inconnue
    console.error(err);
    return res.status(500).json({
        status: 'error',
        message: 'Une erreur interne est survenue'
    });
};

module.exports = {
    ApiError,
    errorHandler
};
