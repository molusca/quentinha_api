const User = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    active: DataTypes.BOOLEAN,
    department_id: DataTypes.NUMBER,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    notes: DataTypes.STRING,
    password: DataTypes.STRING,
    size_preference: DataTypes.ENUM('P', 'M', 'G'),
    token: DataTypes.STRING,
    type: DataTypes.ENUM('admin', 'worker'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
};

module.exports = User;