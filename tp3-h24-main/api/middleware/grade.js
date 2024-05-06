const { body, validationResult } = require('express-validator');

// Enum des gradations d'escalade américain
const climbingGrades = [
  '5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9',
  '5.10a', '5.10b', '5.10c', '5.10d', '5.11a', '5.11b', '5.11c', '5.11d',
  '5.12a', '5.12b', '5.12c', '5.12d', '5.13a', '5.13b', '5.13c', '5.13d',
  '5.14a', '5.14b', '5.14c', '5.14d', '5.15a', '5.15b', '5.15c', '5.15d'
];

// Middleware de validation pour les gradations d'escalade
const validateClimbingGrade = (req, res, next) => {
  // Vérifie si la gradation d'escalade envoyée dans la requête est valide
  body('climbingGrade').custom(value => {
    if (!climbingGrades.includes(value)) {
      throw new Error('La gradation d\'escalade n\'est pas valide');
    }
    return true;
  })(req, res, next);
};

module.exports = validateClimbingGrade;
