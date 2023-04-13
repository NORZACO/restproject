// Define a new Sequelize model for the User table with the provided attributes
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        Name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        EncryptedPassword: {
            type: Sequelize.DataTypes.BLOB,
            allowNull: false
        },
        Salt: {
            type: Sequelize.DataTypes.BLOB,
            allowNull: false
        },
    }, {
        // Disable timestamps to prevent Sequelize from automatically adding createdAt and updatedAt fields
        timestamps: false
    });

    // Define a one-to-one association between the User and Result models
    User.associate = function(models) {
        User.hasOne(models.Result);
    };

    // Return the User model
    return User;
};
