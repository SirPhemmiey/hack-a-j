module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Phonebook',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: 'Please enter a valid email' }
        }
      },
      phone: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      mobile: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      created_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      timestamps: false,
      tableName: 'phonebook'
    }
  );

  return User;
};
