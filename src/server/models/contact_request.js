/**
 * @param {Object} sequelize instance
 * @param {Object} DataTypes for Sequelize
 * @returns {Object} user model
 */
function linkContactRequest(sequelize, DataTypes) {
  const ContactRequest = sequelize.define('contact_request', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    status: {
      allowNull: false,
      defaultValue: 'pending',
      type: DataTypes.ENUM(
        'pending',
        'accepted',
        'ignored',
        'expired',
      ),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    paranoid: true,
  });

  ContactRequest.associate = function addContactRequestAssociations(models) {
    ContactRequest.belongsTo(models.user, {
      as: 'sender',
      foreignKey: 'sender_id',
    });
    ContactRequest.belongsTo(models.user, {
      as: 'recipient',
      foreignKey: 'recipient_id',
    });
  };

  return ContactRequest;
}
linkContactRequest.toString = () => 'contact_request';

export default linkContactRequest;
