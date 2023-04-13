// Import the required packages and modules
const Sequelize = require('sequelize');
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

// Create a new Sequelize instance with the provided database connection details
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.ADMIN_USERNAME, 
    process.env.ADMIN_PASSWORD, {
        host: process.env.HOST, 
        dialect: process.env.DIALECT
    });

// Create a new object to store the database models
const db = {};
db.sequelize = sequelize;

// Import all of the model files in the current directory and add them to the `db` object
fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) &&
            (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize,
            Sequelize);
        db[model.name] = model;
    });

// Call the `associate` function for each model to define the model relationships
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Export the `db` object for use in other parts of the application
module.exports = db;
